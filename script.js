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
   AUTO-CLOSE MOBILE MENU ON SCROLL
============================================ */
let lastScrollPos = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (Math.abs(currentScroll - lastScrollPos) > 60 && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
  lastScrollPos = currentScroll;
}, { passive: true });

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
   CONTACT FORM (Web3Forms)
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
    const formData = new FormData(form);
    const json = Object.fromEntries(formData);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(json)
    });

    const data = await response.json();

    if (data.success) {
      formNote.textContent = '✓ Thanks! Your brief was sent. We\'ll reply within 24 hours.';
      form.reset();
    } else {
      formNote.style.color = '#F87171';
      formNote.textContent = '✗ ' + (data.message || 'Something went wrong. Please email us directly.');
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
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});