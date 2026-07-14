// NOTE: listeners/observers here assume MPA full-page loads (no teardown). If Astro view transitions are ever enabled, add AbortController-based cleanup.
import { initSectionViews, type SectionViewsOptions } from './section-views';

export function initSiteChrome(navViewsConfig?: SectionViewsOptions) {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const main = document.getElementById('main');
  const footer = document.querySelector('.site-footer');
  const headerActions = document.querySelector('.site-header__actions');

  function getMenuFocusables(): HTMLElement[] {
    if (!nav?.classList.contains('is-open')) return [];
    const selector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const inNav = Array.from(nav.querySelectorAll<HTMLElement>(selector));
    const toggleEl = navToggle instanceof HTMLElement ? [navToggle] : [];
    return [...inNav, ...toggleEl];
  }

  function setMenu(open: boolean) {
    nav?.classList.toggle('is-open', open);
    navToggle?.setAttribute('aria-expanded', String(open));
    const openLabel =
      navToggle?.getAttribute('data-open-label') ??
      navToggle?.getAttribute('aria-label') ??
      '';
    const closeLabel = navToggle?.getAttribute('data-close-label') ?? openLabel;
    navToggle?.setAttribute('aria-label', open ? closeLabel : openLabel);
    document.body.style.overflow = open ? 'hidden' : '';
    main?.toggleAttribute('inert', open);
    footer?.toggleAttribute('inert', open);
    if (headerActions instanceof HTMLElement) {
      headerActions.toggleAttribute('inert', open);
    }
    if (open) getMenuFocusables()[0]?.focus();
  }
  const isOpen = () => navToggle?.getAttribute('aria-expanded') === 'true';

  navToggle?.addEventListener('click', () => setMenu(!isOpen()));
  nav?.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('a') && isOpen()) setMenu(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;

    if (e.key === 'Escape') {
      setMenu(false);
      navToggle?.focus();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getMenuFocusables();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && isOpen()) setMenu(false);
  });

  initReveal();
  initHeaderScrollState();

  if (navViewsConfig) {
    initSectionViews(navViewsConfig);
  }
}

function initHeaderScrollState() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveal() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const heroReveal = document.querySelector('#hero.reveal, #hero .reveal');
  if (heroReveal) heroReveal.classList.add('is-visible');

  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const ro = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => {
    if (!el.closest('#hero')) ro.observe(el);
  });
}
