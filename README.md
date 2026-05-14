# petelower.com

Personal site for Pete Lower — music, portfolio, and contact. Built with Vue 3 + Vite, deployed to Cloudflare Pages.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 (`<script setup>` SFCs) |
| Bundler | Vite 5 |
| Routing | vue-router 4 (history mode) |
| Styling | Plain CSS, CSS custom properties, scoped component styles |
| Deployment | Cloudflare Pages (auto-deploy on push to `develop`) |

---

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview built output at http://localhost:4173
```

No linter, formatter, or test runner is configured.

---

## Project structure

```
src/
  assets/          # images (Vite-fingerprinted on build)
  components/      # Header, Footer, Navigation, Gravatar, ModeToggle, YouTubeEmbed, …
  data/
    portfolio.js   # portfolio project list (see "Adding content" below)
  pages/           # route-level components: Home, Music, Portfolio, Contact
  router/
    index.js       # route definitions
  main.js          # app entry — installs router, mounts #app
  style.css        # global styles, CSS custom properties, dark/light theme
public/            # static assets served at root (no fingerprinting)
index.html         # Vite entry point
```

---

## Architecture notes

**Routing** — Routes are defined in `src/router/index.js`. History mode means `/music`, `/portfolio`, and `/contact` are real URLs; Cloudflare Pages handles the SPA fallback automatically via `_redirects`.

**Theming** — `ModeToggle.vue` toggles a `dark` class on `<body>`. All theme variants are in `src/style.css` using `body.dark` / `body:not(.dark)`. No reactive store — keep it DOM-based.

**Layout** — `App.vue` renders `<Header />` + `<router-view />` + `<Footer />`. Header composes `Gravatar`, `Navigation`, and `ModeToggle`.

---

## Adding content

### Add a portfolio project

Open `src/data/portfolio.js` and append to `projects`:

```js
{
  title: 'My Project',
  category: 'WordPress Plugins',   // must match a value in categoryOrder
  description: 'Short description.',
  url: 'https://example.com',       // optional
  repo: 'https://github.com/…',    // optional
  thumbnail: '/images/thumb.png',  // optional, place file in public/images/
}
```

To add a new category, also push its name onto `categoryOrder`.

### Add a YouTube video to the Music page

In `src/pages/Music.vue`, inside the relevant `<section class="band">`:

```html
<YouTubeEmbed video-id="dQw4w9WgXcQ" title="Band Name — Song Title" />
```

---

## Contact form

The contact form (`/contact`) uses [Web3Forms](https://web3forms.com) — no backend required.

### Setup

1. Go to <https://web3forms.com> and enter your email to get a free access key.
2. Set the key as an environment variable:
   - **Local:** create `.env.local` at the project root: `VITE_WEB3FORMS_KEY=your_key_here`
   - **Cloudflare Pages:** add `VITE_WEB3FORMS_KEY` in the Pages dashboard under Settings → Environment variables.

`.env.local` is gitignored — never commit the key.

---

## Deployment

The site auto-deploys to Cloudflare Pages when changes are merged or pushed to `develop`.

### Cloudflare Pages settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |
| Environment variable | `VITE_WEB3FORMS_KEY` = your key |

A `public/_redirects` file ensures SPA deep-link routing works:

```
/*  /index.html  200
```

### Branch workflow

```
feature/your-branch  →  develop  →  main
                           ↓
                    Cloudflare Pages auto-deploy
```

- `develop` — staging / production auto-deploy branch
- `main` — stable release branch (PRs merged here after review)
- Feature branches off `develop`, merged back via PR

### Manual local build

```bash
npm run build
git add -f dist   # dist/ is gitignored but tracked; force-add after build
git commit -m "chore: rebuild dist"
git push
```

This is only needed for hosts that can't run Node. Cloudflare Pages builds automatically.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Yes (contact form) | Web3Forms access key |

---

## Author

Pete Lower — [petelower.com](https://petelower.com) · [github.com/9ete](https://github.com/9ete)
