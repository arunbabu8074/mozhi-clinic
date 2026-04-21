/* ============================================================
   SLT Department Section — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Tab switching ── */
  var tabs  = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.slt-panel');

  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.panel;

      /* Update tab buttons */
      tabs.forEach(function (b) {
        b.classList.remove('tab--paed', 'tab--adult', 'tab--delivery');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('tab--' + target);
      btn.setAttribute('aria-selected', 'true');

      /* Update panels */
      panels.forEach(function (p) {
        p.classList.remove('panel--visible');
      });

      var active = document.getElementById('panel-' + target);
      if (active) {
        /* Re-trigger stagger animation by cloning the grid */
        var grid = active.querySelector('.cards-grid');
        if (grid) {
          var clone = grid.cloneNode(true);
          grid.parentNode.replaceChild(clone, grid);
          /* Re-attach click listeners after DOM replace */
          clone.querySelectorAll('.svc-card').forEach(attachCardToggle);
        }
        active.classList.add('panel--visible');
      }
    });
  });

  /* ── Card expand / collapse ── */
  function attachCardToggle(card) {
    card.addEventListener('click', function () {
      var isOpen = card.classList.toggle('card--open');
      var toggleText = card.querySelector('.toggle-text');
      if (toggleText) {
        toggleText.textContent = isOpen ? 'Hide' : 'See details';
      }
    });
  }

  document.querySelectorAll('.svc-card').forEach(attachCardToggle);

  /* ── Scroll reveal (Intersection Observer) ── */
  if ('IntersectionObserver' in window) {
    var sectionHeader = document.querySelector('.slt-header');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    if (sectionHeader) {
      sectionHeader.style.opacity = '0';
      sectionHeader.style.transform = 'translateY(20px)';
      sectionHeader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(sectionHeader);

      sectionHeader.addEventListener('transitionend', function () {
        if (sectionHeader.classList.contains('revealed')) {
          sectionHeader.style.opacity = '';
          sectionHeader.style.transform = '';
        }
      });

      /* Force show on observe */
      var hObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            hObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      hObserver.observe(sectionHeader);
    }
  }

})();
