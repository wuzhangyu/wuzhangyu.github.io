/* Colorai personal site — progressive enhancement. No tracking, no cookies. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ═══════════ PANGU · CJK-Latin auto spacing ═══════════ */
  var CJK = "[\\u4e00-\\u9fff\\u3400-\\u4dbf\\u3040-\\u30ff\\uac00-\\ud7af]";
  var LATIN = "[A-Za-z0-9]";
  var re1 = new RegExp("(" + CJK + ")(" + LATIN + ")", "g");
  var re2 = new RegExp("(" + LATIN + ")(" + CJK + ")", "g");
  var SKIP = { PRE: 1, CODE: 1, SCRIPT: 1, STYLE: 1, TEXTAREA: 1, SVG: 1 };
  function pangu(node) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      if (re1.test(t) || re2.test(t)) node.nodeValue = t.replace(re1, "$1 $2").replace(re2, "$1 $2");
      return;
    }
    if (node.nodeType !== 1 || SKIP[node.tagName]) return;
    Array.prototype.slice.call(node.childNodes).forEach(pangu);
  }

  /* ═══════════ PRELOADER · boot splash ═══════════ */
  var pre = document.getElementById("preloader");
  var body = document.body;
  var bootDone = false;

  var bootLines = [
    { t: "$ boot --target silicon", c: "p" },
    { t: "▸ DC Bus Charging ... 0V → 60V", c: "ok" },
    { t: "▸ Gate Driver UCC21520 ... [OK]", c: "ok" },
    { t: "▸ Simulink Model Compiled ... [OK]", c: "ok" },
    { t: "▸ ADC & PWM ... [OK]", c: "ok" },
    { t: "✓ Silicon Ready.", c: "done" }
  ];

  function revealHero() {
    document.querySelectorAll(".hero .reveal-stagger > *").forEach(function (el, i) {
      el.classList.add("in");
      el.style.transitionDelay = (i * 90) + "ms";
    });
  }

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    pre.classList.add("done");
    body.classList.remove("locked");
    revealHero();
    setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 900);
  }

  function runBoot() {
    var term = document.getElementById("boot-term");
    var bar = document.getElementById("boot-bar");
    if (reduced) { finishBoot(); return; }
    var start = performance.now();
    // progress 0→100% over 1.25s
    function tick(now) {
      var p = Math.min(1, (now - start) / 1250);
      bar.style.width = (p * 100).toFixed(1) + "%";
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    bootLines.forEach(function (line, i) {
      setTimeout(function () {
        var d = document.createElement("div");
        d.className = "boot-line " + line.c;
        d.textContent = line.t;
        term.appendChild(d);
        if (i === bootLines.length - 1) finishBoot();
      }, i * 210 + 60);
    });
    // hard cap: force finish at 1.5s in case anything hangs
    setTimeout(finishBoot, 1500);
  }

  if (pre) {
    if (sessionStorage.getItem("colorai-booted") === "1") {
      finishBoot();
    } else {
      body.classList.add("locked");
      runBoot();
      var skip = function () { sessionStorage.setItem("colorai-booted", "1"); finishBoot(); };
      pre.addEventListener("click", skip);
      window.addEventListener("keydown", function (e) { if (e.key === "Escape" || e.key === " ") skip(); });
    }
    sessionStorage.setItem("colorai-booted", "1");
  } else {
    revealHero();
  }

  /* ═══════════ REVEAL · staggered on scroll ═══════════ */
  function setupReveal() {
    var groups = document.querySelectorAll(".reveal-stagger");
    if (!("IntersectionObserver" in window)) {
      groups.forEach(function (g) { g.classList.add("in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    groups.forEach(function (g) { obs.observe(g); });
  }

  /* ═══════════ SPOTLIGHT · mouse-follow radial glow ═══════════ */
  function setupSpotlight() {
    if (reduced) return;
    var cards = document.querySelectorAll(".bento-card, .project, .travel-card");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ═══════════ SCROLLSPY · nav highlight + sliding indicator ═══════════ */
  function setupScrollSpy() {
    var nav = document.querySelector(".nav-links");
    if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
    var indicator = document.createElement("span");
    indicator.className = "nav-indicator";
    nav.appendChild(indicator);

    function activate(link) {
      if (!link) return;
      links.forEach(function (a) { a.classList.toggle("active", a === link); });
      indicator.style.left = link.offsetLeft + "px";
      indicator.style.width = link.offsetWidth + "px";
    }

    var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); })
                       .filter(Boolean);
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activate(links.filter(function (a) { return a.getAttribute("href") === "#" + entry.target.id; })[0]);
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { spy.observe(s); });
    }
    // initial
    if (sections.length) activate(links[0]);
    window.addEventListener("resize", function () {
      var cur = links.filter(function (a) { return a.classList.contains("active"); })[0];
      if (cur) activate(cur);
    });
  }

  /* run everything */
  pangu(document.body);
  setupReveal();
  setupSpotlight();
  setupScrollSpy();
})();
