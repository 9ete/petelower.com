# Astro 5 Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vue 3 + Vite SPA with an Astro 5 + React static site, with full SEO, optimized assets, and Cloudflare Pages auto-deploy from git.

**Architecture:** Astro 5 SSG — all pages are static `.astro` components, only `ModeToggle.tsx` and `ContactForm.tsx` are React islands (`client:load`). `Base.astro` layout owns `<head>` SEO, flash-prevention dark mode script, and background image optimization via `getImage()`.

**Tech Stack:** Astro 5, `@astrojs/react`, `@astrojs/sitemap`, React 18, `lite-youtube-embed`, Web3Forms (contact form), Cloudflare Pages

**Working directory:** `/Users/9ete/Sites/petelower.com` (main repo, `develop` branch — branch from here)

---

## Task 1: Create branch and remove Vue scaffolding

**Files:**
- Delete: `index.html`, `vite.config.js`, `src/App.vue`, `src/main.js`, `src/style.css`, `src/router/index.js`, `src/pages/Home.vue`, `src/pages/Music.vue`, `src/pages/Portfolio.vue`, `src/pages/Contact.vue`, `src/components/CoinSpinner.vue`, `src/components/Email.vue`, `src/components/Footer.vue`, `src/components/Gravatar.vue`, `src/components/Header.vue`, `src/components/HelloWorld.vue`, `src/components/ModeToggle.vue`, `src/components/Navigation.vue`, `src/components/YouTubeEmbed.vue`, `src/data/portfolio.js`, `src/assets/vue.svg`, `public/vite.svg`, `public/_redirects`
- Untrack: `dist/` (stop committing it — Cloudflare builds from source)
- Keep: `src/assets/seattle_skyline.jpeg`, `src/assets/pacificnorthwest.png`, `public/pacificnorthwest.png`, `docs/`, `README.md`, `CLAUDE.md`, `.gitignore`, `.github/`

- [ ] **Step 1: Create and switch to the feature branch**

```bash
cd /Users/9ete/Sites/petelower.com
git checkout -b feature/astro-rebuild develop
```

Expected: `Switched to a new branch 'feature/astro-rebuild'`

- [ ] **Step 2: Remove Vue-specific files**

```bash
git rm index.html vite.config.js src/App.vue src/main.js src/style.css
git rm src/router/index.js
git rm src/pages/Home.vue src/pages/Music.vue src/pages/Portfolio.vue src/pages/Contact.vue
git rm src/components/CoinSpinner.vue src/components/Email.vue src/components/Footer.vue
git rm src/components/Gravatar.vue src/components/Header.vue src/components/HelloWorld.vue
git rm src/components/ModeToggle.vue src/components/Navigation.vue src/components/YouTubeEmbed.vue
git rm src/data/portfolio.js
git rm src/assets/vue.svg
git rm public/vite.svg public/_redirects
```

- [ ] **Step 3: Untrack the committed dist/ directory**

```bash
git rm -r --cached dist/
```

Expected output includes multiple `rm 'dist/...'` lines.

- [ ] **Step 4: Commit the cleanup**

```bash
git commit -m "chore: remove Vue scaffolding and untrack dist"
```

---

## Task 2: Scaffold Astro 5 project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`

- [ ] **Step 1: Replace package.json**

Write `/Users/9ete/Sites/petelower.com/package.json`:

```json
{
  "name": "petelower.com",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "astro": "^5.0.0",
    "lite-youtube-embed": "^0.3.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1"
  }
}
```

- [ ] **Step 2: Create astro.config.mjs**

Write `/Users/9ete/Sites/petelower.com/astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://petelower.com',
  integrations: [react(), sitemap()],
})
```

- [ ] **Step 3: Create tsconfig.json**

