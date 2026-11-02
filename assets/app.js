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
    { t: "[0.00s] Initializing Power Stage & STC15/DSP Interrupts...", c: "ok" },
    { t: "[0.32s] DC Bus Soft-Start Pre-charging: 0V \u2192 60.0V", c: "hl" },
    { t: "[0.68s] Simulink PI + Quasi-PR Loop \u00b7 THD < 0.3% Verified", c: "ok" },
    { t: "[1.05s] From Simulation to Silicon. Welcome, Colorai.", c: "done" }
  ];
  var bootDelays = [80, 360, 720, 1050];

  function revealGroup(group) {
    if (!group || group.classList.contains("in")) return;
    var kids = group.children;
    for (var i = 0; i < kids.length; i++) kids[i].style.transitionDelay = (i * 80) + "ms";
    group.classList.add("in");
  }

  function revealHero() {
    document.querySelectorAll(".hero .reveal-stagger").forEach(revealGroup);
  }

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    pre.classList.add("done");
    body.classList.remove("locked");
    revealHero();
  }

  function resetBoot() {
    var term = document.getElementById("boot-term");
    var bar = document.getElementById("boot-bar");
    var volt = document.getElementById("boot-voltage");
    if (term) term.innerHTML = "";
    if (bar) bar.style.width = "0";
    if (volt) volt.textContent = "0.0 V (0%)";
  }

  function runBoot() {
    var term = document.getElementById("boot-term");
    var bar = document.getElementById("boot-bar");
    var volt = document.getElementById("boot-voltage");
    if (reduced) { finishBoot(); return; }
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / 1250);
      bar.style.width = (p * 100).toFixed(1) + "%";
      if (volt) volt.textContent = (p * 60).toFixed(1) + " V (" + Math.round(p * 100) + "%)";
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
      }, bootDelays[i]);
    });
    setTimeout(finishBoot, 1500); // hard cap
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
    var replayBtn = document.getElementById("replay-boot");
    if (replayBtn) replayBtn.addEventListener("click", function () {
      bootDone = false;
      pre.classList.remove("done");
      body.classList.add("locked");
      resetBoot();
      runBoot();
    });
  } else {
    revealHero();
  }

  /* ═══════════ REVEAL · staggered on scroll ═══════════ */
  function setupReveal() {
    var groups = Array.prototype.filter.call(
      document.querySelectorAll(".reveal-stagger"),
      function (g) { return !g.closest(".hero"); }
    );
    if (!("IntersectionObserver" in window)) {
      groups.forEach(revealGroup);
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { revealGroup(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    groups.forEach(function (g) { obs.observe(g); });
  }

  /* ═══════════ SPOTLIGHT · mouse-follow radial glow ═══════════ */
  function setupSpotlight() {
    if (reduced) return;
    var cards = document.querySelectorAll(".bento-card, .project-featured, .project-card, .travel-card, .hero-telemetry");
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

    var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
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
    if (sections.length) activate(links[0]);
    window.addEventListener("resize", function () {
      var cur = links.filter(function (a) { return a.classList.contains("active"); })[0];
      if (cur) activate(cur);
    });
  }

  /* ═══════════ PROJECT FILTER ═══════════ */
  function setupFilter() {
    var btns = document.querySelectorAll(".filter-btn");
    var projs = document.querySelectorAll("[data-cat]");
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        projs.forEach(function (p) {
          p.classList.toggle("is-filtered-out", cat !== "all" && p.getAttribute("data-cat") !== cat);
        });
      });
    });
  }

  /* ═══════════ COPY EMAIL + TOAST ═══════════ */
  function setupCopy() {
    var btn = document.getElementById("copy-email");
    var toast = document.getElementById("toast");
    if (!btn || !toast) return;
    var timer;
    btn.addEventListener("click", function () {
      var email = "colorai@hnu.edu.cn";
      function done() {
        toast.classList.add("show");
        clearTimeout(timer);
        timer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ═══════════ WORLD MAP TOOLTIP ═══════════ */
  function setupMapTip() {
    var tip = document.getElementById("map-tip");
    var cities = document.querySelectorAll("#world-map .city");
    if (!tip || !cities.length) return;
    cities.forEach(function (c) {
      c.addEventListener("mouseenter", function () {
        var name = c.getAttribute("data-name");
        var lat = parseFloat(c.getAttribute("data-lat"));
        var lng = parseFloat(c.getAttribute("data-lng"));
        var ns = lat >= 0 ? "N" : "S";
        var ew = lng >= 0 ? "E" : "W";
        tip.innerHTML = '<span class="n">' + name + '</span><span class="c">' +
          Math.abs(lat).toFixed(2) + '\u00b0' + ns + ', ' + Math.abs(lng).toFixed(2) + '\u00b0' + ew + '</span>';
        tip.classList.add("show");
      });
      c.addEventListener("mousemove", function (e) {
        tip.style.left = (e.clientX + 16) + "px";
        tip.style.top = (e.clientY + 16) + "px";
      });
      c.addEventListener("mouseleave", function () { tip.classList.remove("show"); });
    });
  }

  /* run everything */
  pangu(document.body);
  setupReveal();
  setupSpotlight();
  setupScrollSpy();
  setupFilter();
  setupCopy();
  setupMapTip();
})();
