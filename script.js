(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const brand = document.querySelector('.brand');
  const main = document.querySelector('main');
  const footer = document.querySelector('.site-footer');

  const closeMenu = ({ restoreFocus = false } = {}) => {
    const wasOpen = document.body.classList.contains('menu-open');
    document.body.classList.remove('menu-open');
    nav?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (main) main.inert = false;
    if (footer) footer.inert = false;
    brand?.removeAttribute('aria-hidden');
    if (wasOpen && restoreFocus) menuToggle?.focus();
  };

  const openMenu = () => {
    document.body.classList.add('menu-open');
    nav?.classList.add('is-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    brand?.setAttribute('aria-hidden', 'true');
    nav?.querySelector('a')?.focus();
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu({ restoreFocus: true }) : openMenu();
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  window.addEventListener('keydown', (event) => {
    if (!document.body.classList.contains('menu-open')) return;

    if (event.key === 'Escape') {
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== 'Tab' || !menuToggle || !nav) return;
    const focusable = [menuToggle, ...nav.querySelectorAll('a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
