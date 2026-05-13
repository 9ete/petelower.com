# Music & Portfolio Pages + Mobile Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-page Vue site into a 3-route app with `/music` and `/portfolio` pages, wire those routes into the nav, and improve the mobile header layout.

**Architecture:** Add `vue-router@4` in history mode. Relocate the existing home view to `pages/Home.vue`, add two new page components, a portfolio data file, and a small `YouTubeEmbed` component. Modify nav + header CSS for mobile. Six atomic commits, one logical concern each.

**Tech Stack:** Vue 3 (`<script setup>` SFC), Vite, `vue-router@4`. No test framework configured — verification is manual via `npm run dev` (port 5173) and visual checks. Spec: `docs/superpowers/specs/2026-05-13-music-portfolio-pages-design.md`.

**Working directory:** `/Users/9ete/Sites/petelower.com`. Branch `develop`.

**Notes for the implementer:**
- This repo has no test runner. Each task's verification step is a concrete manual check at a specific URL with a specific expected behavior.
- A git hook prepends the current branch name to commit subjects (so `feat: foo` lands as `develop: feat: foo`). Do NOT try to disable the hook or use `--no-verify`. Compose your commit subject as normal; the branch prefix is added automatically. This is expected and acceptable.
- Commits must remain atomic + conventional-prefix (`feat:`, `style:`, `chore:`, `docs:`). Do not bundle concerns. If a step accidentally edits a file outside its task's scope, `git restore` that file before committing.
- The user's preferred PHP/Laravel/WordPress workflow does not apply here — this is a static Vue app.

---

## File Structure

After this plan completes, `src/` will look like:

```
src/
  main.js              # MODIFIED — installs router
  App.vue              # MODIFIED — renders <router-view /> instead of <HomeContent />
  style.css            # MODIFIED — mobile #app padding, drop rogue header rule
  router/
    index.js           # NEW — route table, history mode
  pages/
    Home.vue           # NEW — relocated from components/HomeContent.vue, content unchanged
    Music.vue          # NEW
    Portfolio.vue      # NEW
  data/
    portfolio.js       # NEW — projects array + categoryOrder
  components/
    Header.vue         # MODIFIED — padding tweaks for mobile
    Gravatar.vue       # MODIFIED — drop position offset, responsive size
    Navigation.vue     # REWRITTEN — <router-link>s, new links, flex gap
    ModeToggle.vue     # unchanged
    Footer.vue         # unchanged
    Email.vue          # unchanged
    YouTubeEmbed.vue   # NEW — responsive 16:9 iframe wrapper
    CoinSpinner.vue    # unchanged (unused, leave alone per CLAUDE.md)
    HelloWorld.vue     # unchanged (unused, leave alone per CLAUDE.md)
```

`components/HomeContent.vue` is deleted in Task 1 (its contents move to `pages/Home.vue`).

---

## Task 1: Add vue-router and home route

Install router, scaffold the routes module, move HomeContent into `pages/Home.vue`, swap `App.vue` to render `<router-view />`. After this task, the site at `/` looks and behaves identically to before — only the plumbing has changed.

**Files:**
- Create: `src/router/index.js`
- Create: `src/pages/Home.vue`
- Modify: `src/main.js`
- Modify: `src/App.vue`
- Delete: `src/components/HomeContent.vue`
- Modify: `package.json` (via `npm install`)
- Modify: `package-lock.json` (via `npm install`)

- [ ] **Step 1.1: Install vue-router**

Run from `/Users/9ete/Sites/petelower.com`:

```bash
npm install vue-router@4
```

Expected: `package.json` gains `"vue-router": "^4.x.x"` in `dependencies`. `package-lock.json` updates. No errors.

- [ ] **Step 1.2: Create `src/router/index.js`**

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Music from '../pages/Music.vue'
import Portfolio from '../pages/Portfolio.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/music', name: 'music', component: Music },
  { path: '/portfolio', name: 'portfolio', component: Portfolio },
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

Note: `Music` and `Portfolio` imports will resolve in Tasks 2 and 3. For Task 1 only, temporarily comment out the `Music` and `Portfolio` imports and their route entries so the app builds:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
// import Music from '../pages/Music.vue'        // added in Task 2
// import Portfolio from '../pages/Portfolio.vue' // added in Task 3

