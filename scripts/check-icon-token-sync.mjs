#!/usr/bin/env node
/**
 * SSOT drift check: ICON_SIZE_TOKENS in src/lib/icon-render.ts must match the
 * --icon-* pixel tokens in src/styles/global.css. Fails (exit 1) on any
 * mismatch, missing key, or unparseable source. Wired into `npm run verify`.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const tsSource = readFileSync(join(root, 'src/lib/icon-render.ts'), 'utf8');
const cssSource = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

const tsBlock = tsSource.match(
  /ICON_SIZE_TOKENS\s*=\s*\{([\s\S]*?)\}\s*as const/
);
if (!tsBlock) {
  console.error(
    'check-icon-token-sync: could not locate ICON_SIZE_TOKENS in src/lib/icon-render.ts'
  );
  process.exit(1);
}

const tsTokens = new Map(
  [...tsBlock[1].matchAll(/(\w+)\s*:\s*(\d+)/g)].map(([, k, v]) => [
    k,
    Number(v),
  ])
);

const cssTokens = new Map(
  [...cssSource.matchAll(/--icon-(\w+)\s*:\s*(\d+)px/g)].map(([, k, v]) => [
    k,
    Number(v),
  ])
);

const errors = [];
for (const [key, tsValue] of tsTokens) {
  if (!cssTokens.has(key)) {
    errors.push(`--icon-${key} missing in global.css (TS has ${tsValue})`);
  } else if (cssTokens.get(key) !== tsValue) {
    errors.push(
      `--icon-${key}: global.css has ${cssTokens.get(key)}px, ICON_SIZE_TOKENS has ${tsValue}`
    );
  }
}
for (const key of cssTokens.keys()) {
  if (!tsTokens.has(key)) {
    errors.push(
      `ICON_SIZE_TOKENS missing "${key}" (global.css defines --icon-${key})`
    );
  }
}

if (tsTokens.size === 0 || cssTokens.size === 0) {
  errors.push(
    `parsed ${tsTokens.size} TS tokens and ${cssTokens.size} CSS tokens — parser drift?`
  );
}

if (errors.length > 0) {
  console.error('check-icon-token-sync: FAIL');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `check-icon-token-sync: OK (${tsTokens.size} tokens in sync: ${[...tsTokens.keys()].join(', ')})`
);
