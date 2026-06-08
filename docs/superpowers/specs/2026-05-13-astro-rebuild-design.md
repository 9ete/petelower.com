# Design spec: Astro 5 rebuild of petelower.com

**Date:** 2026-05-13  
**Branch:** `feature/astro-rebuild` off `develop`  
**Status:** Approved

---

## Overview

Replace the current Vue 3 + Vite SPA with Astro 5 + React. The site is a personal portfolio/music page for Pete Lower. Migration goals: proper SSG, zero-JS static pages, full per-page SEO, Cloudflare Pages auto-deploy from git (no committed `dist/`), and a clean content structure for music and portfolio.

---

## Architecture

### Stack

| Layer | Tool |
|---|---|
| Framework | Astro 5 |
| React integration | `@astrojs/react` (islands only) |
| Sitemap | `@astrojs/sitemap` |
| Styling | Plain CSS, CSS custom properties |
| Contact form | Web3Forms via React island |
| Deployment | Cloudflare Pages (git integration) |

### Islands

Only two components ship client-side JavaScript:

| Component | Directive | Reason |
|---|---|---|
| `ModeToggle.tsx` | `client:load` | Needs DOM + localStorage |
| `ContactForm.tsx` | `client:load` | Form state and fetch |

Everything else — layouts, navigation, YouTube embeds, cards — is static `.astro`.

---

## File structure

```
src/
  components/
    Header.astro
    Footer.astro
    Navigation.astro
    YouTubeEmbed.astro     # renders <lite-youtube> custom element
    ModeToggle.tsx         # React island
    ContactForm.tsx        # React island (ported from Vue version)
  data/
    portfolio.ts           # typed array: { title, category, description, url?, repo?, thumbnail? }
    music.ts               # band data: { name, status, description, url?, socials, youtubeIds }
  layouts/
    Base.astro             # <html>, <head> with SEO props, Header, Footer
  pages/
    index.astro
    music.astro
    portfolio.astro
    contact.astro
  styles/
    global.css
public/
  robots.txt
  seattle_skyline.jpeg    # background image — optimized via getImage() in Base.astro
```

---

## Pages

### Home (`/`)

- Animated "Hello *World*…" greeting (CSS ellipsis animation, same as current)
- `<h2>I'm Pete</h2>`
- Bio paragraph: *"I make music and build websites out of Seattle. Currently playing in Kadillac Black. By day I build PHP applications — WordPress, Laravel, REST APIs, and whatever else needs to get done."*
- Nav links to Music and Portfolio inline or via header

### Music (`/music`)

Intro line: *"Two projects, different eras."*

**Kadillac Black** (active)
- Description: *"Rock band based in Seattle. Originals, live shows, ongoing. Check the site for shows and releases."*
- Link: kadillacblack.com
- `<YouTubeEmbed>` slots — `videoId` props left as `TODO` comments

**Item9 and the Mad Hatters** (former)
- Description: *"A project from before Seattle. We broke up but the recordings are still up on SoundCloud."*
- Link: soundcloud.com/item9andthemadhatters
- `<YouTubeEmbed>` slots — `videoId` props left as `TODO` comments

`YouTubeEmbed.astro` uses `<lite-youtube>` (npm: `lite-youtube-embed`) — no iframe loads until user clicks, zero layout shift.

### Portfolio (`/portfolio`)

Intro: *"A mix of client work, open source plugins, and things I built because I wanted to."*

Data lives in `src/data/portfolio.ts`. Shape:

```ts
interface Project {
  title: string
  category: 'WordPress Plugins' | 'Client Sites' | 'Open Source' | 'Experiments'
  description: string
  url?: string
  repo?: string
  thumbnail?: string
}
```

Seeded entries:
- `petelower.com` → Experiments → *"This site. Started in Vue 3 + Vite, rebuilt in Astro. Deployed on Cloudflare Pages."*

Category stubs for WordPress Plugins, Client Sites, Open Source are present but empty — ready to populate.

Card grid: same auto-fill responsive layout as current Vue version.

### Contact (`/contact`)

Intro: *"Whether it's about a project, a show, or something else — drop me a line."*

`<ContactForm client:load />` — React island, ported from the Vue version already in `develop`. Uses Web3Forms API, `VITE_WEB3FORMS_KEY` env var, idle/sending/success/error states.

---

## SEO

### Per-page `<head>` (via `Base.astro` props)

| Page | `<title>` | `<meta name="description">` |
|---|---|---|
| Home | Pete Lower | Musician and web developer based in the Pacific Northwest |
| Music | Music — Pete Lower | Kadillac Black and Item9 and the Mad Hatters — original music from Seattle |
| Portfolio | Portfolio — Pete Lower | WordPress plugins, Laravel applications, and client sites |
| Contact | Contact — Pete Lower | Get in touch with Pete Lower |

### Additional tags (all pages)

- `og:title`, `og:description`, `og:url`, `og:image` (Seattle skyline as default OG image)
- `<link rel="canonical" href={canonicalURL} />`
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- `<meta charset="UTF-8" />`

### Generated files

- `sitemap.xml` — via `@astrojs/sitemap`, auto-generated on build, referenced in `robots.txt`
- `robots.txt` — allows all, points to sitemap

---

## Theming

Same dark/light approach as current site:

- CSS custom properties on `:root` for colors, backgrounds
- `ModeToggle.tsx` toggles `dark` class on `<html>` (Astro uses `<html>`, not `<body>`)
- Preference persisted to `localStorage`, applied before first paint via inline `<script>` in `Base.astro` to prevent flash
- Global CSS selects on `html.dark` / `html:not(.dark)`
- Seattle skyline background: `getImage()` from `astro:assets` in `Base.astro` generates an optimized WebP URL, injected as `--bg-image` CSS custom property on `<html>` via a `style` attribute — CSS then uses `background-image: var(--bg-image)`

---

## Performance

- SSG: every page is static HTML at build time — no runtime framework on page load
- `getImage()` from `astro:assets`: Seattle skyline auto-converts to WebP at build time, URL injected as CSS custom property — no layout shift since it's a background
- `lite-youtube-embed`: YouTube iframes only load on user interaction — zero embed weight on initial load
- Only two React islands ship JS; all other components are zero-JS
- Cloudflare Pages CDN edge delivery

---

## Deployment

### Branch model

| Branch | Cloudflare target |
|---|---|
| `main` | Production — `petelower.com` |
| `develop` | Preview — auto-generated CF Pages URL |

### Cloudflare Pages settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Environment variable | `VITE_WEB3FORMS_KEY` |

### What changes from current setup

- `dist/` is **no longer committed to git** — Cloudflare builds from source
- No GitHub Actions workflow needed — CF Pages git integration handles CI/CD
- `_redirects` catch-all from the Vue SPA is **removed** — Astro SSG generates a real HTML file per route, so `/music`, `/portfolio`, `/contact` all resolve natively on Cloudflare Pages without any rewrite rules

---

## Local dev commands

```bash
npm install
npm run dev        # Astro dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview built output at http://localhost:4321
```

---

## Out of scope

- Blog / CMS
- Analytics
- Authentication
- Backend / database
- i18n
