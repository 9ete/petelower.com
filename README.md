# petelower.com

Personal site for Pete Lower — music, portfolio, and contact. Built with Astro 5 + React, deployed to Cloudflare Pages.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Astro 5 (SSG) |
| React integration | `@astrojs/react` (islands only) |
| Sitemap | `@astrojs/sitemap` |
| Styling | Plain CSS, CSS custom properties |
| Contact form | Web3Forms |
| Deployment | Cloudflare Pages (git integration) |

---

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview built output
```

Create `.env.local` at the repo root for local secrets:

```
VITE_WEB3FORMS_KEY=your_key_here
```

`.env.local` is gitignored.

---

## Project structure

```
src/
  assets/          # images processed by Astro (WebP conversion etc.)
  components/      # Astro and React components
  data/
    music.ts       # band data — add YouTube IDs and info here
    portfolio.ts   # project list — add projects here
  layouts/
    Base.astro     # shared <html>, <head>, Header, Footer
  pages/           # index.astro, music.astro, portfolio.astro, contact.astro
  styles/
    global.css     # design tokens, dark/light theme, base styles
public/
  robots.txt
```

---

## Adding content

### Add a portfolio project

Open `src/data/portfolio.ts`, append to `projects`:

```ts
{
  title: 'My Plugin',
  category: 'WordPress Plugins',
  description: 'What it does.',
  url: 'https://example.com',       // optional
  repo: 'https://github.com/…',    // optional
  thumbnail: '/images/thumb.png',  // optional — place in public/images/
}
```

To add a new category, add to `categoryOrder` and use the new string as `category`.

### Add a YouTube video

In `src/data/music.ts`, add the video ID to `youtubeIds` for the band:

```ts
youtubeIds: ['dQw4w9WgXcQ'],
```

---

## Contact form setup

1. Go to [web3forms.com](https://web3forms.com), enter your email, verify it, copy the access key.
2. **Local:** add to `.env.local`: `VITE_WEB3FORMS_KEY=your_key`
3. **Cloudflare Pages:** Settings → Environment variables → `VITE_WEB3FORMS_KEY`

---

## Deployment

Auto-deploys via Cloudflare Pages git integration — no manual steps after setup.

| Branch | Target |
|---|---|
| `main` | Production — petelower.com |
| `develop` | Preview URL |

### Cloudflare Pages settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `VITE_WEB3FORMS_KEY` |

### Branch workflow

```
feature/branch → develop (preview) → main (production)
```

---

## Author

Pete Lower · [petelower.com](https://petelower.com) · [github.com/9ete](https://github.com/9ete)
