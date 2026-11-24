const EMAIL = "colorai@hnu.edu.cn";

const QUOTES = [
  { text: "在静滞中随波逐流，\n在微动中厚积薄发，\n在浪潮中尽显本色。", src: "碎碎念 · 2025.09.04" },
  { text: "湖灯铺湿径，\n缓步偶随人影过，\n心闲步自轻。", src: "后湖散步 · 2026.05" },
  { text: "请务必日复一日地相信自己。", src: "碎碎念 · 2026.10" },
  { text: "一直在玩 jrpg 的寒假。", src: "碎碎念 · 2025.02.10" },
  { text: "时间越来越不够用了。。。", src: "碎碎念 · 2025.02.17" },
  { text: "今天可能算虚度了一天吧。", src: "碎碎念 · 2025.02.18" },
  { text: "自从开学以来坚持不熬夜，才发现不熬夜的好处（）", src: "碎碎念 · 2025.02.22" },
  { text: "自由总是伴随一种背叛现实的余韵。", src: "长文 · 2024" },
  { text: "第一次如此深刻地感受世界的盛大。", src: "长文 · 2024" },
  { text: "看完演唱会后的激动久久难以忘怀。", src: "长文 · 2024" },
  { text: "不论是哭是笑，夏秋总会来临。", src: "长文 · 2024" },
  { text: "季节自顾自地回旋。", src: "长文 · 2024" },
];

// Countdown rows on the about page, in Beijing time. kind "year" / "day" are built in.
// Other rows count down to `to` ("YYYY-MM-DD" or "YYYY-MM-DD HH:MM"); `from` adds a progress bar; `done` is shown once `to` has passed.
const COUNTDOWNS = [
  { kind: "year" },
  { kind: "day" },
  { label: "距离 2027 届毕业", from: "2023-09-01", to: "2027-06-30", done: "已毕业" },
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
    [403180, "キミの記憶", "川村ゆみ · P3 原版", 369],
    [403010, "Want To Be Close", "川村ゆみ · P3 原版", 153],
    [403082, "Changing Seasons", "アトラスサウンドチーム · P3 原版", 179],
    [507585438, "Soul Phrase -long ver.-", "喜多修平 · P3P", 181],
    [403028, "巌戸台分寮", "アトラスサウンドチーム · P3 原版", 151],
  ],
  P4G: [
    [402742, "Your Affection", "平田志穂子", 172],
    [402801, "Reach Out To The Truth", "平田志穂子", 167],
    [402722, "Pursuing My True Self", "平田志穂子", 86],
    [402815, "Heartbeat, Heartbreak", "平田志穂子", 135],
    [402271, "Signs Of Love", "平田志穂子", 180],
    [401798, "Shadow World", "平田志穂子", 283],
    [401800, "Time To Make History", "平田志穂子", 152],
    [402868, "Never More", "平田志穂子", 397],
    [402808, "specialist", "平田志穂子", 133],
    [439915109, "I'll Face Myself", "目黒将司", 161],
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
    [1403087374, "I believe", "Lyn", 271],
    [454224871, "Tokyo Daylight", "Lyn", 124],
    [454231747, "Blooming Villain", "アトラスサウンドチーム", 248],
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
// Globe city cards: [Chinese name for Baidu Baike, when, one line, photo under assets/photos or ""]
const CITY_INFO = {
  "长沙": ["长沙", "2023 —", "在湖大读书，晚上常去后湖散步。", ""],
  "梅州": ["梅州", "", "粤东的山城。", ""],
  "广州": ["广州", "2024 · 2025 · 2026", "去了好几次，沙面和珠江夜景。", "gz-cantontower.webp"],
  "深圳": ["深圳", "2024 · 2026", "秋招路上来回跑的城市。", "sz-night.webp"],
  "惠州": ["惠州", "2026.08", "实习的一个月，西湖和东江。", "hz-westlake.webp"],
  "东莞": ["东莞", "2026", "秋招路过。", ""],
  "香港": ["香港", "2024 · 2026.10", "国庆听了 TOGENASHI TOGEARI，第二天去 M+ 看海。", "hk-ferry.webp"],
  "潮州": ["潮州", "", "", ""],
  "厦门": ["厦门", "2025", "中山路和海边。", "xm-harbour.webp"],
  "上海": ["上海", "2024.05 · 2024.09", "上了上海之巅；九月听了人生第一场演唱会。", "sh-pearl.webp"],
  "北京": ["北京", "2026.07", "五天：故宫、颐和园、国贸和天安门。", "bj-taihe.webp"],
  "武汉": ["武汉", "2024", "暑假登了黄鹤楼。", "wh-yellowcrane.webp"],
  "重庆": ["重庆", "2025", "一个人探索山城：坡道、轻轨与江边的夜色。", "cq-night.webp"],
  "東京": ["东京", "2024.08", "巡礼的一周：下北泽、御茶水、须贺神社的台阶。", "t-shibuya-sky.webp"],
  "江ノ島": ["江之岛", "2024.08", "坐江之电到镰仓高校前，七里滨的海。", "e-enoden.webp"],
  "横浜": ["横滨", "2024.08", "人生第一场烟火大会。", "y-fireworks.webp"],
  "京都": ["京都", "2024.08", "伏见稻荷和岚山。", "j-inari-path.webp"],
  "大阪": ["大阪", "2024.08", "道顿堀和环球影城。", "o-dotonbori.webp"],
  "Singapore": ["新加坡", "2016", "第一次出国，赤道边潮湿的热。", ""],
  "Kuala Lumpur": ["吉隆坡", "2016", "第一次出国的第二站。", ""],
  "Moscow": ["莫斯科", "2018", "红场。", ""],
  "Saint Petersburg": ["圣彼得堡", "2018", "涅瓦河。", ""],
};

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

// Friend links: [name, url, one-line description, two-letter badge, colour, category]. The friends page groups by category.
const FRIENDS = [
  ["Rain Chen", "https://congjyu.github.io/blog/", "Rain Chen's Blog", "RC", "#8fb8ff", "Central HK"],
  ["木球小屋", "https://jupiterkwan.github.io/", "Jupiter's Lodge", "木", "#6f8fd8", "Central HK"],
  ["BBBNicolas", "https://dingbangliu.codeberg.page/", "Embrace life and what you are", "BN", "#5bb7a5", "Central HK"],
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
  welcome(withSplash);
}

/* ───── home: a greeting in three languages that fades out after a few seconds; once per visit, again on Replay intro ───── */
function welcome(force) {
  const top = $("#top");
  if (!top || (!force && sessionStorage.getItem("colorai-welcome"))) return;
  sessionStorage.setItem("colorai-welcome", "1");
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Shanghai" }).format(new Date()));
  const [zh, en, ja, big] = h < 5 ? ["夜深了，欢迎来坐坐", "Still up? Welcome.", "夜更かしですね、ようこそ", "STILL UP"]
    : h < 11 ? ["早上好，欢迎光临", "Good morning, welcome.", "おはよう、ようこそ", "GOOD MORNING"]
    : h < 18 ? ["下午好，欢迎光临", "Good afternoon, welcome.", "こんにちは、ようこそ", "GOOD AFTERNOON"]
    : ["晚上好，欢迎光临", "Good evening, welcome.", "こんばんは、ようこそ", "GOOD EVENING"];
  const now = new Date(), tz = { timeZone: "Asia/Shanghai" };
  const date = `${new Intl.DateTimeFormat("en-US", { ...tz, month: "2-digit", day: "2-digit" }).format(now)} ${new Intl.DateTimeFormat("en-US", { ...tz, weekday: "short" }).format(now).toUpperCase()}`;
  // ransom-note letters: each character gets its own tilted box, popping in one after another
  const ROT = [-6, 4, -3, 7, -5, 3, -8, 5];
  let n = 0;
  const boxes = [...zh].map((c) => /[，,]/.test(c) ? `<i class="tw-gap"></i>` : `<span class="k${n % 3}" style="--i:${n};--r:${ROT[n++ % ROT.length]}deg">${c}</span>`).join("");
  $(".ts-welcome")?.remove();
  const el = document.createElement("div");
  el.className = "ts-welcome";
  el.innerHTML = `<canvas aria-hidden="true"></canvas><div class="tw-big" aria-hidden="true"><span>${big}</span></div>`
    + `<div class="tw-text" role="status"><div class="tw-up"><i class="tw-tag">◆ WELCOME ─ ${date}</i><b class="tw-zh">${boxes}</b></div>`
    + `<div class="tw-down"><em lang="en">${en}</em><em lang="ja">${ja}</em></div></div>`;
  top.append(el);
  const W = top.clientWidth, H = Math.min(top.clientHeight, window.innerHeight);
  const ly = H * (W < 640 ? 0.42 : 0.5);
  el.style.setProperty("--ly", `${ly}px`);
  let done = false;
  const end = () => { if (done) return; done = true; el.classList.add("off"); setTimeout(() => el.remove(), 1000); };
  el.addEventListener("click", end, { once: true });
  if (reduceMotion) {
    requestAnimationFrame(() => el.classList.add("on"));
    setTimeout(end, 2600);
    return;
  }

  // Pixels fly in from all four edges and gather into a glowing streak that the greeting sits on; a white slash cuts it away and the pixels scatter.
  const cv = $("canvas", el), cx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = W * dpr; cv.height = H * dpr; cv.style.height = `${H}px`;
  cx.scale(dpr, dpr);
  const half = Math.min(W * 0.36, 380);
  const COLORS = ["#34c6ff", "#9fe9ff", "#ffffff", "#34c6ff", "#1466ff"];
  const N = W < 640 ? 260 : 520;
  const ps = Array.from({ length: N }, () => {
    const side = Math.floor(Math.random() * 4), r = Math.random();
    const [sx, sy] = side === 0 ? [r * W, -10] : side === 1 ? [W + 10, r * H] : side === 2 ? [r * W, H + 10] : [-10, r * H];
    const tx = W / 2 + (Math.random() * 2 - 1) * half * (0.25 + 0.75 * Math.random() ** 0.5), ty = ly + (Math.random() - 0.5) * 6;
    const a = Math.random() * Math.PI * 2, v = 120 + Math.random() * 420;
    return { sx, sy, tx, ty, s: 1.5 + Math.random() * 2.5, c: COLORS[(Math.random() * COLORS.length) | 0], d: Math.random() * 0.35, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 0.6 };
  });
  const IN = 0.95, HOLD = 2.9, OUT = 0.9;
  const ease = (t) => 1 - (1 - t) ** 3;
  let t0 = 0, shown = false;
  function frame(now) {
    if (!el.isConnected) return;
    t0 ||= now;
    const t = (now - t0) / 1000;
    cx.clearRect(0, 0, W, H);
    // streak: grows once most pixels have landed, flickers slightly, fades during the scatter
    const grow = Math.min(1, Math.max(0, (t - IN * 0.7) / 0.45)), fade = t > IN + HOLD ? Math.max(0, 1 - (t - IN - HOLD) / (OUT * 0.6)) : 1;
    if (grow > 0 && fade > 0) {
      const g = cx.createLinearGradient(W / 2 - half, 0, W / 2 + half, 0);
      g.addColorStop(0, "rgba(52,198,255,0)"); g.addColorStop(0.5, "rgba(159,233,255,0.95)"); g.addColorStop(1, "rgba(52,198,255,0)");
      cx.globalAlpha = fade * (0.85 + Math.random() * 0.15);
      cx.fillStyle = g;
      cx.shadowColor = "#34c6ff"; cx.shadowBlur = 18;
      cx.fillRect(W / 2 - half * ease(grow), ly - 1, half * 2 * ease(grow), 2);
      cx.shadowBlur = 0;
    }
    for (const p of ps) {
      let x, y, al = 1;
      if (t < IN + HOLD) {
        const k = ease(Math.min(1, Math.max(0, (t - p.d) / (IN - p.d))));
        x = p.sx + (p.tx - p.sx) * k; y = p.sy + (p.ty - p.sy) * k;
        if (k >= 1) { x += Math.sin(t * 7 + p.tx) * 0.6; al = 0.55 + 0.45 * Math.sin(t * 9 + p.tx * 0.1) ** 2; }
        else al = 0.35 + 0.65 * k;
      } else {
        const k = (t - IN - HOLD) / OUT;
        x = p.tx + p.vx * k; y = p.ty + p.vy * k;
        al = Math.max(0, 1 - k);
      }
      cx.globalAlpha = al;
      cx.fillStyle = p.c;
      cx.fillRect(x, y, p.s, p.s);
    }
    const sl = (t - IN - HOLD) / 0.32;
    if (sl > 0 && sl < 1) {
      const x = -W * 0.2 + W * 1.4 * ease(sl), k = H * 0.35;
      cx.globalAlpha = 0.9 * (1 - sl);
      cx.fillStyle = "#fff";
      cx.beginPath(); cx.moveTo(x + k, 0); cx.lineTo(x + k + 26, 0); cx.lineTo(x - k + 8, H); cx.lineTo(x - k - 18, H); cx.fill();
    }
    cx.globalAlpha = 1;
    if (!shown && t > IN * 0.8) { shown = true; el.classList.add("on"); }
    if (t > IN + HOLD && !done) { done = true; el.classList.add("off"); }
    if (t < IN + HOLD + OUT) requestAnimationFrame(frame);
    else el.remove();
  }
  requestAnimationFrame(frame);
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
const KEEP = "#pixels, #player, #ask, #toast";
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

// A click on blank space that only closes a floating panel shouldn't also turn the page.
function eatBlankClick(e) {
  if (e.target.closest("a, button, input, textarea, select, label, [role=button], [tabindex]")) return;
  const eat = (c) => { c.stopPropagation(); c.preventDefault(); };
  document.addEventListener("click", eat, { capture: true, once: true });
  setTimeout(() => document.removeEventListener("click", eat, true), 800);
}

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
    syncNow();
  }
  // The home page's "在听" button mirrors whatever the player has loaded.
  function syncNow() {
    if (!cur) return;
    const [, title] = TRACKS[cur.game][cur.n];
    for (const b of $$(".now-play")) {
      b.dataset.play = `${cur.game}:${cur.n}`;
      b.textContent = `${audio.paused ? "▶" : "❚❚"} ${title}`;
      b.classList.toggle("playing", !audio.paused);
      b.setAttribute("aria-label", `${audio.paused ? "播放" : "暂停"}：${title}`);
    }
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
  document.addEventListener("pointerdown", (e) => {
    if (panel.hidden || root.contains(e.target) || e.target.closest("[data-open-player], [data-play]")) return;
    open(false);
    eatBlankClick(e);
  }, true);

  audio.addEventListener("play", () => { root.classList.add("playing"); $("#pl-play").textContent = "❚❚"; $("#pl-play").setAttribute("aria-label", "暂停"); syncNow(); });
  audio.addEventListener("pause", () => { root.classList.remove("playing"); $("#pl-play").textContent = "▶"; $("#pl-play").setAttribute("aria-label", "播放"); syncNow(); });
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
      if (b.classList.contains("now-play") && cur && cur.game === g && cur.n === +n) return toggle();
      open(true); setGame(g); load(g, +n);
    }));
    syncNow();
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

