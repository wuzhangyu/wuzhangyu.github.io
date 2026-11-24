const EMAIL = "colorai@hnu.edu.cn";

const QUOTES = [
  { text: "极高明而道中庸，此间极道也。", src: "碎碎念 · 2026.11.18" },
  { text: "以唯一之我，守不灭之心，行前进之道。", src: "《唯一性·不灭性·前进性》· 2026.11" },
  { text: "我会等待我自己。", src: "碎碎念 · 2025.11.22" },
  { text: "人在一瞬间，真的会突然理解几年前的自己。", src: "碎碎念 · 2025.09.30" },
  { text: "在静滞中随波逐流，\n在微动中厚积薄发，\n在浪潮中尽显本色。", src: "碎碎念 · 2025.09.04" },
  { text: "大学是我人生的大基建时代。", src: "碎碎念 · 2026.03.29" },
  { text: "岁月悠悠如醇酒，留贮彼时方醉觉。", src: "碎碎念 · 2026.10.23" },
  { text: "湖灯铺湿径，\n缓步偶随人影过，\n心闲步自轻。", src: "后湖散步 · 2026.05" },
  { text: "我本就是从国际慢城而来，\n自然拥有从容而行的底气。", src: "白云机场 · 2025.09" },
  { text: "很多想不明白的事情，反而是在路上想通的。", src: "碎碎念 · 2026.06" },
  { text: "人生是一万次的春和景明。", src: "复临舍 · 2026.05" },
  { text: "我们都是从微末中爬到这高度，\n就算摔下去，也见过这高度的风景。", src: "摘自《轮回乐园》" },
  { text: "请务必日复一日地相信自己。", src: "碎碎念 · 2026.10" },
];

// NetEase Cloud Music song ids: [id, title, artist, seconds]
const TRACKS = {
  P3R: [
    [2121025432, "Full Moon, Full Life", "Lotus Juice · 高橋あず美", 293],
    [2683990860, "It's Going Down Now (Live)", "高橋あず美 · Lotus Juice", 180],
    [2683990861, "Color Your Night (Live)", "高橋あず美 · Lotus Juice", 211],
    [403034, "Mass Destruction", "Lotus Juice · 川村ゆみ", 208],
    [403026, "When The Moon's Reaching Out Stars", "川村ゆみ", 155],
    [403002, "Burn My Dread", "川村ゆみ", 95],
  ],
  P4G: [
    [402742, "Your Affection", "平田志穂子", 172],
    [402801, "Reach Out To The Truth", "平田志穂子", 167],
    [402722, "Pursuing My True Self", "平田志穂子", 86],
    [402815, "Heartbeat, Heartbreak", "平田志穂子", 135],
    [402271, "Signs Of Love", "平田志穂子", 180],
  ],
  P5R: [
    [2655083909, "Colors Flying High", "Lyn", 241],
    [1403087325, "Take Over", "Lyn", 189],
    [454231736, "Life Will Change", "Lyn", 262],
    [454224842, "Beneath the Mask", "Lyn", 277],
    [454224836, "Last Surprise", "Lyn", 235],
    [454224827, "Wake Up, Get Up, Get Out There", "Lyn", 277],
    [454231899, "Rivers In the Desert", "Lyn", 315],
    [454231738, "全ての人の魂の詩", "小宮知子", 338],
  ],
};

// [zh, en, level 1-5, rank]  P5 rank names: 5 = MAX
const STATS = [
  ["知识", "KNOWLEDGE", 5, "Erudite"],
  ["胆量", "GUTS", 4, "Dauntless"],
  ["技巧", "PROFICIENCY", 4, "Masterful"],
  ["温柔", "KINDNESS", 5, "Angelic"],
  ["魅力", "CHARM", 5, "Debonair"],
];

// [name, lat, lon]
const CITIES = [
  ["长沙", 28.23, 112.94], ["梅州", 24.29, 116.12], ["广州", 23.13, 113.26], ["深圳", 22.54, 114.06],
  ["惠州", 23.11, 114.42], ["东莞", 23.02, 113.75], ["香港", 22.32, 114.17], ["潮州", 23.66, 116.62],
  ["厦门", 24.48, 118.09], ["上海", 31.23, 121.47], ["北京", 39.9, 116.4], ["武汉", 30.59, 114.31],
  ["重庆", 29.56, 106.55], ["東京", 35.68, 139.69], ["江ノ島", 35.3, 139.48], ["横浜", 35.44, 139.64], ["京都", 35.01, 135.77],
  ["大阪", 34.69, 135.5], ["Singapore", 1.35, 103.82], ["Kuala Lumpur", 3.14, 101.69],
  ["Moscow", 55.76, 37.62], ["Saint Petersburg", 59.93, 30.34],
];
const HOME = "长沙";

// Guestbook (giscus.app). Fill these in after the repo has Discussions enabled; empty repoId keeps the board closed.
const GISCUS = { repo: "wuzhangyu/wuzhangyu.github.io", repoId: "R_kgDOVgSPUQ", category: "Announcements", categoryId: "DIC_kwDOVgSPUc4DL2hd" };

// Posts: add a new file under posts/ and one line here. date "YYYY" or "YYYY.MM" or "YYYY.MM.DD".
const POSTS = [
  { id: "hongkong-2026", title: "维港，十月一日", date: "2026.10.01", tags: ["旅行", "香港"], desc: "去香港听刺团，第二天去了 M+ 看海。" },
  { id: "beijing-2026", title: "北京五天", date: "2026.07.03", tags: ["旅行", "北京"], desc: "故宫、颐和园、国贸，还有天安门。" },
  { id: "mago-2026", title: "发那科写的马到成功", date: "2026.01", tags: ["广汽埃安", "机器人"], desc: "不是我写的，是我操作机械臂写的。" },
  { id: "vga-snake", title: "VGA 贪吃蛇踩过的坑", date: "2025.12", tags: ["FPGA", "课程设计"], desc: "黑屏、虚影、开局即撞墙。" },
  { id: "nuedc-2025", title: "电赛那四天三夜", date: "2025.08", tags: ["电赛", "硬件"], desc: "一块三相逆变主板，从画板到调通。" },
  { id: "sst-cell", title: "为什么把 cell 换成四电平", date: "2025", tags: ["电力电子", "课题组"], desc: "开关反而多了，省下来的是浮地驱动。" },
  { id: "p-series-playlist", title: "我的 P 系列歌单", date: "2024.12", tags: ["音乐", "Persona"], desc: "从日本回来以后玩了 P5R 和 P3R，歌单就是那时候攒的。" },
  { id: "mygo-6th", title: "MyGO!!!!! 6th LIVE 追加公演", date: "2024.09.21", tags: ["Live", "上海"], desc: "人生第一场演唱会。" },
  { id: "kyoto-2024", title: "京都，八月", date: "2024.08.08", tags: ["旅行", "日本"], desc: "伏见稻荷、岚山，然后去了大阪。" },
  { id: "enoshima-2024", title: "江之电，七里滨", date: "2024.08.04", tags: ["旅行", "日本", "巡礼"], desc: "《青春猪头少年》的舞台，坐江之电到镰仓高校前。" },
  { id: "tokyo-2024", title: "东京，巡礼的一周", date: "2024.08.02", tags: ["旅行", "日本", "巡礼"], desc: "池袋、御茶水、下北泽，还有须贺神社的台阶。" },
];

