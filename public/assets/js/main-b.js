/* LeanFM — Track B · thermal-cinema interactions */

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NO_IO = !("IntersectionObserver" in window);
const EASE = (t) => 1 - Math.pow(1 - t, 3);
const SVG = "http://www.w3.org/2000/svg";
const mk = (t, a) => { const n = document.createElementNS(SVG, t); for (const k in a) n.setAttribute(k, a[k]); return n; };

/* ----------------------------------------------------------------------------
   onView(el, animate, finish): play `animate` when the element scrolls into
   view. `finish` jumps straight to the FINAL state with no animation — it is
   used whenever we can't (or shouldn't) animate: reduced-motion, no IO, or a
   hidden/background tab where requestAnimationFrame is frozen. This is what
   guarantees the page is never stranded in its pre-animation (invisible) state.
---------------------------------------------------------------------------- */
const PENDING = new Set();
function onView(el, animate, finish, threshold = 0.35) {
  finish = finish || animate;
  let done = false;
  const rec = { finish: () => { if (done) return; done = true; PENDING.delete(rec); finish(); } };
  if (REDUCED || NO_IO) { rec.finish(); return; }
  PENDING.add(rec);
  const io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { io.disconnect(); if (!done) { done = true; PENDING.delete(rec); animate(); } }
  }, { threshold });
  io.observe(el);
}
const completeAll = () => [...PENDING].forEach((r) => r.finish());

