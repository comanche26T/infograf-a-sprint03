// Smooth navigation and small progressive animations for the static page.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const actionButtons = document.querySelectorAll('[data-target]');
const navAnchors = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');

function closeMenu() {
  menuToggle?.classList.remove('is-open');
  navLinks?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMenu();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

actionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    scrollToSection(button.dataset.target);
  });
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    scrollToSection(href.slice(1));
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => {
        anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px' }
);

document.querySelectorAll('main section[id]').forEach((section) => {
  sectionObserver.observe(section);
});
