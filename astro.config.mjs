// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the absolute site URL.
// This is a GitHub Pages *user site* (served at the domain root), so `base` is '/'.
// The repo must be named `balajiselvaraj1601.github.io` to serve at this URL.
// `Astro.site` in components and the sitemap both derive from this one value;
// `public/robots.txt` references it too (static file — update both together).
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = 'https://balajiselvaraj1601.github.io';

const REDIRECT_STUB_PATHS = [
  '/contact',
  '/experience',
  '/projects',
  '/research',
  '/recognition',
  '/vision',
];

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: '/',
  trailingSlash: 'ignore',
  // This repo uses port 4321 only. Pinning here (single source of truth) keeps
  // `npm run dev` on 4321 instead of relying on the CLI default. If 4321 is
  // occupied at launch, free it first rather than letting Astro auto-increment.
  server: { port: 4321, host: '127.0.0.1' },
  integrations: [
    sitemap({
      filter: (page) =>
        !REDIRECT_STUB_PATHS.some((stub) => page.includes(stub)),
    }),
  ],
  build: {
    // Keep clean URLs and a predictable asset folder.
    assets: '_astro',
  },
});