/* nav */
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 24), { passive: true });
/* mark the current page across the shared nav (desktop links, dropdown items, mobile) */
(function () {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('.nav__links a, .nav__menu a, .mobile a').forEach((a) => {
    const target = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
    if (target && target === here) {
      a.classList.add("is-current");
      const item = a.closest(".nav__item");
      if (item) item.classList.add("has-current");
    }
  });
})();
/* dropdown triggers: keyboard + tap support (hover handled by CSS) */
document.querySelectorAll(".nav__trigger").forEach((t) => {
  t.addEventListener("click", (e) => {
    e.preventDefault();
    const item = t.closest(".nav__item");
    const open = item.classList.toggle("tap-open");
    t.setAttribute("aria-expanded", open);
    document.querySelectorAll(".nav__item.tap-open").forEach((o) => { if (o !== item) o.classList.remove("tap-open"); });
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav__item")) document.querySelectorAll(".nav__item.tap-open").forEach((o) => o.classList.remove("tap-open"));
});
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".mobile a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));

/* heat field */
function seedField(host, n) {
  const spec = [["hot", 30], ["warm", 26], ["cool", 34], ["cold", 28], ["hot", 22], ["warm", 20]];
  for (let i = 0; i < n; i++) {
    const [cls, size] = spec[i % spec.length];
    const b = document.createElement("div");
    b.className = "bloom bloom--" + cls;
    b.style.width = b.style.height = (size + (i * 7) % 22) + "vw";
    b.style.left = (8 + (i * 37) % 80) + "%";
    b.style.top = (10 + (i * 53) % 70) + "%";
    b.style.animationDelay = (-i * 2.3) + "s";
    host.appendChild(b);
  }
}
document.querySelectorAll("#heatfield, #heatfield2").forEach((h) => seedField(h, 6));

/* reveals. animate = add class (CSS transition fades it in when visible).
   finish = snap to final inline, bypassing the transition — because a hidden
   tab freezes CSS transitions, so .in alone would leave it stuck at opacity 0. */
document.querySelectorAll(".rv, .rvg, .sheet").forEach((n) => {
  const animate = () => n.classList.add("in");
  const snap = (el) => { el.style.transition = "none"; el.style.opacity = "1"; el.style.transform = "none"; };
  const finish = () => { n.classList.add("in"); snap(n); n.querySelectorAll(":scope > *").forEach(snap); };
  onView(n, animate, finish, 0.18);
});

/* count up */
function fmtCount(node, x) {
  return (node.dataset.prefix || "") + Math.round(x).toLocaleString("en-US") + (node.dataset.suffix || "");
}
function runCount(node) {
  const v = parseFloat(node.dataset.count);
  const set = (x) => (node.textContent = fmtCount(node, x));
  if (REDUCED) return set(v);
  const t0 = performance.now();
  (function f(t) { const p = Math.min((t - t0) / 1100, 1); set(v * EASE(p)); if (p < 1) requestAnimationFrame(f); })(t0);
}
/* [data-manual] counters (the hero total) are fired by the scrub controller */
document.querySelectorAll("[data-count]:not([data-manual])").forEach((node) =>
  onView(node, () => runCount(node), () => (node.textContent = fmtCount(node, parseFloat(node.dataset.count))), 0.6));

/* dimension bars */
document.querySelectorAll(".arc-dims").forEach((box) => {
  const bars = box.querySelectorAll(".dbar i");
  onView(box,
    () => bars.forEach((b, i) => setTimeout(() => (b.style.width = b.dataset.fill + "%"), 200 + i * 110)),
    () => bars.forEach((b) => { b.style.transition = "none"; b.style.width = b.dataset.fill + "%"; }),
    0.4);
});

/* trend traces */
const PRE = {
  "sat-fault": [52,53,51,54,52,55,53,56,54,57,60,66,73,78,76,79,77,80,78,81,79,76,72,69,71,68,70,67,69,66,68,65,67,64,66,63,65,62,64,61],
  "gas-spike": [30,31,29,32,30,31,30,33,31,30,32,31,30,32,48,57,66,71,75,78,80,79,81,80,82,81,80,82,81,83,82,81,80,82,81,80,82,81,83,82],
  "air-up": [38,39,38,40,41,40,42,44,43,45,47,49,48,51,53,55,54,57,59,58,61,63,62,65,67,66,69,71,70,72,74,73,75,77,76,78,79,78,80,81],
  "spark-1": [50,52,49,53,50,55,70,74,72,75,73,71,68,64,60,57],
  "spark-2": [40,45,50,55,58,60,61,61,61,61,61,61,61,60,61,61],
  "spark-3": [25,25,70,72,71,25,24,25,69,73,70,26,25,24,71,70],
  "spark-4": [50,64,38,62,40,65,36,63,39,61,38,64,37,62,40,63],
};
const COL = { hot: "#f2622e", cool: "#22d3ee", teal: "#2dd4a7", warm: "#f5b020" };
function buildTrace(host) {
  if (host.dataset.built) return; host.dataset.built = "1";
  const pts = PRE[host.dataset.preset] || PRE["sat-fault"];
  const color = COL[host.dataset.color] || COL.cool;
  const axis = host.dataset.axis, W = 600, H = axis ? 170 : 44, px = 6, pt = axis ? 16 : 6, pb = axis ? 28 : 6;
  const n = pts.length, xy = pts.map((y, i) => [px + (i / (n - 1)) * (W - px * 2), pt + (1 - y / 100) * (H - pt - pb)]);
  const d = xy.map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)).join(" ");
  const svg = mk("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Building trend data with flagged faults" });
  if (axis) {
    svg.appendChild(mk("line", { x1: px, x2: W - px, y1: H - pb + 6, y2: H - pb + 6, class: "axis" }));
    (host.dataset.ticks || "").split(",").forEach((l, i, a) => {
      if (!l) return;
      const t = mk("text", { x: px + (i / (a.length - 1)) * (W - px * 2), y: H - 6, class: "tick", "text-anchor": i === 0 ? "start" : i === a.length - 1 ? "end" : "middle" });
      t.textContent = l.trim(); svg.appendChild(t);
    });
  }
  const path = mk("path", { d, class: "ln", stroke: color });
  svg.appendChild(path);
  const flags = [];
  if (host.dataset.flags) JSON.parse(host.dataset.flags).forEach((f) => {
    const [fx, fy] = xy[Math.round(f.x * (n - 1))];
    const g = mk("g", { class: "flag" });
    g.appendChild(mk("circle", { cx: fx, cy: fy, r: 4, class: "fdot" }));
    const tx = mk("text", { x: Math.min(Math.max(fx + 8, 36), W - 130), y: Math.max(fy - 9, 12), class: "flbl" });
    tx.textContent = f.label; g.appendChild(tx); svg.appendChild(g); flags.push(g);
  });
  host.appendChild(svg);
  const len = path.getTotalLength();
  const finish = () => { path.style.transition = "none"; path.style.strokeDasharray = "none"; path.style.strokeDashoffset = "0"; flags.forEach((f) => f.classList.add("in")); };
  if (REDUCED || NO_IO) { finish(); return; }
  path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
  onView(host, () => {
    path.style.transition = "stroke-dashoffset 1100ms cubic-bezier(.22,1,.36,1)";
    requestAnimationFrame(() => (path.style.strokeDashoffset = "0"));
    flags.forEach((f, i) => setTimeout(() => f.classList.add("in"), 1100 + i * 150));
  }, finish, 0.4);
}
document.querySelectorAll(".trace[data-preset], .spark[data-preset]").forEach(buildTrace);

