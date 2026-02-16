(function () {
  'use strict';

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
})();