// Friend links: [name, url, one-line description, two-letter badge, colour]
const FRIENDS = [
  ["Rain Chen", "https://congjyu.github.io/blog/", "Rain Chen's Blog", "RC", "#8fb8ff"],
  ["木球小屋", "https://alpha-3.u1307221.nyat.app:15408/", "Jupiter's Lodge", "木", "#6f8fd8"],
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ROOT = document.documentElement.dataset.root || "";

/* ───── P3-style calendar with moon phase; refreshed every half minute ───── */
function clock() {
  const now = new Date();
  $$("#year").forEach((n) => (n.textContent = now.getFullYear()));
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const h = now.getHours();
  const slot =
    h === 0 ? ["影時間", "DARK HOUR"] :
    h >= 5 && h < 8 ? ["早朝", "EARLY MORNING"] :
    h >= 8 && h < 12 ? ["午前", "MORNING"] :
    h >= 12 && h < 13 ? ["昼休み", "LUNCHTIME"] :
    h >= 13 && h < 16 ? ["午後", "AFTERNOON"] :
    h >= 16 && h < 18 ? ["放課後", "AFTER SCHOOL"] :
    h >= 18 && h < 23 ? ["夜", "EVENING"] : ["深夜", "LATE NIGHT"];
  const m = now.getMonth() + 1, d = now.getDate();
  $$("[data-cal-date]").forEach((n) => (n.textContent = `${m}/${d}`));
  $$("[data-cal-m]").forEach((n) => (n.textContent = m));
  $$("[data-cal-d]").forEach((n) => (n.textContent = d));
  $$("[data-cal-day]").forEach((n) => (n.textContent = days[now.getDay()]));
  $$("[data-cal-time]").forEach((n) => (n.textContent = slot[0]));
  $$("[data-cal-time-full]").forEach((n) => (n.textContent = `${slot[0]} · ${slot[1]}`));
  $$(".calendar").forEach((n) => n.classList.toggle("dark-hour", h === 0));

  const SYNODIC = 29.530588853;
  const age = (((now - Date.UTC(2000, 0, 6, 18, 14)) / 864e5) % SYNODIC + SYNODIC) % SYNODIC;
  const p = age / SYNODIC;
  const names = ["新月", "三日月", "上弦の月", "十三夜", "満月", "寝待月", "下弦の月", "有明月"];
  $$("[data-moon-name]").forEach((n) => (n.textContent = names[Math.round(p * 8) % 8]));
  $$("[data-moon-path]").forEach((path) => {
    const c = path.previousElementSibling;
    const cx = +c.getAttribute("cx"), cy = +c.getAttribute("cy"), r = +c.getAttribute("r");
    const rx = (r * Math.abs(Math.cos(2 * Math.PI * p))).toFixed(2);
    const s1 = p < 0.5 ? 1 : 0;
    const s2 = p < 0.25 || (p >= 0.5 && p < 0.75) ? 0 : 1;
    path.setAttribute("d", `M${cx} ${cy - r} A${r} ${r} 0 0 ${s1} ${cx} ${cy + r} A${rx} ${r} 0 0 ${s2} ${cx} ${cy - r}Z`);
  });
  document.dispatchEvent(new CustomEvent("colorai:tick", { detail: now }));
}
setInterval(clock, 30000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) clock(); });

const THEMES = {
  p3d: { fill: "#081638", edge: "#34c6ff" },
  p3l: { fill: "#0a1d52", edge: "#9fe9ff" },
  p4: { fill: "#141414", edge: "#ffe330" },
  p5: { fill: "#111111", edge: "#e5191c" },
  p5d: { fill: "#0d0d0d", edge: "#ff2a3c" },
};

/* ───── email & toast ───── */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
}
function mail() {
  $$("[data-mail]").forEach((a) => (a.href = `mailto:${EMAIL}`));
  $$("[data-email-text]").forEach((el) => (el.textContent = EMAIL));
  $$("[data-copy-email]").forEach((b) =>
    b.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        toast(`已复制：${EMAIL}`);
      } catch {
        toast(EMAIL);
      }
    })
  );
}

