/** Light/white marks that render on the dark card without a white pill. */
const PLAIN_LOGO_SLUGS = new Set(['jitc', 'hcl']);

/** How an org mark is framed inside a card shell (see design-consistency-contract §5). */
export type LogoSlotShape = 'rect' | 'round' | 'plain' | 'emblem' | 'icon';

export function logoUsesBadge(slug?: string, override?: boolean): boolean {
  if (override !== undefined) return override;
  if (!slug) return true;
  return !PLAIN_LOGO_SLUGS.has(slug);
}

/** Pipeline-generated logo_* badges already draw their own circular ring. */
export function logoHasOwnRing(slug?: string): boolean {
  return !!slug?.startsWith('logo_');
}

/**
 * Resolve which logo/mark slot pattern applies inside a card.
 * - rect: horizontal wordmark in `.logo-badge` pill (white surface, rounded rect)
 * - round: square/circular chrome for emblem marks (`.logo-badge--round` or `.icon-tile--round`)
 * - plain: bare mark on card background (dark/light logos without pill)
 * - emblem: self-ringed pipeline logo — no extra chrome (MarkEmblem fills slot)
 * - icon: Lucide fallback when no logo asset exists
 */
export function resolveLogoSlot(
  slug?: string,
  opts?: {
    useBadge?: boolean;
    ownRing?: boolean;
    hasLogo?: boolean;
    fallbackIcon?: boolean;
    roundBadge?: boolean;
  }
): LogoSlotShape {
  if (opts?.fallbackIcon || (!opts?.hasLogo && !slug)) return 'icon';
  if (opts?.ownRing ?? logoHasOwnRing(slug)) return 'emblem';
  const badge = opts?.useBadge ?? logoUsesBadge(slug);
  if (!badge) return 'plain';
  return opts?.roundBadge ? 'round' : 'rect';
}
