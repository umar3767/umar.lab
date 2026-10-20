/* Cinematic Human: scroll rig → pointer layer → independent CSS idle → artwork.
 * Native scrolling. No image warping, fake finger joints or perpetual hero RAF.
 */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  // Cache the preference in its change handler; frame work reads only this state.
  let reduceMotion = reduced.matches;
  const $ = selector => document.querySelector(selector);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const hero = $('.hero'), text = $('#heroText');
  const left = $('#handL'), right = $('#handR'), light = $('.hero__touch-light');
  const pointers = hero ? [...hero.querySelectorAll('.hand-pointer')] : [];
  let heroHeight = hero ? hero.offsetHeight : 0, heroVisible = true;
  let scrollDirty = true, frameId = 0, previous = 0, lastY = scrollY, velocity = 0;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  let rows = [], rowObserver, rowEvents;

  function schedule() {
    if (!document.hidden && !frameId) frameId = requestAnimationFrame(frame);
  }
  function syncHero() {
    scrollDirty = false;
    if (!hero || !text) return;
    if (reduceMotion) {
      [text, left, right, light].forEach(el => { el.style.transform = ''; el.style.opacity = ''; });
      return;
    }
    const progress = clamp(scrollY / Math.max(400, heroHeight * .78), 0, 1);
    const ease = progress * progress * (3 - 2 * progress);
    text.style.transform = `translate3d(0,${(-100 * ease).toFixed(2)}px,0)`;
    text.style.opacity = String(1 - clamp(progress * 1.32, 0, 1));
    left.style.transform = `translate3d(${-29 * ease}%,${-6 * ease}%,0) rotate(${-3 * ease}deg)`;
    right.style.transform = `translate3d(${29 * ease}%,${-5 * ease}%,0) rotate(${3 * ease}deg)`;
    left.style.opacity = right.style.opacity = String(1 - progress * .92);
    light.style.opacity = String(Math.max(0, 1 - progress * 1.7));
  }
  function updatePointer(dt) {
    const amount = 1 - Math.exp(-dt * 5);
    pointerX += (targetX - pointerX) * amount; pointerY += (targetY - pointerY) * amount;
    const settled = Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) < .015;
    if (settled) { pointerX = targetX; pointerY = targetY; }
    pointers.forEach((el, index) => {
      const depth = index ? -.72 : 1;
      el.style.transform = reduceMotion ? '' : `translate3d(${(pointerX * depth).toFixed(3)}px,${(pointerY * depth).toFixed(3)}px,0)`;
    });
    return !settled;
  }
  function frame(now) {
    frameId = 0; if (document.hidden) return;
    const dt = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60; previous = now;
    if (scrollDirty) syncHero();
    const pointerMoving = !reduceMotion && heroVisible && updatePointer(dt);
    const speed = Math.abs(scrollY - lastY) / dt; lastY = scrollY;
    velocity += (Math.min(3000, speed) - velocity) * (1 - Math.exp(-dt * 4));
    let movingRows = false;
    if (!reduceMotion) rows.forEach(state => {
      if (!state.vis) return;
      movingRows = true;
      state.boost += (Math.min(velocity * .062, 95) - state.boost) * (1 - Math.exp(-dt * 3));
      state.pause += ((state.hold ? 0 : 1) - state.pause) * (1 - Math.exp(-dt * 7));
      state.speed = (state.base + state.boost) * state.pause;
      state.pos += state.dir * state.speed * dt;
      state.pos = ((state.pos % state.width) + state.width) % state.width - state.width;
      state.tr.style.transform = `translate3d(${state.pos.toFixed(2)}px,0,0)`;
    });
    if (pointerMoving || movingRows) schedule(); else previous = 0;
  }
  function onScroll() { scrollDirty = true; schedule(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (hero) {
    hero.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !mouse.matches || reduceMotion || !heroVisible) return;
      targetX = clamp(event.clientX / innerWidth * 2 - 1, -1, 1) * 4;
      targetY = clamp(event.clientY / innerHeight * 2 - 1, -1, 1) * 3; schedule();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { targetX = targetY = 0; schedule(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting; hero.dataset.motionPaused = String(!heroVisible);
      if (!heroVisible) targetX = targetY = 0;
      else { scrollDirty = true; schedule(); }
    }).observe(hero);
  }
  function visibility() {
    document.documentElement.dataset.motionPaused = String(document.hidden);
    if (document.hidden) { cancelAnimationFrame(frameId); frameId = 0; previous = 0; }
    else { previous = 0; lastY = scrollY; velocity = 0; scrollDirty = true; schedule(); }
  }
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('pageshow', visibility);

  /* Content reveals retain the existing no-JS and reduced-motion fallbacks. */
  let revealObserver;
  function reveal() {
    if (revealObserver) revealObserver.disconnect();
    const all = document.querySelectorAll('.works__head,.about__intro,.about__content,.services__titleline,.svc > li,.contact__intro,.contact__form,.allworks__title,.grid li');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      all.forEach(el => { el.classList.remove('reveal'); el.classList.add('is-visible'); });
      document.documentElement.classList.remove('motion-ready'); return;
    }
    document.documentElement.classList.add('motion-ready');
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -35px 0px' });
    all.forEach(el => { if (!el.classList.contains('is-visible')) { el.classList.add('reveal'); revealObserver.observe(el); } });
  }

  /* Rebuilds dispose observers/listeners, including after language changes. */
  function setupRows() {
    if (rowObserver) rowObserver.disconnect(); if (rowEvents) rowEvents.abort();
    rowEvents = new AbortController(); rows = [];
    if ('IntersectionObserver' in window) rowObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { const state = rows.find(s => s.row === entry.target); if (state) state.vis = entry.isIntersecting; }); schedule();
    });
    document.querySelectorAll('.row').forEach(row => {
      const tr = row.firstElementChild; if (!tr) return;
      tr.querySelectorAll('[data-clone]').forEach(el => el.remove());
      tr.style.transform = ''; row.classList.toggle('is-static', reduceMotion);
      if (reduceMotion) return;
      const original = [...tr.children]; if (!original.length) return;
      const gap = parseFloat(getComputedStyle(tr).columnGap) || 20;
      const clone = node => {
        const copy = node.cloneNode(true); copy.dataset.clone = '1'; copy.setAttribute('aria-hidden', 'true'); copy.tabIndex = -1;
        copy.querySelectorAll('a,button,input').forEach(el => el.tabIndex = -1); return copy;
      };
      const cycle = original.slice();
      let width = cycle.reduce((sum, node) => sum + node.getBoundingClientRect().width + gap, 0), i = 0;
      while (width < row.clientWidth + gap && i < 30) {
        const copy = clone(original[i++ % original.length]); tr.appendChild(copy); cycle.push(copy);
        width += copy.getBoundingClientRect().width + gap;
      }
      cycle.forEach(node => tr.appendChild(clone(node)));
      const dir = +row.dataset.dir || -1;
      const state = { row, tr, dir, base: +row.dataset.speed || 22, width, pos: dir === 1 ? -width : 0, pause: 1, hold: false, boost: 0, vis: !rowObserver, speed: 0 };
      rows.push(state);
      const listen = (type, fn) => row.addEventListener(type, fn, { signal: rowEvents.signal, passive: true });
      listen('pointerenter', e => { if (e.pointerType !== 'touch') state.hold = true; });
      listen('pointerleave', () => state.hold = false);
      listen('focusin', () => state.hold = true); listen('focusout', () => state.hold = false);
      listen('pointerdown', e => { if (e.pointerType === 'touch') state.hold = true; });
      ['pointerup', 'pointercancel'].forEach(type => listen(type, () => state.hold = false));
      if (rowObserver) rowObserver.observe(row);
    }); schedule();
  }
  let resizeTimer;
  window.addEventListener('resize', () => {
    heroHeight = hero ? hero.offsetHeight : 0; onScroll();
    clearTimeout(resizeTimer); resizeTimer = setTimeout(setupRows, 180);
  }, { passive: true });
  function preferenceChanged(event) {
    reduceMotion = event.matches;
    targetX = targetY = pointerX = pointerY = 0; pointers.forEach(el => el.style.transform = '');
    scrollDirty = true; syncHero(); reveal(); setupRows();
  }
  reduced.addEventListener('change', preferenceChanged);
  mouse.addEventListener('change', () => { targetX = targetY = 0; schedule(); });
  document.addEventListener('umar:render', () => { reveal(); setupRows(); });
  window.UmarMotion = { rows: () => rows.map(s => ({ dir: s.dir, pos: s.pos, speed: s.speed, base: s.base, pause: s.pause, sw: s.width })) };
  syncHero(); reveal(); setupRows(); visibility();
})();