Write `/Users/9ete/Sites/petelower.com/tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

- [ ] **Step 4: Create src/env.d.ts**

Write `/Users/9ete/Sites/petelower.com/src/env.d.ts`:

```ts
/// <reference path="../.astro/types.d.ts" />
```

- [ ] **Step 5: Install dependencies**

```bash
cd /Users/9ete/Sites/petelower.com && npm install
```

Expected: clean install, no peer dep errors.

- [ ] **Step 6: Verify Astro can start**

```bash
npm run build 2>&1 | head -20
```

Expected: Astro will error that it can't find pages — that's fine, scaffold is in place.

- [ ] **Step 7: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts
git commit -m "feat: scaffold Astro 5 project with React and sitemap integrations"
```

---

## Task 3: Global CSS

**Files:**
- Create: `src/styles/global.css`

The dark/light theme now uses `html.dark` (not `body.dark` as in the Vue version). `--bg-image` is set inline on `<html>` by `Base.astro` via `getImage()`.

- [ ] **Step 1: Create src/styles/global.css**

Write `/Users/9ete/Sites/petelower.com/src/styles/global.css`:

```css
:root {
  --bg-light: rgba(245, 255, 250, 0.925);
  --bg-light-from: rgba(245, 255, 250, 1);
  --bg-dark: rgba(26, 26, 26, 0.925);
  --bg-dark-from: rgba(26, 26, 26, 1);
  --color-light: #213547;
  --color-dark: #f9f9f9;
  --link-color: #646cff;
  --link-hover: #535bf2;
  --link-hover-light: #747bff;
  --button-bg-dark: #1a1a1a;
  --button-bg-light: #f9f9f9;
}

html {
  font-family: monospace, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  background: var(--bg-image, none) center / cover no-repeat fixed;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html:not(.dark) {
  background-color: var(--bg-light);
  color: var(--color-light);
  animation: backgroundFadeOutLight 5s;
}

html.dark {
  background-color: var(--bg-dark);
  color: var(--color-dark);
  animation: backgroundFadeOutDark 5s;
}

@keyframes backgroundFadeOutLight {
  from { background-color: var(--bg-light-from); }
  to { background-color: var(--bg-light); }
}

@keyframes backgroundFadeOutDark {
  from { background-color: var(--bg-dark-from); }
  to { background-color: var(--bg-dark); }
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#page {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1rem 2rem;
  text-align: center;
}

@media (min-width: 640px) {
  #page {
    padding: 2rem;
  }
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

a {
  font-weight: 500;
  color: var(--link-color);
  text-decoration: inherit;
}

a:hover {
  color: var(--link-hover);
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--button-bg-dark);
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: var(--link-color);
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

button.mode-toggle {
  background: none;
  border: none;
  outline: none;
  padding: 8px;
  cursor: pointer;
}

button.mode-toggle svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  display: block;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
  gap: 0.75rem;
  z-index: 10;
}

footer {
  position: fixed;
  bottom: 0;
  right: 2.5rem;
  font-size: 0.9rem;
  padding: 0.5rem 0;
}

footer a {
  color: inherit;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

@media (min-width: 640px) {
  header {
    padding: 0 1rem;
    gap: 1rem;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    color: var(--color-light);
  }
  a:hover {
    color: var(--link-hover-light);
  }
  button {
    background-color: var(--button-bg-light);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with dark/light theme using html.dark"
```

---

## Task 4: Base layout

**Files:**
- Create: `src/layouts/Base.astro`
- Uses: `src/assets/seattle_skyline.jpeg` (already in repo)

The layout injects the WebP-optimized background as `--bg-image`, runs the flash-prevention theme script before first paint, and accepts per-page SEO props.

- [ ] **Step 1: Create src/layouts/Base.astro**

Write `/Users/9ete/Sites/petelower.com/src/layouts/Base.astro`:

