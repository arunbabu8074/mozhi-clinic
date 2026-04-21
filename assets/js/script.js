/* ============================================================
   MOZHI – Main JavaScript
   ============================================================ */

(function () {
  "use strict";

  /* ── Sticky nav shrink on scroll ── */
  const nav = document.querySelector(".nav");

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector(".nav__hamburger");
  const mobileMenu = document.querySelector(".nav__mobile");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      const isOpen = hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ── Scroll-reveal animation ── */
  const revealEls = document.querySelectorAll(
    ".about__left, .about__visual, .service-card, .approach__step, .pillar",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  /* ── WhatsApp CTA button ── */
  const WHATSAPP_NUMBER = "919496827886"; // Replace with actual number
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hello, I would like to book a consultation at Mozhi Counseling & Therapy Centre.",
  );

  document.querySelectorAll("[data-whatsapp]").forEach(function (btn) {
    btn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + WHATSAPP_MESSAGE;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  /* ── Appointment form ── */
  const form = document.querySelector(".js-appointment-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const service = form.querySelector('[name="service"]').value;
      const message = form.querySelector('[name="message"]').value.trim();
      const date = form.querySelector('[name="date"]').value.trim();

      if (!name || !phone || !date || !service) {
        showFormMessage(
          form,
          "Please fill in your details.",
          "error",
        );
        return;
      }

      // Build WhatsApp message from form
      const wa = [
        "Hello! I would like to book an appointment at Mozhi.",
        "Name: " + name,
        "Phone: " + phone,
        service ? "Service: " + service : "",
        message ? "Message: " + message : "",
        "Date: " + date,
      ]
        .filter(Boolean)
        .join("\n");

      const url =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(wa);
      window.open(url, "_blank", "noopener,noreferrer");

      showFormMessage(form, "Redirecting you to WhatsApp…", "success");
      form.reset();
    });
  }

  function showFormMessage(form, text, type) {
    let msg = form.querySelector(".form-message");
    if (!msg) {
      msg = document.createElement("p");
      msg.className = "form-message";
      form.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.cssText = [
      "font-size: 0.78rem",
      "margin-top: 0.75rem",
      "letter-spacing: 0.04em",
      "color: " + (type === "error" ? "#f08080" : "var(--sage)"),
    ].join(";");

    setTimeout(function () {
      msg.textContent = "";
    }, 5000);
  }
})();