/* AIR thermal arc */
(function () {
  const svg = document.getElementById("airArc"); if (!svg) return;
  const cx = 220, cy = 220, r = 168, start = 138, sweep = 264;
  const pol = (deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
  const arcPath = (frac) => {
    const [x0, y0] = pol(start), [x1, y1] = pol(start + sweep * frac);
    return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${sweep * frac > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const bg = svg.querySelector(".arc-bg"), fg = svg.querySelector(".arc-fg"), ind = svg.querySelector(".arc-ind");
  const score = 74, scoreEl = document.getElementById("airScore");
  bg.setAttribute("d", arcPath(1)); fg.setAttribute("d", arcPath(1));
  const flen = fg.getTotalLength();
  const place = (frac) => { const [x, y] = pol(start + sweep * frac); ind.setAttribute("cx", x); ind.setAttribute("cy", y); };
  const finish = () => { fg.style.strokeDasharray = flen; fg.style.strokeDashoffset = flen - flen * score / 100; place(score / 100); scoreEl.textContent = score; };
  if (REDUCED || NO_IO) { finish(); return; }
  fg.style.strokeDasharray = flen; fg.style.strokeDashoffset = flen; place(0);
  onView(svg, () => {
    const dur = 1500, t0 = performance.now();
    (function f(t) {
      const p = Math.min((t - t0) / dur, 1), e = EASE(p), frac = (score / 100) * e;
      fg.style.strokeDashoffset = flen - flen * frac; place(frac); scoreEl.textContent = Math.round(score * e);
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }, finish, 0.4);
})();

/* Maple typing */
document.querySelectorAll(".diag").forEach((d) => {
  const full = d.dataset.text, cites = d.closest(".console__body").querySelectorAll(".cite");
  const finish = () => { d.textContent = full; cites.forEach((c) => c.classList.add("in")); };
  if (REDUCED || NO_IO) { finish(); return; }
  d.textContent = "";
  onView(d, () => {
    const tn = document.createTextNode(""), cur = document.createElement("span");
    cur.className = "cur"; d.appendChild(tn); d.appendChild(cur);
    let i = 0;
    const iv = setInterval(() => {
      i += 2; tn.nodeValue = full.slice(0, i);
      if (i >= full.length) { clearInterval(iv); tn.nodeValue = full; cur.remove(); cites.forEach((c, j) => setTimeout(() => c.classList.add("in"), 150 + j * 110)); }
    }, 1000 / 42);
  }, finish, 0.45);
});

/* ROI calculator */
(function () {
  const card = document.querySelector(".roi"); if (!card) return;
  const RATES = { k12: [.25, .55], highered: [.30, .60], museum: [.40, .80], healthcare: [.40, .85], office: [.20, .45] };
  let type = "k12", last = [0, 0];
  const chips = card.querySelectorAll(".chips button"), slider = card.querySelector("#sqft"),
        out = card.querySelector("#sqftOut"), fig = card.querySelector("#roiFig");
  const animate = (lo, hi) => {
    const [pl, ph] = last; last = [lo, hi];
    const fmt = (a, b) => `$${a.toLocaleString("en-US")} – $${b.toLocaleString("en-US")} / yr`;
    if (REDUCED) return void (fig.textContent = fmt(lo, hi));
    const t0 = performance.now();
    (function f(t) { const p = Math.min((t - t0) / 200, 1); fig.textContent = fmt(Math.round(pl + (lo - pl) * p), Math.round(ph + (hi - ph) * p)); if (p < 1) requestAnimationFrame(f); })(t0);
  };
  const calc = () => {
    const sqft = +slider.value; out.textContent = sqft.toLocaleString("en-US") + " sq ft";
    const [lo, hi] = RATES[type], rnd = (x) => Math.round(x / 1000) * 1000;
    animate(rnd(sqft * lo), rnd(sqft * hi));
  };
  chips.forEach((c) => c.addEventListener("click", () => { type = c.dataset.type; chips.forEach((x) => x.setAttribute("aria-pressed", x === c)); calc(); }));
  slider.addEventListener("input", calc);
  calc();
})();

/* forms — POST JSON to the same-origin API route named in the form's data-endpoint
   (e.g. /api/lead, which syncs to Close CRM + LEAD_WEBHOOK_URL). Field names are
   mapped to the route's schema. No data-endpoint → preview mode (no send). */
const LEAD_FIELD_MAP = { organization: "company", job_title: "role", building_type: "buildingType", portfolio_size: "portfolioSize", reason: "intent" };
document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const endpoint = form.getAttribute("data-endpoint");
      if (endpoint) {
        const payload = {};
        new FormData(form).forEach((v, k) => { if (typeof v === "string" && v.trim()) payload[LEAD_FIELD_MAP[k] || k] = v.trim(); });
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("submit failed");
      } else { await new Promise((r) => setTimeout(r, 450)); }
      form.classList.add("is-done");
      const dlg = form.closest("dialog"); if (dlg) setTimeout(() => dlg.close(), 4500);
    } catch (err) {
      btn.disabled = false; btn.textContent = orig;
      let note = form.querySelector(".form-error");
      if (!note) { note = document.createElement("p"); note.className = "form-note form-error"; form.appendChild(note); }
      note.textContent = "Something went wrong — please email nick@leanfmtech.com instead.";
    }
  });
});

