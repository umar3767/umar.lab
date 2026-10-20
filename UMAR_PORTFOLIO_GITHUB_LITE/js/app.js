/* Umar Portfolio — bootstrap: i18n, rendering, navigation. No dependencies. */
(function () {
  'use strict';
  var C = window.SITE_CONTENT || { ui: { en: {} }, projects: [], testimonials: [], services: [], about: {}, contacts: {} };
  var KEY = 'umar-lang', lang = C.localeDefault || 'en';
  try { var s = localStorage.getItem(KEY); if (s === 'en' || s === 'ru') lang = s; } catch (e) {}
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function dig(o, path) { return path.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
  function t(key) { var v = dig(C.ui[lang] || {}, key); if (v == null) v = dig(C.ui.en || {}, key); return v == null ? '' : String(v); }
  function loc(o) { return o ? (o[lang] != null ? o[lang] : o.en) : ''; }
  function safeUrl(u) { try { var raw = String(u || '').trim(); var x = new URL(raw, location.href); return /^https:\/\//i.test(raw) && x.protocol === 'https:' ? x.href : null; } catch (e) { return null; } }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function card(p, i, hidden) {
    var url = safeUrl(p.liveUrl), name = typeof p.title === 'string' ? p.title : loc(p.title);
    var detail = loc(p.category), n = ('0' + (i + 1)).slice(-2);
    var a = el(url ? 'a' : 'div', 'card card--project');
    if (url) {
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', name + (detail ? ' — ' + detail : '') + '. ' + t('open') + ' (' + t('newTab') + ')');
    }
    if (hidden) { a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; }

    var visual = el('span', 'project-card__visual');
    visual.setAttribute('aria-hidden', 'true');
    if (p.art && /^[a-z-]+$/.test(p.art)) {
      var img = el('img', 'project-card__artwork');
      img.src = './assets/project-art/' + p.art + '.svg';
      img.alt = ''; img.width = 640; img.height = 360;
      img.decoding = 'async';
      // Small, cacheable SVGs load eagerly: moving rows should not reveal blank cards.
      img.loading = 'eager';
      visual.appendChild(img);
    } else {
      visual.appendChild(el('span', 'project-card__fallback', name.slice(0, 1)));
    }
    visual.appendChild(el('span', 'project-card__number', n + ' / ' + String((C.projects || []).length).padStart(2, '0')));
    visual.appendChild(el('span', 'project-card__corner'));

    var bottom = el('span', 'project-card__bottom');
    var copy = el('span', 'project-card__copy');
    copy.appendChild(el('h3', 'project-card__title', name));
    if (detail) copy.appendChild(el('span', 'cat project-card__description', detail));
    bottom.appendChild(copy);
    var arrow = el('span', 'project-card__arrow', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    bottom.appendChild(arrow);
    a.appendChild(visual);
    a.appendChild(bottom);
    return a;
  }
  function quote(q, hidden) {
    var d = el('figure', 'quote');
    var r = Math.max(1, Math.min(5, Math.round(+q.rating) || 5));
    var st = el('div', 'stars', '★'.repeat(r) + '☆'.repeat(5 - r)); st.setAttribute('role', 'img'); st.setAttribute('aria-label', t('stars').replace('{n}', r));
    d.appendChild(st);
    if (q.category) d.appendChild(el('span', 'review__category', loc(q.category)));
    d.appendChild(el('p', '', loc(q.text)));
    if (hidden) { d.setAttribute('aria-hidden', 'true'); }
    return d;
  }
  function row(items, dir, speed) {
    var r = el('div', 'row'), tr = el('div', 'track'); r.dataset.dir = dir; r.dataset.speed = speed;
    items.forEach(function (n) { tr.appendChild(n); }); r.appendChild(tr); return r;
  }
  function split(list, k) { var rows = []; for (var i = 0; i < k; i++) rows.push([]); list.forEach(function (x, i) { rows[i % k].push(x); }); return rows; }

  function render() {
    var P = (C.projects || []).filter(function (p) { return p && p.title && safeUrl(p.liveUrl); });
    var emp = $('#workEmpty'); if (emp) emp.hidden = P.length > 0;
    var rows = $('#workRows');
    if (rows) {
      rows.textContent = '';
      if (P.length) {
        var parts = P.length > 1 ? split(P, 2) : [P, P];
        parts.forEach(function (list, k) {
          var dup = P.length < 2 && k === 1;
          var items = list.map(function (p) { return card(p, P.indexOf(p), dup); });
          rows.appendChild(row(items, k ? 1 : -1, 22));
        });
      }
    }
    var grid = $('#workGrid');
    if (grid) { grid.textContent = ''; P.forEach(function (p, i) { var li = el('li'); li.appendChild(card(p, i)); grid.appendChild(li); }); }

    var T = (C.testimonials || []).filter(function (q) { return q && q.text && loc(q.text); });
    var ts = $('#testimonials'); if (ts) ts.hidden = !T.length;
    $$('[data-nav=testimonials]').forEach(function (a) { a.hidden = !T.length; });
    var tr = $('#testiRows');
    if (tr) {
      tr.textContent = '';
      if (T.length) {
        var cfg = [[-1, 18], [1, 27], [-1, 12]], parts2 = split(T, 3);
        parts2.forEach(function (list, k) {
          var dup = !list.length; if (dup) list = T;
          tr.appendChild(row(list.map(function (q) { return quote(q, dup); }), cfg[k][0], cfg[k][1]));
        });
      }
    }
    var a = C.about || {};
    if ($('#aboutName')) {
      $('#aboutName').textContent = a.name || '';
      $('#aboutText').textContent = loc(a.text);
      var sk = $('#aboutSkills'); sk.textContent = '';
      ((a.skills && (a.skills[lang] || a.skills.en)) || []).forEach(function (s) { sk.appendChild(el('li', '', s)); });
    }
    var sv = $('#svcList');
    if (sv) {
      sv.textContent = '';
      (C.services || []).forEach(function (s, i) {
        var d = s[lang] || s.en, li = el('li', 'svc__group');
        li.appendChild(el('span', 'n', ('0' + (i + 1)).slice(-2)));
        li.appendChild(el('h3', '', d[0]));
        var detail = el('div', 'svc__detail'), items = el('ul', 'svc__items');
        detail.appendChild(el('p', 'svc__description', d[1]));
        (s.items || []).forEach(function (item) {
          var localized = item[lang] || item.en;
          items.appendChild(el('li', '', localized[0]));
        });
        detail.appendChild(items); li.appendChild(detail); sv.appendChild(li);
      });
    }
    var cl = $('#contactLinks');
    if (cl) {
      cl.textContent = '';
      var k = C.contacts || {};
      var tg = k.telegram && safeUrl(k.telegram);
      var wa = k.whatsapp && safeUrl(k.whatsapp);
      var ph = k.phone && String(k.phone).replace(/[^\d+]/g, '');
      if (ph && !/^\+[1-9]\d{6,14}$/.test(ph)) ph = '';
      function addSocial(kind, href, label, external) {
        var li = el('li', 'social__item');
        var a = el('a', 'social__link social__link--' + kind);
        a.href = href;
        a.setAttribute('aria-label', label);
        if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        var mark = el('span', 'social__icon');
        mark.setAttribute('aria-hidden', 'true');
        var img = el('img');
        img.src = './assets/icons/' + kind + '.svg';
        img.alt = ''; img.width = 24; img.height = 24;
        mark.appendChild(img);
        a.appendChild(mark);
        a.appendChild(el('span', 'social__name', label));
        var arrow = el('span', 'social__arrow', '↗');
        arrow.setAttribute('aria-hidden', 'true');
        a.appendChild(arrow);
        li.appendChild(a); cl.appendChild(li);
      }
      if (tg) addSocial('telegram', tg, t('telegram'), true);
      if (wa) addSocial('whatsapp', wa, t('whatsapp'), true);
      if (ph) addSocial('phone', 'tel:' + ph, t('phone'), false);
      cl.hidden = !cl.children.length;
    }
    document.dispatchEvent(new CustomEvent('umar:render'));
  }

  function applyLang(l, persist) {
    lang = l; document.documentElement.lang = l;
    if (persist) try { localStorage.setItem(KEY, l); } catch (e) {}
    $$('[data-i18n]').forEach(function (n) { var v = t(n.dataset.i18n); if (v) n.textContent = v; });
    $$('[data-i18n-aria]').forEach(function (n) { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    var works = document.body.classList.contains('page-works');
    document.title = works ? (l === 'ru' ? 'Все работы' : 'All Works') + ' — Umar Portfolio' : t('title');
    var md = $('meta[name=description]'); if (md) md.content = t('description');
    render(); document.dispatchEvent(new CustomEvent('umar:lang', { detail: l }));
  }
  window.Umar = { t: t, lang: function () { return lang; }, safeUrl: safeUrl, content: C };

  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.dataset.lang, true); }); });
  $('#year').textContent = new Date().getFullYear();
  $('#toTop').addEventListener('click', function () { window.scrollTo({ top: 0 }); var m = $('#main'); if (m) { m.tabIndex = -1; m.focus({ preventScroll: true }); } });

  /* nav: scrolled state, menu, active section */
  var nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function menu(open) {
    nav.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { menu(!nav.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) menu(false); });
  document.addEventListener('keydown', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (e.key === 'Escape') { menu(false); burger.focus(); }
    if (e.key === 'Tab') {
      var f = $$('a:not([hidden]),button', nav).filter(function (n) { return n.offsetParent !== null; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var desktop = window.matchMedia('(min-width:861px)');
  var closeOnDesktop = function (m) { if (m.matches) menu(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', closeOnDesktop);
  else if (desktop.addListener) desktop.addListener(closeOnDesktop);
  if ('IntersectionObserver' in window && document.body.classList.contains('page-home')) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) $$('[data-nav]').forEach(function (a) { a.classList.toggle('is-active', a.dataset.nav === en.target.id); }); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { io.observe(s); });
  }
  applyLang(lang, false);
})();
