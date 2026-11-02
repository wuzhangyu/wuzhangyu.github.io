/* COLORAI personal site — progressive enhancement only. No tracking, no cookies. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ── reveal on scroll ─────────────────────────────────────────────────── */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── email obfuscation ───────────────────────────────────────────────── */
  var emailLink = document.getElementById("email-link");
  var emailText = document.getElementById("email-text");
  if (emailLink && emailText) {
    var address = "colorai" + "@" + "hnu.edu.cn";
    emailText.textContent = address;
    emailLink.href = "mailto:" + address;
  }

  /* ── nav active highlight on scroll ──────────────────────────────────── */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll("nav a[href^='#']");
  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();