/* ───── ask AI: a floating chat backed by cloudflare/functions/api/ask.js (Workers AI) ─────
   Built once and listed in KEEP, so a conversation survives page swaps. Needs the deployed site, so file:// skips it (askUI is null).
   The one conversation is drawn into every attached "view": the floating panel always, plus the contact page's phone while docked. */
const askUI = (function ask() {
  if (!SWAP || /^(localhost|127\.|\[::1\])/.test(location.hostname)) return null;
  const LOG = "colorai-ask";
  const root = document.createElement("aside");
  root.id = "ask";
  root.className = "ask";
  root.setAttribute("aria-label", "问 AI");
  root.innerHTML = `
    <button type="button" class="ask-btn" aria-expanded="false" aria-controls="ask-panel"><b>?</b><span><i>ASK</i>问 AI</span></button>
    <div class="ask-panel" id="ask-panel" hidden>
      <div class="ask-head"><span>✦ ASK <i lang="ja">しつもん</i></span><span><button type="button" class="ask-clear" title="清空对话">↺</button><button type="button" class="ask-x" aria-label="收起">—</button></span></div>
      <div class="ask-log" role="log" aria-live="polite"></div>
      <div class="ask-chips"></div>
      <form class="ask-form"><textarea rows="1" maxlength="800" placeholder="问点什么……（Enter 发送）" aria-label="你的问题"></textarea><button type="submit" aria-label="发送">▶</button></form>
      <p class="ask-note">AI 回答，可能出错；关于站长只知道网站上公开的内容。</p>
    </div>`;
  document.body.insertBefore(root, $("#toast"));
  const btn = $(".ask-btn", root), panel = $(".ask-panel", root), log = $(".ask-log", root), chips = $(".ask-chips", root);
  const form = $(".ask-form", root), input = $("textarea", form);
  const SUGGEST = ["Colorai 是谁？", "电赛做了什么？", "SST 是什么，为什么换四电平？", "推荐一首 P 系列的歌"];
  let msgs = [];
  try { msgs = JSON.parse(sessionStorage.getItem(LOG)) || []; } catch {}
  let busy = false, live = null;
  const views = new Set();

  const esc = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`\n]+)`/g, "<code>$1</code>").replace(/^#{1,4}\s*/gm, "");
  // kind: "user" | "assistant" | "assistant pending" | "assistant error"
  function add(v, kind, text) {
    const el = v.make();
    v.paint(el, kind, fmt(text));
    v.log.append(el);
    return el;
  }
  const bottom = (v) => (v.log.scrollTop = v.log.scrollHeight);
  function draw(v) {
    v.reset();
    msgs.forEach((m) => add(v, m.role, m.content));
    if (live) live.els.set(v, add(v, live.kind, live.text));
    v.chips.innerHTML = msgs.length ? "" : SUGGEST.map((q) => `<button type="button">${esc(q)}</button>`).join("");
    v.send.disabled = busy;
    bottom(v);
  }
  const render = () => views.forEach(draw);
  // v: { log, chips, form, input, send, make() -> element, paint(el, kind, html), reset() }
  function attach(v) {
    v.ac = new AbortController();
    const o = { signal: v.ac.signal };
    v.chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) askAI(b.textContent); }, o);
    v.form.addEventListener("submit", (e) => { e.preventDefault(); const q = v.input.value; v.input.value = ""; v.input.style.height = ""; askAI(q); }, o);
    views.add(v);
    draw(v);
  }
  function detach(v) {
    v.ac?.abort();
    views.delete(v);
    live?.els.delete(v);
  }
  const save = () => sessionStorage.setItem(LOG, JSON.stringify(msgs.slice(-20)));
  function open(v = panel.hidden) {
    panel.hidden = !v;
    btn.setAttribute("aria-expanded", String(v));
    root.classList.toggle("open", v);
    if (v) { log.scrollTop = log.scrollHeight; setTimeout(() => input.focus(), 50); }
  }
  async function askAI(q) {
    q = q.trim();
    if (!q || busy) return;
    busy = true;
    msgs.push({ role: "user", content: q });
    live = { kind: "assistant pending", text: "……", els: new Map() };
    views.forEach((v) => {
      v.send.disabled = true;
      v.chips.innerHTML = "";
      add(v, "user", q);
      live.els.set(v, add(v, live.kind, live.text));
      bottom(v);
    });
    const show = (kind, t) => {
      live.kind = kind;
      live.text = t;
      live.els.forEach((el, v) => { v.paint(el, kind, fmt(t)); bottom(v); });
    };
    let text = "";
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: msgs }) });
      if (!res.ok || !res.body) throw new Error((await res.json().catch(() => ({}))).error || "AI 暂时不在线");
      const reader = res.body.getReader(), dec = new TextDecoder();
      let buf = "", end = false;
      while (!end) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop();
        for (const part of parts) {
          const d = part.replace(/^data:\s*/, "");
          if (d === "[DONE]") { end = true; reader.cancel().catch(() => {}); break; }
          try { text += JSON.parse(d).t || ""; } catch {}
        }
        text = text.replace(/^\s*<think>[\s\S]*?(<\/think>\s*|$)/, "");
        if (text) show("assistant", text);
      }
      if (!text.trim()) throw new Error("AI 没有回答，换个问法试试");
      msgs.push({ role: "assistant", content: text.trim() });
    } catch (err) {
      show("assistant error", err.message || "出错了");
      msgs.pop();
    }
    live = null;
    save();
    busy = false;
    views.forEach((v) => (v.send.disabled = false));
  }
  // Docking hides the floating widget, flying it toward `to` (the phone); dock(null) brings it back.
  // Returns whether focus was inside the widget, so the dock can take it over.
  function dock(to) {
    if (!!to === root.classList.contains("docked")) return false;
    const had = root.contains(document.activeElement);
    if (to) {
      open(false);
      const a = btn.getBoundingClientRect(), b = to.getBoundingClientRect();
      root.style.setProperty("--dx", `${Math.round(b.left + b.width / 2 - a.left - a.width / 2)}px`);
      root.style.setProperty("--dy", `${Math.round(b.top + b.height / 2 - a.top - a.height / 2)}px`);
    }
    root.classList.toggle("docked", !!to);
    root.inert = !!to;
    return had;
  }

  btn.addEventListener("click", () => open());
  $(".ask-x", root).addEventListener("click", () => open(false));
  $(".ask-clear", root).addEventListener("click", () => { if (busy) return; msgs = []; save(); render(); });
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); } });
  input.addEventListener("input", () => { input.style.height = ""; input.style.height = `${Math.min(input.scrollHeight, 120)}px`; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) open(false); });
  document.addEventListener("pointerdown", (e) => { if (!panel.hidden && !root.contains(e.target)) { open(false); eatBlankClick(e); } }, true);
  attach({
    log, chips, form, input, send: $("button", form),
    make: () => document.createElement("p"),
    paint(el, kind, html) { el.className = `ask-msg ${kind}`; el.innerHTML = html; },
    reset() { log.innerHTML = ""; add(this, "assistant", "你好，我是这个站的 AI 助手。可以问我关于 Colorai 的事，或者电气、动漫、音乐之类的问题。"); },
  });
  return { attach, detach, dock };
})();