```astro
---
import { getImage } from 'astro:assets'
import skylineJpeg from '../assets/seattle_skyline.jpeg'
import '../styles/global.css'

interface Props {
  title: string
  description: string
  ogImage?: string
}

const { title, description, ogImage = '/seattle_skyline.jpeg' } = Astro.props

const skyline = await getImage({ src: skylineJpeg, format: 'webp' })
const canonicalURL = new URL(Astro.url.pathname, Astro.site)
---

<html lang="en" style={`--bg-image: url('${skyline.src}')`}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:image" content={new URL(ogImage, Astro.site)} />
    <meta property="og:type" content="website" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <script is:inline>
      (function () {
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = stored ?? (prefersDark ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', theme === 'dark')
      })()
    </script>
  </head>
  <body>
    <slot name="header" />
    <div id="page">
      <slot />
    </div>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 2: Verify build compiles**

```bash
cd /Users/9ete/Sites/petelower.com && npm run build 2>&1 | tail -20
```

Expected: build may warn about missing pages dir — that's fine. No TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add Base.astro layout with SEO, OG tags, and flash-free dark mode"
```

---

## Task 5: Static components — Gravatar, Navigation, Header, Footer

**Files:**
- Create: `src/components/Gravatar.astro`, `src/components/Navigation.astro`, `src/components/Header.astro`, `src/components/Footer.astro`

The Gravatar hash is hardcoded (already known from the Vue component). Footer assembles the email link client-side to avoid static scrapers.

- [ ] **Step 1: Create src/components/Gravatar.astro**

Write `/Users/9ete/Sites/petelower.com/src/components/Gravatar.astro`:

```astro
---
const hash = '74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db'
const src = `https://www.gravatar.com/avatar/${hash}?s=100&d=identicon`
---

<div class="gravatar">
  <img src={src} alt="Pete Lower" width="100" height="100" loading="eager" />
</div>

<style>
.gravatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid whitesmoke;
  box-shadow: 0 0 10px black;
  overflow: hidden;
  flex-shrink: 0;
}
.gravatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
@media (min-width: 640px) {
  .gravatar {
    width: 100px;
    height: 100px;
  }
}
</style>
```

- [ ] **Step 2: Create src/components/Navigation.astro**

Write `/Users/9ete/Sites/petelower.com/src/components/Navigation.astro`:

```astro
---
const links = [
  { href: '/music', label: 'Music' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
  { href: 'https://github.com/9ete', label: 'Code', external: true },
  { href: 'https://www.linkedin.com/in/pete-l-39448a42', label: 'LinkedIn', external: true },
]

const currentPath = Astro.url.pathname
---

<nav class="site-nav">
  {links.map(({ href, label, external }) =>
    external ? (
      <a href={href} target="_blank" rel="noopener">{label}</a>
    ) : (
      <a href={href} class={currentPath === href || currentPath.startsWith(href + '/') ? 'active' : ''}>{label}</a>
    )
  )}
</nav>

<style>
.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.95rem;
}
.site-nav a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
}
.site-nav a:hover {
  text-decoration: underline;
}
.site-nav a.active {
  font-weight: 700;
  text-decoration: underline;
}
@media (min-width: 640px) {
  .site-nav {
    gap: 1rem;
    font-size: 1rem;
  }
}
</style>
```

- [ ] **Step 3: Create src/components/Header.astro**

Write `/Users/9ete/Sites/petelower.com/src/components/Header.astro`:

```astro
---
import Gravatar from './Gravatar.astro'
import Navigation from './Navigation.astro'
import ModeToggle from './ModeToggle.tsx'
---

<header>
  <Gravatar />
  <Navigation />
  <ModeToggle client:load />
</header>
```

- [ ] **Step 4: Create src/components/Footer.astro**

Write `/Users/9ete/Sites/petelower.com/src/components/Footer.astro`:

```astro
---
---

<footer>
  <div>Email Me: <span id="footer-email"></span></div>
</footer>

<script>
  const u = 'pete'
  const d = 'petelower.com'
  const el = document.getElementById('footer-email')
  if (el) {
    const a = document.createElement('a')
    a.href = `mailto:${u}@${d}`
    a.textContent = `${u} [at] ${d}`
    el.appendChild(a)
  }
