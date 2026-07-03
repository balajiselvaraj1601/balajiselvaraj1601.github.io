/**
 * card-mark.ts — Typed factory helpers for CardMark prop objects.
 *
 * Callers import a factory to build a strongly-typed CardMarkProps value instead
 * of constructing the object ad-hoc. The three factories cover the three canonical
 * mark patterns from design-consistency-contract §5.
 *
 * SSOT: CardMarkProps re-exported from CardMark.astro (Props interface).
 */
import type { CardMarkProps } from '@components/ui/CardMark.astro';
import type { VisionMark } from '@schemas';
import type { IconName } from '@lib/icons';

export type { CardMarkProps };

/**
 * Logo mode — horizontal wordmark or emblem in `.logo-badge` chrome.
 * Use when a logo file URL is available.
 */
export function cardMarkLogo(opts: {
  slug?: string;
  logoUrl: string;
  altText?: string;
  class?: string;
}): CardMarkProps {
  return {
    slug: opts.slug,
    logoUrl: opts.logoUrl,
    altText: opts.altText,
    class: opts.class,
  };
}

/**
 * Theme-card emblem mode — pipeline logo_* or icon mark inside the accent circle
 * (`.theme-card__icon`). Use for Vision org / program cards.
 */
export function cardMarkTheme(opts: {
  mark: VisionMark;
  class?: string;
}): CardMarkProps {
  return {
    mark: opts.mark,
    context: 'theme-card',
    emblemInCircle: true,
    class: opts.class,
  };
}

/**
 * Icon-tile mode — Lucide fallback icon in `.icon-tile` chrome.
 * Use when no logo asset exists.
 */
export function cardMarkTile(opts: {
  icon?: string;
  iconFallback?: IconName;
  variant?: 'default' | 'recog' | 'compact' | 'accented';
  class?: string;
}): CardMarkProps {
  return {
    icon: opts.icon,
    iconFallback: opts.iconFallback,
    variant: opts.variant,
    class: opts.class,
  };
}