/* ───── pixel transition ───── */
const pixels = (() => {
  const canvas = $("#pixels");
  const ctx = canvas.getContext("2d");
  let w, h, size, cols, rows, cells = [];
  let covered = true;
  let pal = THEMES.p3d;

  function setup() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    size = w < 700 ? 26 : 40;
    cols = Math.ceil(w / size); rows = Math.ceil(h / size);
    cells = [];
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++)
        cells.push({ x, y, d: (x / cols) * 0.62 + (y / rows) * 0.08 + Math.random() * 0.3 });
    if (covered) fill();
  }

  function fill() {
    ctx.fillStyle = pal.fill;
    ctx.fillRect(0, 0, w, h);
  }

  // mode "cover": cells appear; "reveal": cells disappear. The leading edge uses the palette accent.
  // A reveal may start from a snapshot of the splash so the last frame dissolves instead of vanishing.
  function run(mode, dur, theme, snap) {
    if (theme && THEMES[theme]) pal = THEMES[theme];
    const { fill: F, edge: E } = pal;
    canvas.classList.add("busy");
    return new Promise((resolve) => {
      const t0 = performance.now();
      const edge = 0.14;
      function frame(now) {
        const t = Math.min(1, (now - t0) / dur);
        ctx.clearRect(0, 0, w, h);
        if (snap) ctx.drawImage(snap, 0, 0, w, h);
        for (const c of cells) {
          const p = (t * (1 + edge) - c.d) / edge;
          const X = c.x * size, Y = c.y * size;
          if (mode === "cover") {
            const color = p >= 1 ? F : p > 0 ? E : null;
            if (color) { ctx.fillStyle = color; ctx.fillRect(X, Y, size + 0.5, size + 0.5); }
          } else if (p >= 1) {
            if (snap) ctx.clearRect(X, Y, size + 0.5, size + 0.5);
          } else if (p > 0 || !snap) {
            ctx.fillStyle = p > 0 ? E : F;
            ctx.fillRect(X, Y, size + 0.5, size + 0.5);
          }
        }
        if (t < 1) requestAnimationFrame(frame);
        else {
          if (mode === "cover") { fill(); covered = true; }
          else { ctx.clearRect(0, 0, w, h); covered = false; canvas.classList.remove("busy"); }
          resolve();
        }
      }
      requestAnimationFrame(frame);
    });
  }

  // Pixel-font glyphs: rasterise at a tiny size, keep the lit pixels as a grid of points.
  const glyphCache = new Map();
  const DIGITS = {
    0: "01110100011001110101110011000101110", 1: "00100011000010000100001000010001110",
    2: "01110100010000100110010001000011111", 3: "11110000010000101110000010000111110",
    4: "00010001100101010010111110001000010", 5: "11111100001111000001000011000101110",
    6: "00110010001000011110100011000101110", 7: "11111000010001000100010000100001000",
    8: "01110100011000101110100011000101110", 9: "01110100011000101111000010001001100",
    ":": "00000011000110000000001100011000000",
  };
  function glyphs(text, px = 10) {
    const key = text + px;
    if (glyphCache.has(key)) return glyphCache.get(key);
    if (/^[0-9:]+$/.test(text)) {
      const pts = [];
      let x0 = 0;
      for (const ch of text) {
        const bits = DIGITS[ch];
        for (let i = 0; i < bits.length; i++) if (bits[i] === "1") pts.push([x0 + (i % 5), Math.floor(i / 5)]);
        x0 += ch === ":" ? 4 : 6;
      }
      const g = { pts, tw: x0 - 1, th: 7 };
      glyphCache.set(key, g);
      return g;
    }
    const off = document.createElement("canvas");
    const o = off.getContext("2d");
    const font = `bold ${px}px Consolas, "Microsoft YaHei", monospace`;
    o.font = font;
    const tw = Math.ceil(o.measureText(text).width) + 2, th = Math.ceil(px * 1.3);
    off.width = tw; off.height = th;
    o.font = font; o.textBaseline = "top"; o.fillStyle = "#000";
    o.fillText(text, 1, 1);
    const data = o.getImageData(0, 0, tw, th).data, pts = [];
    for (let y = 0; y < th; y++)
      for (let x = 0; x < tw; x++) if (data[(y * tw + x) * 4 + 3] > 110) pts.push([x, y]);
    const g = { pts, tw, th };
    glyphCache.set(key, g);
    return g;
  }
  function drawGlyphs(g, cx, cy, k, color, alpha = 1) {
    const x0 = Math.round(cx - (g.tw * k) / 2), y0 = Math.round(cy - (g.th * k) / 2);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    for (const [x, y] of g.pts) ctx.fillRect(x0 + x * k, y0 + y * k, k - 1, k - 1);
    ctx.globalAlpha = 1;
  }
  function caption(text, y, color, alpha = 1) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.font = "12px Consolas, monospace";
    ctx.textAlign = "center";
    ctx.fillText(text.split("").join(String.fromCharCode(8202)), w / 2, y);
    ctx.globalAlpha = 1;
  }
  const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

  // Splash: the clock ticks to midnight, the Dark Hour flashes green, then pixels gather into the logo.
  function splash() {
    const T = { tick: 1000, dark: 1080, gather: 1680, settle: 2480, end: 2950 };
    const clockK = Math.max(4, Math.min(11, Math.floor((w * 0.4) / 50)));
    const logoK = Math.max(4, Math.min(12, Math.floor((w * 0.5) / 50)));
    const darkK = Math.max(3, Math.min(9, Math.floor((w * 0.3) / 44)));
    const logo = glyphs("COLORAI");
    const lx = w / 2 - (logo.tw * logoK) / 2, ly = h / 2 - 20 - (logo.th * logoK) / 2;
    const parts = logo.pts.map(([x, y]) => {
      const a = Math.random() * Math.PI * 2, r = Math.max(w, h) * (0.35 + Math.random() * 0.4);
      return { tx: lx + x * logoK, ty: ly + y * logoK, sx: w / 2 + Math.cos(a) * r, sy: h / 2 + Math.sin(a) * r, d: Math.random() * 0.4 };
    });
    const stars = Array.from({ length: 70 }, () => [Math.random() * w, Math.random() * h, Math.random()]);
    return new Promise((resolve) => {
      let skip = false;
      const onSkip = () => (skip = true);
      window.addEventListener("keydown", onSkip);
      canvas.addEventListener("pointerdown", onSkip);
      const t0 = performance.now();
      function frame(now) {
        const t = now - t0;
        if (skip || t >= T.end) {
          window.removeEventListener("keydown", onSkip);
          canvas.removeEventListener("pointerdown", onSkip);
          if (skip) { fill(); drawGlyphs(logo, w / 2, h / 2 - 20, logoK, "#eaf6ff"); }
          return resolve();
        }
        if (t < T.dark) {
          fill();
          for (const [x, y, z] of stars) { ctx.fillStyle = `rgba(159,233,255,${0.08 + z * 0.25})`; ctx.fillRect(x, y, 2, 2); }
          const sec = Math.min(3, Math.floor(t / (T.tick / 3)));
          const label = sec < 3 ? `23:59:5${7 + sec}` : "00:00:00";
          const g = glyphs(label);
          const jit = sec === 3 ? (Math.random() - 0.5) * 6 : 0;
          drawGlyphs(g, w / 2 + jit, h / 2 - 16, clockK, sec === 3 ? "#b8ff6a" : "#eaf6ff");
          const bw = Math.min(380, w * 0.6), bx = (w - bw) / 2, by = h / 2 + (g.th * clockK) / 2 + 6, n = 24;
          for (let j = 0; j < n; j++) {
            ctx.fillStyle = j / n < t / T.tick ? "#34c6ff" : "rgba(159,233,255,0.14)";
            ctx.fillRect(bx + (j * bw) / n, by, bw / n - 3, 6);
          }
          caption("MEMENTO MORI · NOW LOADING", by + 30, "rgba(159,233,255,0.6)");
        } else if (t < T.gather) {
          const k = (t - T.dark) / (T.gather - T.dark);
          ctx.fillStyle = "#06180f"; ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = `rgba(184,255,106,${Math.max(0, 0.75 - k * 3)})`; ctx.fillRect(0, 0, w, h);
          const R = Math.min(w, h) * 0.3;
          const mg = ctx.createRadialGradient(w / 2, h / 2 - 10, R * 0.2, w / 2, h / 2 - 10, R * 1.6);
          mg.addColorStop(0, "rgba(232,255,150,0.38)"); mg.addColorStop(1, "rgba(6,24,15,0)");
          ctx.fillStyle = mg; ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(220,255,140,0.55)"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(w / 2, h / 2 - 10, R, 0, Math.PI * 2); ctx.stroke();
          for (let y = 0; y < h; y += 4) { ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(0, y, w, 1); }
          const flicker = Math.random() < 0.12 ? 0.55 : 1;
          drawGlyphs(glyphs("影時間", 14), w / 2, h / 2 - 14, darkK, "#d8ff8a", flicker * Math.min(1, k * 4));
          caption("THE DARK HOUR · 00:00", h / 2 + (14 * 1.3 * darkK) / 2 + 22, "rgba(216,255,138,0.75)", Math.min(1, k * 3));
        } else {
          const k = (t - T.gather) / (T.settle - T.gather);
          fill();
          if (k < 0.25) { ctx.fillStyle = `rgba(6,24,15,${1 - k * 4})`; ctx.fillRect(0, 0, w, h); }
          for (const [x, y, z] of stars) { ctx.fillStyle = `rgba(159,233,255,${0.08 + z * 0.25})`; ctx.fillRect(x, y, 2, 2); }
          for (const p of parts) {
            const e = ease((k - p.d) / 0.6);
            const x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
            ctx.fillStyle = e >= 1 ? "#eaf6ff" : "#34c6ff";
            ctx.globalAlpha = 0.35 + e * 0.65;
            ctx.fillRect(x, y, logoK - 1, logoK - 1);
          }
          ctx.globalAlpha = 1;
          const k2 = (t - T.settle) / (T.end - T.settle);
          if (k2 > 0) {
            const by = ly + logo.th * logoK + 18, bw = Math.min(380, w * 0.6) * ease(k2 * 1.6);
            ctx.fillStyle = "#34c6ff"; ctx.fillRect(w / 2 - bw / 2, by, bw, 3);
            caption("TAKE YOUR TIME.", by + 30, "#9fe9ff", ease(k2 * 2));
          }
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  async function boot(withSplash) {
    pal = THEMES.p3d;
    if (reduceMotion) { ctx.clearRect(0, 0, w, h); covered = false; return; }
    let snap = null;
    if (withSplash) {
      await splash();
      snap = document.createElement("canvas");
      snap.width = canvas.width; snap.height = canvas.height;
      snap.getContext("2d").drawImage(canvas, 0, 0);
    }
    await run("reveal", withSplash ? 900 : 560, null, snap);
  }

  window.addEventListener("resize", setup);
  setup();
  return { cover: (d = 460, theme) => run("cover", d, theme), reveal: (d = 560) => run("reveal", d), boot };
})();

async function start(withSplash) {
  document.body.classList.add("booting");
  $(".hero")?.classList.remove("in");
  await pixels.boot(withSplash);
  document.body.classList.remove("booting");
  $(".hero")?.classList.add("in");
}
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!location.hash) window.scrollTo(0, 0);
const firstVisit = !sessionStorage.getItem("colorai-booted");
sessionStorage.setItem("colorai-booted", "1");
start(firstVisit);
window.addEventListener("pageshow", (e) => { if (e.persisted) start(false); });

document.addEventListener("click", async (e) => {
  if (!e.target.closest("#replay")) return;
  if (reduceMotion) return window.scrollTo(0, 0);
  await pixels.cover(460, "p3d");
  window.scrollTo(0, 0);
  start(true);
});

/* ───── leaving the page ─────
   Over http(s) the new page is fetched and swapped into this document, so the player (and its music) never unloads.
   Opened from file:// that is impossible, so it falls back to a normal page load and the player resumes from where it was. */
const SWAP = /^https?:$/.test(location.protocol) && "DOMParser" in window;
const KEEP = "#pixels, #player, #toast";
const pagePath = (u) => { const x = new URL(u, location.href); return x.pathname + x.search; };
let shownPath = pagePath(location.href);
const depth = () => (history.state && history.state.depth) || 0;
{
  const cameFrom = sessionStorage.getItem("colorai-from");
  sessionStorage.removeItem("colorai-from");
  if (!history.state) history.replaceState({ depth: cameFrom ? 1 : 0 }, "");
}
const loadedScripts = new Set($$("script[src]").map((s) => s.src));
function needScripts(doc, base) {
  return Promise.all($$("script[src]", doc).map((s) => new URL(s.getAttribute("src"), base).href).filter((src) => !loadedScripts.has(src)).map((src) =>
    new Promise((ok) => { loadedScripts.add(src); const el = document.createElement("script"); el.src = src; el.onload = el.onerror = ok; document.head.append(el); })));
}
let swapping = false;
async function swap(href, theme, push) {
  if (swapping) return;
  swapping = true;
  const covering = reduceMotion ? null : pixels.cover(420, theme || document.body.dataset.theme || "p3d");
  let doc;
  try {
    const res = await fetch(href);
    if (!res.ok || !/html/.test(res.headers.get("content-type") || "")) throw new Error(res.status);
    doc = new DOMParser().parseFromString(await res.text(), "text/html");
  } catch {
    swapping = false;
    return (location.href = href);
  }
  await covering;
  await needScripts(doc, href);
  if (push) history.pushState({ depth: depth() + 1 }, "", href);
  shownPath = pagePath(href);
  document.title = doc.title;
  for (const k of ["root", "parent"]) {
    const v = doc.documentElement.dataset[k];
    v == null ? delete document.documentElement.dataset[k] : (document.documentElement.dataset[k] = v);
  }
  ROOT = document.documentElement.dataset.root || "";
  for (const sel of ['meta[name="description"]', 'meta[name="theme-color"]']) {
    const a = $(sel), b = $(sel, doc);
    if (a && b) a.content = b.content;
  }
  [...document.body.attributes].forEach((at) => document.body.removeAttribute(at.name));
  [...doc.body.attributes].forEach((at) => document.body.setAttribute(at.name, at.value));
  document.body.classList.add("booting");
  [...document.body.children].forEach((n) => { if (!n.matches(KEEP)) n.remove(); });
  const anchor = $("#player") || null;
  [...doc.body.children].forEach((n) => { if (!n.matches(KEEP) && n.tagName !== "SCRIPT") document.body.insertBefore(document.adoptNode(n), anchor); });
  const hash = new URL(href, location.href).hash;
  const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  target ? target.scrollIntoView({ behavior: "instant", block: "start" }) : window.scrollTo(0, 0);
  initPage();
  swapping = false;
  start(false);
}
async function leave(href, theme) {
  if (SWAP && /(\.html?|\/)$/i.test(new URL(href, location.href).pathname)) return swap(href, theme, true);
  sessionStorage.setItem("colorai-from", location.href);
  player.save();
  if (reduceMotion) return (location.href = href);
  await pixels.cover(420, theme || document.body.dataset.theme || "p3d");
  location.href = href;
}
window.addEventListener("popstate", () => {
  if (!SWAP || pagePath(location.href) === shownPath) return;
  swap(location.href, null, false);
});
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
  const href = a.getAttribute("href");
  if (a.target === "_blank" || a.hasAttribute("download") || href.startsWith("#") || /^(mailto|tel|javascript):/.test(href)) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.hash) return;
  e.preventDefault();
  leave(a.href, a.dataset.theme);
});
function goBackPage() {
  if (depth() > 0) {
    if (reduceMotion || SWAP) return history.back();
    return pixels.cover(380, document.body.dataset.theme || "p3d").then(() => history.back());
  }
  const parent = document.documentElement.dataset.parent;
  if (parent) leave(ROOT + parent);
  else toast("这里已经是首页了");
}