/* sample-analysis ingestion: prefill intent + source from URL, dynamic submit label */
(function () {
  const form = document.querySelector("form[data-intent-form]");
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const intentSel = form.querySelector("#f-intent");
  const sourceInput = form.querySelector("#f-source");
  const submit = form.querySelector('button[type="submit"]');
  const LABELS = { "sample-analysis": "Request sample analysis", "demo": "Talk to LeanFM", "investor": "Send investor inquiry" };
  const intent = params.get("intent");
  const source = params.get("source");
  if (intent && intentSel.querySelector(`option[value="${CSS.escape(intent)}"]`)) intentSel.value = intent;
  if (source) sourceInput.value = source.replace(/[^a-z0-9_\-]/gi, "").slice(0, 40);
  const sync = () => { if (submit.firstChild) submit.firstChild.nodeValue = (LABELS[intentSel.value] || "Send message") + " "; };
  intentSel.addEventListener("change", sync);
  sync();
})();

/* email-gate modal */
const gate = document.getElementById("gate");
if (gate) {
  document.querySelectorAll("[data-open-gate]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); gate.showModal(); }));
  const cl = gate.querySelector(".gate__close"); if (cl) cl.addEventListener("click", () => gate.close());
  gate.addEventListener("click", (e) => { if (e.target === gate) gate.close(); });
}

/* hero film: only load + play the video on a wide, motion-OK viewport;
   otherwise the static poster (the dusk aerial) stands in. */
(function () {
  const v = document.getElementById("heroVideo");
  if (!v) return;
  if (REDUCED || !matchMedia("(min-width: 810px)").matches) return; // poster only
  v.src = v.dataset.src;
  v.setAttribute("autoplay", "");
  const play = () => v.play().catch(() => {});
  v.addEventListener("canplay", play, { once: true });
  play();
})();

/* hero scroll-scrub — four beats: building → data → faults → dollars */
const scrub = document.querySelector(".heroscrub");
if (scrub) {
  const wide = matchMedia("(min-width: 810px)");
  const rail = scrub.querySelectorAll(".hs-rail span");
  let totalFired = false;
  const onScroll = () => {
    if (scrub.classList.contains("hs-static")) return;
    const total = scrub.offsetHeight - innerHeight;
    const p = Math.min(Math.max(-scrub.getBoundingClientRect().top / total, 0), 1);
    scrub.style.setProperty("--p", p.toFixed(4));
    scrub.classList.toggle("b2", p > 0.26);
    scrub.classList.toggle("b3", p > 0.46);
    scrub.classList.toggle("t1", p > 0.5);
    scrub.classList.toggle("t2", p > 0.6);
    scrub.classList.toggle("t3", p > 0.7);
    scrub.classList.toggle("b4", p > 0.85);
    const beat = p > 0.85 ? 3 : p > 0.46 ? 2 : p > 0.26 ? 1 : 0;
    rail.forEach((s, i) => s.classList.toggle("active", i === beat));
    if (p > 0.85 && !totalFired) {
      totalFired = true;
      const c = scrub.querySelector(".hs-total [data-count]");
      if (c) runCount(c);
    }
  };
  const applyMode = () => {
    scrub.classList.toggle("hs-static", REDUCED || !wide.matches);
    if (!scrub.classList.contains("hs-static")) onScroll();
  };
  addEventListener("scroll", onScroll, { passive: true });
  wide.addEventListener("change", applyMode);
  applyMode();
}

/* ----------------------------------------------------------------------------
   Safety net: a hidden/background tab freezes requestAnimationFrame, so any
   element still waiting to animate must be jumped to its final state. We poll
   with setTimeout (which keeps running while hidden, unlike rAF) and also catch
   visibility changes, plus one unconditional backstop after load.
---------------------------------------------------------------------------- */
const guard = () => { if (document.visibilityState === "hidden") completeAll(); };
guard();
document.addEventListener("visibilitychange", guard);
[400, 1200, 2500].forEach((ms) => setTimeout(guard, ms));
addEventListener("load", () => setTimeout(completeAll, 4000));