const routes = [
  { path: '/', name: 'home', component: Home },
  // { path: '/music', name: 'music', component: Music },           // added in Task 2
  // { path: '/portfolio', name: 'portfolio', component: Portfolio }, // added in Task 3
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

Tasks 2 and 3 will uncomment the relevant lines.

- [ ] **Step 1.3: Create `src/pages/Home.vue`**

Copy `src/components/HomeContent.vue` content verbatim into `src/pages/Home.vue`. The file should contain:

```vue
<template>
    <h1 class="loading-dots-after">Hello <i>World</i></h1>
    <h2 style="text-align: right">I'm Pete</h2>
    <p hidden style="text-align: right"> I make <a href="https://kadillacblack.com">music</a> <br/>and <a href="https://github.com/9ete">websites.</a></p>
</template>
<style scoped>
.read-the-docs {
  color: #888;
}
.loading-dots-after {
    width: 380px;
    text-align: left;
}
.loading-dots-after:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4, end) 1200ms infinite;
  animation: ellipsis steps(4, end) 2400ms infinite;
  content: "\2026";
  /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 40px;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 40px;
  }
}
</style>
```

- [ ] **Step 1.4: Delete `src/components/HomeContent.vue`**

```bash
git rm src/components/HomeContent.vue
```

- [ ] **Step 1.5: Update `src/main.js`**

Replace the entire file with:

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/index.js'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 1.6: Update `src/App.vue`**

Replace the entire file with:

```vue
<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>

<style scoped>
</style>
```

(The `CoinSpinner` and `HomeContent` imports are removed — `CoinSpinner` was imported but unused, and `HomeContent` is now rendered via the router.)

- [ ] **Step 1.7: Verify dev server runs and `/` renders unchanged**

Run:

```bash
npm run dev
```

Expected: Vite starts on `http://localhost:5173`, no compile errors.

Open `http://localhost:5173/` in a browser. Expected: the existing site (Gravatar, Navigation, ModeToggle in header; "Hello World..." heading; Email + footer) renders **identically** to before — header, content, footer all present.

Open `http://localhost:5173/anything-random`. Expected: redirects to `/` and shows the home page.

Stop the dev server with Ctrl-C.

- [ ] **Step 1.8: Commit**

```bash
git add package.json package-lock.json src/router/index.js src/pages/Home.vue src/main.js src/App.vue
git rm src/components/HomeContent.vue  # if not already staged from Step 1.4
git commit -m "feat: add vue-router with home route"
```

Expected: commit succeeds. `git log -1 --oneline` shows a commit subject like `develop: feat: add vue-router with home route` (the `develop:` prefix is added by the repo's git hook — this is expected, not a bug).

---

## Task 2: Add music page

Create the music page with two band sections and a reusable `YouTubeEmbed` component. Register the `/music` route.

**Files:**
- Create: `src/components/YouTubeEmbed.vue`
- Create: `src/pages/Music.vue`
- Modify: `src/router/index.js`

- [ ] **Step 2.1: Create `src/components/YouTubeEmbed.vue`**

```vue
<script setup>
defineProps({
  videoId: { type: String, required: true },
  title: { type: String, default: 'YouTube video' },
})
</script>

<template>
  <div class="yt-embed">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      :title="title"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.yt-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1rem 0;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}
.yt-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
```

- [ ] **Step 2.2: Create `src/pages/Music.vue`**

Use a placeholder YouTube video ID (`dQw4w9WgXcQ`) for each band so the page renders something visible. Pete will replace these with real IDs after the page exists.

```vue
<script setup>
import YouTubeEmbed from '../components/YouTubeEmbed.vue'
</script>

<template>
  <main class="music">
    <h1>Music</h1>

    <section class="band">
      <h2>Kadillac Black</h2>
      <p>
        <a href="https://kadillacblack.com" target="_blank" rel="noopener">kadillacblack.com</a>
      </p>
      <YouTubeEmbed video-id="dQw4w9WgXcQ" title="Kadillac Black" />
    </section>

    <section class="band">
      <h2>Item9 and the Mad Hatters</h2>
      <p>
        <a href="https://soundcloud.com/item9andthemadhatters" target="_blank" rel="noopener">
          soundcloud.com/item9andthemadhatters
        </a>
      </p>
      <YouTubeEmbed video-id="dQw4w9WgXcQ" title="Item9 and the Mad Hatters" />
    </section>
  </main>
</template>

<style scoped>
.music {
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.music h1 {
  margin-bottom: 2rem;
}
.band {
  margin-bottom: 3rem;
}
.band h2 {
  margin-bottom: 0.25rem;
}
.band p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}
</style>
```

- [ ] **Step 2.3: Register the `/music` route**

Edit `src/router/index.js`. Uncomment the `Music` import and the `/music` route entry. The file should now read:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Music from '../pages/Music.vue'
// import Portfolio from '../pages/Portfolio.vue' // added in Task 3

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/music', name: 'music', component: Music },
  // { path: '/portfolio', name: 'portfolio', component: Portfolio }, // added in Task 3
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

- [ ] **Step 2.4: Verify `/music` renders**

Run `npm run dev`. Open `http://localhost:5173/music`.

Expected: page shows "Music" heading, two band sections (Kadillac Black, Item9 and the Mad Hatters), each with an external link and an embedded 16:9 YouTube player. Header and footer still render. No console errors.

Resize browser to ~360px wide. Expected: iframe stays 16:9, page content readable.

Stop the dev server.

- [ ] **Step 2.5: Commit**

```bash
git add src/components/YouTubeEmbed.vue src/pages/Music.vue src/router/index.js
git commit -m "feat: add music page with band sections"
```

---

## Task 3: Add portfolio page

Create the data file, the page component that groups by category, and register the `/portfolio` route.

**Files:**
- Create: `src/data/portfolio.js`
- Create: `src/pages/Portfolio.vue`
- Modify: `src/router/index.js`

- [ ] **Step 3.1: Create `src/data/portfolio.js`**

```js
export const categoryOrder = [
  'WordPress Plugins',
  'Client Sites',
  'Open Source',
  'Experiments',
]

export const projects = [
  {
    title: 'petelower.com',
    category: 'Experiments',
    description: 'This site. Vue 3 + Vite, no backend.',
    url: 'https://petelower.com',
    repo: 'https://github.com/9ete/petelower.com',
  },
]
```

- [ ] **Step 3.2: Create `src/pages/Portfolio.vue`**

```vue
<script setup>
import { computed } from 'vue'
import { projects, categoryOrder } from '../data/portfolio.js'

const grouped = computed(() => {
  const known = new Map(categoryOrder.map((c) => [c, []]))
  const other = []
  for (const p of projects) {
    if (known.has(p.category)) {
      known.get(p.category).push(p)
    } else {
      other.push(p)
    }
  }
  const result = []
  for (const c of categoryOrder) {
    const items = known.get(c)
    if (items.length) result.push({ category: c, items })
  }
  if (other.length) result.push({ category: 'Other', items: other })
  return result
})
</script>

<template>
  <main class="portfolio">
    <h1>Portfolio</h1>
    <section v-for="group in grouped" :key="group.category" class="category">
      <h2>{{ group.category }}</h2>
      <ul class="cards">
        <li v-for="p in group.items" :key="p.title" class="card">
          <img v-if="p.thumbnail" :src="p.thumbnail" :alt="p.title" class="thumb" />
          <h3>
            <a v-if="p.url" :href="p.url" target="_blank" rel="noopener">{{ p.title }}</a>
            <template v-else>{{ p.title }}</template>
          </h3>
          <p>{{ p.description }}</p>
          <p v-if="p.repo" class="links">
            <a :href="p.repo" target="_blank" rel="noopener">Code</a>
          </p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.portfolio {
  max-width: 960px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.portfolio h1 {
  margin-bottom: 2rem;
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
.card .thumb {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.card .links {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>
```

- [ ] **Step 3.3: Register the `/portfolio` route**

Edit `src/router/index.js`. Uncomment the `Portfolio` import and route entry. The file should now read:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Music from '../pages/Music.vue'
import Portfolio from '../pages/Portfolio.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/music', name: 'music', component: Music },
  { path: '/portfolio', name: 'portfolio', component: Portfolio },
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

- [ ] **Step 3.4: Verify `/portfolio` renders**

Run `npm run dev`. Open `http://localhost:5173/portfolio`.

Expected: "Portfolio" heading. One category section titled "Experiments" containing one card "petelower.com" with description, title linked to the live URL, and a "Code" link. Categories with no entries (WordPress Plugins, Client Sites, Open Source) should NOT render.

Open `http://localhost:5173/random-garbage`. Expected: redirects to `/`.

Stop the dev server.

- [ ] **Step 3.5: Commit**

```bash
git add src/data/portfolio.js src/pages/Portfolio.vue src/router/index.js
git commit -m "feat: add portfolio page grouped by category"
```

---

## Task 4: Wire music + portfolio links into the nav

Rewrite `Navigation.vue` to use `<router-link>` for internal routes, add the two new internal links, and use flex gap instead of pipe separators. External links (Code, LinkedIn) stay as `<a target="_blank">`.

**Files:**
- Modify: `src/components/Navigation.vue`

- [ ] **Step 4.1: Rewrite `src/components/Navigation.vue`**

Replace the entire file with:

```vue
<template>
    <nav class="site-nav">
      <router-link to="/music">Music</router-link>
      <router-link to="/portfolio">Portfolio</router-link>
      <a href="https://github.com/9ete" target="_blank" rel="noopener">Code</a>
      <a href="https://www.linkedin.com/in/pete-l-39448a42" target="_blank" rel="noopener">LinkedIn</a>
    </nav>
</template>

<style scoped>
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
}
.site-nav a:hover {
  text-decoration: underline;
}
.site-nav a.router-link-active {
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

- [ ] **Step 4.2: Verify nav works**

Run `npm run dev`. Open `http://localhost:5173/`.

Expected: nav shows four items in this order: **Music | Portfolio | Code | LinkedIn** (no literal pipes — just spaced links).

- Click "Music" — URL becomes `/music`, page swaps in, "Music" link is bold/underlined.
- Click "Portfolio" — URL becomes `/portfolio`, page swaps in, "Portfolio" link is bold/underlined.
- Click "Code" — opens GitHub in a new tab.
- Click "LinkedIn" — opens LinkedIn in a new tab.
- Use browser back/forward — routes change without full page reload.

Stop the dev server.

- [ ] **Step 4.3: Commit**

```bash
git add src/components/Navigation.vue
git commit -m "feat: link music and portfolio routes in nav"
```

---

## Task 5: Improve mobile header layout

Shrink Gravatar on mobile, remove its `position` offset, tighten Header padding, add top padding to `#app` on mobile so the fixed header never sits over content, and drop the conflicting `header { top; left }` rule in `style.css`.

**Files:**
- Modify: `src/components/Gravatar.vue`
- Modify: `src/components/Header.vue`
- Modify: `src/style.css`

- [ ] **Step 5.1: Update `src/components/Gravatar.vue`**

Replace the entire file with:

```vue
<template>
    <div id="gravatar-img" class="gravatar">
        <img
        :src="`https://www.gravatar.com/avatar/74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db?d=identicon`"
        :alt="`Gravatar for 9ete`"
        />
    </div>
</template>
<style scoped>
.gravatar {
    width: 48px;
    height: 48px;
    margin: 0;
    border-radius: 50%;
    border: 1px solid whitesmoke;
    box-shadow: 0 0 10px black;
    background: url('https://gravatar.com/avatar/74123bf8d459685cd0f02c1dd90c581d22258608efa9bc71e0a1356be57465db?size=512') center / contain no-repeat;
}
.gravatar img {
    display: none;
}
@media (min-width: 640px) {
  .gravatar {
    width: 100px;
    height: 100px;
  }
}
</style>
```

Changes vs. original:
- Removed `position: relative; left: 1rem; top: 1.25rem`.
- Default size `48px`; scale to `100px` at `min-width: 640px`.
- Moved nested `img` rule out of selector nesting (the existing nested form depended on Vue's SFC PostCSS — flat selector is safer and equivalent).
- `border-radius: 50%` instead of `100px` for clarity.

- [ ] **Step 5.2: Update `src/components/Header.vue`**

Replace the entire file with:

```vue
<script setup>
import Gravatar from './Gravatar.vue'
import ModeToggle from './ModeToggle.vue'
import Navigation from './Navigation.vue'
</script>

<template>
  <header>
    <Gravatar />
    <Navigation />
    <ModeToggle />
  </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: 0;
    right: 0;
    padding: 0 0.75rem;
    gap: 0.75rem;
}
@media (min-width: 640px) {
  header {
    padding: 0 1rem;
    gap: 1rem;
  }
}
</style>
```

Changes vs. original: added `gap` for breathing room between Gravatar/Nav/ModeToggle, reduced mobile padding to `0.75rem`, kept the responsive jump to `1rem` on desktop.

- [ ] **Step 5.3: Update `src/style.css`**

Open `src/style.css`. Find this block (around lines 94–104):

```css
:is(header, footer) {
  position: fixed;
}
header {
  top: 0.5rem;
  left: 0.5rem;
}
footer {
  bottom: 0;
  right: 2.5rem;
}
```

Replace with:

```css
:is(header, footer) {
  position: fixed;
}
header {
  top: 0;
  left: 0;
  right: 0;
}
footer {
  bottom: 0;
  right: 2.5rem;
}
```

(The `top: 0.5rem; left: 0.5rem` conflicted with the scoped `left: 0; right: 0` from `Header.vue`. Now both files agree: header pinned to the top edge spanning full width.)

Find the `#app` rule (around lines 110–115):

