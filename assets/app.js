/* Colorai personal site — progressive enhancement. No tracking, no cookies. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ── Pangu spacing: auto-space between CJK and Latin/digits ───────────── */
  var CJK = "[\\u4e00-\\u9fff\\u3400-\\u4dbf\\u3040-\\u30ff\\uac00-\\ud7af]";
  var LATIN = "[A-Za-z0-9]";
  var re1 = new RegExp("(" + CJK + ")(" + LATIN + ")", "g");
  var re2 = new RegExp("(" + LATIN + ")(" + CJK + ")", "g");
  var SKIP = { PRE: 1, CODE: 1, SCRIPT: 1, STYLE: 1, TEXTAREA: 1, SVG: 1 };

  function pangu(node) {
    if (node.nodeType === 3) { // text node
      var t = node.nodeValue;
      if (re1.test(t) || re2.test(t)) {
        node.nodeValue = t.replace(re1, "$1 $2").replace(re2, "$1 $2");
      }
      return;
    }
    if (node.nodeType !== 1 || SKIP[node.tagName]) return;
    Array.prototype.slice.call(node.childNodes).forEach(pangu);
  }

  /* ── reveal on scroll ─────────────────────────────────────────────────── */
  document.querySelectorAll(".section, .bento-card, .project").forEach(function (el) {
    el.classList.add("reveal");
  });
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    revealables.forEach(function (el) { obs.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── nav active highlight ─────────────────────────────────────────────── */
  var sections = document.querySelectorAll("section[id]");
  var links = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.style.color = a.getAttribute("href") === "#" + entry.target.id ? "#f7f8f8" : "";
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* run pangu on the whole document */
  pangu(document.body);
})();
