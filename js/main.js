/* ============================================================
   FADE IN on load
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

/* ============================================================
   MOBILE NAV — hamburger toggle
   ============================================================ */
const burger   = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================================
   TIMELINE — expand / collapse
   ============================================================ */
document.querySelectorAll('.timeline-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const targetId = btn.getAttribute('aria-controls');
    const target   = document.getElementById(targetId);

    btn.setAttribute('aria-expanded', String(!expanded));
    if (target) target.hidden = expanded;
  });
});

/* ============================================================
   FORMATION ACCORDION
   ============================================================ */
const accordionBtn = document.querySelector('.accordion-toggle');
if (accordionBtn) {
  accordionBtn.addEventListener('click', () => {
    const expanded = accordionBtn.getAttribute('aria-expanded') === 'true';
    const targetId = accordionBtn.getAttribute('aria-controls');
    const target   = document.getElementById(targetId);

    accordionBtn.setAttribute('aria-expanded', String(!expanded));
    if (target) target.hidden = expanded;
  });
}

/* ============================================================
   METRICS COUNT-UP
   ============================================================ */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
  const target   = parseInt(el.dataset.target, 10);
  const prefix   = el.dataset.prefix  || '';
  const suffix   = el.dataset.suffix  || '';
  const duration = 1400;

  if (prefersReduced || isNaN(target)) {
    el.textContent = prefix + target + suffix;
    return;
  }

  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const metricsSection = document.getElementById('metrics');
if (metricsSection) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      metricsSection.querySelectorAll('.metric-number').forEach(countUp);
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(metricsSection);
}

/* ============================================================
   ACTIVE NAV LINK on scroll
   ============================================================ */
const sections = document.querySelectorAll('main section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length && navItems.length) {
  const activateLink = (id) => {
    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + id
        ? 'var(--copper)'
        : '';
    });
  };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activateLink(entry.target.id);
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}
