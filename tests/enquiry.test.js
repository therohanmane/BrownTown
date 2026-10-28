import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import {
  validateEnquiry,
  handleEnquiryRequest,
  resetRateLimits,
  getDeliveryMode,
  deliverEnquiry
} from '../server/enquiry-core.js';

const NOW = 1_800_000_000_000;
const valid = (over = {}) => ({
  name: 'Asha Patil',
  business: 'Patil Sweets',
  phone: '+91 98220 12345',
  email: 'asha@example.com',
  city: 'Pune',
  service: 'creative_design',
  budget: '10k_25k',
  message: 'We are opening a second shop in Kothrud and need posters.',
  consent: true,
  website: '',
  startedAt: NOW - 60_000,
  lang: 'mr',
  ...over
});

/* ---------- validation ---------- */

test('accepts a complete, valid enquiry', () => {
  const r = validateEnquiry(valid(), NOW);
  assert.equal(r.ok, true);
  assert.equal(r.data.business, 'Patil Sweets');
});

test('email is optional', () => {
  assert.equal(validateEnquiry(valid({ email: '' }), NOW).ok, true);
});

test('reports each missing required field', () => {
  const r = validateEnquiry(valid({ name: '', business: ' ', phone: '', service: '', message: '', consent: false }), NOW);
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ['business', 'consent', 'message', 'name', 'phone', 'service']);
});

test('rejects malformed phone, email, unknown service and short message', () => {
  const r = validateEnquiry(valid({ phone: 'call me', email: 'nope@', service: 'hacking', message: 'too short' }), NOW);
  assert.equal(r.errors.phone, 'invalid');
  assert.equal(r.errors.email, 'invalid');
  assert.equal(r.errors.service, 'required');
  assert.equal(r.errors.message, 'tooShort');
});

test('honeypot, instant submissions and stale forms are treated as spam', () => {
  assert.equal(validateEnquiry(valid({ website: 'http://spam' }), NOW).spam, true);
  assert.equal(validateEnquiry(valid({ startedAt: NOW - 500 }), NOW).spam, true);
  assert.equal(validateEnquiry(valid({ startedAt: NOW - 1000 * 60 * 60 * 24 }), NOW).spam, true);
  assert.equal(validateEnquiry(valid({ startedAt: 'x' }), NOW).spam, true);
});

test('strips control characters and truncates long input', () => {
  const r = validateEnquiry(valid({ name: 'A\u0000sha\u0007 ' + 'x'.repeat(500) }), NOW);
  assert.equal(r.ok, true);
  assert.ok(!/[\u0000\u0007]/.test(r.data.name));
  assert.ok(r.data.name.length <= 80);
});

test('rejects non-object payloads', () => {
  assert.equal(validateEnquiry(null, NOW).ok, false);
  assert.equal(validateEnquiry([1, 2], NOW).ok, false);
});

/* ---------- HTTP handler ---------- */

function mockReq({ method = 'POST', body, headers = {}, ip = '10.0.0.1' } = {}) {
  const raw = body === undefined ? '' : typeof body === 'string' ? body : JSON.stringify(body);
  const req = Readable.from([Buffer.from(raw)]);
  req.method = method;
  req.headers = { 'content-type': 'application/json', 'x-forwarded-for': ip, ...headers };
  req.socket = { remoteAddress: ip };
  return req;
}
function mockRes() {
  const res = { statusCode: 200, headers: {}, body: '' };
  res.setHeader = (k, v) => { res.headers[k.toLowerCase()] = v; };
  res.end = (b) => { res.body = b; };
  res.json = () => JSON.parse(res.body);
  return res;
}
const freshBody = () => valid({ startedAt: Date.now() - 60_000 });

beforeEach(() => resetRateLimits());

test('405 for non-POST', async () => {
  const res = mockRes();
  await handleEnquiryRequest(mockReq({ method: 'GET' }), res, {});
  assert.equal(res.statusCode, 405);
});

