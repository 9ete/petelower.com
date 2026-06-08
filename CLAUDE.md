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
