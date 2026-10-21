# Umar.lab

A lightweight, bilingual (English / Russian) portfolio published with GitHub Pages. No build step, database, API keys, or client-side framework is required for the public website.

**Public website:** https://umar3767.github.io/umar.lab/

## How it works

- Root `index.html` serves the entire homepage at `/umar.lab/` without redirecting to a long folder path.
- `UMAR_PORTFOLIO_GITHUB_LITE/content.js` remains the **single source of truth** for projects, reviews, contact links, text and translations. Both short and legacy URLs load it.
- Root `works.html` serves the full gallery at `/umar.lab/works.html`. Older pages inside `UMAR_PORTFOLIO_GITHUB_LITE/` remain reachable for backward compatibility.
- `css/` contains scoped design layers, including the shared loading screen and project cards.
- `js/` handles text-only DOM rendering, motion, loading state and the Formspree contact form. Assets are resolved relative to `app.js` so both short and legacy routes work.
- `assets/` includes locally hosted vector illustrations, icons and fonts. No third-party UI libraries are needed.

## Editing from a phone

Open `UMAR_PORTFOLIO_GITHUB_LITE/content.js` on GitHub, choose **Edit**, make the change, and commit to `main`. Wait for GitHub Pages to finish publishing. Never add passwords, access tokens or private keys to this file: everything in it is public.

When adding a project, provide a valid HTTPS URL. Art assets belong in `assets/project-art/`, and the matching `art` value points to its filename without `.svg`.

## Automated tests

Fast, dependency-free checks run on every push:

```sh
node --test tests/site-audit.mjs
```

For real desktop/mobile tests, open **GitHub → Actions → Browser compatibility matrix → Run workflow**. It uses Chromium, Firefox and WebKit, including mobile device profiles. These tests exercise navigation, images, language switching, Formspree request interception and reduced motion without actually submitting messages to Formspree. The browser suite can also be run locally with Playwright installed.

The browser workflow is deliberately manual for regular edits: installing three browser engines on every content change would consume unnecessary CI minutes.

## Security and operational limits

- The portfolio is **static** and stores no visitors' login details, private data or server-side credentials.
- Both public HTML pages use a restrictive **Content Security Policy** (CSP) meta tag, same-origin scripts/styles, HTTPS-only project links and safe text-based DOM rendering.
- External links use `noopener noreferrer`; contact form input is validated before submission and is sent over HTTPS to Formspree using `FormData`.
- Formspree's public form ID is **not a secret**. Configure spam filtering / domain settings in Formspree itself. Front-end validation alone cannot stop automated submissions.
- GitHub Pages does not offer editable response headers in this repository. A meta CSP cannot enforce headers such as `frame-ancestors`, HSTS, or a server-side rate limit; those require a host/proxy that controls HTTP headers.
- Do not store API secrets in source code. Protect the GitHub account with 2FA and use least-privilege collaborators.
- Updating content or a branch does not guarantee a particular browser/device will never have an issue. Check GitHub Actions before sharing major updates.

## Maintenance

Keep the existing font license files when adding/removing fonts. Preserve the ten portfolio destination URLs and the translated texts unless intentionally editing them. The reduced-motion, keyboard, no-JavaScript and narrow-screen behavior are part of the product and should remain covered by future changes.
