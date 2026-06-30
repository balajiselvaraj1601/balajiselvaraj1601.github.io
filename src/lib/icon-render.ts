import type { IconName } from './icons';
import iconPaths from './icon-paths.json';

/** Brand marks use filled Simple Icons geometry; Lucide icons use stroke. */
const FILLED_ICONS = new Set<IconName>(['linkedin', 'kaggle', 'github']);

export const ICON_SIZE_TOKENS = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSizeToken = keyof typeof ICON_SIZE_TOKENS;

export function isFilledIcon(name: IconName): boolean {
  return FILLED_ICONS.has(name);
}

export function iconPixelSize(size: number | IconSizeToken): number {
  if (typeof size === 'number') return size;
  return ICON_SIZE_TOKENS[size];
}

/** Inner SVG markup for a semantic icon (paths/groups only). */
export function iconBody(name: IconName): string {
  const raw = iconPaths[name];
  if (!raw) return '';
  if (isFilledIcon(name)) {
    return raw.replace(/fill="#000"/g, 'fill="currentColor"');
  }
  return raw;
}
