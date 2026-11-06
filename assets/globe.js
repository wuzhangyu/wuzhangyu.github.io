/* Colorai globe — orthographic "city lights" earth.
   Rotates slowly, drag to spin, wheel to zoom, hover cities for coordinates. */
(function () {
  "use strict";
  var canvas = document.getElementById("globe");
  if (!canvas || !window.GLOBE_LAND || !window.GLOBE_CITIES) return;
  var ctx = canvas.getContext("2d");
  var tip = document.getElementById("map-tip");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- precompute land dots (no per-frame trig) ---- */
  var L = window.GLOBE_LAND;
  var n = L.length / 2;
  var land = {
    coslat: new Float32Array(n), sinlat: new Float32Array(n),
    coslng: new Float32Array(n), sinlng: new Float32Array(n)
  };
  for (var i = 0; i < n; i++) {
    var la = L[2 * i + 1] * Math.PI / 180, lo = L[2 * i] * Math.PI / 180;
    land.coslat[i] = Math.cos(la); land.sinlat[i] = Math.sin(la);
    land.coslng[i] = Math.cos(lo); land.sinlng[i] = Math.sin(lo);
  }

  var cities = window.GLOBE_CITIES.map(function (c) {
    var la = c[1] * Math.PI / 180, lo = c[2] * Math.PI / 180;
    return { name: c[0], lat: c[1], lng: c[2],
             coslat: Math.cos(la), sinlat: Math.sin(la),
             coslng: Math.cos(lo), sinlng: Math.sin(lo) };
  });

  /* ---- state ---- */
  var lng0 = 110 * Math.PI / 180;  // start centered on China / East Asia
  var lat0 = 20 * Math.PI / 180;
  var zoom = 0.3;                  // start zoomed out, animate in
  var targetZoom = 1;
  var autoRotate = true, dragging = false;
  var lastX = 0, lastY = 0, idleTimer = null;
  var R, cx, cy, dpr, cssW, cssH;

  function resize() {
    var rect = canvas.getBoundingClientRect();
    cssW = Math.max(280, rect.width);
    cssH = Math.max(280, rect.height);
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    R = Math.min(cssW, cssH) / 2 * 0.82;
    cx = cssW / 2; cy = cssH / 2;
  }

  /* orthographic projection of a precomputed point */
  function project(coslat, sinlat, coslng, sinlng, s0, c0, s1, c1) {
    var cos_dlng = coslng * c0 + sinlng * s0;
    var sin_dlng = sinlng * c0 - coslng * s0;
    return {
      x: coslat * sin_dlng,
      y: c1 * sinlat - s1 * coslat * cos_dlng,
      z: s1 * sinlat + c1 * coslat * cos_dlng
    };
  }

  var visibleCities = [];

  function render() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    var s0 = Math.sin(lng0), c0 = Math.cos(lng0);
    var s1 = Math.sin(lat0), c1 = Math.cos(lat0);
    var Rz = R * zoom, R2 = Rz * Rz;

    /* globe body (ocean / night side) */
    var g = ctx.createRadialGradient(cx - Rz * 0.3, cy - Rz * 0.35, Rz * 0.08, cx, cy, Rz);
    g.addColorStop(0, "rgba(15,25,44,0.96)");
    g.addColorStop(0.7, "rgba(8,13,24,0.98)");
    g.addColorStop(1, "rgba(5,8,15,1)");
    ctx.beginPath(); ctx.arc(cx, cy, Rz, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();

    /* land dots */
    ctx.fillStyle = "#a7bcdc";
    for (var i = 0; i < n; i++) {
      var p = project(land.coslat[i], land.sinlat[i], land.coslng[i], land.sinlng[i], s0, c0, s1, c1);
      if (p.z <= 0.02) continue;
      var sx = cx + Rz * p.x, sy = cy - Rz * p.y;
      var dx = sx - cx, dy = sy - cy;
      if (dx * dx + dy * dy > R2) continue;
      ctx.globalAlpha = 0.09 + 0.21 * p.z;
      var r = 0.9 + 0.9 * p.z;
      ctx.fillRect(sx - r * 0.5, sy - r * 0.5, r, r);
    }

    /* cities */
    visibleCities = [];
    for (var j = 0; j < cities.length; j++) {
      var c = cities[j];
      var q = project(c.coslat, c.sinlat, c.coslng, c.sinlng, s0, c0, s1, c1);
      if (q.z <= 0.05) continue;
      var qx = cx + Rz * q.x, qy = cy - Rz * q.y;
      var qdx = qx - cx, qdy = qy - cy;
      if (qdx * qdx + qdy * qdy > R2) continue;
      visibleCities.push({ name: c.name, lat: c.lat, lng: c.lng, x: qx, y: qy, z: q.z });
      ctx.globalAlpha = 0.16 * q.z;
      ctx.beginPath(); ctx.arc(qx, qy, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = "#22d3ee"; ctx.fill();
      ctx.globalAlpha = 0.35 + 0.65 * q.z;
      ctx.beginPath(); ctx.arc(qx, qy, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "#8ff4ff"; ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* rim / atmosphere */
    ctx.beginPath(); ctx.arc(cx, cy, Rz, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(113,112,255,0.28)";
    ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, Rz + 3, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(34,211,238,0.08)";
    ctx.lineWidth = 5; ctx.stroke();
  }

  function tick() {
    if (autoRotate && !dragging && !reduced) lng0 += 0.0016;
    zoom += (targetZoom - zoom) * 0.10;
    if (Math.abs(targetZoom - zoom) < 0.003) zoom = targetZoom;
    render();
    requestAnimationFrame(tick);
  }

  /* ---- interaction ---- */
  function pauseSpin() {
    autoRotate = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { autoRotate = true; }, 3200);
  }

  canvas.addEventListener("mousedown", function (e) {
    dragging = true; lastX = e.clientX; lastY = e.clientY;
    canvas.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", function (e) {
    if (dragging) {
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      lng0 += dx * 0.005;
      lat0 = Math.max(-1.25, Math.min(1.25, lat0 - dy * 0.005));
      lastX = e.clientX; lastY = e.clientY;
      pauseSpin();
      return;
    }
    /* tooltip */
    var best = null, bestD = 26;
    var rect = canvas.getBoundingClientRect();
    for (var k = 0; k < visibleCities.length; k++) {
      var v = visibleCities[k];
      var d = Math.hypot(e.clientX - (rect.left + v.x), e.clientY - (rect.top + v.y));
      if (d < bestD) { bestD = d; best = v; }
    }
    if (best) {
      var ns = best.lat >= 0 ? "N" : "S", ew = best.lng >= 0 ? "E" : "W";
      tip.innerHTML = '<span class="n">' + best.name + '</span><span class="c">' +
        Math.abs(best.lat).toFixed(2) + '\u00b0' + ns + ', ' + Math.abs(best.lng).toFixed(2) + '\u00b0' + ew + '</span>';
      tip.style.left = (e.clientX + 16) + "px";
      tip.style.top = (e.clientY + 16) + "px";
      tip.classList.add("show");
      canvas.style.cursor = "pointer";
    } else {
      tip.classList.remove("show");
      canvas.style.cursor = dragging ? "grabbing" : "grab";
    }
  });
  window.addEventListener("mouseup", function () {
    dragging = false;
    canvas.style.cursor = "grab";
  });
  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    targetZoom = Math.max(0.5, Math.min(2.4, targetZoom * (e.deltaY > 0 ? 0.88 : 1.13)));
    pauseSpin();
  }, { passive: false });

  /* touch */
  canvas.addEventListener("touchstart", function (e) {
    dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener("touchmove", function (e) {
    if (!dragging) return;
    var dx = e.touches[0].clientX - lastX, dy = e.touches[0].clientY - lastY;
    lng0 += dx * 0.006;
    lat0 = Math.max(-1.25, Math.min(1.25, lat0 - dy * 0.006));
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    pauseSpin();
  }, { passive: true });
  canvas.addEventListener("touchend", function () { dragging = false; });

  window.addEventListener("resize", function () { resize(); render(); });

  resize();
  if (reduced) { zoom = targetZoom; }
  requestAnimationFrame(tick);
})();
