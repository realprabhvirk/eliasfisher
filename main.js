// Elias Fisher Sports & Remedial Massage Therapy
// This site has no backend and no contact form. Contact is handled entirely
// through click-to-call, mailto, and Facebook links. Do not add a form
// submit handler here, there is nothing on the server to receive it.

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    var closeMenu = function () {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    };

    var openMenu = function () {
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
    };

    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', function (event) {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;
      var clickedInsideMenu = navMenu.contains(event.target);
      var clickedToggle = navToggle.contains(event.target);
      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close the mobile menu once a nav link is chosen
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Smooth scroll for on-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Scroll-triggered reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Click-to-call ---------- */
  // Phone links use tel: hrefs directly in the markup, this just confirms
  // every phone-number element on the page is wired up correctly.
  document.querySelectorAll('[data-phone-link]').forEach(function (el) {
    if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').indexOf('tel:') === 0) {
      return;
    }
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      window.location.href = 'tel:+61400940569';
    });
  });
})();