/* ───── editable content: overrides saved from the admin panel live in D1, see cloudflare/functions/api/content.js ─────
   Text: an element tagged data-edit="page.name" shows the saved plain text instead (newlines become <br>, never parsed as HTML).
   Lists: data:QUOTES / POSTS / FRIENDS / CITY_INFO / STATS replace the constants above in place, before anything renders.
   The static HTML and the constants stay the fallback, so file:// or a failed request just shows them. */
const EDITABLE = { QUOTES, POSTS, FRIENDS, CITY_INFO, STATS };
const DEFAULTS = JSON.parse(JSON.stringify(EDITABLE));
const CONTENT_CACHE = "colorai-content";
let CONTENT = {};
const ORIGINAL = new WeakMap();
const escHTML = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
function setText(el, s) {
  el.replaceChildren(...String(s).split("\n").flatMap((line, i) => (i ? [document.createElement("br"), line] : [line])));
}
function applyText(root = document) {
  // The footer is the same on every page, so it shares one key.
  $$(".foot-note:not([data-edit])", root).forEach((el) => (el.dataset.edit = "site.foot-note"));
  for (const el of $$("[data-edit]", root)) {
    const v = CONTENT[`text:${el.dataset.edit}`];
    if (typeof v === "string") {
      if (!ORIGINAL.has(el)) ORIGINAL.set(el, [...el.childNodes].map((n) => n.cloneNode(true)));
      setText(el, v);
    } else if (ORIGINAL.has(el)) {
      el.replaceChildren(...ORIGINAL.get(el).map((n) => n.cloneNode(true)));
      ORIGINAL.delete(el);
    }
  }
}
function applyData() {
  for (const [name, target] of Object.entries(EDITABLE)) {
    let v = CONTENT[`data:${name}`];
    if (!v || typeof v !== "object" || Array.isArray(v) !== Array.isArray(target)) v = DEFAULTS[name];
    const copy = JSON.parse(JSON.stringify(v));
    if (Array.isArray(target)) target.splice(0, target.length, ...copy);
    else { Object.keys(target).forEach((k) => delete target[k]); Object.assign(target, copy); }
  }
}
function storeContent(c) {
  CONTENT = c;
  try { sessionStorage.setItem(CONTENT_CACHE, JSON.stringify({ t: Date.now(), c })); } catch {}
}
async function loadContent() {
  if (!SWAP) return false;
  try {
    const res = await fetch("/api/content");
    if (!res.ok || !/json/.test(res.headers.get("content-type") || "")) return false;
    const d = await res.json();
    storeContent(d.content && typeof d.content === "object" ? d.content : {});
    return true;
  } catch { return false; }
}
/* admin.js (inline editing + admin.html) is only fetched by the browser holding the admin key, on admin.html, or with #admin. */
function adminTools() {
  if (!SWAP) return;
  if (window.coloraiAdmin) return window.coloraiAdmin.page();
  if (!localStorage.getItem("colorai-admin") && document.body.dataset.page !== "admin" && location.hash !== "#admin") return;
  const src = new URL(`${ROOT}admin.js`, location.href).href;
  if (loadedScripts.has(src)) return;
  loadedScripts.add(src);
  const s = document.createElement("script");
  s.src = src;
  document.head.append(s);
}

