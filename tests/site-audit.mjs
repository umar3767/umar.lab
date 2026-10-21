/* Umar.lab: dependency-free repository checks; run `node tests/site-audit.mjs`. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'UMAR_PORTFOLIO_GITHUB_LITE');
const read = rel => readFileSync(path.join(site, rel), 'utf8');
const htmlPages = ['index.html', 'works.html'];
const jsPaths = ['content.js', 'js/app.js', 'js/contact.js', 'js/motion.js', 'js/loader.js'];
const cssPaths = ['css/styles.css', 'css/redesign.css', 'css/refinement.css',
  'css/approved-hands.css', 'css/project-cards.css', 'css/social.css', 'css/loader.css'];

const sandbox = { window: {} };
vm.runInNewContext(read('content.js'), sandbox, { filename: 'content.js', timeout: 2000 });
const content = sandbox.window.SITE_CONTENT;

test('all JavaScript parses and contains no dynamic execution', () => {
  for (const file of jsPaths) {
    const code = read(file);
    assert.doesNotThrow(() => new vm.Script(code, { filename: file }), file);
    assert.doesNotMatch(code, /\b(?:eval|document\.write)\s*\(/, file);
  }
  assert.doesNotMatch(read('js/app.js'), /\.innerHTML\s*=/);
});

test('restrictive content security policy on both pages', () => {
  for (const page of htmlPages) {
    const html = read(page);
    assert.match(html, /http-equiv="Content-Security-Policy"/);
    assert.match(html, /script-src 'self'/);
    assert.match(html, /style-src 'self'/);
    assert.match(html, /object-src 'none'/);
    assert.match(html, /connect-src 'self' https:\/\/formspree\.io/);
    assert.doesNotMatch(html, /<script\b(?![^>]*\bsrc=)/g);
    assert.doesNotMatch(html, /<style\b/i);
    assert.doesNotMatch(html, /\bon(?:click|load|error|mouseover)\s*=/i);
  }
});

test('all local linked JavaScript, stylesheets and images exist', () => {
  for (const page of htmlPages) {
    const html = read(page);
    for (const match of html.matchAll(/\b(?:src|href)="(\.\/[^"#?]+\.(?:js|css|svg|png|webp|jpg))"/g)) {
      assert.ok(existsSync(path.join(site, match[1])), page + ': ' + match[1]);
    }
  }
  for (const file of cssPaths) {
    for (const match of read(file).matchAll(/url\(['"]?(\.\.\/assets\/[^'")]+)/g)) {
      const abs = path.resolve(site, 'css', match[1]);
      assert.ok(existsSync(abs), file + ': ' + match[1]);
    }
  }
});

test('ten distinct HTTPS projects have valid illustrations and short summaries', () => {
  assert.equal(content.projects.length, 10);
  assert.equal(new Set(content.projects.map(p => p.id)).size, 10);
  assert.equal(new Set(content.projects.map(p => p.title)).size, 10);
  assert.equal(new Set(content.projects.map(p => p.art)).size, 10);
  for (const p of content.projects) {
    assert.match(p.liveUrl, /^https:\/\//);
    assert.match(p.liveUrl, /business-websites-10/);
    assert.ok(p.title.trim().length >= 4);
    assert.ok(p.category.en.trim().length > 12 && p.category.en.length < 95);
    assert.ok(p.category.ru.trim().length > 8);
    assert.doesNotMatch(p.category.en + p.category.ru, /\bdemo\b|демо|concept/i);
    const art = read('assets/project-art/' + p.art + '.svg');
    assert.match(art, /<svg[^>]*viewBox="0 0 640 360"/);
    assert.match(art, /<\/svg>/);
    assert.doesNotMatch(art, /<script|<foreignObject|onload=|<image\b/i);
  }
});

test('text content and external links are never interpolated as HTML', () => {
  const app = read('js/app.js');
  assert.match(app, /textContent = text/);
  assert.match(app, /rel = 'noopener noreferrer'/);
  assert.match(app, /x\.protocol === 'https:'/);
  assert.match(app, /assetBase \+ 'project-art\//);
  assert.match(app, /aria-label/);
});

test('testimonials, translations and contacts remain configured', () => {
  assert.equal(content.testimonials.length, 10);
  assert.equal(content.projects.length, 10);
  for (const review of content.testimonials) {
    assert.ok(review.text.en && review.text.ru);
    assert.ok(Number(review.rating) >= 1 && Number(review.rating) <= 5);
  }
  assert.ok(content.ui.en && content.ui.ru);
  assert.equal(content.about.skills.en.length, content.about.skills.ru.length);
  assert.match(content.contacts.telegram, /^https:\/\/t\.me\//);
  assert.match(content.contacts.whatsapp, /^https:\/\/wa\.me\/\d+$/);
  assert.match(content.contacts.phone, /^\+\d+$/);
  assert.match(content.contacts.formspreeEndpoint, /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/);
});

test('form uses safe multipart transport and prevents duplicate sends', () => {
  const code = read('js/contact.js');
  assert.match(code, /new FormData\(form\)/);
  assert.doesNotMatch(code, /['"]Content-Type['"]\s*:/);
  assert.match(code, /if \(busy\) return/);
  assert.match(code, /form\.setAttribute\('aria-busy'/);
  assert.match(code, /'Accept': 'application\/json'/);
});

test('loading and motion have responsive and accessible fallbacks', () => {
  const loader = read('js/loader.js');
  assert.match(loader, /delayTimer=setTimeout/);
  assert.match(loader, /window\.addEventListener\("load",finish/);
  assert.match(loader, /setTimeout\(finish,10000\)/);
  assert.match(read('js/motion.js'), /observeMediaQuery/);
  assert.match(read('css/loader.css'), /prefers-reduced-motion:reduce/);
  assert.match(read('css/project-cards.css'), /prefers-reduced-motion:reduce/);
  assert.match(read('css/project-cards.css'), /max-width:560px/);
  assert.match(read('css/loader.css'), /max-width:560px/);
  for (const page of htmlPages) {
    const html = read(page);
    assert.match(html, /<noscript><div class="nojs-gallery"/);
    assert.equal((html.match(/business-websites-10\//g) || []).length, 10);
  }
});

test('CSS is syntactically balanced and illustrations remain lightweight', () => {
  for (const file of cssPaths) {
    const css = read(file);
    const open = (css.match(/\{/g) || []).length;
    const close = (css.match(/\}/g) || []).length;
    assert.equal(open, close, file + ': unbalanced rule brackets');
    assert.ok(css.length > 10);
  }
  const arts = readdirSync(path.join(site, 'assets/project-art'));
  const total = arts.reduce((sum, f) => sum + statSync(path.join(site, 'assets/project-art', f)).size, 0);
  assert.ok(total < 100_000, 'vector illustrations should stay cache-friendly');
});


test('the short root URLs serve the full site without a redirect', () => {
  const rootHome = readFileSync(path.join(root, 'index.html'), 'utf8');
  const rootWorks = readFileSync(path.join(root, 'works.html'), 'utf8');
  const legacyHome = read('index.html');
  const legacyWorks = read('works.html');
  assert.doesNotMatch(rootHome, /http-equiv=["']refresh["']/);
  assert.match(rootHome, /<section class="hero"/);
  assert.match(rootHome, /<div class="rows" id="workRows"/);
  assert.match(rootWorks, /<ul class="grid" id="workGrid"/);
  assert.match(rootHome, /href="\.\/works\.html"/);
  assert.match(rootHome, /href="https:\/\/umar3767\.github\.io\/umar\.lab\/"/);
  assert.match(rootWorks, /href="https:\/\/umar3767\.github\.io\/umar\.lab\/works\.html"/);
  assert.equal((rootHome.match(/business-websites-10\//g) || []).length, 10);
  assert.equal((rootWorks.match(/business-websites-10\//g) || []).length, 10);
  for (const [page, source] of [['index.html', rootHome], ['works.html', rootWorks]]) {
    assert.match(source, /http-equiv="Content-Security-Policy"/);
    assert.match(source, /src="\.\/UMAR_PORTFOLIO_GITHUB_LITE\/js\/app\.js"/);
    assert.match(source, /src="\.\/UMAR_PORTFOLIO_GITHUB_LITE\/js\/loader\.js"/);
    assert.match(source, /href="\.\/UMAR_PORTFOLIO_GITHUB_LITE\/css\/styles\.css"/);
    for (const match of source.matchAll(/(?:src|href)="(\.\/UMAR_PORTFOLIO_GITHUB_LITE\/[^"#?]+\.(?:js|css|png|svg))"/g)) {
      assert.ok(existsSync(path.join(root, match[1])), page + ': missing resource ' + match[1]);
    }
  }
  assert.match(legacyHome, /id="workRows"/);
  assert.match(legacyWorks, /id="workGrid"/);
  assert.match(read('js/app.js'), /new URL\('\.\.\/assets\/', scriptUrl\)/);
});