// In-page links travel through a pixel transition.
document.addEventListener("click", async (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.classList.contains("skip")) return;
  const target = document.querySelector(a.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  if (reduceMotion) return target.scrollIntoView();
  await pixels.cover(420, target.dataset.theme);
  target.scrollIntoView({ behavior: "instant", block: "start" });
  history.replaceState(history.state, "", a.getAttribute("href"));
  await sleep(60);
  await pixels.reveal(520);
});

/* ───── song request player ───── */
const player = (function player() {
  const root = $("#player"), panel = $("#pl-panel"), mini = $("#pl-mini"), list = $("#pl-list");
  if (!root) return { bind() {}, save() {} };
  const audio = new Audio();
  audio.preload = "none";
  audio.volume = 0.7;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  let game = "P3R", cur = null, fails = 0, resumeAt = 0;
  audio.addEventListener("loadedmetadata", () => { if (resumeAt) audio.currentTime = resumeAt; resumeAt = 0; });

  function renderList() {
    list.innerHTML = TRACKS[game].map(([id, title, artist, sec], n) =>
      `<li><button type="button" data-n="${n}" class="${cur && cur.game === game && cur.n === n ? "on" : ""}">` +
      `<i>${String(n + 1).padStart(2, "0")}</i><b>${title}</b><span>${artist}</span><em>${fmt(sec)}</em></button></li>`
    ).join("");
  }
  function setGame(g) {
    game = g;
    root.dataset.game = g;
    $$(".pl-tabs button").forEach((b) => b.classList.toggle("on", b.dataset.game === g));
    renderList();
  }
  function load(g, n, play = true) {
    const arr = TRACKS[g];
    n = (n + arr.length) % arr.length;
    const [id, title, artist, sec] = arr[n];
    cur = { game: g, n };
    resumeAt = 0;
    audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    $("#pl-title").textContent = title;
    $("#pl-artist").textContent = artist;
    $("#pl-game").textContent = g;
    $("#pl-mini-game").textContent = `NOW PLAYING · ${g}`;
    $("#pl-mini-title").textContent = title;
    $("#pl-dur").textContent = fmt(sec);
    $("#pl-fill").style.width = "0%";
    root.dataset.playing = g;
    if (g === game) renderList();
    if (play) audio.play().catch(() => {});
  }
  function toggle() {
    if (!cur) return load(game, 0);
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  }
  function open(v = panel.hidden) {
    panel.hidden = !v;
    mini.setAttribute("aria-expanded", String(v));
    root.classList.toggle("open", v);
    fit();
  }
  // The panel opens towards whichever side of the button has room: up or down, and left- or right-aligned.
  function fit() {
    if (panel.hidden) return;
    const m = mini.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
    const gap = 12, pad = 8, top = 64;
    const w = Math.min(360, vw - pad * 2);
    panel.style.width = `${w}px`;
    panel.style.maxHeight = "none";
    const want = Math.min(panel.scrollHeight, 620);
    const above = m.top - gap - top, below = vh - m.bottom - gap - pad;
    const up = above >= want || above >= below;
    let left = m.left + w > vw - pad ? m.right - w : m.left;
    left = Math.max(pad, Math.min(vw - pad - w, left));
    Object.assign(panel.style, {
      left: `${left - m.left}px`, right: "auto",
      top: up ? "auto" : `calc(100% + ${gap}px)`, bottom: up ? `calc(100% + ${gap}px)` : "auto",
      maxHeight: `${Math.max(160, Math.min(want, up ? above : below))}px`,
    });
    root.classList.toggle("below", !up);
  }

  // Drag the mini button or the panel header to move the player; the spot is remembered across pages.
  const POS = "colorai-player-pos";
  let moved = false;
  function place(x, y) {
    const r = mini.getBoundingClientRect();
    x = Math.max(8, Math.min(window.innerWidth - r.width - 8, x));
    y = Math.max(68, Math.min(window.innerHeight - r.height - 8, y));
    Object.assign(root.style, { left: `${x}px`, top: `${y}px`, bottom: "auto" });
    fit();
  }
  function grab(handle) {
    handle.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || e.target.closest(".pl-x")) return;
      const r = root.getBoundingClientRect(), sx = e.clientX, sy = e.clientY;
      moved = false;
      handle.setPointerCapture(e.pointerId);
      const move = (ev) => {
        if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 5) return;
        moved = true;
        root.classList.add("dragging");
        place(r.left + ev.clientX - sx, r.top + ev.clientY - sy);
      };
      const up = () => {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
        handle.removeEventListener("pointercancel", up);
        root.classList.remove("dragging");
        if (moved) { const p = root.getBoundingClientRect(); localStorage.setItem(POS, JSON.stringify([p.left, p.top])); }
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
      handle.addEventListener("pointercancel", up);
    });
  }
  grab(mini);
  grab($(".pl-head", root));
  try { const p = JSON.parse(localStorage.getItem(POS)); if (p) place(p[0], p[1]); } catch {}
  window.addEventListener("resize", () => { if (root.style.top) { const p = root.getBoundingClientRect(); place(p.left, p.top); } else fit(); });

  mini.addEventListener("click", () => { if (moved) { moved = false; return; } open(); });
  $("#pl-x").addEventListener("click", () => open(false));
  $$(".pl-tabs button").forEach((b) => b.addEventListener("click", () => setGame(b.dataset.game)));
  list.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) load(game, +b.dataset.n); });
  $("#pl-play").addEventListener("click", toggle);
  $("#pl-prev").addEventListener("click", () => cur ? load(cur.game, cur.n - 1) : load(game, 0));
  $("#pl-next").addEventListener("click", () => cur ? load(cur.game, cur.n + 1) : load(game, 0));
  $("#pl-vol").addEventListener("input", (e) => (audio.volume = +e.target.value));
  $("#pl-bar").addEventListener("click", (e) => {
    if (!audio.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) open(false); });

  audio.addEventListener("play", () => { root.classList.add("playing"); $("#pl-play").textContent = "❚❚"; $("#pl-play").setAttribute("aria-label", "暂停"); });
  audio.addEventListener("pause", () => { root.classList.remove("playing"); $("#pl-play").textContent = "▶"; $("#pl-play").setAttribute("aria-label", "播放"); });
  audio.addEventListener("playing", () => (fails = 0));
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    $("#pl-cur").textContent = fmt(audio.currentTime);
    $("#pl-dur").textContent = fmt(audio.duration);
    $("#pl-fill").style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });
  audio.addEventListener("ended", () => load(cur.game, cur.n + 1));
  audio.addEventListener("error", () => {
    if (!cur || !audio.src) return;
    toast("这首暂时无法播放，换下一首");
    if (++fails < 3) load(cur.game, cur.n + 1);
  });
  // Buttons elsewhere on the page that open the player or start a song; rebound after every page swap.
  function bind() {
    $$("[data-open-player]").forEach((b) => b.addEventListener("click", () => { open(true); if (!cur) load("P3R", 0); }));
    $$("[data-play]").forEach((b) => b.addEventListener("click", () => {
      const [g, n] = b.dataset.play.split(":");
      open(true); setGame(g); load(g, +n);
    }));
  }

  // Full page loads (file://, reload, a new tab) pick the song up where it left off.
  const STATE = "colorai-player";
  function save() {
    if (!cur) return sessionStorage.removeItem(STATE);
    sessionStorage.setItem(STATE, JSON.stringify({ ...cur, t: audio.currentTime, on: !audio.paused, vol: audio.volume, open: !panel.hidden }));
  }
  window.addEventListener("pagehide", save);
  setGame("P3R");
  try {
    const s = JSON.parse(sessionStorage.getItem(STATE));
    if (s && TRACKS[s.game]) {
      audio.volume = s.vol ?? 0.7;
      $("#pl-vol").value = audio.volume;
      setGame(s.game);
      load(s.game, s.n, false);
      audio.preload = "auto";
      resumeAt = s.t || 0;
      if (s.open) open(true);
      if (s.on) audio.play().catch(() => {
        toast("点一下页面继续播放");
        document.addEventListener("pointerdown", () => audio.play().catch(() => {}), { once: true, capture: true });
      });
      else audio.load();
    }
  } catch {}
  return { bind, save };
})();

