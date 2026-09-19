/* Samyog Karki - portfolio behaviour. No dependencies except the EmailJS SDK. */
(function () {
  "use strict";

  /* --- sticky header --- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- mobile nav --- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* --- reveal on scroll --- */
  var revealables = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    Array.prototype.forEach.call(revealables, function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + "ms";
      io.observe(el);
    });
  }

  /* --- current year --- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- contact form (EmailJS) --- */
  var form = document.getElementById("contactForm");
  if (form && window.emailjs) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var status = document.getElementById("formStatus");
      var label = button ? button.textContent : "";

      if (button) { button.disabled = true; button.textContent = "Sending..."; }
      if (status) { status.textContent = ""; status.className = "form-status"; }

      emailjs.sendForm("service_myxs9rs", "template_8nwy12j", form).then(
        function () {
          if (button) { button.disabled = false; button.textContent = label; }
          if (status) { status.textContent = "Message sent. I will reply soon."; status.className = "form-status ok"; }
          form.reset();
          setTimeout(function () {
            if (status) { status.textContent = ""; status.className = "form-status"; }
          }, 6000);
        },
        function (error) {
          if (button) { button.disabled = false; button.textContent = label; }
          if (status) { status.textContent = "Could not send. Please email me directly."; status.className = "form-status err"; }
          console.error("EmailJS failed:", error);
        }
      );
    });
  }
})();
