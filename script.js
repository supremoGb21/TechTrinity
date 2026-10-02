/* ============================================
   MOBILE NAV TOGGLE
============================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ============================================
   NAVBAR SCROLL STATE
============================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================================
   SCROLL REVEAL
============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   PORTFOLIO FILTER
============================================ */
const filterButtons = document.querySelectorAll('.filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
      if (show) {
        item.classList.remove('visible');
        requestAnimationFrame(() => item.classList.add('visible'));
      }
    });
  });
});

/* ============================================
   CONTACT FORM (Formspree AJAX)
============================================ */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formNote.textContent = '';
  formNote.style.color = 'var(--accent)';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formNote.textContent = '✓ Thanks! We received your brief and will reply within 24 hours.';
      form.reset();
    } else {
      const data = await response.json().catch(() => ({}));
      formNote.style.color = '#F87171';
      formNote.textContent = data.error || '✗ Something went wrong. Please email us directly.';
    }
  } catch (err) {
    formNote.style.color = '#F87171';
    formNote.textContent = '✗ Network error. Please check your connection and try again.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    setTimeout(() => { formNote.textContent = ''; }, 8000);
  }
});

/* ============================================
   SMOOTH SCROLL FALLBACK
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});