/* ───── per-page setup: runs on first load and after every in-site page swap ───── */
let pageAC = new AbortController();
const on = (t, type, fn, o) => t.addEventListener(type, fn, { ...(typeof o === "object" ? o : { capture: !!o }), signal: pageAC.signal });
function initPage() {
  pageAC.abort();
  pageAC = new AbortController();
  clock();
  mail();
  player.bind();
  /* ───── page-by-page navigation: click blank space, keys, or the pager ───── */
  (function pager() {
    const secs = $$("[data-hud]");
    const SKIP = "a, button, input, select, textarea, label, canvas, dialog, .player, .dialog, .polaroid, .wk, .trips li, .phone, .cc-card, .status-card, .arcana, .timeline li, .post-row, .fr-card, .prose, .branch";
    const KEEP_MENU = "a, img, input, textarea, select, [contenteditable], pre, code, .player";
    const paged = secs.length > 1;
    let busy = false;

    // Right click goes back: previous section, then the previous page. Shift + right click keeps the browser menu.
    on(document, "contextmenu", (e) => {
      if (e.shiftKey || document.body.classList.contains("booting")) return;
      const open = document.querySelector("dialog[open]");
      if (open) { e.preventDefault(); return open.close(); }
      if (e.target.closest(KEEP_MENU) || String(window.getSelection())) return;
      e.preventDefault();
      if (paged && (current() > 0 || secs[0].getBoundingClientRect().top < -40)) prev();
      else goBackPage();
    });
    if (!sessionStorage.getItem("colorai-hint")) {
      sessionStorage.setItem("colorai-hint", "1");
      setTimeout(() => toast(paged ? "左键下一页 · 右键返回 · Shift+右键 打开原菜单" : "右键返回上一页 · Shift+右键 打开原菜单"), firstVisit ? 3600 : 900);
    }
    if (!paged) return;
    const current = () => {
      let k = 0;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) k = i; });
      return k;
    };
    async function jump(i) {
      if (i < 0 || i >= secs.length || busy) return;
      busy = true;
      const target = secs[i];
      if (reduceMotion) target.scrollIntoView();
      else {
        await pixels.cover(380, target.dataset.theme);
        target.scrollIntoView({ behavior: "instant", block: "start" });
        await sleep(50);
        await pixels.reveal(480);
      }
      busy = false;
    }
    function next() {
      const k = current(), r = secs[k].getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom > vh + 40) window.scrollBy({ top: Math.min(vh * 0.85, r.bottom - vh), behavior: reduceMotion ? "auto" : "smooth" });
      else jump(k + 1);
    }
    function prev() {
      const k = current(), r = secs[k].getBoundingClientRect();
      if (r.top < -40) window.scrollBy({ top: Math.max(-window.innerHeight * 0.85, r.top), behavior: reduceMotion ? "auto" : "smooth" });
      else jump(k - 1);
    }
    on(document, "click", (e) => {
      if (document.body.classList.contains("booting") || e.button !== 0) return;
      if (e.target.closest(SKIP) || !e.target.closest("main")) return;
      if (String(window.getSelection())) return;
      next();
    });
    on(document, "keydown", (e) => {
      if (document.querySelector("dialog[open]") || e.target.closest("input, textarea, select, [role=tablist]") || e.altKey || e.ctrlKey || e.metaKey) return;
      if (["PageDown", "ArrowDown"].includes(e.key) || (e.key === " " && !e.target.closest("button, a, .dialog, [role=button]"))) { e.preventDefault(); next(); }
      if (["PageUp", "ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
    });
    $("#pg-next")?.addEventListener("click", next);
    $("#pg-prev")?.addEventListener("click", prev);
  })();
  /* ───── reveal on scroll ───── */
  (function reveal() {
    const els = $$(".rv");
    for (const n of els) {
      const sibs = [...n.parentElement.children].filter((c) => c.classList.contains("rv"));
      n.style.setProperty("--d", `${Math.min(sibs.indexOf(n), 6) * 0.07}s`);
    }
    if (!("IntersectionObserver" in window)) return els.forEach((n) => n.classList.add("shown"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((n) => io.observe(n));
  })();
  /* ───── bar & HUD ───── */
  (function chrome() {
    const bar = $("#bar");
    if (!bar) return;
    const secs = $$("[data-hud]");
    const page = document.body.dataset.page;
    $$(".bar-nav a").forEach((a) => a.classList.toggle("active", a.dataset.page === page));
    const links = new Map($$(".sub-nav a").map((a) => [a.getAttribute("href").slice(1), a]));
    const hud = $(".hud"), idx = $("#hud-idx"), name = $("#hud-name"), prog = $("#hud-prog"), game = $("#hud-game");
    const zones = $$("[data-theme]:not(#bar):not(.hud):not(dialog):not(.player)").filter((n) => !n.parentElement.closest("[data-theme]:not(body)"));
    let ticking = false;

    function update() {
      ticking = false;
      const y = window.scrollY, vh = window.innerHeight;
      bar.classList.toggle("solid", y > 40);
      const under = zones.find((x) => { const r = x.getBoundingClientRect(); return r.top <= 30 && r.bottom > 30; });
      if (under) bar.dataset.theme = under.dataset.theme;
      if (!hud || secs.length < 2) return;
      let cur = 0;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= vh * 0.4) cur = i; });
      const s = secs[cur];
      idx.textContent = String(cur).padStart(2, "0");
      name.textContent = s.dataset.hud;
      links.forEach((a, id) => a.classList.toggle("active", id === s.id));
      const low = zones.find((x) => { const r = x.getBoundingClientRect(); return r.top <= vh - 40 && r.bottom > vh - 40; });
      if (low) hud.dataset.theme = low.dataset.theme;
      game.textContent = s.dataset.game;
      const max = document.documentElement.scrollHeight - vh;
      hud.classList.toggle("gone", y > max - 80);
      prog.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
    on(window, "scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    on(window, "resize", update);
    update();
  })();
  /* ───── radar (social stats) ───── */
  (function radar() {
    const svg = $("#radar");
    if (!svg) return;
    const cx = 150, cy = 140, R = 90, n = STATS.length;
    const pt = (i, r) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const poly = (r) => STATS.map((_, i) => pt(i, r).map((v) => v.toFixed(1)).join(",")).join(" ");
    let html = "";
    for (let k = 1; k <= 5; k++) html += `<polygon class="grid${k === 5 ? " outer" : ""}" points="${poly((R * k) / 5)}"/>`;
    STATS.forEach((_, i) => { const [x, y] = pt(i, R); html += `<line class="axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
    const shape = STATS.map(([, , lv], i) => pt(i, (R * lv) / 5).map((v) => v.toFixed(1)).join(",")).join(" ");
    html += `<polygon class="shape" points="${shape}"/>`;
    STATS.forEach(([zh, en], i) => {
      const [x, y] = pt(i, R + 26);
      const anchor = Math.abs(x - cx) < 4 ? "middle" : x > cx ? "start" : "end";
      html += `<text x="${x}" y="${y - 2}" text-anchor="${anchor}">${zh}</text><text class="en" x="${x}" y="${y + 11}" text-anchor="${anchor}">${en}</text>`;
    });
    svg.innerHTML = html;

    $("#st-ranks").innerHTML = STATS.map(([zh, , lv, rank]) =>
      `<li class="${lv === 5 ? "max" : ""}"><span>${zh}</span><span class="pips">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= lv ? "on" : ""}"></i>`).join("")}</span><b>${rank}</b></li>`
    ).join("");
  })();
  /* ───── works: filter & modal ───── */
  (function works() {
    const tabs = $$(".tab");
    const items = $$(".work");
    if (!items.length || !$("#wk-list")) return;
    tabs.forEach((b) =>
      b.addEventListener("click", () => {
        tabs.forEach((x) => x.classList.toggle("on", x === b));
        const f = b.dataset.filter;
        items.forEach((p) => p.classList.toggle("hidden", f !== "all" && p.dataset.cat !== f));
      })
    );

    const modal = $("#modal");
    function open(card) {
      $("#modal-no").textContent = $(".w-no", card).textContent;
      $("#modal-cat").textContent = $(".w-cat", card).textContent;
      $("#modal-title").textContent = $(".w-body h3", card).firstChild.textContent.trim();
      $("#modal-body").replaceChildren($(".w-detail", card).content.cloneNode(true));
      modal.showModal();
    }
    const list = $("#wk-list"), stage = $("#wk-stage");
    let cur = 0;
    function select(n, focus = false) {
      cur = (n + items.length) % items.length;
      const card = items[cur];
      $$("button", list).forEach((b, k) => { b.classList.toggle("on", k === cur); b.setAttribute("aria-selected", String(k === cur)); });
      const fig = $(".w-fig", card).cloneNode(true), body = $(".w-body", card).cloneNode(true);
      const more = document.createElement("button");
      more.type = "button"; more.className = "w-more"; more.textContent = "查看设定 →";
      more.addEventListener("click", () => open(card));
      $(".w-more", body).replaceWith(more);
      const head = $(".w-head", card).cloneNode(true);
      stage.replaceChildren(head, fig, body);
      stage.classList.remove("swap"); void stage.offsetWidth; stage.classList.add("swap");
      if (focus) $$("button", list)[cur].focus();
    }
    list.innerHTML = items.map((card, k) => {
      const title = $(".w-body h3", card).firstChild.textContent.trim();
      return `<li><button type="button" role="tab" data-n="${k}"><i>${String(k + 1).padStart(2, "0")}</i><b>${title}</b><span>${$(".w-cat", card).textContent}</span><em>${$(".w-state", card).textContent}</em></button></li>`;
    }).join("");
    list.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) select(+b.dataset.n); });
    list.addEventListener("pointerover", (e) => { const b = e.target.closest("button"); if (b && +b.dataset.n !== cur) select(+b.dataset.n); });
    list.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); e.stopPropagation(); select(cur + 1, true); }
      if (e.key === "ArrowUp") { e.preventDefault(); e.stopPropagation(); select(cur - 1, true); }
      if (e.key === "Enter") { e.preventDefault(); open(items[cur]); }
    });
    stage.addEventListener("click", (e) => { if (!e.target.closest("button")) open(items[cur]); });
    select(0);
    $("#modal-x").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  })();
  /* ───── words: P5 dialogue with typewriter ───── */
  (function dialogue() {
    const box = $("#dialog");
    if (!box) return;
    const text = $("#dl-text");
    const src = $("#dl-src");
    const count = $("#dl-count");
    let i = 0, timer = null, full = "";

    function show(n) {
      i = (n + QUOTES.length) % QUOTES.length;
      full = QUOTES[i].text;
      src.textContent = `— ${QUOTES[i].src}`;
      count.textContent = `${String(i + 1).padStart(2, "0")} / ${String(QUOTES.length).padStart(2, "0")}`;
      clearInterval(timer);
      if (reduceMotion) { text.textContent = full; return; }
      let k = 0;
      text.innerHTML = '<span class="caret"></span>';
      timer = setInterval(() => {
        k++;
        text.textContent = full.slice(0, k);
        text.insertAdjacentHTML("beforeend", '<span class="caret"></span>');
        if (k >= full.length) { clearInterval(timer); timer = null; }
      }, 55);
    }
    function advance(dir = 1) {
      if (timer && dir > 0) { clearInterval(timer); timer = null; text.textContent = full; return; }
      show(i + dir);
    }
    box.addEventListener("click", () => advance(1));
    box.addEventListener("keydown", (e) => {
      if (["Enter", " ", "ArrowRight"].includes(e.key)) { e.preventDefault(); advance(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); advance(-1); }
    });
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { show(0); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(box);
  })();
  /* ───── globe ───── */
  (function globe() {
    const canvas = $("#globe");
    if (!canvas) return;
    const tip = $("#globe-tip");
    const ctx = canvas.getContext("2d");
    const D = Math.PI / 180;
    let size, R, cx, cy;
    let lon0 = 100, lat0 = 26, target = null;
    let dragging = false, hovering = false, last = null, t = 0, hoverCity = null, visible = true;

    const vec = (lat, lon) => [Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D), Math.cos(lat * D) * Math.cos(lon * D)];
    const cities = CITIES.map(([name, lat, lon]) => ({ name, lat, lon, v: vec(lat, lon) }));
    const home = cities.find((c) => c.name === HOME);
    const land = (window.LAND_DOTS || []).map(([lat, lon]) => vec(lat, lon));
    const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

    function project(v) {
      const l = lon0 * D, p = lat0 * D;
      const x1 = v[0] * Math.cos(l) - v[2] * Math.sin(l);
      const z1 = v[0] * Math.sin(l) + v[2] * Math.cos(l);
      const y2 = v[1] * Math.cos(p) - z1 * Math.sin(p);
      const z2 = v[1] * Math.sin(p) + z1 * Math.cos(p);
      return { x: cx + R * x1, y: cy - R * y2, z: z2 };
    }
    function slerp(a, b, s) {
      const w = Math.acos(Math.min(1, Math.max(-1, dot3(a, b))));
      if (w < 1e-6) return a;
      const k1 = Math.sin((1 - s) * w) / Math.sin(w), k2 = Math.sin(s * w) / Math.sin(w);
      return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = size * 0.44; cx = cy = size / 2;
    }
    function line(points) {
      ctx.beginPath();
      let pen = false;
      for (const v of points) {
        const p = project(v);
        if (p.z > 0) { pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); pen = true; } else pen = false;
      }
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      const sea = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      sea.addColorStop(0, "#ffffff");
      sea.addColorStop(0.6, "#dcebfb");
      sea.addColorStop(1, "#b6d3f4");
      ctx.fillStyle = sea;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#0a1d52"; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = "rgba(52,198,255,0.5)"; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(cx, cy, R + 6, 0, Math.PI * 2); ctx.stroke();

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(10,29,82,0.09)";
      for (let lon = -180; lon < 180; lon += 20) { const pts = []; for (let lat = -90; lat <= 90; lat += 4) pts.push(vec(lat, lon)); line(pts); }
      for (let lat = -60; lat <= 60; lat += 20) { const pts = []; for (let lon = -180; lon <= 180; lon += 4) pts.push(vec(lat, lon)); line(pts); }

      const r = Math.max(1.6, R / 90);
      ctx.fillStyle = "#0a1d52";
      for (const v of land) {
        const p = project(v);
        if (p.z <= 0.02) continue;
        ctx.globalAlpha = 0.18 + p.z * 0.6;
        ctx.fillRect(p.x - r / 2, p.y - r / 2, r, r);
      }
      ctx.globalAlpha = 1;

      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.lineDashOffset = -t * 0.5;
      for (const c of cities) {
        if (c === home) continue;
        const span = Math.acos(Math.min(1, dot3(home.v, c.v)));
        const pts = [];
        for (let s = 0; s <= 1.0001; s += 0.04) {
          const v = slerp(home.v, c.v, s);
          const lift = 1 + 0.14 * Math.sin(Math.PI * s) * Math.min(1, span * 2);
          pts.push([v[0] * lift, v[1] * lift, v[2] * lift]);
        }
        ctx.strokeStyle = hoverCity === c ? "#1466ff" : "rgba(20,102,255,0.55)";
        line(pts);
      }
      ctx.setLineDash([]);

      for (const c of cities) {
        const p = project(c.v);
        c.p = p;
        if (p.z <= 0) continue;
        const isHome = c === home;
        const s = isHome ? 10 : 7;
        ctx.fillStyle = isHome ? "#0a1d52" : "#1466ff";
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        if (hoverCity === c || isHome) {
          ctx.font = "bold 12px " + getComputedStyle(document.body).fontFamily;
          const tw = ctx.measureText(c.name).width;
          ctx.fillStyle = "#0a1d52";
          ctx.fillRect(p.x + 8, p.y - 22, tw + 12, 18);
          ctx.fillStyle = "#fff";
          ctx.fillText(c.name, p.x + 14, p.y - 9);
        }
      }
    }

    function tick() {
      t++;
      if (target) {
        const d = ((target[0] - lon0 + 540) % 360) - 180;
        lon0 += d * 0.08;
        lat0 += (target[1] - lat0) * 0.08;
        if (Math.abs(d) < 0.1 && Math.abs(target[1] - lat0) < 0.1) target = null;
      } else if (!dragging && !hovering && !reduceMotion) {
        // sway over Asia so the visited cities stay in view
        lon0 += (92 + 38 * Math.sin(t * 0.004) - lon0) * 0.01;
      }
      if (!canvas.isConnected) return;
      if (visible) draw();
      requestAnimationFrame(tick);
    }

    canvas.addEventListener("pointerdown", (e) => { dragging = true; target = null; last = [e.clientX, e.clientY]; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      if (dragging) {
        lon0 -= (e.clientX - last[0]) * 0.35;
        lat0 = Math.max(-60, Math.min(70, lat0 + (e.clientY - last[1]) * 0.35));
        last = [e.clientX, e.clientY];
      }
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      hoverCity = null;
      let best = 12;
      for (const c of cities) {
        if (!c.p || c.p.z <= 0) continue;
        const d = Math.hypot(c.p.x - mx, c.p.y - my);
        if (d < best) { best = d; hoverCity = c; }
      }
      if (hoverCity) {
        tip.textContent = `${hoverCity.lat.toFixed(1)}°, ${hoverCity.lon.toFixed(1)}°`;
        tip.style.left = `${canvas.offsetLeft + hoverCity.p.x}px`;
        tip.style.top = `${canvas.offsetTop + hoverCity.p.y + 44}px`;
        tip.classList.add("on");
      } else tip.classList.remove("on");
    });
    const stop = () => (dragging = false);
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);
    canvas.addEventListener("pointerenter", () => (hovering = true));
    canvas.addEventListener("pointerleave", () => { hovering = false; hoverCity = null; tip.classList.remove("on"); });

    $$(".trips li").forEach((li) => {
      const f = li.dataset.focus.split(",").map(Number);
      li.addEventListener("pointerenter", () => (target = f));
      li.addEventListener("click", () => (target = f));
    });

    new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(canvas);
    on(window, "resize", resize);
    resize();
    tick();
  })();
  /* ───── characters slide in with their section ───── */
  (function charas() {
    const els = $$(".chara");
    if (!("IntersectionObserver" in window)) return els.forEach((n) => n.classList.add("shown"));
    const io = new IntersectionObserver((es) => {
      for (const e of es) e.target.classList.toggle("shown", e.isIntersecting);
    }, { threshold: 0.25 });
    els.forEach((n) => io.observe(n));
  })();
  /* ───── guestbook: giscus has to be injected by hand, swapped-in <script> tags never run ───── */
  (function guestbook() {
    const box = $("[data-giscus]");
    if (!box || !GISCUS.repoId || !SWAP) return;
    const s = document.createElement("script");
    const attrs = {
      src: "https://giscus.app/client.js", "data-repo": GISCUS.repo, "data-repo-id": GISCUS.repoId,
      "data-category": GISCUS.category, "data-category-id": GISCUS.categoryId, "data-mapping": "specific",
      "data-term": "guestbook", "data-strict": "1", "data-reactions-enabled": "1", "data-emit-metadata": "0",
      "data-input-position": "top", "data-theme": "transparent_dark", "data-lang": "zh-CN", crossorigin: "anonymous",
    };
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    s.async = true;
    const wait = document.createElement("p");
    wait.className = "gb-wait";
    wait.innerHTML = "留言板加载中……如果一直出不来，多半是连不上 GitHub，可以改成 <a data-mail>写信</a>。";
    wait.querySelector("a").href = `mailto:${EMAIL}`;
    box.replaceChildren(wait, s);
  })();
  /* ───── compendium: tap a card to flip it ───── */
  (function arcana() {
    for (const c of $$(".arcana")) {
      const flip = () => c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") === "true" ? "false" : "true");
      c.addEventListener("click", flip);
      c.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
    }
  })();
  /* ───── memories: lightbox ───── */
  (function lightbox() {
    const box = $("#lightbox"), img = $("#lb-img"), cap = $("#lb-cap"), idx = $("#lb-idx");
    const items = $$(".polaroid");
    if (!box || !items.length) return;
    let i = 0;
    function show(n) {
      i = (n + items.length) % items.length;
      img.src = items[i].dataset.src;
      img.alt = $("img", items[i]).alt;
      cap.textContent = items[i].dataset.cap;
      idx.textContent = `${String(i + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    }
    items.forEach((b, n) => b.addEventListener("click", () => { show(n); box.showModal(); }));
    $("#lb-prev").addEventListener("click", () => show(i - 1));
    $("#lb-next").addEventListener("click", () => show(i + 1));
    $("#lb-x").addEventListener("click", () => box.close());
    box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  })();
  /* ───── title screen: background follows the time of day; click the calendar to change it ───── */
  (function heroTime() {
    const hero = $(".hero.title");
    if (!hero) return;
    const SCENES = [
      { key: "day", src: "roof-day", label: "屋上 · 昼" },
      { key: "dusk", src: "roof-dusk", label: "屋上 · 夕暮れ" },
      { key: "night", src: "lounge-night", label: "寮 · 夜" },
    ];
    const auto = (d = new Date()) => { const h = d.getHours(); return h >= 6 && h < 16 ? 0 : h >= 16 && h < 19 ? 1 : 2; };
    let i = auto(), last = i;
    // A scene picked by hand stays until the clock crosses into the next part of the day.
    on(document, "colorai:tick", (e) => { const k = auto(e.detail); if (k !== last) set((last = k)); });
    const img = $(".ts-bg img", hero), label = $("[data-scene]", hero);
    function set(n) {
      i = (n + SCENES.length) % SCENES.length;
      const s = SCENES[i];
      hero.dataset.scene = s.key;
      img.src = `${ROOT}assets/bg/${s.src}.webp`;
      if (label) label.textContent = s.label;
    }
    set(i);
    $(".calendar", hero)?.addEventListener("click", (e) => { e.stopPropagation(); set(i + 1); });
  })();
  /* ───── post lists ───── */
  (function posts() {
    const fmtDate = (d) => d.replace(/^\d{4}\.?/, "") || "—";
    $$("[data-posts]").forEach((box) => {
      const limit = +box.dataset.posts || POSTS.length;
      const tag = new URLSearchParams(location.search).get("tag");
      const list = POSTS.filter((p) => !tag || p.tags.includes(tag)).slice(0, limit);
      const row = (p) =>
        `<li><a class="post-row" href="${ROOT}posts/${p.id}.html"><time>${box.dataset.year === "group" ? fmtDate(p.date) : p.date}</time>` +
        `<b>${p.title}</b><span>${p.desc}</span><em>${p.tags.map((t) => `#${t}`).join(" ")}</em></a></li>`;
      if (box.dataset.year !== "group") return (box.innerHTML = `<ol class="post-list">${list.map(row).join("")}</ol>`);
      const years = [...new Set(list.map((p) => p.date.slice(0, 4)))];
      box.innerHTML =
        (tag ? `<p class="tag-on">只看 <b>#${tag}</b> · <a href="index.html">看全部</a></p>` : "") +
        years.map((y) => `<section class="year"><h2>${y}</h2><ol class="post-list">${list.filter((p) => p.date.startsWith(y)).map(row).join("")}</ol></section>`).join("");
    });
    $$("[data-tags]").forEach((box) => {
      const count = {};
      POSTS.forEach((p) => p.tags.forEach((t) => (count[t] = (count[t] || 0) + 1)));
      box.innerHTML = Object.entries(count).sort((a, b) => b[1] - a[1]).map(([t, n]) => `<a href="${ROOT}posts/index.html?tag=${encodeURIComponent(t)}">#${t}<i>${n}</i></a>`).join("");
    });
    // prev / next links at the end of a post
    const self = document.body.dataset.post;
    const nav = $("[data-post-nav]");
    if (self && nav) {
      const k = POSTS.findIndex((p) => p.id === self);
      const newer = POSTS[k - 1], older = POSTS[k + 1];
      nav.innerHTML =
        (older ? `<a href="${older.id}.html"><i>← 更早</i><b>${older.title}</b></a>` : "<span></span>") +
        (newer ? `<a class="r" href="${newer.id}.html"><i>更新 →</i><b>${newer.title}</b></a>` : "<span></span>");
    }
  })();
  /* ───── friend links ───── */
  (function friends() {
    $$("[data-friends]").forEach((box) => {
      box.innerHTML = FRIENDS.map(([name, url, desc, badge, color]) =>
        `<a class="fr-card" href="${url}" target="_blank" rel="noopener" style="--fc:${color}"><span class="fr-av">${badge}</span><b>${name}</b><span>${desc}</span><i>↗</i></a>`
      ).join("") + (box.dataset.friends === "more" ? `<a class="fr-card more" href="${ROOT}friends.html"><span class="fr-av">+</span><b>交换友链</b><span>写信给我</span><i>→</i></a>` : "");
    });
  })();
}
initPage();