</script>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Gravatar.astro src/components/Navigation.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: add static Astro components: Gravatar, Navigation, Header, Footer"
```

---

## Task 6: ModeToggle React island

**Files:**
- Create: `src/components/ModeToggle.tsx`

Toggles `dark` class on `document.documentElement` (i.e. `<html>`), persists to `localStorage`. Reuses the sun/moon SVGs from the Vue version.

- [ ] **Step 1: Create src/components/ModeToggle.tsx**

Write `/Users/9ete/Sites/petelower.com/src/components/ModeToggle.tsx`:

```tsx
import { useState, useEffect } from 'react'

export default function ModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button className="mode-toggle" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z M256,336c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z M256,112c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z M256,400c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z M380.438,154.167l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625S374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.375,0-22.625L380.459,357.812z" />
        </svg>
      ) : (
        <svg viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z" />
        </svg>
      )}
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ModeToggle.tsx
git commit -m "feat: add ModeToggle React island with localStorage persistence"
```

---

## Task 7: Data files

**Files:**
- Create: `src/data/music.ts`, `src/data/portfolio.ts`

- [ ] **Step 1: Create src/data/music.ts**

Write `/Users/9ete/Sites/petelower.com/src/data/music.ts`:

```ts
export interface Band {
  name: string
  status: 'active' | 'former'
  description: string
  url?: string
  socials?: { label: string; href: string }[]
  youtubeIds: string[]
}

export const bands: Band[] = [
  {
    name: 'Kadillac Black',
    status: 'active',
    description: 'Rock band based in Seattle. Originals, live shows, ongoing. Check the site for shows and releases.',
    url: 'https://kadillacblack.com',
    socials: [],
    youtubeIds: [
      // TODO: add YouTube video IDs, e.g. 'dQw4w9WgXcQ'
    ],
  },
  {
    name: 'Item9 and the Mad Hatters',
    status: 'former',
    description: 'A project from before Seattle. We broke up but the recordings are still up on SoundCloud.',
    socials: [
      { label: 'SoundCloud', href: 'https://soundcloud.com/item9andthemadhatters' },
    ],
    youtubeIds: [
      // TODO: add YouTube video IDs
    ],
  },
]
```

- [ ] **Step 2: Create src/data/portfolio.ts**

Write `/Users/9ete/Sites/petelower.com/src/data/portfolio.ts`:

```ts
export type Category = 'WordPress Plugins' | 'Client Sites' | 'Open Source' | 'Experiments'

export interface Project {
  title: string
  category: Category
  description: string
  url?: string
  repo?: string
  thumbnail?: string
}

export const categoryOrder: Category[] = [
  'WordPress Plugins',
  'Client Sites',
  'Open Source',
  'Experiments',
]

