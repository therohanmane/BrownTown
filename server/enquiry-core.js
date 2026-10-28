/**
 * Partnership enquiry — shared server logic.
 *
 * Used by the Vercel function (api/enquiry.js) and by the Vite dev middleware,
 * so validation and delivery behave identically locally and in production.
 *
 * Delivery providers (configured only through environment variables):
 *   - Resend email API     RESEND_API_KEY + ENQUIRY_TO_EMAIL + ENQUIRY_FROM_EMAIL
 *   - Generic HTTPS webhook ENQUIRY_WEBHOOK_URL (+ optional ENQUIRY_WEBHOOK_SECRET)
 * If neither is configured the endpoint answers 503 and the browser shows a
 * failure message — it never reports success for an enquiry nobody received.
 */

export const SERVICE_VALUES = [
  'digital_campaign',
  'creative_design',
  'business_spotlight',
  'branded_video',
  'media_partnership',
  'other'
];

export const BUDGET_VALUES = ['', 'under_10k', '10k_25k', '25k_50k', 'above_50k', 'not_sure'];

const LIMITS = {
  name: 80,
  business: 120,
  city: 60,
  email: 120,
  phone: 20,
  message: 2000,
  messageMin: 20
};

// Submissions faster than this after the form rendered are treated as bots.
const MIN_FILL_MS = 3000;
// Form timestamps older than this are rejected (stale or replayed payloads).
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 6;
export const MAX_BODY_BYTES = 16 * 1024;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
// Indian mobile (optionally +91 / 0 prefixed) or a general international number.
const PHONE_RE = /^\+?[0-9][0-9\s-]{7,18}[0-9]$/;

const clean = (value, max) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max)
    : '';

/**
 * Validates a raw payload. Returns { ok, data } or { ok:false, errors, spam }.
 * `errors` maps field name -> error code; the browser localises the codes.
 */
