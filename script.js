(function () {
  'use strict';

  // ===== Footer year =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(function (section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector('.nav-link[href="#' + sectionId + '"]');

      if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(function (l) {
          l.classList.remove('active');
        });
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Run once on load

  // ===== Header background on scroll =====
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
      }
    });
  }

  // ===== Smooth scroll for anchor links (fallback) =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Contact form (Google-form style) =====
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setFormStatus(message, kind) {
    if (!formStatus) return;
    formStatus.classList.remove('ok', 'err');
    if (kind) formStatus.classList.add(kind);
    formStatus.textContent = message || '';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = String(document.getElementById('name')?.value || '').trim();
      const email = String(document.getElementById('email')?.value || '').trim();
      const subject = String(document.getElementById('subject')?.value || '').trim();
      const message = String(document.getElementById('message')?.value || '').trim();

      if (!name || !email || !subject || !message) {
        setFormStatus('Please fill in all fields.', 'err');
        return;
      }

      const to = 'lozawanaw@gmail.com';
      const mailSubject = encodeURIComponent('Portfolio message: ' + subject);
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        message
      );

      setFormStatus('Opening your email app...', 'ok');
      window.location.href = 'mailto:' + to + '?subject=' + mailSubject + '&body=' + body;
      contactForm.reset();
      setTimeout(function () {
        setFormStatus('Message prepared. If your email app didn’t open, copy your message and email me directly.', 'ok');
      }, 800);
    });
  }

  // ===== Scroll reveal motion =====
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
