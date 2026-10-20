/* Umar Portfolio — contact form (Formspree). States: idle, sending, success, error. */
(function () {
  'use strict';
  var form = document.getElementById('form'); if (!form) return;
  var U = window.Umar, btn = document.getElementById('send'), status = document.getElementById('status'), busy = false;
  var f = { name: form.elements.name, email: form.elements.email, message: form.elements.message };
  var errs = { name: 'eName', email: 'eEmail', message: 'eMsg' }, keys = { name: 'errName', email: 'errEmail', message: 'errMsg' };
  function endpoint() { var u = U.content.contacts && U.content.contacts.formspreeEndpoint; return /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(String(u || '').trim()) ? u.trim() : ''; }
  // Do not show a form that cannot deliver messages. Adding a valid endpoint to content.js automatically activates it.
  if (!endpoint()) {
    form.hidden = true;
    document.documentElement.classList.add('form-not-configured');
    return;
  }
  form.hidden = false;
  function say(msg, cls) { status.textContent = msg; status.className = 'status' + (cls ? ' ' + cls : ''); }
  function validate() {
    var v = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() }, bad = [];
    if (!v.name || v.name.length > 80) bad.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) || v.email.length > 120) bad.push('email');
    if (!v.message || v.message.length > 3000) bad.push('message');
    Object.keys(f).forEach(function (k) {
      var on = bad.indexOf(k) > -1; f[k].setAttribute('aria-invalid', String(on));
      document.getElementById(errs[k]).textContent = on ? U.t(keys[k]) : '';
    });
    if (bad.length) f[bad[0]].focus();
    return bad.length ? null : v;
  }
  form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') { e.target.setAttribute('aria-invalid', 'false'); document.getElementById(errs[e.target.name]).textContent = ''; } });
  document.addEventListener('umar:lang', function () { status.textContent = ''; status.className = 'status'; Object.keys(errs).forEach(function (k) { if (f[k].getAttribute('aria-invalid') === 'true') document.getElementById(errs[k]).textContent = U.t(keys[k]); }); btn.textContent = U.t('send'); });
  form.addEventListener('submit', function (e) {
    e.preventDefault(); if (busy) return;
    var v = validate(); if (!v) return;
    var url = endpoint(); if (!url) { say(U.t('errSetup'), 'bad'); return; }
    if (form.elements._gotcha.value) { say(U.t('success'), 'ok'); form.reset(); return; } // bots: silently pretend
    busy = true; btn.disabled = true; btn.textContent = U.t('sending'); say('');
    var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 12000);
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v), signal: ctl.signal })
      .then(function (r) { if (r.ok) { say(U.t('success'), 'ok'); form.reset(); } else say(U.t('errServer'), 'bad'); })
      .catch(function () { say(U.t('errNet'), 'bad'); })
      .then(function () { clearTimeout(to); busy = false; btn.disabled = false; btn.textContent = U.t('send'); });
  });
})();
