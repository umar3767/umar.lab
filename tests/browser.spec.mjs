import { test, expect } from '@playwright/test';

test('home: real assets and ten unique illustrated works', async ({ page }) => {
  const problems = [];
  page.on('pageerror', error => problems.push(error.message));
  page.on('requestfailed', request => problems.push('Network: ' + request.url() + ' ' + request.failure()));
  page.on('console', message => { if (message.type() === 'error') problems.push('Console: ' + message.text()); });
  await page.goto('./index.html');
  const policy = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
  expect(policy).toContain("script-src 'self'");
  expect(policy).not.toContain('upgrade-insecure-requests');
  const diagnosis = await page.evaluate(() => ({
    contentLoaded: Boolean(window.SITE_CONTENT),
    appLoaded: Boolean(window.Umar),
    motionLoaded: Boolean(window.UmarMotion),
    cards: document.querySelectorAll('#workRows .row').length,
    scripts: [...document.scripts].map(x => x.src),
    resources: performance.getEntriesByType('resource').filter(x => /\\.(?:js|css)/.test(x.name)).map(x => x.name)
  }));
  if (!diagnosis.appLoaded || !diagnosis.cards) {
    throw new Error('Bootstrap diagnostics: ' + JSON.stringify({ diagnosis, problems }));
  }
  await expect(page.locator('#workRows .row')).toHaveCount(2);
  await expect(page.locator('#aboutName')).toHaveText('Umar');
  await expect(page.locator('#testimonials')).toBeVisible();
  await expect(page.locator('#contactLinks .social__link')).toHaveCount(3);
  await expect(page.locator('#form')).toBeVisible();
  const originals = page.locator('#workRows .track > .card--project:not([data-clone])');
  await expect(originals).toHaveCount(10);
  const artworks = await originals.locator('img').evaluateAll(images =>
    images.map(x => ({ path: x.getAttribute('src'), loaded: x.complete && x.naturalWidth > 0 })));
  expect(new Set(artworks.map(x => x.path)).size).toBe(10);
  expect(artworks.every(x => x.loaded)).toBeTruthy();
  expect(problems).toEqual([]);
});

test('language, links and menu remain functional', async ({ page, isMobile }) => {
  await page.goto('./index.html');
  await page.locator('button[data-lang="ru"]').click();
  await expect(page.locator('#aboutH')).toContainText('ОБО МНЕ');
  await expect(page.locator('#aboutSkills li')).toHaveCount(5);
  await expect(page.locator('#contactLinks .social__link--telegram')).toHaveAttribute('href', 'https://t.me/Pac1fik01');
  await expect(page.locator('#contactLinks .social__link--whatsapp')).toHaveAttribute('href', 'https://wa.me/998975591991');
  if (isMobile) {
    const burger = page.locator('#burger');
    await burger.click();
    await expect(burger).toHaveAttribute('aria-expanded','true');
    await page.locator('#navLinks a[href="#works"]').click();
    await expect(burger).toHaveAttribute('aria-expanded','false');
  }
  await page.goto('./works.html');
  await expect(page.locator('#workGrid .card--project')).toHaveCount(10);
  await expect(page.locator('#workGrid .card--project').first()).toHaveAttribute('href', /business-websites-10\/01-dental\/$/);
});

test('contact form validates locally and handles success without contacting Formspree', async ({ page }) => {
  await page.goto('./index.html');
  await page.locator('#send').click();
  await expect(page.locator('#eName')).not.toBeEmpty();
  await expect(page.locator('#eEmail')).not.toBeEmpty();
  await expect(page.locator('#eMsg')).not.toBeEmpty();

  await page.locator('#fName').fill('Sample Client');
  await page.locator('#fEmail').fill('sample@example.test');
  await page.locator('#fMsg').fill('Hello, I would like a project website.');
  let intercepted = false;
  await page.route('https://formspree.io/f/**', async route => {
    intercepted = true;
    expect(route.request().method()).toBe('POST');
    expect(route.request().headers()['content-type']).toContain('multipart/form-data; boundary=');
    await route.fulfill({ status:200, contentType:'application/json', headers:{'access-control-allow-origin':'*'}, body:'{"ok":true}' });
  });
  await page.locator('#send').click();
  await expect(page.locator('#status')).toContainText(/sent|отправлено/i);
  expect(intercepted).toBeTruthy();
  await expect(page.locator('#send')).toBeEnabled();
});

test('layout has no document-level overflow and reduced motion disables marquees', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./index.html');
  await expect(page.locator('#workRows .row.is-static')).toHaveCount(2);
  const geometry = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
    cardCount: document.querySelectorAll('#workRows .card--project').length
  }));
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.viewport + 2);
  expect(geometry.cardCount).toBe(10);
  await page.goto('./works.html');
  await expect(page.locator('#workGrid .card--project')).toHaveCount(10);
  const archive = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth
  }));
  expect(archive.scroll).toBeLessThanOrEqual(archive.viewport + 2);
});


test('JavaScript disabled: portfolio and contact options remain usable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:4173/index.html');
    await expect(page.locator('.nojs-gallery a')).toHaveCount(10);
    await expect(page.locator('.nojs-contact a')).toHaveCount(3);
    await page.goto('http://127.0.0.1:4173/works.html');
    await expect(page.locator('.nojs-gallery a')).toHaveCount(10);
  } finally {
    await context.close();
  }
});


test('short homepage is rendered directly without a redirect', async ({ page }) => {
  const response = await page.goto('./');
  expect(response.ok()).toBeTruthy();
  expect(page.url()).toMatch(/:\\d+\\/$/);
  await expect(page.locator('.hero__title')).toBeVisible();
  await expect(page.locator('#workRows .card--project:not([data-clone])')).toHaveCount(10);
  await expect(page.locator('a[href="./works.html"]')).toHaveCount(1);
  const urls = await page.locator('.hero__hand').evaluateAll(images => images.map(img => ({ path: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 })));
  expect(urls).toHaveLength(2);
  expect(urls.every(x => x.loaded && x.path.startsWith('./UMAR_PORTFOLIO_GITHUB_LITE/assets/'))).toBeTruthy();
});

test('short works URL and existing legacy URLs both remain accessible', async ({ page }) => {
  await page.goto('./works.html');
  await expect(page.locator('#workGrid .card--project')).toHaveCount(10);
  const links = await page.locator('#workGrid .card--project').evaluateAll(items => items.map(a => a.getAttribute('href')));
  expect(new Set(links).size).toBe(10);
  await page.goto('./UMAR_PORTFOLIO_GITHUB_LITE/index.html');
  await expect(page.locator('#workRows .row')).toHaveCount(2);
  await page.goto('./UMAR_PORTFOLIO_GITHUB_LITE/works.html');
  await expect(page.locator('#workGrid .card--project')).toHaveCount(10);
});