test('415 for non-JSON content type', async () => {
  const res = mockRes();
  await handleEnquiryRequest(mockReq({ body: freshBody(), headers: { 'content-type': 'text/plain' } }), res, {});
  assert.equal(res.statusCode, 415);
});

test('400 with field codes for invalid input', async () => {
  const res = mockRes();
  await handleEnquiryRequest(mockReq({ body: { ...freshBody(), phone: '' } }), res, {});
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().fields.phone, 'required');
});

test('400 for broken JSON and 413 for oversized bodies', async () => {
  let res = mockRes();
  await handleEnquiryRequest(mockReq({ body: '{not json' }), res, {});
  assert.equal(res.statusCode, 400);
  res = mockRes();
  await handleEnquiryRequest(mockReq({ body: { ...freshBody(), message: 'x'.repeat(20_000) } }), res, {});
  assert.equal(res.statusCode, 413);
});

test('never reports success when no delivery provider is configured (503)', async () => {
  const res = mockRes();
  await handleEnquiryRequest(mockReq({ body: freshBody() }), res, {});
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().ok, false);
});

test('200 only after the provider accepts the message', async () => {
  const calls = [];
  const fetchOk = async (url, init) => { calls.push({ url, init }); return { ok: true, status: 200 }; };
  const env = { RESEND_API_KEY: 'test', ENQUIRY_TO_EMAIL: 'team@example.com', ENQUIRY_FROM_EMAIL: 'site@example.com' };
  const res = mockRes();
  await handleEnquiryRequest(mockReq({ body: freshBody() }), res, env, fetchOk);
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const sent = JSON.parse(calls[0].init.body);
  assert.deepEqual(sent.to, ['team@example.com']);
  assert.equal(sent.reply_to, 'asha@example.com');
});

test('502 when the provider fails', async () => {
  const fetchFail = async () => ({ ok: false, status: 500 });
  const res = mockRes();
  await handleEnquiryRequest(mockReq({ body: freshBody() }), res, { ENQUIRY_WEBHOOK_URL: 'https://hooks.example.com/x' }, fetchFail);
  assert.equal(res.statusCode, 502);
});

test('HTML in the message is escaped in the email body', async () => {
  let html = '';
  const fetchOk = async (_u, init) => { html = JSON.parse(init.body).html; return { ok: true, status: 200 }; };
  await deliverEnquiry(
    { ...valid(), message: '<script>alert(1)</script> please call' },
    { RESEND_API_KEY: 'k', ENQUIRY_TO_EMAIL: 'a@b.co', ENQUIRY_FROM_EMAIL: 'c@d.co' },
    fetchOk
  );
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
});

test('rate limits a burst from one client (429)', async () => {
  const fetchOk = async () => ({ ok: true, status: 200 });
  const env = { ENQUIRY_WEBHOOK_URL: 'https://hooks.example.com/x' };
  const codes = [];
  for (let i = 0; i < 7; i++) {
    const res = mockRes();
    await handleEnquiryRequest(mockReq({ body: freshBody(), ip: '203.0.113.9' }), res, env, fetchOk);
    codes.push(res.statusCode);
  }
  assert.deepEqual(codes.slice(0, 5), [200, 200, 200, 200, 200]);
  assert.equal(codes[5], 429);
});

test('ALLOWED_ORIGINS blocks other origins', async () => {
  const res = mockRes();
  await handleEnquiryRequest(
    mockReq({ body: freshBody(), headers: { origin: 'https://evil.example' } }),
    res,
    { ALLOWED_ORIGINS: 'https://www.example.com', ENQUIRY_WEBHOOK_URL: 'https://h.example.com' }
  );
  assert.equal(res.statusCode, 403);
});

test('delivery mode selection', () => {
  assert.equal(getDeliveryMode({}), 'none');
  assert.equal(getDeliveryMode({ ENQUIRY_WEBHOOK_URL: 'https://x' }), 'webhook');
  assert.equal(getDeliveryMode({ RESEND_API_KEY: 'k', ENQUIRY_TO_EMAIL: 'a', ENQUIRY_FROM_EMAIL: 'b' }), 'resend');
});
