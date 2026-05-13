# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal site at petelower.com — a Vue 3 + Vite SPA using `vue-router@4` (history mode). Despite the user's primary stack being WordPress/Laravel/PHP (see `~/.claude/CLAUDE.md`), this specific repo is plain Vue 3 with `<script setup>` SFCs and no backend.

## Commands

- `npm run dev` — start Vite dev server (port 5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build (port 4173)

There is no test runner, linter, or formatter configured.

## Architecture

- Entry: `index.html` → `src/main.js` → installs router on `App` and mounts on `#app`.
- `App.vue` composes `Header`, `<router-view />`, `Footer`. `Header` in turn composes `Gravatar`, `Navigation`, `ModeToggle`.
- Routes live in `src/router/index.js`: `/` → `pages/Home.vue`, `/music` → `pages/Music.vue`, `/portfolio` → `pages/Portfolio.vue`. A wildcard catch-all redirects unknown paths to `home`.
- `Navigation.vue` uses `<router-link>` for internal routes and plain `<a target="_blank" rel="noopener">` for external. Active route gets `.router-link-active` styling.
- Portfolio data lives in `src/data/portfolio.js` as `{ categoryOrder, projects }`. The page groups by category, skipping empty categories. To add a project, append to `projects`; to add a category, also extend `categoryOrder`.
- Theming is global, not prop-driven: `ModeToggle.vue` toggles a `dark` class on `<body>` and `src/style.css` selects on `body.dark` vs `body:not(.dark)`. Components that need dark/light variants use `<span class="light">` / `<span class="dark">` and let CSS hide the inactive one. Don't introduce a reactive theme store — the existing pattern is intentionally DOM-based.
- Global styles live in `src/style.css` (CSS custom properties on `:root`, body-class theming, fade-in keyframes). Per-component styles use `<style scoped>`. Single mobile breakpoint at `min-width: 640px`. The HelloWorld/CoinSpinner files contain experimental/unused widgets — leave them unless asked.
- Images: large assets live in both `src/assets/` (imported via CSS `url()`) and `public/` (served at root). The Seattle skyline background is loaded via CSS from `src/assets/`, so Vite fingerprints it into `dist/assets/`.

## Deployment quirks

### `dist/` is committed

`dist/` is listed in `.gitignore` **but is also tracked in git** (commit 539ea74: "add dist as firebird is too out of date to install node/npm"). The production host ("firebird") can't run Node, so the built bundle ships in the repo.

This means: after any change to `src/`, `index.html`, or assets, **run `npm run build` and commit the resulting `dist/` changes** as a follow-up `chore: rebuild dist` commit (keeps source commits atomic). Pushing source changes without rebuilding `dist/` will not update production. Stage with `git add -f dist` because the directory is gitignored.

### History-mode deep-links 404 on Firebird

`vue-router` is in history mode (`/music`, `/portfolio`). The current host (Firebird) does not rewrite unknown paths to `index.html`, so direct hits or refreshes on `/music` and `/portfolio` return 404. Client-side navigation from `/` works fine. The site is planned to migrate to DigitalOcean, where SPA fallback can be configured; after migration, drop the `dist/`-in-git workflow as well.