export const projects: Project[] = [
  {
    title: 'petelower.com',
    category: 'Experiments',
    description: 'This site. Started in Vue 3 + Vite, rebuilt in Astro. Deployed on Cloudflare Pages.',
    url: 'https://petelower.com',
    repo: 'https://github.com/9ete/petelower.com',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/music.ts src/data/portfolio.ts
git commit -m "feat: add typed data files for music and portfolio"
```

---

## Task 8: Home page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create src/pages/index.astro**

Write `/Users/9ete/Sites/petelower.com/src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
---

<Base
  title="Pete Lower"
  description="Musician and web developer based in the Pacific Northwest."
>
  <Header slot="header" />
  <h1 class="loading-dots-after">Hello <em>World</em></h1>
  <h2 class="sub">I'm Pete</h2>
  <p class="bio">
    I make music and build websites out of Seattle. Currently playing in{' '}
    <a href="https://kadillacblack.com" target="_blank" rel="noopener">Kadillac Black</a>.
    By day I build PHP applications &mdash; WordPress, Laravel, REST APIs, and whatever else
    needs to get done.
  </p>
  <Footer slot="footer" />
</Base>

<style>
.loading-dots-after {
  width: 380px;
  text-align: left;
  margin: 0 auto 0.5rem;
}
.loading-dots-after::after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  animation: ellipsis steps(4, end) 2400ms infinite;
  content: '\2026';
  width: 0px;
}
@keyframes ellipsis {
  to { width: 40px; }
}
.sub {
  text-align: right;
  margin: 0 0 1.5rem;
}
.bio {
  max-width: 520px;
  margin: 0 auto;
  text-align: left;
  font-size: 1.05rem;
  line-height: 1.6;
}
</style>
```

- [ ] **Step 2: Build and verify**

```bash
cd /Users/9ete/Sites/petelower.com && npm run build 2>&1 | tail -20
```

Expected: `✓ built in ...ms` with no errors. The dist/ now contains `index.html`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Home page with animated greeting and bio"
```

---

## Task 9: YouTubeEmbed component

**Files:**
- Create: `src/components/YouTubeEmbed.astro`
- Modify: `src/styles/global.css` (add lite-youtube CSS import)

- [ ] **Step 1: Add lite-youtube CSS to global.css**

Open `src/styles/global.css` and add this line at the very top (before any other rules):

```css
@import 'lite-youtube-embed/src/lite-yt-embed.css';
```

- [ ] **Step 2: Create src/components/YouTubeEmbed.astro**

Write `/Users/9ete/Sites/petelower.com/src/components/YouTubeEmbed.astro`:

```astro
---
interface Props {
  videoId: string
  title: string
}
const { videoId, title } = Astro.props
---

<lite-youtube videoid={videoId} title={title} class="yt-embed"></lite-youtube>

<script>
  import 'lite-youtube-embed'
</script>

<style>
.yt-embed {
  display: block;
  width: 100%;
  max-width: 560px;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build 2>&1 | tail -20
```

Expected: clean build. No errors about `lite-youtube-embed`.

- [ ] **Step 4: Commit**

```bash
git add src/components/YouTubeEmbed.astro src/styles/global.css
git commit -m "feat: add YouTubeEmbed component using lite-youtube-embed"
```

---

## Task 10: Music page

**Files:**
- Create: `src/pages/music.astro`

- [ ] **Step 1: Create src/pages/music.astro**

Write `/Users/9ete/Sites/petelower.com/src/pages/music.astro`:

```astro
---
import Base from '../layouts/Base.astro'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import YouTubeEmbed from '../components/YouTubeEmbed.astro'
import { bands } from '../data/music'
---

<Base
  title="Music — Pete Lower"
  description="Kadillac Black and Item9 and the Mad Hatters — original music from Seattle."
>
  <Header slot="header" />
  <main class="music">
    <h1>Music</h1>
    <p class="intro">Two projects, different eras.</p>

    {bands.map((band) => (
      <section class="band">
        <h2>
          {band.url
            ? <a href={band.url} target="_blank" rel="noopener">{band.name}</a>
            : band.name}
          {band.status === 'former' && <span class="tag">former</span>}
        </h2>
        <p>{band.description}</p>
        {band.socials && band.socials.length > 0 && (
          <p class="socials">
            {band.socials.map((s) => (
              <a href={s.href} target="_blank" rel="noopener">{s.label}</a>
            ))}
          </p>
        )}
        {band.youtubeIds.map((id) => (
          <YouTubeEmbed videoId={id} title={`${band.name} video`} />
        ))}
      </section>
    ))}
  </main>
  <Footer slot="footer" />
</Base>

<style>
.music {
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.music h1 {
  margin-bottom: 0.5rem;
}
.intro {
  margin: 0 0 2.5rem;
  opacity: 0.7;
  font-size: 0.95rem;
}
.band {
  margin-bottom: 3rem;
}
.band h2 {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.band p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}
.socials {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.tag {
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.55;
  border: 1px solid currentColor;
  padding: 0.1em 0.4em;
  border-radius: 3px;
  vertical-align: middle;
}
</style>
```

- [ ] **Step 2: Build and verify**

```bash
npm run build 2>&1 | tail -20
```

Expected: clean build. `dist/music/index.html` is generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/music.astro
git commit -m "feat: add Music page with Kadillac Black and Item9 sections"
```

---

## Task 11: Portfolio page

**Files:**
- Create: `src/pages/portfolio.astro`

- [ ] **Step 1: Create src/pages/portfolio.astro**

Write `/Users/9ete/Sites/petelower.com/src/pages/portfolio.astro`:

```astro
---
import Base from '../layouts/Base.astro'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import { projects, categoryOrder, type Project } from '../data/portfolio'

const grouped = (() => {
  const map = new Map<string, Project[]>(categoryOrder.map((c) => [c, []]))
  const other: Project[] = []
  for (const p of projects) {
    if (map.has(p.category)) {
      map.get(p.category)!.push(p)
    } else {
      other.push(p)
    }
  }
  const result: { category: string; items: Project[] }[] = []
  for (const c of categoryOrder) {
    const items = map.get(c)!
    if (items.length) result.push({ category: c, items })
  }
  if (other.length) result.push({ category: 'Other', items: other })
  return result
})()
---

<Base
  title="Portfolio — Pete Lower"
  description="WordPress plugins, Laravel applications, and client sites."
>
  <Header slot="header" />
  <main class="portfolio">
    <h1>Portfolio</h1>
    <p class="intro">A mix of client work, open source plugins, and things I built because I wanted to.</p>

    {grouped.map(({ category, items }) => (
      <section class="category">
        <h2>{category}</h2>
        <ul class="cards">
          {items.map((p) => (
            <li class="card">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} class="thumb" width="400" height="225" loading="lazy" />}
              <h3>
                {p.url
                  ? <a href={p.url} target="_blank" rel="noopener">{p.title}</a>
                  : p.title}
              </h3>
              <p>{p.description}</p>
              {p.repo && (
                <p class="links">
                  <a href={p.repo} target="_blank" rel="noopener">Code</a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    ))}
  </main>
  <Footer slot="footer" />
</Base>

<style>
.portfolio {
  max-width: 960px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.portfolio h1 {
  margin-bottom: 0.5rem;
}
.intro {
  margin: 0 0 2.5rem;
  opacity: 0.7;
  font-size: 0.95rem;
}
.category {
  margin-bottom: 2.5rem;
}
.category h2 {
  margin-bottom: 1rem;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25rem;
  opacity: 0.85;
}
.cards {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.card {
  padding: 1rem;
  border: 1px solid currentColor;
  border-radius: 8px;
  background: rgba(127, 127, 127, 0.08);
}
.card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}
.card p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}
.thumb {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.links {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>
```

- [ ] **Step 2: Build and verify**

```bash
npm run build 2>&1 | tail -20
```

Expected: clean build. `dist/portfolio/index.html` generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/portfolio.astro
git commit -m "feat: add Portfolio page with typed data and card grid"
```

---

## Task 12: Contact page and ContactForm React island

**Files:**
- Create: `src/components/ContactForm.tsx`, `src/pages/contact.astro`

The ContactForm is a port of the Vue version. Same Web3Forms logic, same states. `VITE_WEB3FORMS_KEY` env var.

- [ ] **Step 1: Create src/components/ContactForm.tsx**

Write `/Users/9ete/Sites/petelower.com/src/components/ContactForm.tsx`:

```tsx
import { useState } from 'react'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  if (!WEB3FORMS_KEY) {
    return (
      <div className="result error">
        Contact form not configured. Set <code>VITE_WEB3FORMS_KEY</code> in your environment (see README).
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="result success">
        Message sent — I'll get back to you soon.
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `petelower.com contact from ${name}`,
          botcheck: false,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {status === 'error' && (
        <div className="result error">
          Something went wrong. Try again or email{' '}
          <a href="mailto:pete@petelower.com">pete@petelower.com</a> directly.
        </div>
      )}
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
          />
        </label>
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </form>
    </>
  )
}
```

- [ ] **Step 2: Create src/pages/contact.astro**

Write `/Users/9ete/Sites/petelower.com/src/pages/contact.astro`:

```astro
---
import Base from '../layouts/Base.astro'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import ContactForm from '../components/ContactForm.tsx'
---

<Base
  title="Contact — Pete Lower"
  description="Get in touch with Pete Lower."
>
  <Header slot="header" />
  <main class="contact">
    <h1>Contact</h1>
    <p class="intro">Whether it's about a project, a show, or something else — drop me a line.</p>
    <ContactForm client:load />
  </main>
  <Footer slot="footer" />
</Base>

<style>
.contact {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.contact h1 {
  margin-bottom: 0.5rem;
}
.intro {
  margin: 0 0 2rem;
  opacity: 0.7;
  font-size: 0.95rem;
}

/* ContactForm styles — scoped to this page since the island renders inside it */
:global(.form) {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
:global(label) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.95rem;
  font-weight: 500;
}
:global(.form input),
:global(.form textarea) {
  font: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem 0.6rem;
  border-radius: 6px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  width: 100%;
  box-sizing: border-box;
  opacity: 0.9;
}
:global(.form input:focus),
:global(.form textarea:focus) {
  outline: 2px solid var(--link-color);
  outline-offset: 1px;
  opacity: 1;
}
:global(.form textarea) {
  resize: vertical;
}
:global(.form button[type='submit']) {
  align-self: flex-start;
  padding: 0.55em 1.4em;
}
:global(.form button[type='submit']:disabled) {
  opacity: 0.55;
  cursor: not-allowed;
}
:global(.result) {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}
:global(.result.success) {
  border: 1px solid #4caf50;
  background: rgba(76, 175, 80, 0.1);
}
:global(.result.error) {
  border: 1px solid #e53935;
  background: rgba(229, 57, 53, 0.1);
}
</style>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build 2>&1 | tail -20
```

Expected: clean build. `dist/contact/index.html` generated.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.tsx src/pages/contact.astro
git commit -m "feat: add Contact page with Web3Forms React island"
```

---

## Task 13: robots.txt and final cleanup

**Files:**
- Create: `public/robots.txt`
- Delete: `public/_redirects` (if not already removed — Astro SSG doesn't need it)
- Modify: `CLAUDE.md`, `README.md`

- [ ] **Step 1: Create public/robots.txt**

Write `/Users/9ete/Sites/petelower.com/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://petelower.com/sitemap-index.xml
```

- [ ] **Step 2: Verify _redirects is gone**

```bash
ls /Users/9ete/Sites/petelower.com/public/
```

Expected: `_redirects` should NOT be present (was removed in Task 1). If it is present, run `git rm public/_redirects`.

- [ ] **Step 3: Update CLAUDE.md**

Overwrite `/Users/9ete/Sites/petelower.com/CLAUDE.md`:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project

Personal site at petelower.com — Astro 5 + React static site. Pages are `.astro` components; only `ModeToggle.tsx` and `ContactForm.tsx` are React islands (`client:load`).

## Commands

- `npm run dev` — Astro dev server at http://localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built output

No test runner, linter, or formatter configured.

## Architecture

- Layout: `src/layouts/Base.astro` — owns `<html>`, `<head>` (SEO, OG, canonical), dark-mode flash prevention inline script, and background image optimization via `getImage()`.
- Pages: `src/pages/index.astro`, `music.astro`, `portfolio.astro`, `contact.astro` — all SSG.
- Components: `Header.astro`, `Footer.astro`, `Navigation.astro`, `Gravatar.astro`, `YouTubeEmbed.astro` are zero-JS Astro components. `ModeToggle.tsx` and `ContactForm.tsx` are React islands.
- Data: `src/data/music.ts` (bands array), `src/data/portfolio.ts` (projects array + categoryOrder). Add content here; pages render from data.
- Styles: `src/styles/global.css` — CSS custom properties on `:root`, theming via `html.dark` / `html:not(.dark)`, imported in `Base.astro`.

## Theming

`ModeToggle.tsx` toggles `dark` class on `document.documentElement` (`<html>`). Preference persisted to `localStorage`. Flash prevention: inline `<script is:inline>` in `Base.astro` runs before first paint. CSS selects on `html.dark` / `html:not(.dark)`.

## Adding content

**Portfolio project:** Add to `projects` array in `src/data/portfolio.ts`. Use existing `Category` type values or extend `categoryOrder` for a new category.

**YouTube video:** Add the video ID string to `youtubeIds` array in `src/data/music.ts` for the relevant band.

## Deployment

Cloudflare Pages — auto-deploys from git. No `dist/` committed to git.

- `main` → production (petelower.com)
- `develop` → preview URL

Build command: `npm run build`. Output directory: `dist`. Set `VITE_WEB3FORMS_KEY` as an environment variable in Cloudflare Pages dashboard.

## Contact form

Uses Web3Forms. Set `VITE_WEB3FORMS_KEY` in `.env.local` locally and in Cloudflare Pages env vars for production. See README for setup steps.
```

- [ ] **Step 4: Update README.md**

Overwrite `/Users/9ete/Sites/petelower.com/README.md`:

```markdown
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
```

- [ ] **Step 5: Final build verification**

```bash
cd /Users/9ete/Sites/petelower.com && npm run build 2>&1
```

Expected output (all four routes generated):

```
dist/index.html
dist/music/index.html
dist/portfolio/index.html
dist/contact/index.html
dist/sitemap-index.xml
dist/sitemap-0.xml
dist/robots.txt
✓ built in ...ms
```

- [ ] **Step 6: Commit everything**

```bash
git add public/robots.txt CLAUDE.md README.md
git commit -m "feat: add robots.txt and update CLAUDE.md + README for Astro"
```

---

## Task 14: Open PR from feature/astro-rebuild → develop

- [ ] **Step 1: Push branch**

```bash
git push -u origin feature/astro-rebuild
```

- [ ] **Step 2: Open PR**

```bash
gh pr create \
  --base develop \
  --title "feat: Astro 5 rebuild — SSG, React islands, full SEO, Cloudflare Pages" \
  --body "$(cat <<'EOF'
## Summary

- Replaces Vue 3 + Vite SPA with Astro 5 static site generation
- React islands for ModeToggle and ContactForm only — all other pages are zero-JS
- Full per-page SEO: title, description, OG tags, canonical URLs, sitemap, robots.txt
- Background image optimized to WebP via \`getImage()\` at build time
- \`lite-youtube-embed\` for lazy YouTube loading (no iframe until clicked)
- Cloudflare Pages auto-deploy: \`main\` → production, \`develop\` → preview
- \`dist/\` no longer committed to git — CF Pages builds from source
- Dark/light mode preserved with flash-prevention inline script
- Music and portfolio data in typed \`src/data/\` files

## Test plan

- [ ] Run \`npm run build\` — all four pages generate without errors
- [ ] Run \`npm run dev\` — visit /, /music, /portfolio, /contact
- [ ] Toggle dark/light mode — persists on reload (no flash)
- [ ] Contact form shows config warning without \`VITE_WEB3FORMS_KEY\`; works with key set
- [ ] Verify \`dist/sitemap-index.xml\` and \`dist/sitemap-0.xml\` are generated
- [ ] After merge to develop, confirm Cloudflare Pages preview builds successfully

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Self-review notes

- All four pages (index, music, portfolio, contact) are covered
- `getImage()` for WebP background — covered in Base.astro (Task 4)
- Flash prevention script — covered in Base.astro (Task 4)
- `@astrojs/sitemap` wired in `astro.config.mjs` with `site` set — generates `sitemap-index.xml` automatically
- `robots.txt` pointing to sitemap — covered in Task 13
- ModeToggle uses `html.dark` not `body.dark` — consistent with CSS in Task 3
- ContactForm types match between `.tsx` and usage in `contact.astro`
- `Band.youtubeIds` in `music.ts` is `string[]` and `YouTubeEmbed` takes `videoId: string` — consistent
- `Project.category` is `Category` type and `categoryOrder` uses same type — consistent
- No placeholders in any code block (YouTube IDs are in TODO comments inside the data arrays, which is intentional placeholder content)
