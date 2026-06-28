/** Nav-driven section views for the single-page home layout. */

export type NavViewConfig = {
  viewAnchor: string;
  viewSections: string[];
};

export type SectionViewsOptions = {
  views: NavViewConfig[];
  defaultView: string;
};

const NAV_VIEW_CHANGE = 'nav-view-change';

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

function hashToView(hash: string, views: NavViewConfig[]): string | null {
  const anchor = hash.replace(/^#/, '');
  if (!anchor) return null;
  return views.find((v) => v.viewAnchor === anchor)?.viewAnchor ?? null;
}

function getRoots(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>('.section-view-root[data-nav-views]')
  );
}

function getMainChildren(): Element[] {
  return Array.from(document.getElementById('main')?.children ?? []);
}

function setRootHidden(root: HTMLElement, hidden: boolean) {
  root.hidden = hidden;
  root.setAttribute('aria-hidden', String(hidden));
  if (hidden) {
    root.setAttribute('inert', '');
  } else {
    root.removeAttribute('inert');
  }
}

function updateNavActive(viewAnchor: string) {
  const nav = document.getElementById('primary-nav');
  if (!nav) return;

  nav.querySelectorAll<HTMLAnchorElement>('a[data-view-anchor]').forEach((link) => {
    const isActive = link.dataset.viewAnchor === viewAnchor;
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function syncDividers() {
  const children = getMainChildren();

  children.forEach((el, i) => {
    if (!(el instanceof HTMLElement) || !el.matches('[data-nav-divider]')) return;

    let prevVisible = false;
    let nextVisible = false;

    for (let j = i - 1; j >= 0; j--) {
      const prev = children[j];
      if (prev instanceof HTMLElement && prev.matches('.section-view-root')) {
        prevVisible = !prev.hidden;
        break;
      }
    }
    for (let j = i + 1; j < children.length; j++) {
      const next = children[j];
      if (next instanceof HTMLElement && next.matches('.section-view-root')) {
        nextVisible = !next.hidden;
        break;
      }
    }

    el.hidden = !(prevVisible && nextVisible);
  });
}

function firstVisibleSectionId(viewAnchor: string, views: NavViewConfig[]): string | undefined {
  const view = views.find((v) => v.viewAnchor === viewAnchor);
  if (!view) return undefined;
  const roots = getRoots();
  for (const sectionId of view.viewSections) {
    const root = roots.find((r) => r.dataset.sectionId === sectionId && !r.hidden);
    if (root) return sectionId;
  }
  return view.viewSections[0];
}

function scrollToSection(sectionId: string | undefined) {
  if (!sectionId) return;
  const target = document.getElementById(sectionId);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function activateView(
  viewAnchor: string,
  views: NavViewConfig[],
  options: { scroll?: boolean } = {}
) {
  const view = views.find((v) => v.viewAnchor === viewAnchor);
  if (!view) return;

  const activeSet = new Set(view.viewSections);

  getRoots().forEach((root) => {
    const sectionId = root.dataset.sectionId ?? '';
    setRootHidden(root, !activeSet.has(sectionId));
  });

  syncDividers();
  updateNavActive(viewAnchor);

  const sectionId = firstVisibleSectionId(viewAnchor, views);
  document.dispatchEvent(
    new CustomEvent(NAV_VIEW_CHANGE, {
      detail: { viewAnchor, sectionIds: view.viewSections },
    })
  );

  if (options.scroll !== false) {
    scrollToSection(sectionId);
  }
}

export function initSectionViews(options: SectionViewsOptions) {
  if (normalizePath(window.location.pathname) !== '/') return;

  const { views, defaultView } = options;
  if (!views.length) return;

  const resolveInitialView = (): string => {
    const fromHash = hashToView(window.location.hash, views);
    return fromHash ?? defaultView;
  };

  const applyFromHash = (scroll: boolean) => {
    activateView(resolveInitialView(), views, { scroll });
  };

  applyFromHash(window.location.hash.length > 0);

  document.getElementById('primary-nav')?.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
      'a[data-view-anchor]'
    );
    if (!link) return;

    event.preventDefault();
    const anchor = link.dataset.viewAnchor;
    if (!anchor) return;

    if (anchor === defaultView) {
      history.pushState(null, '', '/');
    } else {
      history.pushState(null, '', `#${anchor}`);
    }
    activateView(anchor, views);
  });

  document.querySelectorAll<HTMLAnchorElement>('a[data-view-anchor].nav-cta').forEach((cta) => {
    cta.addEventListener('click', (event) => {
      event.preventDefault();
      history.pushState(null, '', '#contact');
      activateView('contact', views);
    });
  });

  window.addEventListener('hashchange', () => applyFromHash(true));
  window.addEventListener('popstate', () => applyFromHash(true));
}

export { NAV_VIEW_CHANGE };
