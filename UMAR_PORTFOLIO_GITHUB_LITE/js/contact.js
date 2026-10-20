/* Umar Portfolio / Formspree transport. Only public configuration lives on GitHub Pages. */
(function () {
  'use strict';
  var form = document.getElementById('form');
  var U = window.Umar;
  if (!form || !U || !U.content) return;

  var button = document.getElementById('send');
  var status = document.getElementById('status');
  var busy = false;
  var inputs = {
    name: form.elements.namedItem('name'),
    email: form.elements.namedItem('email'),
    message: form.elements.namedItem('message')
  };
  var errorIds = { name: 'eName', email: 'eEmail', message: 'eMsg' };
  var translationKeys = { name: 'errName', email: 'errEmail', message: 'errMsg' };

  function endpoint() {
    var url = U.content.contacts && U.content.contacts.formspreeEndpoint;
    return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(String(url || '').trim()) ? String(url).trim() : '';
  }
  var destination = endpoint();
  if (!destination) {
    form.hidden = true;
    document.documentElement.classList.add('form-not-configured');
    return;
  }
  form.hidden = false;
  form.action = destination;
  form.method = 'POST';

  function message(key, cls) {
    status.textContent = key ? U.t(key) : '';
    status.className = 'status' + (cls ? ' ' + cls : '');
  }

  function toggleBusy(next) {
    busy = next;
    button.disabled = next;
    button.textContent = U.t(next ? 'sending' : 'send');
    form.setAttribute('aria-busy', String(next));
  }

  function clearError(name) {
    if (!Object.prototype.hasOwnProperty.call(inputs, name)) return;
    inputs[name].setAttribute('aria-invalid', 'false');
    document.getElementById(errorIds[name]).textContent = '';
  }

  function validate() {
    var v = {
      name: inputs.name.value.trim(),
      email: inputs.email.value.trim(),
      message: inputs.message.value.trim()
    };
    var invalid = [];
    if (!v.name || v.name.length > 80) invalid.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) || v.email.length > 120) invalid.push('email');
    if (!v.message || v.message.length > 3000) invalid.push('message');

    Object.keys(inputs).forEach(function (field) {
      var bad = invalid.indexOf(field) !== -1;
      inputs[field].setAttribute('aria-invalid', String(bad));
      document.getElementById(errorIds[field]).textContent = bad ? U.t(translationKeys[field]) : '';
    });
    if (invalid.length) inputs[invalid[0]].focus();
    return invalid.length ? null : v;
  }

  form.addEventListener('input', function (e) {
    if (e.target && e.target.name && Object.prototype.hasOwnProperty.call(inputs, e.target.name)) {
      clearError(e.target.name);
    }
  });

  document.addEventListener('umar:lang', function () {
    Object.keys(inputs).forEach(function (field) {
      if (inputs[field].getAttribute('aria-invalid') === 'true') {
        document.getElementById(errorIds[field]).textContent = U.t(translationKeys[field]);
      }
    });
    button.textContent = U.t(busy ? 'sending' : 'send');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    var values = validate();
    if (!values) return;

    // Keep Formspree's honeypot check (server-side spam filtering remains provider-owned).
    var honeypot = form.elements.namedItem('_gotcha');
    if (honeypot && honeypot.value) {
      message('success', 'ok');
      form.reset();
      return;
    }

    if (typeof window.fetch !== 'function' || typeof window.FormData !== 'function') {
      message('errNet', 'bad');
      return;
    }

    var payload = new FormData(form);
    payload.set('name', values.name);
    payload.set('email', values.email);
    payload.set('message', values.message);

    toggleBusy(true);
    message('', '');
    var controller = typeof window.AbortController === 'function' ? new AbortController() : null;
    var timeout = controller ? setTimeout(function () { controller.abort(); }, 12000) : null;
    var options = {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: payload
    };
    if (controller) options.signal = controller.signal;

    // Multipart FormData avoids an unnecessary JSON CORS preflight.
    fetch(destination, options)
      .then(function (response) {
        if (response.ok) {
          message('success', 'ok');
          form.reset();
          Object.keys(inputs).forEach(clearError);
        } else {
          message('errServer', 'bad');
        }
      })
      .catch(function () { message('errNet', 'bad'); })
      .then(function () {
        if (timeout !== null) clearTimeout(timeout);
        toggleBusy(false);
      });
  });
})();