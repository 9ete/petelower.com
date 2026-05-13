# Music & Portfolio Pages + Mobile Header — Design

**Date:** 2026-05-13
**Status:** Approved, ready for implementation plan

## Goal

Convert the single-page Vue site into a 3-route app with two new content pages (`/music`, `/portfolio`) and add the new routes to the header navigation. Also improve the header layout on mobile.

## Scope

1. Add `vue-router@4` (history mode) and route the existing home view through it.
2. Add a `/music` page that hosts on-site entries for two bands (replacing the current off-site "Music" link).
3. Add a `/portfolio` page driven by a data file, grouped by category, designed to grow.
4. Update navigation to include both new internal routes.
5. Improve mobile header UX (Option 1: compact bar, no hamburger).

Out of scope:
- Markdown-driven content (could be a future upgrade for portfolio entries).
- Per-project detail/case-study pages.
- DigitalOcean deployment configuration (separate task, after migration).
- Analytics, sitemaps, or other meta concerns.

## Architecture

### File layout

```
src/
  main.js              # mounts App, installs router
  App.vue              # <Header /> <router-view /> <Footer />
  router/
    index.js           # createRouter({ history: createWebHistory(), routes })
  pages/
    Home.vue           # current HomeContent.vue, relocated unchanged
    Music.vue
    Portfolio.vue
  components/
    Header.vue         # existing, CSS tweaks for mobile
    Footer.vue         # existing, unchanged
    Gravatar.vue       # existing, responsive sizing + remove offset
    Navigation.vue     # existing, replaced with router-link version
    ModeToggle.vue     # existing, unchanged
    YouTubeEmbed.vue   # new, responsive 16:9 iframe wrapper
  data/
    portfolio.js       # array of project entries + category order
  style.css            # global tweaks (mobile top padding, drop rogue header rules)
```

### Routing

- `vue-router@4`, history mode.
- Routes:
  - `/` → `pages/Home.vue`
  - `/music` → `pages/Music.vue`
  - `/portfolio` → `pages/Portfolio.vue`
- `App.vue` renders `<Header />`, `<router-view />`, `<Footer />`.
- `Navigation.vue` uses `<router-link>` for internal routes and plain `<a target="_blank" rel="noopener">` for external (Code → GitHub, LinkedIn).
- Active-route styling: rely on default `.router-link-active` class; style with a subtle underline or bold weight that fits the existing visual language.

### Music page

- File: `src/pages/Music.vue`.
- Two band sections, each rendered with the same internal markup:
  - **Kadillac Black** — blurb, link to `https://kadillacblack.com`, one or more `<YouTubeEmbed video-id="..." />` slots (placeholder ID at first; Pete fills real IDs in later).
  - **Item9 and the Mad Hatters** — blurb, link to `https://soundcloud.com/item9andthemadhatters`, YouTube embeds (placeholder).
- `YouTubeEmbed.vue` (new component):
  - Single prop: `videoId` (string, required).
  - Renders responsive 16:9 iframe (`aspect-ratio: 16 / 9; width: 100%`) with `src="https://www.youtube.com/embed/{videoId}"`, `loading="lazy"`, `allowfullscreen`.
- Section heading style consistent with the site's monospace + minimal aesthetic.

### Portfolio page

