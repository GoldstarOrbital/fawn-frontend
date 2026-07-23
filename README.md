# FAWN Frontend

Custodial USDC payments + investing web app for college students. This is the
**live, shipped frontend**: a single-file vanilla-JavaScript PWA with no build
step, no framework, and no bundler.

## What this actually is

- **`index.html`** — the entire app: markup, CSS (custom-property design
  tokens, dark/light/forest/auto themes), and all JavaScript. It talks
  directly to the FAWN backend (FastAPI on Railway) at
  `https://web-production-13d5b.up.railway.app`.
- **`manifest.json` + `sw.js` + `icon-192.png` / `icon-512.png`** — PWA
  install support (installable on iOS/Android/desktop).
- **`assets/`** — brand mascot art (Penny the fawn, Buck the dollar) shared
  with the marketing site.
- **`funding-guide.html`**, **`landing.html`**, **`admin-revenue.html`** —
  standalone auxiliary pages.

There is **no** React, TypeScript, Vite, Tailwind, Redux, Zustand, or Sentry
here, and no `npm install` is needed. `package.json` exists only to mark the
directory private for tooling; it declares no dependencies.

## Running locally

Serve the directory with any static file server (a plain `file://` open works
for most of the app too):

```bash
python -m http.server 8080
# then open http://localhost:8080
```

The app points at the production backend by default — change the `API`
constant at the top of the main `<script>` block in `index.html` to target a
local backend.

## Architecture notes

- **Auth**: JWT from `POST /auth/login` / `/auth/register`, stored in
  `localStorage` (`fawn_token`), sent as a Bearer header by the `authGet` /
  `authPost` helpers.
- **Custody**: FAWN wallets are custodial — the backend creates the wallet,
  holds the encrypted key, and signs sends. The UI never handles private
  keys for custodial wallets.
- **Feature gating**: features whose backends are not fully live (token
  swaps, automations) are explicitly gated as "coming soon" in the UI rather
  than simulated. Do not add UI that fakes a money movement.
- **QR codes**: generated fully client-side by a vendored copy of
  `qrcode-generator` (MIT) — wallet addresses never leave the browser.
- **Third-party SDKs** (loaded from CDNs at runtime): MoonPay (buy-crypto
  on-ramp), Plaid Link (bank account linking), Ramp/Transak (present but
  MoonPay is the production buy path).

## Conventions

- Design tokens live in `:root` (`--green`, `--surface`, `--fs-*` type
  scale, etc.). Prefer tokens + classes over new inline one-off styles.
- All user-visible strings must describe what the product actually does
  today — `KEY_MESSAGING_REFERENCE.md` is the source of truth for taglines
  and claims.
- Toasts: `toast(msg)` or `toast(msg, { type: 'success' | 'error' | 'info' })`.
