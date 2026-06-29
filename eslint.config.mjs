import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

// Flat config (ESLint 9+/10). Code-quality only — formatting is owned by
// Prettier (see .prettierrc); `prettier` last disables any conflicting rules.
export default tseslint.config(
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // Allow intentional unused args/vars when prefixed with `_`.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Astro's generated env.d.ts uses the conventional triple-slash reference.
    files: ['**/*.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
  {
    // Node tooling scripts (icon pipeline, smoke test) — Node + (Playwright
    // page.evaluate) browser globals.
    files: ['scripts/**/*.mjs', '.cursor/**/*.mjs', '*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        setTimeout: 'readonly',
        document: 'readonly',
        window: 'readonly',
        getComputedStyle: 'readonly',
      },
    },
  },
  {
    // Browser-targeted client scripts and inline Astro scripts use DOM globals.
    files: ['src/scripts/**/*.ts', '**/*.astro'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        IntersectionObserver: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        matchMedia: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        getComputedStyle: 'readonly',
        HTMLElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        FileReader: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
      },
    },
  },
  prettier
);