- File: `src/pages/Portfolio.vue`.
- Data: `src/data/portfolio.js`:

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
      // thumbnail: optional path
    },
    // additional entries added over time
  ]
  ```

- Component groups `projects` by `category`, renders categories in `categoryOrder` order, with a heading per category and a list of project cards inside.
- Card markup: title (linked to `url` if present), description, "Code" link (if `repo`), optional thumbnail at top of card.
- A category with zero entries is not rendered.
- An entry with a `category` not in `categoryOrder` falls into an implicit "Other" bucket rendered last.

### Mobile header (Option 1)

Goal: keep the existing minimal feel; fix specific issues that surface at mobile widths.

Changes:

1. **`Gravatar.vue`**
   - Remove `position: relative; left: 1rem; top: 1.25rem` — let flex layout handle positioning.
   - Default size `48px × 48px`; at `min-width: 640px`, scale up to `100px × 100px`.
   - Preserve circular shape, border, and shadow.

2. **`Navigation.vue`**
   - Replace pipe `|` separators with flex `gap`.
   - Mobile: `gap: 0.75rem; font-size: 0.95rem`.
   - Desktop (`min-width: 640px`): `gap: 1rem; font-size: 1rem`.
   - Add new links: `<router-link to="/music">Music</router-link>` and `<router-link to="/portfolio">Portfolio</router-link>` placed before the external `Code` and `LinkedIn` links.

3. **`Header.vue`**
   - Scoped style: `padding: 0 0.75rem` on mobile, `0 1rem` at `min-width: 640px`.
   - Keep `display: flex; justify-content: space-between; align-items: center`.
   - Drop the conflicting `header { top: 0.5rem; left: 0.5rem }` rule in `src/style.css` (Header.vue's scoped style already sets `left: 0; right: 0`).

4. **`src/style.css`**
   - Add `#app { padding-top: 4rem }` on mobile (`max-width: 639px`) so the fixed header never sits over `<h1>`. Reduce or remove on desktop where the existing 2rem padding plus larger viewport leaves enough room.

5. **Breakpoint**
   - Single breakpoint at `640px` (matches common mobile/tablet boundary, no need for more).

## Data flow

- Static. `data/portfolio.js` is imported at build time; no fetch, no state management.
- `vue-router` handles route → component rendering; no other state.
- Theme remains DOM-based (`body.dark` class via `ModeToggle.vue`), unchanged.

## Error handling

- Add a wildcard route (`/:pathMatch(.*)*`) that renders Home as fallback, so unknown URLs don't show a blank page. (Tiny scope addition — prevents broken deep-link UX during the Firebird→DO transition and after.)
- YouTube iframe failures (blocked, bad ID) are tolerated as-is — iframe renders YouTube's own error UI.

## Testing

The repo has no test runner configured, and adding one is out of scope. Manual verification per the implementation plan:

- `npm run dev`, visit each route, confirm header/footer persist and content swaps.
- Resize browser to 360px, 640px, 1024px — verify header layout, no overlap with `<h1>`, nav links don't wrap.
- Toggle theme on each page, confirm dark/light works consistently.
- `npm run build` succeeds, `npm run preview` serves the built site, deep links to `/music` and `/portfolio` work under the preview server.

## Deploy considerations

- **Firebird (current host):** History-mode deep links to `/music` and `/portfolio` will 404 on direct hit / refresh. Clicking from `/` works (client-side routing). This is acceptable because Pete plans to migrate to DigitalOcean.
- **DigitalOcean (planned):** Configure SPA fallback so any non-asset path serves `/index.html`. Drop the committed `dist/` directory and the `dist`-in-git workflow once on DO.
- Until migration: continue rebuilding `dist/` and committing it. CLAUDE.md already documents this quirk; update CLAUDE.md after migration.

## Commit plan (atomic, conventional)

Six commits, one logical change each:

1. `feat: add vue-router with home route` — install `vue-router@4`, create `router/index.js`, move `HomeContent.vue` → `pages/Home.vue`, swap `App.vue` to render `<router-view />`. Behavior identical to today at `/`.
2. `feat: add music page with band sections` — `pages/Music.vue`, `components/YouTubeEmbed.vue`, register `/music` route.
3. `feat: add portfolio page grouped by category` — `pages/Portfolio.vue`, `data/portfolio.js` with seed entry, register `/portfolio` route, wildcard fallback to Home.
4. `feat: link music and portfolio routes in nav` — rewrite `Navigation.vue` with `<router-link>`s for `/music` and `/portfolio`; keep external Code/LinkedIn as `<a>`.
5. `style: tighten header layout on mobile` — Gravatar/Navigation/Header CSS changes and `#app` top padding for mobile, drop rogue `header` rule in `style.css`.
6. `chore: rebuild dist` — `npm run build`, commit `dist/` so the Firebird-hosted production site picks up the changes.

## Open questions / nothing required from Pete to start

- Pete will paste real YouTube video IDs into `Music.vue` after the page exists.
- Pete will add more portfolio entries to `data/portfolio.js` over time.

These don't block the implementation plan.