/* ───── per-page setup: runs on first load and after every in-site page swap ───── */
let pageAC = new AbortController();
const on = (t, type, fn, o) => t.addEventListener(type, fn, { ...(typeof o === "object" ? o : { capture: !!o }), signal: pageAC.signal });
function initPage() {
  pageAC.abort();
  pageAC = new AbortController();
  applyText();
  clock();
  mail();
  player.bind();
  /* ───── page-by-page navigation: click blank space, keys, or the pager ───── */
  (function pager() {
    const secs = $$("[data-hud]");
    const SKIP = "a, button, input, select, textarea, label, canvas, dialog, .player, .ask, .dialog, .danmaku, .gb-box, .polaroid, .wall.stacked, .wk, .trips li, .phone, .cc-card, .status-card, .arcana, .globe-wrap, .timeline li, .gtl, .post-row, .fr-card, .prose, .branch";
    const KEEP_MENU = "a, img, input, textarea, select, [contenteditable], pre, code, .player, .ask";
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
  /* ───── contact phone: while it is on screen, the ask-AI widget docks into it and the phone goes ONLINE ───── */
  (function phone() {
    const ph = $(".phone");
    if (!ph) return;
    const st = $(".ph-st", ph);
    const status = (t) => { if (st) st.textContent = t; };
    status("OFFLINE");
    if (!askUI || !("IntersectionObserver" in window)) return;
    const chat = $(".ph-chat", ph);
    const chips = document.createElement("div");
    chips.className = "ph-chips";
    const form = document.createElement("form");
    form.className = "ph-form";
    form.innerHTML = `<input type="text" maxlength="800" enterkeyhint="send" autocomplete="off" placeholder="问点什么……" aria-label="问 AI"><button type="submit">发送 →</button>`;
    const mailto = document.createElement("a");
    mailto.className = "ph-mail";
    mailto.href = `mailto:${EMAIL}`;
    mailto.textContent = `${EMAIL} · 写信`;
    const view = {
      log: chat, chips, form, input: $("input", form), send: $("button", form),
      make: () => document.createElement("li"),
      paint(el, kind, html) {
        const [role, state = ""] = kind.split(" ");
        el.className = `ai ${role === "user" ? "in" : "out"} ${state}`.trim();
        el.innerHTML = (role === "user" ? "<b>你</b>" : "") + html.replace(/<(\/?)b>/g, "<$1strong>");
      },
      reset() {
        $$("li.ai", chat).forEach((n) => n.remove());
        const s = document.createElement("li");
        s.className = "ai sys";
        s.textContent = "AI 已接入 · 回答可能出错";
        chat.append(s);
      },
    };
    const label = ph.getAttribute("aria-label");
    let docked = false, timer = 0;
    function set(v) {
      if (v === docked) return;
      docked = v;
      clearTimeout(timer);
      ph.classList.toggle("on", v);
      if (v) {
        const refocus = askUI.dock(ph);
        ph.append(chips, form, mailto);
        askUI.attach(view);
        ph.setAttribute("aria-label", "问 AI");
        status(reduceMotion ? "ONLINE · 长沙" : "CONNECTING…");
        if (!reduceMotion) timer = setTimeout(() => status("ONLINE · 长沙"), 450);
        if (refocus) view.input.focus({ preventScroll: true });
      } else {
        askUI.detach(view);
        $$("li.ai", chat).forEach((n) => n.remove());
        chips.remove(); form.remove(); mailto.remove();
        if (label) ph.setAttribute("aria-label", label);
        status("OFFLINE");
        askUI.dock(null);
      }
    }
    // Dock once half the phone (or most of the screen) shows; undock only when it has nearly gone, and not while typing in it.
    const io = new IntersectionObserver(([e]) => {
      const r = e.intersectionRatio, fills = e.rootBounds && e.intersectionRect.height > e.rootBounds.height * 0.6;
      if (r >= 0.5 || fills) set(true);
      else if (!e.isIntersecting || (r < 0.2 && !ph.contains(document.activeElement))) set(false);
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1] });
    io.observe(ph);
    pageAC.signal.addEventListener("abort", () => { io.disconnect(); set(false); }, { once: true });
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
      html += `<text x="${x}" y="${y - 2}" text-anchor="${anchor}">${escHTML(zh)}</text><text class="en" x="${x}" y="${y + 11}" text-anchor="${anchor}">${escHTML(en)}</text>`;
    });
    svg.innerHTML = html;

    $("#st-ranks").innerHTML = STATS.map(([zh, , lv, rank]) =>
      `<li class="${lv === 5 ? "max" : ""}"><span>${escHTML(zh)}</span><span class="pips">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= lv ? "on" : ""}"></i>`).join("")}</span><b>${escHTML(rank)}</b></li>`
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
  /* ───── words: QUOTES drift by as danmaku; clicking one pins it in the P4 caption bar below ───── */
  (function danmaku() {
    const stage = $("#dm-stage");
    if (!stage || !QUOTES.length) return;
    const text = $("#dm-text"), src = $("#dm-src"), count = $("#dm-count"), cap = $("#dm-cap");
    const N = QUOTES.length;
    const LOOKS = ["tag", "", "line", "", "acc", "", "", "tag", "", "line", "", "acc", ""];
    const SIZES = ["l", "m", "s", "m", "l", "s", "m"];
    const flat = (s) => s.replace(/\n+/g, "　");
    let cur = 0, timer = null, full = "", typed = false;

    $("#dm-all").innerHTML = QUOTES.map((q) => `<li>${escHTML(flat(q.text))} —— ${escHTML(q.src)}</li>`).join("");

    function show(n, type = true) {
      cur = (n + N) % N;
      full = QUOTES[cur].text;
      src.textContent = QUOTES[cur].src ? `— ${QUOTES[cur].src}` : "";
      count.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
      $$(".dm-b", stage).forEach((b) => b.classList.toggle("on", +b.dataset.i === cur));
      clearInterval(timer);
      timer = null;
      if (reduceMotion || !type) { text.textContent = full; return; }
      let k = 0;
      text.innerHTML = '<span class="caret"></span>';
      timer = setInterval(() => {
        k++;
        text.textContent = full.slice(0, k);
        text.insertAdjacentHTML("beforeend", '<span class="caret"></span>');
        if (k >= full.length) { clearInterval(timer); timer = null; }
      }, 45);
    }
    function step(dir) {
      if (timer && dir > 0) { clearInterval(timer); timer = null; text.textContent = full; return; }
      show(cur + dir);
    }
    function bullet(i) {
      const b = document.createElement("button");
      b.type = "button";
      b.tabIndex = -1;
      b.className = `dm-b ${LOOKS[i % LOOKS.length]} ${SIZES[i % SIZES.length]}${i === cur ? " on" : ""}`.replace(/ +/g, " ");
      b.dataset.i = i;
      b.dataset.src = QUOTES[i].src ? `— ${QUOTES[i].src}` : "";
      b.textContent = flat(QUOTES[i].text);
      return b;
    }
    show(0, false);
    on(stage, "click", (e) => { const b = e.target.closest(".dm-b"); if (b) show(+b.dataset.i); });
    $("#dm-prev").addEventListener("click", () => step(-1));
    $("#dm-next").addEventListener("click", () => step(1));
    on(cap, "keydown", (e) => { if (e.target === cap && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); step(1); } });

    let visible = false;
    on(document, "keydown", (e) => {
      if (!visible || (e.key !== "ArrowRight" && e.key !== "ArrowLeft") || e.altKey || e.ctrlKey || e.metaKey) return;
      if (document.querySelector("dialog[open]") || e.target.closest("input, textarea, select, [contenteditable], [role=tablist], [role=slider]")) return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    });

    if (reduceMotion) {
      // No motion: the bullets sit scattered in place and can still be clicked.
      stage.classList.add("still");
      stage.append(...QUOTES.map((_, i) => bullet(i)));
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
      io.observe(stage);
      pageAC.signal.addEventListener("abort", () => io.disconnect(), { once: true });
      return;
    }

    let lanes = [], W = 0, H = 0, raf = 0, last = 0, hover = false, order = [], q = 0;
    const live = new Set();
    const narrow = () => window.matchMedia("(max-width: 620px)").matches;
    function pick() {
      for (let k = 0; k < N; k++) {
        if (q >= order.length) { order = [...Array(N).keys()].sort(() => Math.random() - 0.5); q = 0; }
        const i = order[q++];
        if (!live.has(i)) return i;
      }
      return -1;
    }
    function spawn(lane, x) {
      const i = pick();
      if (i < 0) return false;
      const el = bullet(i);
      if (lane.k >= lanes.length / 2) el.classList.add("up");
      el.style.top = `${lane.y}px`;
      el.style.transform = `translate3d(${x}px, -50%, 0)`;
      stage.append(el);
      live.add(i);
      lane.items.push({ el, x, w: el.offsetWidth, i });
      lane.gap = 36 + Math.random() * 150;
      return true;
    }
    // Each lane has its own speed, so a bullet can never catch the one ahead of it.
    function layout() {
      stage.replaceChildren();
      live.clear();
      W = stage.clientWidth; H = stage.clientHeight;
      const n = narrow() ? 3 : 5, lh = H / n, base = narrow() ? 30 : 42;
      lanes = Array.from({ length: n }, (_, k) => ({ k, y: lh * (k + 0.5), speed: base + ((k * 3) % n) * (narrow() ? 7 : 9) + Math.random() * 6, items: [], gap: 0 }));
      for (const lane of lanes) {
        let x = Math.random() * W * 0.45;
        while (x < W && spawn(lane, x)) { const it = lane.items.at(-1); x = it.x + it.w + lane.gap; }
      }
    }
    function advance(dt) {
      for (const lane of lanes) {
        for (const it of lane.items) {
          it.x -= lane.speed * dt;
          it.el.style.transform = `translate3d(${it.x.toFixed(1)}px, -50%, 0)`;
        }
        while (lane.items.length && lane.items[0].x + lane.items[0].w < 0) {
          const it = lane.items.shift();
          it.el.remove();
          live.delete(it.i);
        }
        const tail = lane.items.at(-1);
        if (!tail || tail.x + tail.w + lane.gap < W) spawn(lane, W);
      }
    }
    function tick(t) {
      raf = 0;
      if (!stage.isConnected) return;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      if (!hover) advance(dt);
      if (visible) raf = requestAnimationFrame(tick);
    }
    const run = () => { if (!raf && visible) { last = 0; raf = requestAnimationFrame(tick); } };

    layout();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !typed) { typed = true; show(cur); }
      run();
    }, { threshold: 0.3 });
    io.observe(stage);
    on(stage, "pointerenter", (e) => { if (e.pointerType !== "touch") hover = true; });
    on(stage, "pointerleave", () => (hover = false));
    let resizeT = 0;
    on(window, "resize", () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        if (stage.clientHeight !== H || lanes.length !== (narrow() ? 3 : 5)) layout();
        else W = stage.clientWidth;
      }, 150);
    });
    pageAC.signal.addEventListener("abort", () => { cancelAnimationFrame(raf); raf = 0; io.disconnect(); clearInterval(timer); clearTimeout(resizeT); }, { once: true });
  })();
  /* ───── words: daily quote from hitokoto.cn (cached per day, site QUOTES as fallback) + live countdowns ───── */
  (function daily() {
    const box = $("#daily");
    if (!box) return;
    // All clock math runs on "Beijing wall time as UTC" milliseconds, so getUTC* gives Beijing fields.
    const BJ = 8 * 3600e3, DAY = 86400e3;
    const bjNow = () => Date.now() + BJ;
    const bjDate = (s) => { const [y, m, d, h = 0, mi = 0] = String(s).split(/[-\s:T]/).map(Number); return Date.UTC(y, m - 1, d, h, mi); };
    const pad = (n) => String(n).padStart(2, "0");
    const hms = (ms) => { const s = Math.floor(ms / 1000); return `${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`; };
    const left = (ms) => (ms >= DAY ? `${Math.floor(ms / DAY)} 天 ` : "") + hms(ms);

    const text = $("#dy-text"), from = $("#dy-from"), credit = $("#dy-credit"), more = $("#dy-more");
    const KEY = "colorai-daily", API = "https://v1.hitokoto.cn/?c=d&c=i&c=k&encode=json&max_length=40";
    const today = () => new Date(bjNow()).toISOString().slice(0, 10);
    function paint(d) {
      text.textContent = d.text;
      from.textContent = d.from ? `— ${d.from}` : "";
      credit.hidden = !d.api;
    }
    function fallback() {
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      return q ? { text: q.text, from: q.src || "Colorai", api: false } : { text: "请务必日复一日地相信自己。", from: "Colorai", api: false };
    }
    async function fetchOne() {
      if (location.protocol === "file:") throw new Error("offline");
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 4000);
      try {
        const res = await fetch(API, { signal: ctl.signal, cache: "no-store" });
        const j = await res.json();
        if (!j || typeof j.hitokoto !== "string" || !j.hitokoto.trim()) throw new Error("empty");
        const who = typeof j.from_who === "string" ? j.from_who.trim() : "", work = typeof j.from === "string" && j.from.trim() ? `《${j.from.trim()}》` : "";
        return { text: j.hitokoto.trim().slice(0, 80), from: `${who}${work}`.slice(0, 60), api: true };
      } finally { clearTimeout(t); }
    }
    let busy = false;
    async function load(fresh) {
      if (busy) return;
      busy = true;
      more.classList.toggle("spin", fresh && !reduceMotion);
      text.classList.add("busy");
      let d;
      try {
        d = await fetchOne();
        try { localStorage.setItem(KEY, JSON.stringify({ date: today(), d })); } catch {}
      } catch { d = fallback(); }
      busy = false;
      if (!box.isConnected) return;
      more.classList.remove("spin");
      text.classList.remove("busy");
      paint(d);
    }
    let cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || "null"); } catch {}
    if (cached && cached.date === today() && cached.d && typeof cached.d.text === "string") paint(cached.d);
    else load(false);
    more.addEventListener("click", () => load(true));

    const list = $("#dy-rows");
    const rows = COUNTDOWNS.map((c) => {
      const li = document.createElement("li");
      li.innerHTML = '<div class="dy-h"><b></b><span class="dy-p"></span></div><div class="dy-bar"><i></i></div><span class="dy-sub"></span>';
      list.append(li);
      return { c, head: $("b", li), pct: $(".dy-p", li), bar: $(".dy-bar", li), fill: $(".dy-bar i", li), sub: $(".dy-sub", li) };
    });
    function tick() {
      const now = bjNow(), d = new Date(now), Y = d.getUTCFullYear();
      for (const r of rows) {
        const c = r.c;
        let head, sub, p = null;
        if (c.kind === "year") {
          const a = Date.UTC(Y, 0, 1), b = Date.UTC(Y + 1, 0, 1);
          p = (now - a) / (b - a);
          head = `${Y} 年已经过去 ${Math.floor((now - a) / DAY)} 天`;
          sub = `还剩 ${left(b - now)}`;
        } else if (c.kind === "day") {
          const a = Date.UTC(Y, d.getUTCMonth(), d.getUTCDate());
          p = (now - a) / DAY;
          head = "今天已经过去";
          sub = `还剩 ${hms(a + DAY - now)}`;
        } else {
          const to = bjDate(c.to), fr = c.from ? bjDate(c.from) : NaN;
          if (now >= to) {
            head = `${c.done || "已到"} ${Math.floor((now - to) / DAY)} 天`;
            sub = `${c.to} 已过`;
            if (c.from) p = 1;
          } else {
            head = c.label || c.to;
            sub = `还有 ${left(to - now)}`;
            if (!Number.isNaN(fr)) p = Math.min(1, Math.max(0, (now - fr) / (to - fr)));
          }
        }
        r.head.textContent = head;
        r.sub.textContent = sub;
        r.bar.hidden = p === null;
        r.pct.textContent = p === null ? "" : `${(p * 100).toFixed(c.kind === "year" ? 4 : 2)}%`;
        if (p !== null) r.fill.style.width = `${(p * 100).toFixed(3)}%`;
      }
    }
    tick();
    let iv = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(iv);
      iv = e.isIntersecting ? setInterval(tick, 1000) : 0;
      if (e.isIntersecting) tick();
    });
    io.observe(list);
    pageAC.signal.addEventListener("abort", () => { clearInterval(iv); io.disconnect(); }, { once: true });
  })();
  /* ───── globe ───── */
  (function globe() {
    const canvas = $("#globe");
    if (!canvas) return;
    const tip = $("#globe-tip");
    const ctx = canvas.getContext("2d");
    const D = Math.PI / 180;
    const card = $("#globe-card");
    let size, R0, R, L, cx, cy;
    let lon0 = 100, lat0 = 26, target = null, zoom = 1, zoomTo = 1, openCity = null;
    let dragging = false, hovering = false, last = null, t = 0, hoverCity = null, visible = true;
    const ZMIN = 1, ZMAX = 6;
    const pts = new Map();
    let pinch = null, downAt = null, moved = 0;

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
      R0 = size * 0.44; cx = cy = size / 2;
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
      R = R0 * zoom;
      // zoomed in, the globe is seen through a round lens the size of the unzoomed globe
      L = Math.min(R, size * 0.46);
      const sea = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      sea.addColorStop(0, "#ffffff");
      sea.addColorStop(0.6, "#dcebfb");
      sea.addColorStop(1, "#b6d3f4");
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, L, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = zoom > 1.02 ? "#b6d3f4" : sea;
      ctx.fillRect(0, 0, size, size);
      if (zoom > 1.02) { ctx.fillStyle = sea; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); }

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(10,29,82,0.09)";
      const step = zoom > 3 ? 5 : zoom > 1.8 ? 10 : 20;
      for (let lon = -180; lon < 180; lon += step) { const pts = []; for (let lat = -90; lat <= 90; lat += 2) pts.push(vec(lat, lon)); line(pts); }
      for (let lat = -80; lat <= 80; lat += step) { const pts = []; for (let lon = -180; lon <= 180; lon += 2) pts.push(vec(lat, lon)); line(pts); }

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
        c.shown = p.z > 0 && Math.hypot(p.x - cx, p.y - cy) < L - 2;
        if (!c.shown) continue;
        const isHome = c === home;
        const s = isHome ? 10 : 7;
        if (openCity === c) {
          ctx.strokeStyle = "#34c6ff"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(p.x, p.y, 9 + 2 * Math.sin(t * 0.08), 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = isHome ? "#0a1d52" : "#1466ff";
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx.restore();
      ctx.strokeStyle = "#0a1d52"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, L, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = "rgba(52,198,255,0.5)"; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(cx, cy, L + 6, 0, Math.PI * 2); ctx.stroke();

      // labels go on top of the lens edge; zoomed in, every visible city gets one
      ctx.font = "bold 12px " + font;
      const focus = (c) => hoverCity === c || openCity === c;
      const labelled = cities.filter((c) => c.shown && (focus(c) || c === home || zoom > 3));
      labelled.sort((a, b) => focus(a) - focus(b));
      for (const c of labelled) {
        const p = c.p;
        const tw = ctx.measureText(c.name).width;
        ctx.fillStyle = focus(c) ? "#1466ff" : "#0a1d52";
        ctx.fillRect(p.x + 8, p.y - 22, tw + 12, 18);
        ctx.fillStyle = "#fff";
        ctx.fillText(c.name, p.x + 14, p.y - 9);
      }
    }
    const font = getComputedStyle(document.body).fontFamily;

    function tick() {
      t++;
      if (target) {
        const d = ((target[0] - lon0 + 540) % 360) - 180;
        lon0 += d * 0.08;
        lat0 += (target[1] - lat0) * 0.08;
        if (Math.abs(d) < 0.1 && Math.abs(target[1] - lat0) < 0.1) target = null;
      } else if (!dragging && !hovering && !openCity && zoom < 1.05 && !reduceMotion) {
        // sway over Asia so the visited cities stay in view
        lon0 += (92 + 38 * Math.sin(t * 0.004) - lon0) * 0.01;
      }
      zoom += (zoomTo - zoom) * (reduceMotion ? 1 : 0.18);
      if (!canvas.isConnected) return;
      if (visible) draw();
      requestAnimationFrame(tick);
    }

    const setZoom = (z) => (zoomTo = Math.max(ZMIN, Math.min(ZMAX, z)));
    function cityAt(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let best = e.pointerType === "touch" ? 22 : 12, hit = null;
      for (const c of cities) {
        if (!c.shown) continue;
        const d = Math.hypot(c.p.x - mx, c.p.y - my);
        if (d < best) { best = d; hit = c; }
      }
      return hit;
    }
    function showTip(c) {
      if (!c) return tip.classList.remove("on");
      tip.textContent = `${c.lat.toFixed(1)}°, ${c.lon.toFixed(1)}°`;
      tip.style.left = `${canvas.offsetLeft + c.p.x}px`;
      tip.style.top = `${canvas.offsetTop + c.p.y + 44}px`;
      tip.classList.add("on");
    }

    function openCard(c) {
      openCity = c;
      target = [c.lon, c.lat];
      if (zoomTo < 3) setZoom(3.5);
      const [zh, when, note, photo] = CITY_INFO[c.name] || [c.name, "", "", ""];
      card.replaceChildren();
      const close = document.createElement("button");
      close.type = "button"; close.className = "gc-x"; close.setAttribute("aria-label", "关闭"); close.textContent = "×";
      close.addEventListener("click", closeCard);
      card.append(close);
      if (photo) {
        const img = new Image();
        img.src = `${ROOT}assets/photos/${photo}`; img.alt = zh; img.loading = "lazy";
        card.append(img);
      }
      const body = document.createElement("div");
      body.className = "gc-body";
      body.innerHTML = `<span class="gc-k">${c === home ? "HOME · " : ""}${c.lat.toFixed(2)}°N, ${c.lon.toFixed(2)}°E</span><h4></h4><b class="gc-when"></b><p></p><div class="gc-links"></div>`;
      body.querySelector("h4").textContent = c.name === zh ? zh : `${zh} ${c.name}`;
      body.querySelector(".gc-when").textContent = when;
      body.querySelector("p").textContent = note || "去过这里。";
      const links = body.querySelector(".gc-links");
      const a = document.createElement("a");
      a.href = `https://baike.baidu.com/item/${encodeURIComponent(zh)}`; a.target = "_blank"; a.rel = "noopener"; a.textContent = "百度百科 ↗";
      links.append(a);
      if (photo) {
        const g = document.createElement("a");
        g.href = `${ROOT}gallery.html`; g.textContent = "相册 →";
        links.append(g);
      }
      card.append(body);
      card.hidden = false;
    }
    function closeCard() { openCity = null; card.hidden = true; }

    canvas.addEventListener("pointerdown", (e) => {
      pts.set(e.pointerId, [e.clientX, e.clientY]);
      canvas.setPointerCapture(e.pointerId);
      target = null;
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z: zoomTo };
        dragging = false;
        return;
      }
      dragging = true; last = [e.clientX, e.clientY]; downAt = last; moved = 0;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (pts.has(e.pointerId)) pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (pinch && pts.size === 2) {
        const [a, b] = [...pts.values()];
        setZoom(pinch.z * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d);
        zoom = zoomTo;
        return;
      }
      if (dragging) {
        const k = 0.35 / zoom;
        lon0 -= (e.clientX - last[0]) * k;
        lat0 = Math.max(-75, Math.min(80, lat0 + (e.clientY - last[1]) * k));
        last = [e.clientX, e.clientY];
        moved = Math.max(moved, Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]));
      }
      hoverCity = cityAt(e);
      showTip(hoverCity);
    });
    const stop = (e) => {
      pts.delete(e.pointerId);
      if (pinch) { if (pts.size < 2) pinch = null; dragging = false; moved = 99; return; }
      if (!dragging) return;
      dragging = false;
      if (e.type !== "pointerup" || moved > 6) return;
      const c = cityAt(e);
      if (c) openCard(c);
      else if (openCity) closeCard();
    };
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);
    canvas.addEventListener("pointerenter", () => (hovering = true));
    canvas.addEventListener("pointerleave", () => { hovering = false; hoverCity = null; tip.classList.remove("on"); });
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      setZoom(zoomTo * Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0018)));
    }, { passive: false });
    canvas.addEventListener("dblclick", () => setZoom(zoomTo * 2));

    $$("[data-gz]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.gz;
      if (k === "in") setZoom(zoomTo * 1.6);
      else if (k === "out") setZoom(zoomTo / 1.6);
      else { setZoom(1); closeCard(); target = [100, 26]; }
    }));
    on(document, "keydown", (e) => { if (e.key === "Escape" && openCity) closeCard(); });

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
  /* ───── guestbook: Cloudflare Pages Functions + D1, see cloudflare/ ─────
     Posting returns a token kept in localStorage, which lets the same browser edit or delete that message.
     Open guestbook.html#admin once to enter the admin key; it can reply to, hide, edit and delete anything. */
  (function guestbook() {
    const box = $("[data-guestbook]");
    if (!box || !SWAP) return;
    const form = $(".gb-form", box), wait = $(".gb-wait", box), list = $(".gb-list", box);
    const TOK = "colorai-gb-tokens", ADM = "colorai-admin", NAME = "colorai-gb-name";
    const tokens = () => { try { return JSON.parse(localStorage.getItem(TOK)) || {}; } catch { return {}; } };
    const setToken = (id, t) => { const m = tokens(); t ? (m[id] = t) : delete m[id]; localStorage.setItem(TOK, JSON.stringify(m)); };
    if (location.hash === "#admin" && !localStorage.getItem(ADM)) {
      const k = prompt("管理密码");
      if (k) localStorage.setItem(ADM, k.trim());
    }
    const headers = (id) => {
      const h = { "content-type": "application/json" };
      const k = localStorage.getItem(ADM), t = id != null && tokens()[id];
      if (k) h["X-Admin-Key"] = k;
      if (t) h["X-Token"] = t;
      return h;
    };
    const api = async (path, opt = {}) => {
      const res = await fetch(`/api/guestbook${path}`, { ...opt, headers: headers(opt.id), signal: pageAC.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `出错了（${res.status}）`);
      return data;
    };
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
    const when = (t) => { const d = new Date(t); return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
    let admin = false, items = [], loaded = false, filter = "";
    const views = $(".gb-views", box), dm = $(".gb-dm", box), cloud = $(".gb-cloud", box), filterBar = $(".gb-filter", box);
    const VIEW = "colorai-gb-view";
    let view = localStorage.getItem(VIEW) || "dm";
    const ipOf = (m) => (m.place ? `IP 属地 · ${m.place}` : "");
    const short = (t) => { const d = new Date(t); return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`; };

    function row(m) {
      const mine = !!tokens()[m.id];
      const acts = [
        (mine || admin) && `<button type="button" data-act="edit">编辑</button>`,
        admin && `<button type="button" data-act="reply">${m.reply ? "改回复" : "回复"}</button>`,
        admin && `<button type="button" data-act="hide">${m.hidden ? "取消隐藏" : "隐藏"}</button>`,
        (mine || admin) && `<button type="button" data-act="del">删除</button>`,
      ].filter(Boolean).join("");
      return `<li class="gb-item${m.hidden ? " hidden-msg" : ""}${mine ? " mine" : ""}" data-id="${m.id}">` +
        `<div class="gb-meta"><b>${esc(m.name)}</b><time>${when(m.created)}${m.updated ? " · 已编辑" : ""}</time>${m.place ? `<span class="gb-ip">${esc(ipOf(m))}</span>` : ""}${mine ? "<i>我的</i>" : ""}${m.hidden ? "<i>已隐藏</i>" : ""}</div>` +
        `<p class="gb-msg">${esc(m.text)}</p>` +
        (m.reply ? `<div class="gb-reply"><b>Colorai</b><p>${esc(m.reply)}</p></div>` : "") +
        (acts ? `<div class="gb-acts">${acts}</div>` : "") + `</li>`;
    }
    function render() {
      const shown = filter ? items.filter((m) => m.text.toLowerCase().includes(filter)) : items;
      list.innerHTML = shown.length ? shown.map(row).join("") : `<li class="gb-empty">${filter ? "没有找到这样的留言。" : "还没有人留言，来做第一个吧。"}</li>`;
      if (admin) wait.innerHTML = `管理模式 · <button type="button" class="gb-logout">退出</button>`;
      wait.hidden = !admin;
      $(".gb-total", views).textContent = `${items.length} 条留言`;
      filterBar.hidden = !filter || view !== "list";
      if (filter) filterBar.innerHTML = `含「${esc(filter)}」的留言 ${shown.length} 条 · <button type="button" class="gb-clear">看全部</button>`;
      show(view);
    }

    /* views: danmaku (default), word cloud, plain list. The list keeps the edit / reply buttons. */
    function show(v) {
      view = v;
      localStorage.setItem(VIEW, v);
      views.hidden = false;
      $$("[data-view]", views).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.view === v)));
      dm.hidden = v !== "dm";
      cloud.hidden = v !== "cloud";
      list.hidden = v !== "list";
      filterBar.hidden = !filter || v !== "list";
      v === "dm" ? flow.start() : flow.stop();
      if (v === "cloud") drawCloud();
    }
    function openMsg(id, word) {
      filter = word || "";
      show("list");
      render();
      const li = id != null && $(`.gb-item[data-id="${id}"]`, list);
      if (li) {
        li.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        li.classList.add("flash");
        setTimeout(() => li.classList.remove("flash"), 1600);
      }
    }

    const flow = (() => {
      let lanes = [], W = 0, raf = 0, last = 0, hover = false, seen = false, running = false, order = [], q = 0;
      const narrow = () => window.matchMedia("(max-width: 640px)").matches;
      const LOOKS = ["", "cy", "", "line", "", "", "cy", ""];
      function bullet(m, i) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = `gb-b ${LOOKS[i % LOOKS.length]}${tokens()[m.id] ? " mine" : ""}`;
        b.dataset.id = m.id;
        b.dataset.tip = [m.name, short(m.created), ipOf(m)].filter(Boolean).join(" · ");
        const t = m.text.replace(/\s+/g, " ");
        b.innerHTML = `<b>${esc(m.name)}</b>${esc(t.length > 48 ? t.slice(0, 47) + "…" : t)}`;
        if (m.reply) b.insertAdjacentHTML("beforeend", `<i>↩ 站长回复了</i>`);
        return b;
      }
      function next() {
        if (q >= order.length) { order = [...items.keys()].sort(() => Math.random() - 0.5); q = 0; }
        return order[q++];
      }
      function spawn(lane, x) {
        const i = next();
        const el = bullet(items[i], i);
        if (lane.k === 0) el.classList.add("down");
        el.style.top = `${lane.y}px`;
        el.style.transform = `translate3d(${x}px, -50%, 0)`;
        dm.append(el);
        lane.items.push({ el, x, w: el.offsetWidth });
        lane.gap = 40 + Math.random() * 160;
      }
      function layout() {
        dm.replaceChildren();
        W = dm.clientWidth;
        const n = Math.max(1, Math.min(narrow() ? 4 : 6, items.length)), H = dm.clientHeight, lh = H / n, base = narrow() ? 34 : 48;
        lanes = Array.from({ length: n }, (_, k) => ({ k, y: lh * (k + 0.5), speed: base + ((k * 5) % n) * 7 + Math.random() * 8, items: [], gap: 0 }));
        for (const lane of lanes) spawn(lane, Math.random() * W * 0.6);
      }
      function tick(t) {
        raf = 0;
        if (!running || !dm.isConnected) return;
        const dt = Math.min(0.05, (t - (last || t)) / 1000);
        last = t;
        if (!hover && seen) {
          for (const lane of lanes) {
            for (const it of lane.items) { it.x -= lane.speed * dt; it.el.style.transform = `translate3d(${it.x.toFixed(1)}px, -50%, 0)`; }
            while (lane.items.length && lane.items[0].x + lane.items[0].w < 0) lane.items.shift().el.remove();
            const tail = lane.items.at(-1);
            if (!tail || tail.x + tail.w + lane.gap < W) spawn(lane, W);
          }
        }
        raf = requestAnimationFrame(tick);
      }
      const io = new IntersectionObserver(([e]) => (seen = e.isIntersecting));
      io.observe(dm);
      pageAC.signal.addEventListener("abort", () => { io.disconnect(); cancelAnimationFrame(raf); running = false; }, { once: true });
      on(dm, "pointerover", (e) => (hover = !!e.target.closest(".gb-b")));
      on(dm, "pointerleave", () => (hover = false));
      on(dm, "click", (e) => { const b = e.target.closest(".gb-b"); if (b) openMsg(+b.dataset.id); });
      let rw = 0;
      on(window, "resize", () => { if (!running || Math.abs(dm.clientWidth - rw) < 40) return; rw = dm.clientWidth; layout(); });
      return {
        start() {
          if (!items.length) { dm.classList.add("still"); dm.innerHTML = `<p class="gb-none">还没有人留言，来做第一个吧。</p>`; running = false; return; }
          if (reduceMotion) {
            dm.classList.add("still");
            dm.replaceChildren(...items.slice(0, 30).map(bullet));
            return;
          }
          dm.classList.remove("still");
          running = true;
          rw = dm.clientWidth;
          layout();
          last = 0;
          if (!raf) raf = requestAnimationFrame(tick);
        },
        stop() { running = false; cancelAnimationFrame(raf); raf = 0; },
      };
    })();

    const STOP = new Set("的 了 是 在 我 你 他 她 它 们 我们 你们 他们 这 那 这个 那个 就 都 也 还 很 和 与 及 或 吗 吧 啊 呀 呢 哦 嗯 哈 哈哈 哈哈哈 么 什么 怎么 一个 一下 没有 不是 可以 自己 因为 所以 但是 然后 如果 已经 还是 就是 真的 有点 一点 觉得 这样 那样 这里 那里 一直 现在 时候 之后 之前 以后 起来 出来 知道 感觉 应该 不过 还有 而且 其实 只是 一些 有些 比较 非常 特别 太 好 有 会 要 想 能 去 来 说 看 到 着 过 把 被 让 给 对 从 向 为 啊啊 嘿嘿 the and you for are this that with have was not but just".split(" "));
    function tally() {
      const seg = "Segmenter" in Intl ? new Intl.Segmenter("zh", { granularity: "word" }) : null;
      const n = new Map();
      for (const m of items) {
        const t = m.text.toLowerCase();
        let words;
        if (seg) words = [...seg.segment(t)].filter((s) => s.isWordLike).map((s) => s.segment);
        else words = (t.match(/[\u4e00-\u9fff]{2}|[a-z0-9]{3,}/g) || []);
        for (const w of new Set(words)) {
          if (w.length < 2 && !/[\u4e00-\u9fff]/.test(w)) continue;
          if (/^[\u4e00-\u9fff]$/.test(w) || /^\d+$/.test(w) || STOP.has(w)) continue;
          n.set(w, (n.get(w) || 0) + 1);
        }
      }
      return [...n].sort((a, b) => b[1] - a[1]).slice(0, 48);
    }
    function drawCloud() {
      const top = tally();
      cloud.replaceChildren();
      if (top.length < 3) { cloud.innerHTML = `<p class="gb-none">留言还不多，词云还攒不起来。</p>`; return; }
      const W = cloud.clientWidth, H = cloud.clientHeight, max = top[0][1], min = top.at(-1)[1];
      const big = W < 520 ? 34 : 50, small = W < 520 ? 13 : 15;
      const placed = [];
      const hit = (r) => placed.some((p) => r.x < p.x + p.w && r.x + r.w > p.x && r.y < p.y + p.h && r.y + r.h > p.y);
      top.forEach(([w, c], i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = `gb-w k${i % 4}`;
        b.dataset.word = w;
        b.title = `${c} 条留言提到`;
        b.textContent = w;
        const f = max === min ? (big + small) / 2 : small + (big - small) * Math.sqrt((c - min) / (max - min));
        b.style.fontSize = `${f.toFixed(1)}px`;
        cloud.append(b);
        const bw = b.offsetWidth + 6, bh = b.offsetHeight + 2;
        for (let s = 0; s < 1400; s++) {
          const a = s * 0.32, rad = 3.2 * a;
          const r = { x: W / 2 + rad * Math.cos(a) * 1.5 - bw / 2, y: H / 2 + rad * Math.sin(a) * 0.8 - bh / 2, w: bw, h: bh };
          if (r.x < 0 || r.y < 0 || r.x + r.w > W || r.y + r.h > H || hit(r)) continue;
          placed.push(r);
          b.style.left = `${r.x}px`;
          b.style.top = `${r.y}px`;
          return;
        }
        b.remove();
      });
    }
    on(cloud, "click", (e) => { const b = e.target.closest(".gb-w"); if (b) openMsg(null, b.dataset.word); });
    on(views, "click", (e) => { const b = e.target.closest("[data-view]"); if (b) { if (b.dataset.view !== "list") filter = ""; show(b.dataset.view); if (b.dataset.view === "list") render(); } });
    on(filterBar, "click", (e) => { if (e.target.closest(".gb-clear")) { filter = ""; render(); } });
    async function load() {
      wait.textContent = "留言板加载中……";
      try {
        const d = await api("");
        admin = d.admin;
        if (!admin && localStorage.getItem(ADM)) { localStorage.removeItem(ADM); toast("管理密码不对"); }
        items = d.messages;
        form.hidden = false;
        render();
      } catch (e) {
        if (e.name === "AbortError") return;
        wait.innerHTML = "留言板暂时连不上，可以过一会儿刷新，或者直接 <a>写信</a>。";
        $("a", wait).href = `mailto:${EMAIL}`;
      }
    }

    const nameIn = form.elements.name, textIn = form.elements.text, count = $(".gb-count", form);
    nameIn.value = localStorage.getItem(NAME) || "";
    on(textIn, "input", () => (count.textContent = `${textIn.value.length} / 500`));
    on(form, "submit", async (e) => {
      e.preventDefault();
      const btn = $(".gb-send", form);
      btn.disabled = true;
      try {
        const d = await api("", { method: "POST", body: JSON.stringify({ name: nameIn.value, text: textIn.value, website: form.elements.website.value }) });
        setToken(d.message.id, d.token);
        localStorage.setItem(NAME, nameIn.value.trim());
        items.unshift(d.message);
        textIn.value = "";
        count.textContent = "0 / 500";
        render();
        toast("留好了，谢谢！");
      } catch (err) { toast(err.message); }
      btn.disabled = false;
    });
    on(box, "click", async (e) => {
      if (e.target.closest(".gb-logout")) { localStorage.removeItem(ADM); admin = false; return load(); }
      const b = e.target.closest("[data-act]");
      if (!b) return;
      const li = b.closest(".gb-item"), id = +li.dataset.id, m = items.find((x) => x.id === id);
      const patch = async (body) => {
        const d = await api(`/${id}`, { method: "PATCH", id, body: JSON.stringify(body) });
        Object.assign(m, d.message);
        render();
      };
      try {
        if (b.dataset.act === "edit") {
          const t = prompt("修改留言", m.text);
          if (t != null && t.trim() !== m.text) await patch({ text: t });
        } else if (b.dataset.act === "reply") {
          const t = prompt("回复（留空删除回复）", m.reply || "");
          if (t != null) await patch({ reply: t });
        } else if (b.dataset.act === "hide") {
          await patch({ hidden: !m.hidden });
        } else if (b.dataset.act === "del" && confirm("删除这条留言？")) {
          await api(`/${id}`, { method: "DELETE", id });
          setToken(id, null);
          items = items.filter((x) => x.id !== id);
          render();
        }
      } catch (err) { toast(err.message); }
    });
    load();
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
  /* ───── memories: a timeline rail; the album group in view lights up, click a stop to jump there ───── */
  (function timeline() {
    const marks = $$(".memories .g-group").map((g) => {
      const t = ($(".g-head b", g)?.textContent || "").trim();
      const m = t.match(/^(\d{4})\.(.+)$/);
      return m && { g, y: m[1], md: m[2].replace(/\s+/g, ""), label: t, place: $(".g-head span", g)?.textContent || "" };
    }).filter(Boolean);
    if (marks.length < 2) return;
    const el = document.createElement("aside");
    el.className = "gtl";
    el.setAttribute("aria-label", "相册时间轴");
    let html = "", year = "";
    marks.forEach((k, i) => {
      if (k.y !== year) { year = k.y; html += `<li class="gtl-y" aria-hidden="true">${year}</li>`; }
      html += `<li><button type="button" data-i="${i}" aria-label="${k.label} ${k.place}"><i></i><b>${k.md}</b><span>${k.place}</span></button></li>`;
    });
    el.innerHTML = `<div class="gtl-head"><b>TIMELINE</b><span class="gtl-n"></span></div><ol>${html}<span class="gtl-fill" aria-hidden="true"></span></ol>`
      + `<div class="gtl-now" aria-hidden="true"><b></b><span></span></div>`;
    $("#main").append(el);
    pageAC.signal.addEventListener("abort", () => el.remove(), { once: true });
    const btns = $$("button", el), ol = $("ol", el), fill = $(".gtl-fill", el);

    let cur = -1;
    function set(i) {
      if (i < 0 || i === cur) return;
      cur = i;
      btns.forEach((b, j) => { b.classList.toggle("on", j === i); b.classList.toggle("past", j < i); b.toggleAttribute("aria-current", j === i); });
      const b = btns[i], k = marks[i];
      fill.style.height = `${b.offsetTop + b.offsetHeight / 2}px`;
      if (ol.scrollHeight > ol.clientHeight) ol.scrollTo({ top: b.offsetTop - ol.clientHeight / 2, behavior: reduceMotion ? "auto" : "smooth" });
      $(".gtl-n", el).textContent = `${String(i + 1).padStart(2, "0")} / ${String(marks.length).padStart(2, "0")}`;
      $(".gtl-now b", el).textContent = k.label;
      $(".gtl-now span", el).textContent = k.place;
    }
    set(0);
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) set(marks.findIndex((k) => k.g === e.target));
    }, { rootMargin: "-40% 0px -55% 0px" });
    marks.forEach((k) => io.observe(k.g));
    pageAC.signal.addEventListener("abort", () => io.disconnect(), { once: true });
    on(el, "click", (e) => {
      const b = e.target.closest("button[data-i]");
      if (!b) return;
      const k = marks[+b.dataset.i];
      window.scrollTo({ top: k.g.getBoundingClientRect().top + scrollY - 90, behavior: reduceMotion ? "auto" : "smooth" });
    });
  })();
  /* ───── memories: each album group starts as a pile; the pile spreads into the wall, 收起 piles it back ───── */
  (function albumStacks() {
    const FAN = [[0, 0, -2], [12, 6, 4.5], [-10, 10, -6], [16, 3, 8]];
    const EASE = getComputedStyle(document.documentElement).getPropertyValue("--ease").trim() || "cubic-bezier(.2, .8, .2, 1)";
    const deg = (v) => (!v || v === "none" ? "0deg" : v);
    $$(".g-group > .wall").forEach((wall, g) => {
      const cards = $$(".polaroid", wall);
      $(".g-toggle", wall)?.remove();
      if (cards.length < 2) return;
      const n = cards.length, title = $(".g-head b", wall.parentElement)?.textContent || "";
      wall.id ||= `wall-${g + 1}`;
      cards.forEach((c, i) => {
        const [x, y, r] = FAN[Math.min(i, FAN.length - 1)];
        c.style.setProperty("--sx", `${x}px`);
        c.style.setProperty("--sy", `${y}px`);
        c.style.setProperty("--sr", `${r}deg`);
        c.style.setProperty("--sz", n - i);
        c.classList.toggle("stack-deep", i >= FAN.length);
      });
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "g-toggle";
      btn.setAttribute("aria-controls", wall.id);
      wall.append(btn);
      const box = (c) => {
        const r = c.getBoundingClientRect(), cs = getComputedStyle(c);
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: c.offsetWidth * (parseFloat(cs.scale) || 1), rot: deg(cs.rotate) };
      };
      function set(open, animate) {
        const first = animate && !reduceMotion && cards.map(box), h0 = wall.offsetHeight;
        cards.forEach((c) => c.getAnimations().forEach((a) => a.id === "stack" && a.cancel()));
        wall.getAnimations().forEach((a) => a.cancel());
        wall.classList.toggle("stacked", !open);
        cards.forEach((c) => (c.inert = !open));
        btn.setAttribute("aria-expanded", open);
        btn.setAttribute("aria-label", `${open ? "收起" : "展开"} ${title} 的 ${n} 张照片`);
        btn.innerHTML = open ? `收起<i>×${n}</i>` : `<i>×${n}</i><b>点击展开</b>`;
        if (!first) return;
        wall.animate({ height: [`${h0}px`, `${wall.offsetHeight}px`] }, { duration: 460, easing: EASE });
        cards.forEach((c, i) => {
          const f = first[i], l = box(c);
          l.rot = deg(open ? c.style.getPropertyValue("--r") : c.style.getPropertyValue("--sr"));
          c.animate(
            [{ translate: `${f.x - l.x}px ${f.y - l.y}px`, scale: `${f.w / l.w}`, rotate: f.rot }, { translate: "0px 0px", scale: "1", rotate: l.rot }],
            { id: "stack", duration: 460, delay: (open ? i : n - 1 - i) * 30, easing: EASE, fill: "backwards" }
          );
        });
      }
      set(false, false);
      on(btn, "click", () => set(wall.classList.contains("stacked"), true));
      on(wall, "click", (e) => { if (wall.classList.contains("stacked") && e.target === wall) set(true, true); });
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
        `<li><a class="post-row" href="${ROOT}posts/${encodeURIComponent(p.id)}.html"><time>${escHTML(box.dataset.year === "group" ? fmtDate(p.date) : p.date)}</time>` +
        `<b>${escHTML(p.title)}</b><span>${escHTML(p.desc)}</span><em>${p.tags.map((t) => `#${escHTML(t)}`).join(" ")}</em></a></li>`;
      if (box.dataset.year !== "group") return (box.innerHTML = `<ol class="post-list">${list.map(row).join("")}</ol>`);
      const years = [...new Set(list.map((p) => p.date.slice(0, 4)))];
      box.innerHTML =
        (tag ? `<p class="tag-on">只看 <b>#${escHTML(tag)}</b> · <a href="index.html">看全部</a></p>` : "") +
        years.map((y) => `<section class="year"><h2>${escHTML(y)}</h2><ol class="post-list">${list.filter((p) => p.date.startsWith(y)).map(row).join("")}</ol></section>`).join("");
    });
    $$("[data-tags]").forEach((box) => {
      const count = {};
      POSTS.forEach((p) => p.tags.forEach((t) => (count[t] = (count[t] || 0) + 1)));
      box.innerHTML = Object.entries(count).sort((a, b) => b[1] - a[1]).map(([t, n]) => `<a href="${ROOT}posts/index.html?tag=${encodeURIComponent(t)}">#${escHTML(t)}<i>${n}</i></a>`).join("");
    });
    // prev / next links at the end of a post
    const self = document.body.dataset.post;
    const nav = $("[data-post-nav]");
    if (self && nav) {
      const k = POSTS.findIndex((p) => p.id === self);
      const newer = POSTS[k - 1], older = POSTS[k + 1];
      nav.innerHTML =
        (older ? `<a href="${encodeURIComponent(older.id)}.html"><i>← 更早</i><b>${escHTML(older.title)}</b></a>` : "<span></span>") +
        (newer ? `<a class="r" href="${encodeURIComponent(newer.id)}.html"><i>更新 →</i><b>${escHTML(newer.title)}</b></a>` : "<span></span>");
    }
  })();
  /* ───── visitor log: every page view is reported (except by the admin's browser);
     log.html shows the log only to the admin (key from guestbook.html#admin), the API answers 403 to everyone else ───── */
  (async function visits() {
    if (!SWAP) return;
    const ADM = "colorai-admin", key = localStorage.getItem(ADM);
    if (!key && !/^(localhost|127\.|\[::1\])/.test(location.hostname))
      fetch("/api/visit", { method: "POST", headers: { "content-type": "application/json" }, keepalive: true,
        body: JSON.stringify({ path: location.pathname, title: document.title }) }).catch(() => {});
    const box = $("[data-visits]");
    if (!box || !key) return;
    box.hidden = false;
    $("[data-log-tabs]") && ($("[data-log-tabs]").hidden = false);
    $("[data-log-privacy]") && ($("[data-log-privacy]").hidden = true);
    const msg = $(".visits-msg", box), table = $(".vt", box), list = $(".visits-list", box);
    const say = (html) => { msg.innerHTML = html; msg.hidden = !html; };
    const get = async (q = "") => {
      const res = await fetch(`/api/visit${q}`, { headers: { "X-Admin-Key": localStorage.getItem(ADM) || "" }, signal: pageAC.signal });
      if (res.status === 403) throw Object.assign(new Error("403"), { code: 403 });
      if (!res.ok || !/json/.test(res.headers.get("content-type") || "")) throw new Error("offline");
      return res.json();
    };
    msg.addEventListener("click", (e) => {
      if (!e.target.closest("[data-rekey]")) return;
      const k = prompt("管理密码");
      if (k) { localStorage.setItem(ADM, k.trim()); load(); }
    });
    const region = (() => { try { return new Intl.DisplayNames(["zh-CN"], { type: "region" }); } catch { return null; } })();
    const where = (v) => {
      const c = v.country && (region ? region.of(v.country) : v.country);
      const local = [v.region, v.city].filter((x, i, a) => x && a.indexOf(x) === i).join(" · ");
      return [c, local].filter(Boolean).join(" · ") || "未知地点";
    };
    const ago = (t) => {
      const m = Math.round((Date.now() - t) / 60e3);
      if (m < 1) return "刚刚";
      if (m < 60) return `${m} 分钟前`;
      if (m < 1440) return `${Math.round(m / 60)} 小时前`;
      const x = new Date(t);
      return `${x.getMonth() + 1}.${x.getDate()} ${String(x.getHours()).padStart(2, "0")}:${String(x.getMinutes()).padStart(2, "0")}`;
    };
    const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
    const full = (t) => new Date(t).toLocaleString("zh-CN", { hour12: false });
    const tag = (vid) => `访客 #${String(vid).slice(0, 4)}`;
    const page = (v) => esc(v.title || v.path);
    const row = (v, who) =>
      `<li><time title="${full(v.ts)}">${ago(v.ts)}</time><span>${who ? `<b>${esc(who)}</b> ` : ""}来自 ${esc(where(v))}，看了「${page(v)}」</span><em>${esc(v.device)}</em></li>`;
    let people = {};
    const toggle = async (tr) => {
      const open = tr.nextElementSibling?.classList.contains("vt-more");
      $$(".vt-more", table).forEach((x) => x.remove());
      $$("tr[aria-expanded]", table).forEach((x) => x.setAttribute("aria-expanded", "false"));
      if (open) return;
      tr.setAttribute("aria-expanded", "true");
      const more = document.createElement("tr");
      more.className = "vt-more";
      more.innerHTML = `<td colspan="6"><ol class="visits-list"><li class="visits-empty">读取中…</li></ol></td>`;
      tr.after(more);
      try {
        const h = await get(`?vid=${encodeURIComponent(tr.dataset.vid)}`);
        $("ol", more).innerHTML = h.visits.map((v) => row(v)).join("") || `<li class="visits-empty">没有记录。</li>`;
      } catch { $("ol", more).innerHTML = `<li class="visits-empty">读取失败。</li>`; }
    };
    table.addEventListener("click", (e) => { const tr = e.target.closest("tr[data-vid]"); if (tr) toggle(tr); });
    table.addEventListener("keydown", (e) => {
      const tr = e.target.closest("tr[data-vid]");
      if (tr && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(tr); }
    });
    async function load() {
      say("");
      let d;
      try { d = await get(); } catch (err) {
        if (err.name === "AbortError") return;
        say(err.code === 403
          ? `管理员密钥失效，读不到访客记录。<button type="button" data-rekey>重新输入密钥</button>`
          : "读不到访客记录。本地预览没有后端，上线以后才能看。");
        $$(".visits-h3", box).forEach((x) => (x.hidden = true));
        table.hidden = list.hidden = true;
        $(".visits-stat", box).innerHTML = "";
        return;
      }
      const stat = (n, unit, what) => `<span><b>${n || 0}</b>${unit} · ${what}</span>`;
      $(".visits-stat", box).innerHTML =
        `<div><i>TODAY</i>${stat(d.uvToday, "人", "今天")}${stat(d.today, "次", "今天")}</div>` +
        `<div><i>24H</i>${stat(d.uv24, "人", "24 小时")}${stat(d.pv24, "次", "24 小时")}</div>` +
        `<div><i>TOTAL</i>${stat(d.uv, "人", "累计")}${stat(d.pv, "次", "累计")}</div>`;
      people = Object.fromEntries(d.visitors.map((p) => [p.vid, p]));
      $("tbody", table).innerHTML = d.visitors.map((p) => `<tr data-vid="${esc(p.vid)}" tabindex="0" aria-expanded="false">
        <td data-k="谁"><b>${esc(tag(p.vid))}</b>${p.name ? `<em>留言署名「${esc(p.name)}」</em>` : ""}</td>
        <td data-k="来自">${esc(where(p))}</td>
        <td data-k="设备">${esc(p.device)}</td>
        <td data-k="次数"><b>${p.n}</b> 次<em>${p.pages} 个页面</em></td>
        <td data-k="首次" title="${full(p.first)}">${ago(p.first)}</td>
        <td data-k="最近" title="${full(p.last)}">${ago(p.last)}</td></tr>`).join("");
      list.innerHTML = d.visits.map((v) => row(v, tag(v.vid) + (people[v.vid]?.name ? `（${people[v.vid].name}）` : ""))).join("");
      const any = d.visitors.length > 0;
      $$(".visits-h3", box).forEach((x) => (x.hidden = !any));
      table.hidden = list.hidden = !any;
      if (!any) say("还没有访客记录。");
    }
    load();
  })();
  /* ───── friend links ───── */
  (function friends() {
    const card = ([name, url, desc, badge, color, cat], tag) =>
      `<a class="fr-card" href="${escHTML(/^https?:\/\//.test(url) ? url : "#")}" target="_blank" rel="noopener" style="--fc:${/^#[0-9a-f]{3,8}$/i.test(color) ? color : "#34c6ff"}"><span class="fr-av">${escHTML(badge)}</span><b>${escHTML(name)}</b><span>${escHTML(desc)}</span><i>↗</i>${tag && cat ? `<em class="fr-tag">${escHTML(cat)}</em>` : ""}</a>`;
    $$("[data-friends]").forEach((box) => {
      if (box.dataset.friends === "more") {
        box.innerHTML = FRIENDS.map((f) => card(f, true)).join("") +
          `<a class="fr-card more" href="${ROOT}friends.html"><span class="fr-av">+</span><b>交换友链</b><span>写信给我</span><i>→</i></a>`;
        return;
      }
      const cats = [...new Set(FRIENDS.map((f) => f[5] || "其他"))];
      box.innerHTML = cats.map((c) =>
        `<h3 class="fr-cat"><span>${escHTML(c)}</span></h3>` + FRIENDS.filter((f) => (f[5] || "其他") === c).map((f) => card(f, false)).join("")
      ).join("");
    });
  })();
  adminTools();
}
{
  let cached = null;
  try { cached = JSON.parse(sessionStorage.getItem(CONTENT_CACHE)); } catch {}
  if (cached && cached.c) CONTENT = cached.c;
  const loading = cached && Date.now() - cached.t < 60e3 ? null : loadContent();
  const firstPath = shownPath;
  // Without a cached copy, wait a moment for the overrides so the original text doesn't flash first.
  (loading && !cached ? Promise.race([loading, sleep(1500)]) : Promise.resolve()).then(() => {
    applyData();
    if (shownPath === firstPath && !swapping) initPage();
    loading?.then((ok) => { if (ok) { applyData(); applyText(); } });
  });
}