```css
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
```

Replace with:

```css
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 1rem 2rem;
  text-align: center;
}
@media (min-width: 640px) {
  #app {
    padding: 2rem;
  }
}
```

(On mobile, the fixed header is ~48px tall plus padding — `5rem` top padding ensures the `<h1>` is never under it. Desktop reverts to the original `2rem` because the larger viewport + gravatar size already leaves room.)

- [ ] **Step 5.4: Verify mobile header**

Run `npm run dev`. Open `http://localhost:5173/`.

Resize browser to 360px width (or open DevTools device toolbar, iPhone SE preset). Expected:
- Gravatar is small (~48px circle), top-left, no weird offset.
- Nav links (Music, Portfolio, Code, LinkedIn) sit between Gravatar and ModeToggle with even spacing, no pipe characters, no wrapping.
- ModeToggle icon sits at top-right.
- "Hello World..." heading is fully visible below the header, not overlapping.

Resize to 640px and 1024px. Expected:
- Gravatar grows to 100px.
- Nav font slightly larger, more gap.
- Layout still balanced.

Toggle dark/light mode — both states render cleanly.

Visit `/music` and `/portfolio` at 360px. Expected: header still readable, page content not under the header.

Stop the dev server.

- [ ] **Step 5.5: Commit**

```bash
git add src/components/Gravatar.vue src/components/Header.vue src/style.css
git commit -m "style: tighten header layout on mobile"
```