export function validateEnquiry(raw, now = Date.now()) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, errors: { form: 'invalid' } };
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof raw.website === 'string' && raw.website.trim() !== '') {
    return { ok: false, spam: true, errors: { form: 'rejected' } };
  }

  const startedAt = Number(raw.startedAt);
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS || now - startedAt > MAX_FORM_AGE_MS) {
    return { ok: false, spam: true, errors: { form: 'rejected' } };
  }

  const data = {
    name: clean(raw.name, LIMITS.name),
    business: clean(raw.business, LIMITS.business),
    city: clean(raw.city, LIMITS.city),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    service: clean(raw.service, 40),
    budget: clean(raw.budget, 20),
    message: clean(raw.message, LIMITS.message),
    lang: ['mr', 'hi', 'en'].includes(raw.lang) ? raw.lang : 'mr',
    consent: raw.consent === true
  };

  const errors = {};
  if (data.name.length < 2) errors.name = 'required';
  if (data.business.length < 2) errors.business = 'required';
  if (!data.phone) errors.phone = 'required';
  else if (!PHONE_RE.test(data.phone)) errors.phone = 'invalid';
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = 'invalid';
  if (!SERVICE_VALUES.includes(data.service)) errors.service = 'required';
  if (!BUDGET_VALUES.includes(data.budget)) errors.budget = 'invalid';
  if (data.message.length < LIMITS.messageMin) errors.message = data.message ? 'tooShort' : 'required';
  if (!data.consent) errors.consent = 'required';

  // Link-stuffed messages are almost always spam.
  if ((data.message.match(/https?:\/\//gi) || []).length > 3) errors.message = 'invalid';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

/* ---------- Rate limiting ----------
 * Best-effort, per server instance. Serverless instances are short-lived and
 * not shared, so this blunts bursts from one client but is not a guarantee.
 * For stronger limits put Vercel Firewall rate limiting (or an Upstash/KV
 * counter) in front of /api/enquiry — see README.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

export function isRateLimited(key, now = Date.now()) {
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, list] of hits) if (!list.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

export function resetRateLimits() {
  hits.clear();
}

/* ---------- Delivery ---------- */

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function getDeliveryMode(env = process.env) {
  if (env.RESEND_API_KEY && env.ENQUIRY_TO_EMAIL && env.ENQUIRY_FROM_EMAIL) return 'resend';
  if (env.ENQUIRY_WEBHOOK_URL) return 'webhook';
  return 'none';
}

function formatPlain(d, receivedAt) {
  return [
    `New partnership enquiry — INBrownTown website`,
    `Received: ${receivedAt}`,
    ``,
    `Name:      ${d.name}`,
    `Business:  ${d.business}`,
    `City:      ${d.city || '—'}`,
    `Phone:     ${d.phone}`,
    `Email:     ${d.email || '—'}`,
    `Service:   ${d.service}`,
    `Budget:    ${d.budget || '—'}`,
    `Language:  ${d.lang}`,
    ``,
    `Message:`,
    d.message
  ].join('\n');
}

export async function deliverEnquiry(d, env = process.env, fetchImpl = globalThis.fetch) {
  const mode = getDeliveryMode(env);
  const receivedAt = new Date().toISOString();

  if (mode === 'resend') {
    const rows = [
      ['Name', d.name], ['Business', d.business], ['City', d.city || '—'], ['Phone', d.phone],
      ['Email', d.email || '—'], ['Service', d.service], ['Budget', d.budget || '—'], ['Language', d.lang]
    ].map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${k}</th><td>${escapeHtml(v)}</td></tr>`).join('');

    const res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.ENQUIRY_FROM_EMAIL,
        to: env.ENQUIRY_TO_EMAIL.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: d.email || undefined,
        subject: `Partnership enquiry: ${d.business} (${d.service})`,
        text: formatPlain(d, receivedAt),
        html: `<h2>New partnership enquiry</h2><p>Received ${receivedAt}</p><table>${rows}</table><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(d.message)}</p>`
      })
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { mode };
  }

  if (mode === 'webhook') {
    const headers = { 'Content-Type': 'application/json' };
    if (env.ENQUIRY_WEBHOOK_SECRET) headers['X-Enquiry-Secret'] = env.ENQUIRY_WEBHOOK_SECRET;
    const res = await fetchImpl(env.ENQUIRY_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ type: 'partnership_enquiry', receivedAt, ...d })
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { mode };
  }

  const err = new Error('No enquiry delivery provider is configured');
  err.code = 'NOT_CONFIGURED';
  throw err;
}

/* ---------- HTTP handler (Node req/res — works on Vercel and in Vite dev) ---------- */

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
    const text = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body);
    if (Buffer.byteLength(text) > MAX_BODY_BYTES) throw Object.assign(new Error('too large'), { code: 'TOO_LARGE' });
    return JSON.parse(text);
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error('too large'), { code: 'TOO_LARGE' });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function clientKey(req) {
  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim();
  return ip || req.socket?.remoteAddress || 'unknown';
}

function originAllowed(req, env) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!allowed.length) return true;
  const origin = req.headers.origin;
  return !origin || allowed.includes(origin);
}

export async function handleEnquiryRequest(req, res, env = process.env, fetchImpl = globalThis.fetch) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'method_not_allowed' });
  }
  const type = String(req.headers['content-type'] || '');
  if (!type.includes('application/json')) return send(res, 415, { ok: false, error: 'unsupported_media_type' });
  if (!originAllowed(req, env)) return send(res, 403, { ok: false, error: 'forbidden' });
  if (isRateLimited(clientKey(req))) return send(res, 429, { ok: false, error: 'rate_limited' });

  let raw;
  try {
    raw = await readJson(req);
  } catch (e) {
    return send(res, e.code === 'TOO_LARGE' ? 413 : 400, { ok: false, error: e.code === 'TOO_LARGE' ? 'too_large' : 'invalid_json' });
  }

  const result = validateEnquiry(raw);
  if (!result.ok) {
    // Spam gets a generic rejection so bots learn nothing about the checks.
    return send(res, 400, { ok: false, error: result.spam ? 'rejected' : 'validation', fields: result.spam ? undefined : result.errors });
  }

  try {
    await deliverEnquiry(result.data, env, fetchImpl);
    return send(res, 200, { ok: true });
  } catch (e) {
    if (e.code === 'NOT_CONFIGURED') {
      console.error('[enquiry] delivery not configured — set RESEND_* or ENQUIRY_WEBHOOK_URL');
      return send(res, 503, { ok: false, error: 'not_configured' });
    }
    console.error('[enquiry] delivery failed:', e.message);
    return send(res, 502, { ok: false, error: 'delivery_failed' });
  }
}
