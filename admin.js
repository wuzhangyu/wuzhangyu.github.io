/* ───── admin tools: fetched by adminTools() in script.js, after it, so its globals ($, $$, toast, on, pageAC, CONTENT,
   applyText, applyData, DEFAULTS, EDITABLE, ORIGINAL, setText, storeContent, escHTML, ROOT) are all available here.
   · Edit mode: every [data-edit] element on the page becomes editable in place and saves to /api/content.
   · admin.html: dashboard, visitor log, guestbook moderation, page text and data lists.
   The admin key stays in localStorage (colorai-admin, shared with the guestbook) and only travels in the X-Admin-Key header. */
(function admin() {
  const ADM = "colorai-admin", MODE = "colorai-edit-mode", OK = "colorai-admin-ok", TAB = "colorai-admin-tab";
  const here = document.currentScript?.src || location.href;
  const key = () => localStorage.getItem(ADM) || "";
  let updated = {};

  if (!document.querySelector('link[href$="admin.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("admin.css", here).href;
    document.head.append(link);
  }

  async function api(path, opt = {}) {
    const res = await fetch(path, {
      ...opt, cache: "no-store", signal: opt.signal,
      headers: { "content-type": "application/json", "X-Admin-Key": key() },
    });
    const data = /json/.test(res.headers.get("content-type") || "") ? await res.json().catch(() => ({})) : null;
    if (!res.ok || !data) {
      const msg = data?.error || (res.status === 404 || !data ? "连不上后端（本地静态预览没有 /api）" : `出错了（${res.status}）`);
      throw Object.assign(new Error(msg), { status: res.status });
    }
    return data;
  }
  const when = (t) => {
    if (!t) return "—";
    const d = new Date(t), p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };
  const ago = (t) => {
    const m = Math.round((Date.now() - t) / 60e3);
    return m < 1 ? "刚刚" : m < 60 ? `${m} 分钟前` : m < 1440 ? `${Math.round(m / 60)} 小时前` : when(t);
  };
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  // Plain text of an element as the editor shows it: <br> and block breaks become \n, source indentation collapses.
  function textOf(node) {
    let s = "";
    const walk = (n) => {
      for (const c of n.childNodes) {
        if (c.nodeType === 3) s += c.data.replace(/[ \t\r\n]+/g, " ");
        else if (c.nodeName === "BR") s += "\n";
        else if (c.nodeType === 1) {
          if (/^(DIV|P|LI)$/.test(c.nodeName) && s && !s.endsWith("\n")) s += "\n";
          walk(c);
        }
      }
    };
    walk(node);
    return s.replace(/ *\n */g, "\n").replace(/\n{4,}/g, "\n\n\n").trim();
  }
  const nodesOf = (s) => { const d = document.createElement("div"); setText(d, s); return [...d.childNodes]; };
  const originalText = (node) => {
    const nodes = ORIGINAL.get(node);
    if (!nodes) return null;
    const box = document.createElement("div");
    box.append(...nodes.map((n) => n.cloneNode(true)));
    return textOf(box);
  };

  async function saveKey(k, value) {
    const d = await api("/api/content", { method: "PUT", body: JSON.stringify({ key: k, value }) });
    CONTENT[d.key] = d.value;
    updated[d.key] = d.updated;
    storeContent(CONTENT);
    return d;
  }
  async function revertKey(k) {
    await api(`/api/content?key=${encodeURIComponent(k)}`, { method: "DELETE" });
    delete CONTENT[k];
    delete updated[k];
    storeContent(CONTENT);
  }

  // Checks the key once per browser session and pulls the uncached content (with edit times).
  let verifying = null;
  function verify() {
    if (verifying) return verifying;
    verifying = (async () => {
      try {
        const d = await api("/api/content");
        if (!d.admin) {
          localStorage.removeItem(ADM);
          sessionStorage.removeItem(OK);
          toast("管理密码不对，已退出管理");
          return false;
        }
        storeContent(d.content || {});
        updated = d.updated || {};
        applyData();
        applyText();
        sessionStorage.setItem(OK, "1");
        return true;
      } catch { return !!sessionStorage.getItem(OK); }
      finally { setTimeout(() => (verifying = null), 60e3); }
    })();
    return verifying;
  }

  /* ───── floating toolbar + inline edit mode ───── */
  const PLAIN = (() => { const d = document.createElement("div"); d.contentEditable = "plaintext-only"; return d.contentEditable === "plaintext-only"; })();
  let editing = sessionStorage.getItem(MODE) === "1", active = null, before = "", cancel = false, observer = null;

  function toolbar() {
    let bar = $("#adm-bar");
    if (!key()) { bar?.remove(); if (location.hash !== "#admin" || document.body.dataset.page === "admin") return; }
    if (!bar) {
      bar = document.createElement("aside");
      bar.id = "adm-bar";
      bar.className = "adm-bar";
      bar.setAttribute("aria-label", "管理员工具");
      document.body.insertBefore(bar, $("#toast"));
      bar.addEventListener("click", (e) => { if (e.target.closest("[data-adm-edit]")) setEditing(!editing, true); });
    }
    const onAdmin = document.body.dataset.page === "admin";
    bar.innerHTML = !key()
      ? `<b>ADMIN</b><a href="${ROOT}admin.html">管理员登录 →</a>`
      : `<b>ADMIN</b>${onAdmin ? "" : `<button type="button" data-adm-edit aria-pressed="${editing}">${editing ? "✎ 编辑中" : "✎ 编辑模式"}</button>`}` +
        `<a href="${ROOT}admin.html">${onAdmin ? "管理面板" : "管理面板 →"}</a>`;
  }
  function mark() {
    for (const n of $$("[data-edit]")) {
      if (n.getAttribute("contenteditable") == null) {
        n.contentEditable = PLAIN ? "plaintext-only" : "true";
        n.spellcheck = false;
      }
      n.classList.add("adm-editable");
      n.classList.toggle("adm-changed", typeof CONTENT[`text:${n.dataset.edit}`] === "string");
    }
  }
  function unmark() {
    for (const n of $$("[data-edit]")) { n.removeAttribute("contenteditable"); n.classList.remove("adm-editable", "adm-changed"); }
  }
  function setEditing(v, announce = false) {
    editing = v && !!key();
    sessionStorage.setItem(MODE, editing ? "1" : "");
    document.body.classList.toggle("adm-editing", editing);
    observer?.disconnect();
    observer = null;
    if (editing) {
      mark();
      // Some modules clone tagged nodes later (the works stage, for one), so new ones get marked too.
      let queued = false;
      observer = new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; if (editing) mark(); }); } });
      observer.observe(document.body, { childList: true, subtree: true });
      if (announce) toast(`编辑模式：虚线框里的文字可以直接改（${$$("[data-edit]").length} 处），点别处保存`);
    } else {
      active?.blur();
      unmark();
      if (announce) toast("已退出编辑模式");
    }
    toolbar();
  }

  const chip = () => {
    let c = $("#adm-chip");
    if (!c) {
      c = el(`<div class="adm-chip" id="adm-chip" hidden><code></code><span>Enter 换行 · Ctrl+Enter 保存 · Esc 取消</span><button type="button" data-adm-revert>还原原文</button></div>`);
      document.body.insertBefore(c, $("#toast"));
      // mousedown would blur the text being edited before the click lands
      c.addEventListener("mousedown", (e) => e.preventDefault());
      c.addEventListener("click", async (e) => {
        if (!e.target.closest("[data-adm-revert]") || !active) return;
        const n = active, k = `text:${n.dataset.edit}`;
        cancel = true;
        n.blur();
        try { await revertKey(k); applyText(); mark(); toast("已还原为网页原文"); } catch (err) { toast(`还原失败：${err.message}`); }
      });
    }
    return c;
  };
  function placeChip() {
    const c = $("#adm-chip");
    if (!c || !active) return;
    const r = active.getBoundingClientRect(), w = c.offsetWidth, h = c.offsetHeight;
    const top = r.bottom + 8 + h < window.innerHeight ? r.bottom + 8 : Math.max(8, r.top - h - 8);
    c.style.left = `${Math.max(8, Math.min(window.innerWidth - w - 8, r.left))}px`;
    c.style.top = `${top}px`;
  }

  const editable = (t) => editing && t?.closest?.("[data-edit][contenteditable]");
  // execCommand("insertLineBreak") writes a bare "\n" in plaintext-only mode, which textOf() reads as a space.
  function lineBreak() {
    const sel = getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const br = document.createElement("br");
    range.insertNode(br);
    let next = br.nextSibling;
    while (next && next.nodeType === 3 && !next.data) next = next.nextSibling;
    if (!next) br.after(document.createElement("br")); // a trailing <br> only shows the new line if another follows
    range.setStartAfter(br);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  // Capture on window so page-turn clicks, link navigation, card flips and the works modal never see edit clicks.
  window.addEventListener("click", (e) => { if (editable(e.target)) { e.stopPropagation(); e.preventDefault(); } }, true);
  window.addEventListener("keydown", (e) => {
    const n = editable(e.target);
    if (!n) return;
    e.stopPropagation();
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); n.blur(); }
    else if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); lineBreak(); }
    else if (e.key === "Escape") { e.preventDefault(); cancel = true; n.blur(); }
  }, true);
  window.addEventListener("paste", (e) => {
    if (!editable(e.target)) return;
    e.preventDefault();
    const lines = (e.clipboardData?.getData("text/plain") || "").replace(/\r\n?/g, "\n").split("\n");
    lines.forEach((l, i) => { if (i) lineBreak(); if (l) document.execCommand("insertText", false, l); });
  }, true);
  window.addEventListener("drop", (e) => { if (editable(e.target)) e.preventDefault(); }, true);
  document.addEventListener("focusin", (e) => {
    const n = editable(e.target);
    if (!n) return;
    active = n; before = textOf(n); cancel = false;
    const c = chip();
    $("code", c).textContent = n.dataset.edit;
    $("[data-adm-revert]", c).hidden = typeof CONTENT[`text:${n.dataset.edit}`] !== "string";
    c.hidden = false;
    placeChip();
  });
  document.addEventListener("input", (e) => { if (editable(e.target)) placeChip(); });
  window.addEventListener("scroll", placeChip, { passive: true });
  document.addEventListener("focusout", async (e) => {
    const n = editable(e.target);
    if (!n || n !== active) return;
    active = null;
    $("#adm-chip") && ($("#adm-chip").hidden = true);
    const k = `text:${n.dataset.edit}`, value = textOf(n);
    if (cancel || value === before) {
      if (cancel) { typeof CONTENT[k] === "string" ? applyText() : setText(n, before); }
      cancel = false;
      return;
    }
    if (!value) { toast("不能留空；要恢复原文请点「还原原文」"); setText(n, before); return; }
    n.classList.add("adm-saving");
    const first = typeof CONTENT[k] !== "string";
    try {
      if (value === originalText(n)) { await revertKey(k); toast("和原文一样，已还原"); }
      else {
        await saveKey(k, value);
        // First override of this key: copies made after page load (the works stage) have no recorded original yet.
        if (first) $$("[data-edit]").filter((x) => x.dataset.edit === n.dataset.edit && !ORIGINAL.has(x)).forEach((x) => ORIGINAL.set(x, nodesOf(before)));
        toast("已保存");
      }
      applyText();
    } catch (err) {
      toast(`保存失败：${err.message}`);
      setText(n, before);
    }
    n.classList.remove("adm-saving");
    if (editing) mark();
  });

  /* ───── admin.html ───── */
  const PAGES = [
    ["index.html", "首页"], ["about.html", "档案"], ["posts/index.html", "随记"], ["gallery.html", "相册"],
    ["friends.html", "友链"], ["log.html", "日志"], ["guestbook.html", "留言板"],
  ];
  const LISTS = {
    QUOTES: ["名言 · 文字", "档案页「Words」里飘过的弹幕和下方字幕框里的句子。每项 {\"text\": 句子（\\n 换行）, \"src\": 出处，写日期或「深夜」这类标签，不写文章标题}。"],
    POSTS: ["随记列表", "首页、随记页和文章末尾「上一篇 / 下一篇」用的标题、日期、标签和简介。每项 {id, title, date, tags, desc}；新增一篇还要在 posts/ 下放 <id>.html。"],
    FRIENDS: ["友链", "每项 [名字, 网址, 一句话, 徽章（1–2 个字）, 颜色 #rrggbb, 分类]，友链页按分类分组。"],
    CITY_INFO: ["地球城市卡片", "\"城市名\": [百科用中文名, 时间, 一句话, assets/photos 下的照片文件名或 \"\"]。城市名要和 script.js 里 CITIES 的一致，新城市的坐标仍需改代码。"],
    STATS: ["五维雷达", "档案页的 SOCIAL STATS，每项 [中文, 英文, 等级 1–5, 称号]。"],
  };
  // One item per line: readable in a textarea and still plain JSON.
  const pretty = (v) => Array.isArray(v)
    ? (v.length ? `[\n${v.map((x) => `  ${JSON.stringify(x)}`).join(",\n")}\n]` : "[]")
    : `{\n${Object.entries(v).map(([k, x]) => `  ${JSON.stringify(k)}: ${JSON.stringify(x)}`).join(",\n")}\n}`;

  function panel() {
    const box = $("[data-admin]");
    if (!box) return;
    const login = $(".adm-login", box), main = $(".adm-main", box), msg = $(".adm-msg", box);
    const say = (t) => { msg.textContent = t || ""; msg.hidden = !t; };
    let stats = null;
    const loaded = new Set();

    function showLogin(text) {
      main.hidden = true;
      login.hidden = false;
      $(".adm-login-msg", login).textContent = text || "";
      setTimeout(() => login.elements.key.focus(), 50);
    }
    async function enter() {
      say("");
      try {
        stats = await api("/api/admin/stats", { signal: pageAC.signal });
      } catch (err) {
        if (err.name === "AbortError") return;
        if (err.status === 403) { localStorage.removeItem(ADM); sessionStorage.removeItem(OK); toolbar(); return showLogin("管理密码不对。"); }
        if (!key()) return showLogin();
        return showLogin(err.message);
      }
      sessionStorage.setItem(OK, "1");
      login.hidden = true;
      main.hidden = false;
      toolbar();
      verify();
      open(sessionStorage.getItem(TAB) || "dash");
    }
    on(login, "submit", (e) => {
      e.preventDefault();
      const k = login.elements.key.value.trim();
      if (!k) return;
      localStorage.setItem(ADM, k);
      login.elements.key.value = "";
      enter();
    });
    on($(".adm-logout", box), "click", () => {
      localStorage.removeItem(ADM);
      sessionStorage.removeItem(OK);
      sessionStorage.removeItem(MODE);
      editing = false;
      toolbar();
      showLogin("已退出。");
    });

    const tabs = $$("[data-tab]", box);
    function open(name, reload = false) {
      if (!tabs.some((t) => t.dataset.tab === name)) name = "dash";
      sessionStorage.setItem(TAB, name);
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === name)));
      $$("[data-panel]", box).forEach((p) => (p.hidden = p.dataset.panel !== name));
      if (reload || !loaded.has(name)) { loaded.add(name); RENDER[name]($(`[data-panel="${name}"]`, box), reload); }
    }
    on(box, "click", (e) => {
      const t = e.target.closest("[data-tab]");
      if (t) return open(t.dataset.tab);
      const r = e.target.closest("[data-reload]");
      if (r) open(r.closest("[data-panel]").dataset.panel, true);
      const g = e.target.closest("[data-goto]");
      if (g) open(g.dataset.goto);
    });
    on(box, "keydown", (e) => {
      const g = e.target.closest("[data-goto]");
      if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(g.dataset.goto); }
    });
    on($(".adm-tabs", box), "keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      n.focus();
      open(n.dataset.tab);
    });

    const head = (title, sub) => `<div class="adm-head"><h2>${title}</h2>${sub ? `<span>${sub}</span>` : ""}<button type="button" class="adm-btn ghost" data-reload>↻ 刷新</button></div>`;
    const fail = (p, err) => { if (err.name !== "AbortError") p.querySelector(".adm-body").innerHTML = `<p class="adm-empty">读取失败：${escHTML(err.message)}</p>`; };
    const getStats = async (fresh) => (stats = fresh || !stats ? await api("/api/admin/stats", { signal: pageAC.signal }) : stats);
    const meter = (n, max) => `<span class="adm-meter" style="--p:${Math.min(100, Math.round(((n || 0) / max) * 100))}%"><i></i></span>`;

    const RENDER = {
      async dash(p, fresh) {
        p.innerHTML = head("概览", "DASHBOARD") + `<div class="adm-body"><p class="adm-empty">读取中…</p></div>`;
        try {
          const s = await getStats(fresh), v = s.visits || {}, m = s.messages || {}, a = s.ask || {}, c = s.content || {};
          const card = (k, big, unit, rest, goto) =>
            `<div class="adm-card"${goto ? ` data-goto="${goto}" role="button" tabindex="0"` : ""}><i>${k}</i><b>${big ?? 0}</b><small>${unit}</small><p>${rest}</p></div>`;
          const latest = (m.latest || []).map((x) =>
            `<li class="${x.hidden ? "is-hidden" : ""}"><time>${ago(x.created)}</time><b>${escHTML(x.name)}</b><span>${escHTML(x.text)}</span>` +
            `<em>${x.hidden ? "已隐藏" : ""}${x.reply ? " 已回复" : " 未回复"}</em></li>`).join("");
          p.querySelector(".adm-body").innerHTML =
            `<div class="adm-cards">` +
            card("TODAY · 访客", v.uvToday, "人", `今天 ${v.today ?? 0} 次浏览 · 24 小时 ${v.uv24 ?? 0} 人 / ${v.pv24 ?? 0} 次`, "visitors") +
            card("TOTAL · 访客", v.uv, "人", `累计 ${v.pv ?? 0} 次浏览`, "visitors") +
            card("GUESTBOOK · 留言", m.total, "条", `今天 ${m.today ?? 0} · 隐藏 ${m.hidden ?? 0} · 未回复 ${m.unreplied ?? 0}`, "guestbook") +
            card("ASK · 问 AI 24h", (a.qwen ?? 0) + (a.cheap ?? 0), "次", `qwen ${a.qwen ?? 0} / ${a.limits?.qwen ?? "?"} · glm ${a.cheap ?? 0} / ${a.limits?.cheap ?? "?"}`, "ask") +
            card("CONTENT · 修改", c.n, "处", c.last ? `最近 ${ago(c.last)}` : "还没有改过", "content") +
            `</div><h3 class="adm-h3">最新留言 <button type="button" class="adm-link" data-goto="guestbook">全部 →</button></h3>` +
            (latest ? `<ol class="adm-feed">${latest}</ol>` : `<p class="adm-empty">还没有留言。</p>`) +
            `<p class="adm-note">数据时间 ${when(s.now)} · 访客数按匿名编号去重，只算别人的浏览（输过管理密码的浏览器不记录）。</p>`;
        } catch (err) { fail(p, err); }
      },

      async visitors(p) {
        p.innerHTML = head("访客", "VISITORS") + `<div class="adm-body"><p class="adm-empty">读取中…</p></div>`;
        const body = p.querySelector(".adm-body");
        let d;
        try { d = await api("/api/visit", { signal: pageAC.signal }); } catch (err) { return fail(p, err); }
        const region = (() => { try { return new Intl.DisplayNames(["zh-CN"], { type: "region" }); } catch { return null; } })();
        const where = (x) => {
          let c = x.country;
          try { c = c && region ? region.of(c) : c; } catch {}
          const local = [x.region, x.city].filter((y, i, a) => y && a.indexOf(y) === i).join(" · ");
          return [c, local].filter(Boolean).join(" · ") || "未知地点";
        };
        const tag = (vid) => `#${String(vid || "").slice(0, 4) || "????"}`;
        const people = Array.isArray(d.visitors) ? d.visitors : [];
        const visits = Array.isArray(d.visits) ? d.visits : [];
        const names = Object.fromEntries(people.map((x) => [x.vid, x.name]));
        const vrow = (x) => `<li><time title="${when(x.ts)}">${ago(x.ts)}</time><span>${x.vid ? `<b>${tag(x.vid)}${names[x.vid] ? `（${escHTML(names[x.vid])}）` : ""}</b> ` : ""}` +
          `${escHTML(where(x))} · 「${escHTML(x.title || x.path || "?")}」</span><em>${escHTML(x.device || "")}</em></li>`;
        const n = (k) => d[k] ?? 0;
        body.innerHTML =
          `<div class="adm-cards">` +
          `<div class="adm-card"><i>TODAY</i><b>${n("uvToday")}</b><small>人</small><p>${n("today")} 次浏览</p></div>` +
          `<div class="adm-card"><i>24H</i><b>${n("uv24")}</b><small>人</small><p>${n("pv24")} 次浏览</p></div>` +
          `<div class="adm-card"><i>TOTAL</i><b>${n("uv")}</b><small>人</small><p>${n("pv")} 次浏览</p></div></div>` +
          `<div class="adm-tools"><input type="search" class="adm-input" placeholder="筛选：地点 / 设备 / 署名 / 编号" aria-label="筛选访客"><span class="adm-count"></span></div>` +
          `<div class="adm-scroll"><table class="adm-table"><thead><tr><th>谁</th><th>来自</th><th>设备</th><th>次数</th><th>首次</th><th>最近</th></tr></thead><tbody>` +
          people.map((x) => `<tr data-vid="${escHTML(x.vid)}" tabindex="0" aria-expanded="false">` +
            `<td data-k="谁"><b>访客 ${tag(x.vid)}</b>${x.name ? `<em>留言署名「${escHTML(x.name)}」</em>` : ""}</td><td data-k="来自">${escHTML(where(x))}</td>` +
            `<td data-k="设备">${escHTML(x.device || "")}</td><td data-k="次数"><b>${x.n ?? "?"}</b> 次${x.pages != null ? `<em>${x.pages} 个页面</em>` : ""}</td>` +
            `<td data-k="首次" title="${when(x.first)}">${x.first ? ago(x.first) : "—"}</td><td data-k="最近" title="${when(x.last)}">${x.last ? ago(x.last) : "—"}</td></tr>`).join("") +
          `</tbody></table></div>` +
          (people.length ? "" : `<p class="adm-empty">还没有访客记录。</p>`) +
          `<h3 class="adm-h3">最近的访问 <span>最新 ${visits.length} 条</span></h3><ol class="adm-feed visits">${visits.map(vrow).join("") || `<li class="adm-empty">没有记录。</li>`}</ol>`;
        const table = $(".adm-table", body), input = $(".adm-input", body), count = $(".adm-count", body);
        const filter = () => {
          const q = input.value.trim().toLowerCase();
          let shown = 0;
          $$("tbody > tr[data-vid]", table).forEach((tr) => {
            const hit = !q || tr.textContent.toLowerCase().includes(q) || tr.dataset.vid.startsWith(q.replace(/^#/, ""));
            tr.hidden = !hit;
            if (hit) shown++;
            if (!hit && tr.nextElementSibling?.classList.contains("adm-more")) tr.nextElementSibling.remove();
          });
          count.textContent = `${shown} / ${people.length} 位`;
        };
        on(input, "input", filter);
        filter();
        const toggle = async (tr) => {
          const wasOpen = tr.getAttribute("aria-expanded") === "true";
          $$(".adm-more", table).forEach((x) => x.remove());
          $$("tr[aria-expanded]", table).forEach((x) => x.setAttribute("aria-expanded", "false"));
          if (wasOpen) return;
          tr.setAttribute("aria-expanded", "true");
          const more = el(`<table><tr class="adm-more"><td colspan="6"><ol class="adm-feed visits"><li class="adm-empty">读取中…</li></ol></td></tr></table>`).querySelector("tr");
          tr.after(more);
          try {
            const h = await api(`/api/visit?vid=${encodeURIComponent(tr.dataset.vid)}`, { signal: pageAC.signal });
            const list = Array.isArray(h.visits) ? h.visits : [];
            $("ol", more).innerHTML = list.map((x) => vrow({ ...x, vid: "" })).join("") || `<li class="adm-empty">没有记录。</li>`;
          } catch (err) { if (err.name !== "AbortError") $("ol", more).innerHTML = `<li class="adm-empty">读取失败：${escHTML(err.message)}</li>`; }
        };
        on(table, "click", (e) => { const tr = e.target.closest("tr[data-vid]"); if (tr) toggle(tr); });
        on(table, "keydown", (e) => { const tr = e.target.closest("tr[data-vid]"); if (tr && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(tr); } });
      },

      async guestbook(p) {
        p.innerHTML = head("留言", "GUESTBOOK") +
          `<div class="adm-tools"><div class="adm-seg" role="group" aria-label="筛选">` +
          `<button type="button" data-f="all" aria-pressed="true">全部</button><button type="button" data-f="open" aria-pressed="false">未回复</button><button type="button" data-f="hidden" aria-pressed="false">已隐藏</button></div>` +
          `<input type="search" class="adm-input" placeholder="搜索名字或内容" aria-label="搜索留言"><span class="adm-count"></span></div><div class="adm-body"><p class="adm-empty">读取中…</p></div>`;
        const body = $(".adm-body", p), input = $(".adm-input", p), count = $(".adm-count", p);
        let items = [], f = "all";
        try { items = (await api("/api/guestbook", { signal: pageAC.signal })).messages || []; } catch (err) { return fail(p, err); }
        const row = (m) => `<li class="adm-msg-item${m.hidden ? " is-hidden" : ""}" data-id="${m.id}">` +
          `<div class="adm-meta"><b>${escHTML(m.name)}</b><time>${when(m.created)}${m.updated ? " · 已编辑" : ""}</time>${m.hidden ? "<i>已隐藏</i>" : ""}${m.reply ? "" : "<i class=\"warn\">未回复</i>"}</div>` +
          `<p class="adm-text">${escHTML(m.text)}</p>${m.reply ? `<div class="adm-reply"><b>Colorai</b><p>${escHTML(m.reply)}</p></div>` : ""}` +
          `<div class="adm-acts"><button type="button" data-act="reply">${m.reply ? "改回复" : "回复"}</button><button type="button" data-act="edit">编辑留言</button>` +
          `<button type="button" data-act="hide">${m.hidden ? "取消隐藏" : "隐藏"}</button><button type="button" data-act="del" class="danger">删除</button></div></li>`;
        function render() {
          const q = input.value.trim().toLowerCase();
          const list = items.filter((m) => (f === "all" || (f === "open" ? !m.reply : m.hidden)) &&
            (!q || `${m.name}\n${m.text}\n${m.reply || ""}`.toLowerCase().includes(q)));
          count.textContent = `${list.length} / ${items.length} 条`;
          body.innerHTML = list.length ? `<ol class="adm-msgs">${list.map(row).join("")}</ol>` : `<p class="adm-empty">没有符合的留言。</p>`;
        }
        render();
        on(input, "input", render);
        on($(".adm-seg", p), "click", (e) => {
          const b = e.target.closest("[data-f]");
          if (!b) return;
          f = b.dataset.f;
          $$("[data-f]", p).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          render();
        });
        const editor = (li, field, value, label) => {
          $(".adm-edit", li)?.remove();
          const form = el(`<form class="adm-edit"><label><span>${label}</span><textarea rows="3" maxlength="500"></textarea></label>` +
            `<div><button type="submit" class="adm-btn">保存</button><button type="button" class="adm-btn ghost" data-cancel>取消</button></div></form>`);
          $("textarea", form).value = value || "";
          $(".adm-acts", li).before(form);
          $("textarea", form).focus();
          form.addEventListener("click", (e) => { if (e.target.closest("[data-cancel]")) form.remove(); });
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            await patch(+li.dataset.id, { [field]: $("textarea", form).value });
          });
        };
        async function patch(id, change) {
          try {
            const d = await api(`/api/guestbook/${id}`, { method: "PATCH", body: JSON.stringify(change) });
            Object.assign(items.find((x) => x.id === id), d.message);
            render();
            toast("已更新");
            stats = null;
          } catch (err) { toast(err.message); }
        }
        on(body, "click", async (e) => {
          const b = e.target.closest("[data-act]");
          if (!b) return;
          const li = b.closest("[data-id]"), id = +li.dataset.id, m = items.find((x) => x.id === id);
          if (b.dataset.act === "reply") editor(li, "reply", m.reply, "回复（留空保存 = 删除回复）");
          else if (b.dataset.act === "edit") editor(li, "text", m.text, "留言内容");
          else if (b.dataset.act === "hide") patch(id, { hidden: !m.hidden });
          else if (b.dataset.act === "del" && confirm(`删除「${m.name}」的这条留言？删除后不能恢复。`)) {
            try {
              await api(`/api/guestbook/${id}`, { method: "DELETE" });
              items = items.filter((x) => x.id !== id);
              render();
              toast("已删除");
              stats = null;
            } catch (err) { toast(err.message); }
          }
        });
      },

      async content(p) {
        p.innerHTML = head("内容", "CONTENT") +
          `<p class="adm-note">改动存在 D1 里，覆盖网页上的原文；「还原」就是删掉这条修改，回到 HTML / script.js 里写的内容。也可以在任意页面点右上角「编辑模式」直接改字。</p>` +
          `<div class="adm-seg big" role="group" aria-label="内容类别"><button type="button" data-c="text" aria-pressed="true">页面文字</button><button type="button" data-c="data" aria-pressed="false">数据列表</button></div>` +
          `<div class="adm-body"><p class="adm-empty">读取中…</p></div>`;
        const body = $(".adm-body", p);
        let kind = "text";
        on($(".adm-seg", p), "click", (e) => {
          const b = e.target.closest("[data-c]");
          if (!b) return;
          kind = b.dataset.c;
          $$("[data-c]", p).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          kind === "text" ? texts() : lists();
        });
        try { await verify(); } catch {}

        // Every data-edit element on the public pages, with the text the static HTML has.
        let found = null;
        async function scan() {
          if (found) return found;
          found = new Map();
          const docs = await Promise.all(PAGES.map(async ([path, label]) => {
            try {
              const res = await fetch(`${ROOT}${path}`, { cache: "no-store", signal: pageAC.signal });
              return [path, label, new DOMParser().parseFromString(await res.text(), "text/html")];
            } catch { return [path, label, null]; }
          }));
          for (const [path, label, doc] of docs) {
            if (!doc) continue;
            const foot = $(".foot-note", doc);
            if (foot && !found.has("text:site.foot-note")) found.set("text:site.foot-note", { path, label: "全站页脚", def: textOf(foot) });
            for (const n of $$("[data-edit]", doc)) {
              const k = `text:${n.dataset.edit}`;
              if (!found.has(k)) found.set(k, { path, label, def: textOf(n) });
            }
          }
          return found;
        }
        async function texts() {
          body.innerHTML = `<p class="adm-empty">正在扫描页面…</p>`;
          let all;
          try { all = await scan(); } catch (err) { return fail(p, err); }
          if (kind !== "text") return;
          const orphans = Object.keys(CONTENT).filter((k) => k.startsWith("text:") && !all.has(k));
          const groups = new Map();
          for (const [k, info] of all) { if (!groups.has(info.label)) groups.set(info.label, []); groups.get(info.label).push([k, info]); }
          if (orphans.length) groups.set("页面上已找不到的修改", orphans.map((k) => [k, { path: "", label: "", def: null }]));
          const changed = Object.keys(CONTENT).filter((k) => k.startsWith("text:")).length;
          const row = ([k, info]) => {
            const v = CONTENT[k], mod = typeof v === "string";
            return `<li class="adm-text-row${mod ? " is-changed" : ""}" data-key="${escHTML(k)}">` +
              `<div class="adm-meta"><code>${escHTML(k.slice(5))}</code>${mod ? `<i>已修改 · ${updated[k] ? ago(updated[k]) : ""}</i>` : "<i class=\"dim\">原文</i>"}` +
              `${info.path ? `<a class="adm-link" href="${ROOT}${info.path}">去页面 →</a>` : ""}</div>` +
              `<p class="adm-text">${escHTML(mod ? v : info.def)}</p>` +
              (mod && info.def != null ? `<details><summary>原文</summary><p class="adm-text dim">${escHTML(info.def)}</p></details>` : "") +
              `<div class="adm-acts"><button type="button" data-t="edit">编辑</button>${mod ? `<button type="button" data-t="revert" class="danger">还原原文</button>` : ""}</div></li>`;
          };
          body.innerHTML =
            `<div class="adm-tools"><input type="search" class="adm-input" placeholder="搜索文字或键名" aria-label="搜索页面文字"><span class="adm-count">${all.size} 处可编辑 · ${changed} 处已修改</span></div>` +
            [...groups].map(([label, rows]) => `<section class="adm-group"><h3 class="adm-h3">${escHTML(label)} <span>${rows.length}</span></h3><ol class="adm-rows">${rows.map(row).join("")}</ol></section>`).join("");
          const input = $(".adm-input", body);
          on(input, "input", () => {
            const q = input.value.trim().toLowerCase();
            $$(".adm-text-row", body).forEach((li) => (li.hidden = !!q && !li.textContent.toLowerCase().includes(q)));
            $$(".adm-group", body).forEach((g) => (g.hidden = !$$(".adm-text-row", g).some((li) => !li.hidden)));
          });
        }
        on(body, "click", async (e) => {
          const b = e.target.closest("[data-t]");
          if (!b) return;
          const li = b.closest("[data-key]"), k = li.dataset.key, info = found?.get(k);
          if (b.dataset.t === "revert") {
            if (!confirm("还原成网页原文？")) return;
            try { await revertKey(k); toast("已还原"); texts(); } catch (err) { toast(err.message); }
            return;
          }
          $(".adm-edit", li)?.remove();
          const form = el(`<form class="adm-edit"><textarea rows="4" maxlength="3000"></textarea><div><button type="submit" class="adm-btn">保存</button>` +
            `<button type="button" class="adm-btn ghost" data-cancel>取消</button><span class="adm-hint">纯文字，回车换行；不支持 HTML。</span></div></form>`);
          const ta = $("textarea", form);
          ta.value = typeof CONTENT[k] === "string" ? CONTENT[k] : info?.def ?? "";
          $(".adm-acts", li).before(form);
          ta.focus();
          form.addEventListener("click", (ev) => { if (ev.target.closest("[data-cancel]")) form.remove(); });
          form.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            const value = ta.value.replace(/\r\n?/g, "\n").trim();
            try {
              if (!value || (info && value === info.def)) { await revertKey(k); toast(value ? "和原文一样，已还原" : "留空 = 还原原文"); }
              else { await saveKey(k, value); toast("已保存"); }
              texts();
            } catch (err) { toast(err.message); }
          });
        });

        function lists() {
          body.innerHTML = Object.entries(LISTS).map(([name, [title, help]]) => {
            const k = `data:${name}`, mod = CONTENT[k] != null;
            return `<section class="adm-list" data-list="${name}"><div class="adm-meta"><h3>${title}</h3><code>${name}</code>` +
              `${mod ? `<i>已修改 · ${updated[k] ? ago(updated[k]) : ""}</i>` : "<i class=\"dim\">默认</i>"}</div><p class="adm-note">${escHTML(help)}</p>` +
              `<textarea class="adm-json" rows="10" spellcheck="false" aria-label="${title} JSON"></textarea><p class="adm-err" hidden></p>` +
              `<div class="adm-acts"><button type="button" class="adm-btn" data-l="save">保存</button><button type="button" class="adm-btn ghost" data-l="check">检查格式</button>` +
              `<button type="button" class="adm-btn ghost" data-l="default">填入默认</button>${mod ? `<button type="button" class="adm-btn ghost danger" data-l="revert">还原默认</button>` : ""}</div></section>`;
          }).join("");
          for (const name of Object.keys(LISTS)) {
            const ta = $(`[data-list="${name}"] textarea`, body);
            ta.value = pretty(CONTENT[`data:${name}`] ?? DEFAULTS[name]);
            ta.rows = Math.min(18, Math.max(6, ta.value.split("\n").length + 1));
          }
        }
        const parse = (sec) => {
          const name = sec.dataset.list, err = $(".adm-err", sec);
          err.hidden = true;
          let v;
          try { v = JSON.parse($("textarea", sec).value); } catch (e) {
            err.textContent = `JSON 格式不对：${e.message}`;
            err.hidden = false;
            return undefined;
          }
          if (Array.isArray(v) !== Array.isArray(DEFAULTS[name]) || typeof v !== "object" || !v) {
            err.textContent = Array.isArray(DEFAULTS[name]) ? "最外层应该是数组 [ … ]" : "最外层应该是对象 { … }";
            err.hidden = false;
            return undefined;
          }
          return v;
        };
        on(body, "click", async (e) => {
          const b = e.target.closest("[data-l]");
          if (!b) return;
          const sec = b.closest("[data-list]"), name = sec.dataset.list, k = `data:${name}`, ta = $("textarea", sec);
          if (b.dataset.l === "default") { ta.value = pretty(DEFAULTS[name]); return; }
          if (b.dataset.l === "revert") {
            if (!confirm(`「${LISTS[name][0]}」还原成 script.js 里的默认值？`)) return;
            try { await revertKey(k); applyData(); toast("已还原默认"); lists(); } catch (err) { toast(err.message); }
            return;
          }
          const v = parse(sec);
          if (v === undefined) return;
          if (b.dataset.l === "check") return toast(`格式没问题，共 ${Object.keys(v).length} 项（保存时服务器还会再检查一遍）`);
          if (JSON.stringify(v) === JSON.stringify(DEFAULTS[name]) && CONTENT[k] == null) return toast("和默认值一样，不用保存");
          b.disabled = true;
          try {
            await saveKey(k, v);
            applyData();
            toast("已保存，刷新页面后生效");
            lists();
          } catch (err) {
            const box = $(".adm-err", sec);
            box.textContent = err.message;
            box.hidden = false;
          }
          b.disabled = false;
        });
        texts();
      },

      async ask(p, fresh) {
        p.innerHTML = head("问 AI", "ASK") + `<div class="adm-body"><p class="adm-empty">读取中…</p></div>`;
        try {
          const a = (await getStats(fresh)).ask || {}, L = a.limits || {};
          p.querySelector(".adm-body").innerHTML =
            `<ul class="adm-usage">` +
            `<li><b>qwen（快）</b><span>${a.qwen ?? 0} / ${L.qwen ?? "?"}</span>${meter(a.qwen, L.qwen || 1)}<em>最近 24 小时，所有访客共用；用完后自动换 glm</em></li>` +
            `<li><b>glm（备用）</b><span>${a.cheap ?? 0} / ${L.cheap ?? "?"}</span>${meter(a.cheap, L.cheap || 1)}<em>最近 24 小时；也用完就提示「明天再来」</em></li>` +
            `<li><b>最近 1 小时提问</b><span>${a.hour ?? 0}</span><em>每位访客每小时最多 ${L.hour ?? "?"} 次</em></li>` +
            `<li><b>24 小时提问人数</b><span>${a.askers ?? 0}</span><em>按匿名编号去重</em></li>` +
            `<li><b>24 小时新留言（访客）</b><span>${a.posts ?? 0}</span><em>每人 10 分钟最多 5 条</em></li></ul>` +
            `<p class="adm-note">额度写在 cloudflare/functions/api/ask.js；助手知道的站长资料（SITE 提示词）也在那里，改它需要改代码再发布。计数按滑动 24 小时窗口，不是自然日。</p>`;
        } catch (err) { fail(p, err); }
      },
    };

    key() ? enter() : showLogin();
  }

  function page() {
    if (!SWAP) return;
    toolbar();
    if (document.body.dataset.page === "admin") {
      observer?.disconnect();
      document.body.classList.remove("adm-editing");
      return panel();
    }
    if (!key()) return;
    verify().then((ok) => {
      if (!ok) return toolbar();
      if (editing) setEditing(true);
      else document.body.classList.remove("adm-editing");
    });
    if (editing) { document.body.classList.add("adm-editing"); mark(); }
  }

  window.coloraiAdmin = { page };
  page();
})();
