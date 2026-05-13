# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal site at petelower.com — a single-page Vue 3 + Vite app. Despite the user's primary stack being WordPress/Laravel/PHP (see `~/.claude/CLAUDE.md`), this specific repo is plain Vue 3 with `<script setup>` SFCs and no backend.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build

There is no test runner, linter, or formatter configured.

## Architecture

- Entry: `index.html` → `src/main.js` → mounts `App.vue` on `#app`.
- `App.vue` composes three top-level components: `Header`, `HomeContent`, `Footer`. `Header` in turn composes `Gravatar`, `Navigation`, `ModeToggle`.
- Theming is global, not prop-driven: `ModeToggle.vue` toggles a `dark` class on `<body>` and `src/style.css` selects on `body.dark` vs `body:not(.dark)`. Components that need dark/light variants use `<span class="light">` / `<span class="dark">` and let CSS hide the inactive one. Don't introduce a reactive theme store — the existing pattern is intentionally DOM-based.
- Global styles live in `src/style.css` (CSS custom properties on `:root`, body-class theming, fade-in keyframes). Per-component styles use `<style scoped>`. The HelloWorld/CoinSpinner files contain experimental/unused widgets — leave them unless asked.
- Images: large assets live in both `src/assets/` (imported via CSS `url()`) and `public/` (served at root). The Seattle skyline background is loaded via CSS from `src/assets/`, so Vite fingerprints it into `dist/assets/`.

## Deployment quirk: `dist/` is committed

`dist/` is listed in `.gitignore` **but is also tracked in git** (commit 539ea74: "add dist as firebird is too out of date to install node/npm"). The production host ("firebird") can't run Node, so the built bundle ships in the repo.

This means: after any change to `src/`, `index.html`, or assets, **run `npm run build` and commit the resulting `dist/` changes in the same logical commit** (or a follow-up `chore: rebuild dist` commit). Pushing source changes without rebuilding `dist/` will not update production.