---

## Task 6: Rebuild dist

Production build, commit the result so the Firebird-hosted site picks up the changes.

**Files:**
- Modify: everything under `dist/` (via `npm run build`)

- [ ] **Step 6.1: Build production bundle**

```bash
npm run build
```

Expected: Vite reports successful build with files written to `dist/`. No errors. Output includes `dist/index.html`, `dist/assets/index-*.js`, `dist/assets/index-*.css`, and image assets.

- [ ] **Step 6.2: Smoke-test the built bundle**

```bash
npm run preview
```

Open `http://localhost:4173/`. Expected: home renders correctly.

Open `http://localhost:4173/music` and `http://localhost:4173/portfolio`. Expected: each page renders correctly (preview server handles SPA fallback automatically).

Stop the preview server.

- [ ] **Step 6.3: Commit the rebuilt dist**

```bash
git add dist
git commit -m "chore: rebuild dist"
```

- [ ] **Step 6.4: Final verification**

```bash
git log --oneline -7
```

Expected: 6 new commits on top of the previous spec commit, in this order (subjects prefixed with `develop:` by the git hook):

```
<sha> develop: chore: rebuild dist
<sha> develop: style: tighten header layout on mobile
<sha> develop: feat: link music and portfolio routes in nav
<sha> develop: feat: add portfolio page grouped by category
<sha> develop: feat: add music page with band sections
<sha> develop: feat: add vue-router with home route
<sha> develop: docs: add design spec for music, portfolio pages, and mobile header
```

```bash
git status
```

Expected: working tree clean.

---

## Self-Review Checklist

- [x] **Spec coverage:** Every spec section maps to a task — routing/file layout (T1), music page (T2), portfolio data + page (T3), nav wiring (T4), mobile header CSS (T5), dist rebuild (T6). Wildcard route from "Error handling" landed in T1's router scaffold.
- [x] **Placeholder scan:** No TBD/TODO/"fill in later". YouTube placeholder ID is a deliberate, named seed value (`dQw4w9WgXcQ`) Pete will swap, documented as such.
- [x] **Type consistency:** `YouTubeEmbed` uses prop `videoId` and template attr `video-id` consistently in T2. Portfolio data uses `{title, category, description, url, repo, thumbnail}` consistently in T3 data file and component. Route names (`home`, `music`, `portfolio`) consistent across all router edits.
- [x] **Atomic commits:** Each task produces exactly one commit with one logical concern, matching Pete's standing rule.
