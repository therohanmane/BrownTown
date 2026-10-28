import { t, getLang, onLangChange } from '../i18n/index.js';
import { h, icon } from './dom.js';

/**
 * Partnership enquiry form — the only submission path on the site.
 *
 * Flow: validate in the browser → POST JSON to /api/enquiry → show success
 * ONLY when the server answers 200 { ok: true }. Any other outcome keeps the
 * visitor's input in the form and explains what happened so they can retry.
 * Nothing is written to localStorage. The server re-validates everything
 * (server/enquiry-core.js); these checks are for fast feedback only.
 */
const ENDPOINT = '/api/enquiry';
const TIMEOUT_MS = 15000;
const PHONE_RE = /^\+?[0-9][0-9\s-]{7,18}[0-9]$/;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

let form, alertBox, submitBtn, successBox, startedAt, lastErrors = {}, lastFailure = null, sending = false;

const fields = () => ({
  name: form.elements.name,
  business: form.elements.business,
  phone: form.elements.phone,
  email: form.elements.email,
  service: form.elements.service,
  message: form.elements.message,
  consent: form.elements.consent
});

function validate() {
  const f = fields();
  const errors = {};
  if (f.name.value.trim().length < 2) errors.name = 'required';
  if (f.business.value.trim().length < 2) errors.business = 'required';
  const phone = f.phone.value.trim();
  if (!phone) errors.phone = 'required';
  else if (!PHONE_RE.test(phone)) errors.phone = 'invalid';
  const email = f.email.value.trim();
  if (email && !EMAIL_RE.test(email)) errors.email = 'invalid';
  if (!f.service.value) errors.service = 'required';
  const msg = f.message.value.trim();
  if (!msg) errors.message = 'required';
  else if (msg.length < 20) errors.message = 'tooShort';
  if (!f.consent.checked) errors.consent = 'required';
  return errors;
}

function messageFor(field, code) {
  if (field === 'consent') return t('err_consent');
  if (code === 'invalid' && (field === 'phone' || field === 'email')) return t(`err_${field}_invalid`);
  return t(`err_${code}`) || t('err_invalid');
}

function showErrors(errors) {
  lastErrors = errors;
  const f = fields();
  for (const [name, el] of Object.entries(f)) {
    const code = errors[name];
    const out = document.getElementById(`${el.id}-err`);
    el.setAttribute('aria-invalid', code ? 'true' : 'false');
    el.closest('.field')?.classList.toggle('has-error', Boolean(code));
    if (out) out.textContent = code ? messageFor(name, code) : '';
  }
  const count = Object.keys(errors).filter((k) => k in f).length;
  if (count) {
    showAlert('error', t('errSummary', { count }), null, false);
    const first = Object.keys(f).find((k) => errors[k]);
    f[first]?.focus();
  }
}

function showAlert(kind, title, body, focus = true) {
  alertBox.hidden = false;
  alertBox.className = `form-alert is-${kind}`;
  alertBox.replaceChildren(
    icon(kind === 'error' ? 'alert' : 'check'),
    h('div', {}, h('p', { class: 'form-alert-title', text: title }), body ? h('p', { text: body }) : null)
  );
  if (focus) alertBox.focus();
}

function hideAlert() {
  alertBox.hidden = true;
  alertBox.replaceChildren();
}

function setSending(on) {
  sending = on;
  submitBtn.disabled = on;
  submitBtn.setAttribute('aria-busy', String(on));
  submitBtn.querySelector('.btn-label').textContent = t(on ? 'sending' : lastFailure ? 'retry' : 'submit');
}

async function submit(e) {
  e.preventDefault();
  if (sending) return;
  hideAlert();
  const errors = validate();
  showErrors(errors);
  if (Object.keys(errors).length) return;

  const f = fields();
  const payload = {
    name: f.name.value.trim(),
    business: f.business.value.trim(),
    phone: f.phone.value.trim(),
    email: f.email.value.trim(),
    city: form.elements.city.value.trim(),
    service: f.service.value,
    budget: form.elements.budget.value,
    message: f.message.value.trim(),
    consent: f.consent.checked,
    website: form.elements.website.value, // honeypot
    startedAt,
    lang: getLang()
  };

  setSending(true);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  let res, body;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
      credentials: 'same-origin'
    });
    body = await res.json().catch(() => null);
  } catch {
    res = null;
  } finally {
    clearTimeout(timer);
  }

  if (res && res.status === 200 && body?.ok === true) {
    lastFailure = null;
    setSending(false);
    return showSuccess(payload.name);
  }

  // Failure: keep everything the visitor typed, explain, allow retry.
  let reason = 'generic';
  if (!res) reason = 'network';
  else if (res.status === 429) reason = 'rate_limited';
  else if (res.status === 503) reason = 'not_configured';
  else if (res.status === 400 && body?.error === 'rejected') reason = 'rejected';
  else if (res.status === 400 && body?.fields) {
    lastFailure = null;
    setSending(false);
    return showErrors(body.fields);
  }
  lastFailure = reason;
  setSending(false);
  showAlert('error', t('sendFailTitle'), t(`sendFail_${reason}`));
}

function showSuccess(name) {
  form.hidden = true;
  successBox.hidden = false;
  successBox.dataset.name = name;
  renderSuccess();
  successBox.focus();
}

function renderSuccess() {
  if (successBox.hidden) return;
  successBox.replaceChildren(
    h('span', { class: 'success-icon' }, icon('check')),
    h('h3', { text: t('successTitle') }),
    h('p', { text: t('successBody', { name: successBox.dataset.name || '' }) }),
    h('button', { type: 'button', class: 'btn btn-outline', onclick: reset, text: t('successAgain') })
  );
}

function reset() {
  form.reset();
  showErrors({});
  hideAlert();
  successBox.hidden = true;
  form.hidden = false;
  startedAt = Date.now();
  form.elements.name.focus();
}

export function initEnquiry() {
  form = document.getElementById('enquiry-form');
  if (!form) return;
  alertBox = document.getElementById('form-alert');
  submitBtn = document.getElementById('enquiry-submit');
  successBox = document.getElementById('form-success');
  startedAt = Date.now();

  form.addEventListener('submit', submit);
  // Clear a field's error as soon as it becomes valid.
  form.addEventListener('input', (e) => {
    const name = e.target.name;
    if (!lastErrors[name]) return;
    const now = validate();
    if (!now[name]) {
      const { [name]: _, ...rest } = lastErrors;
      lastErrors = rest;
      e.target.setAttribute('aria-invalid', 'false');
      e.target.closest('.field')?.classList.remove('has-error');
      document.getElementById(`${e.target.id}-err`).textContent = '';
    }
  });

  onLangChange(() => {
    // Re-localise any visible messages without losing input.
    const f = fields();
    for (const [name, code] of Object.entries(lastErrors)) {
      const out = f[name] && document.getElementById(`${f[name].id}-err`);
      if (out) out.textContent = messageFor(name, code);
    }
    if (!alertBox.hidden) {
      if (lastFailure) showAlert('error', t('sendFailTitle'), t(`sendFail_${lastFailure}`), false);
      else if (Object.keys(lastErrors).length) showAlert('error', t('errSummary', { count: Object.keys(lastErrors).length }), null, false);
    }
    setSending(sending);
    renderSuccess();
  });
}
