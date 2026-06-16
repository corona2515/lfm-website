/* LeanFM lightweight client-side i18n — no dependencies, no innerHTML.
   - [data-i18n="key"]      -> textContent swap (plain strings)
   - [data-i18n-rich="key"] -> safe DOM rebuild; dict value may contain one
                                ⟦highlighted⟧ run rendered as <span class="thermal-text">
   - [data-i18n-ph="key"]   -> input placeholder swap
   Language = localStorage('lfm-lang') -> navigator.language -> 'en'.
   <html lang> is updated so the CJK font stack + a11y follow.
   Translations below are MACHINE DRAFTS (es, zh-Hans) — flag for native review
   before launch, especially claims/guarantee wording.
   Coverage v1: global chrome (nav/footer/CTAs) + homepage spine. Extend by
   adding keys here + data-i18n markup on more elements/pages. */
(function () {
  "use strict";

  var SUPPORTED = ["en", "es", "zh"];
  var LABEL = { en: "EN", es: "ES", zh: "中文" };
  var CUR = "en";

  var DICT = {
    es: {
      "nav.platform": "Plataforma", "nav.industries": "Industrias", "nav.results": "Resultados", "nav.company": "Empresa",
      "sub.onpoint": "La plataforma, de principio a fin", "sub.air": "La puntuación de rendimiento",
      "nav.maple_sub": "El ingeniero virtual", "nav.fdd": "Detección de fallos", "sub.fdd": "Motor Prescriptiv",
      "nav.reporting": "Informes ejecutivos", "sub.reporting": "Dólares, no volcados de datos",
      "nav.portfolio": "Cartera", "sub.portfolio": "Cada edificio, clasificado",
      "nav.higher_ed": "Educación superior", "nav.k12": "Escuelas K-12", "nav.museums": "Museos y cultura",
      "nav.healthcare": "Salud", "nav.commercial": "Bienes raíces comerciales",
      "nav.about": "Acerca de", "sub.about": "Nacido en Carnegie Mellon", "nav.contact": "Contacto", "sub.contact": "Hable con LeanFM",
      "cta.report": "Ver un informe de muestra", "cta.request": "Solicite un análisis de muestra",
      "m.platform": "Plataforma", "m.industries": "Industrias", "m.company": "Empresa",
      "foot.tagline": "Inteligencia del rendimiento de edificios. Nacido en Carnegie Mellon.",
      "foot.platform": "Plataforma", "foot.explore": "Explorar", "foot.company": "Empresa",
      "foot.industries": "Industrias", "foot.results": "Resultados", "foot.report": "Informe de muestra",
      "foot.methodology": "Metodología de AIR", "foot.insights": "Perspectivas", "foot.security": "Seguridad",
      "foot.investors": "Inversores", "foot.cmu": "Nacido en Carnegie Mellon University", "foot.privacy": "Privacidad", "foot.terms": "Términos",
      "hero.kicker": "Inteligencia del rendimiento de edificios",
      "hero.title": "Descubra el ⟦desperdicio oculto de climatización⟧ antes de que se convierta en un problema.",
      "hero.sub": "LeanFM lee los datos de automatización que su edificio ya recopila — analizados por Prescriptiv, nuestro motor desarrollado a partir de la investigación de Carnegie Mellon — para descubrir desperdicio de energía, problemas de confort y riesgos de mantenimiento. Sin sensores nuevos.",
      "hero.proof_stat": "$105,000/año identificados", "hero.proof_meta": "escuela de 220,000 pies² · solo con datos del BAS existente",
      "hero.guarantee": "Respaldado por nuestra garantía de devolución de 3–5×.",
      "p.eyebrow": "01 — El problema", "p.h2": "Los edificios no fallan a gritos. ⟦Se desangran en silencio.⟧",
      "air.eyebrow": "03 — La puntuación", "air.h2": "Una sola puntuación para todo el edificio — y muestra su trabajo.",
      "cta.eyebrow": "Solicite un análisis de muestra", "cta.h2": "Vea lo que su edificio está escondiendo.",
      "cta.lead": "Envíenos los datos de tendencia de un edificio y le devolveremos un análisis de muestra — hallazgos reales con valores reales en dólares, sin compromiso. Confirmamos los tiempos en una llamada de 20 minutos."
    },
    zh: {
      "nav.platform": "平台", "nav.industries": "行业", "nav.results": "成果", "nav.company": "公司",
      "sub.onpoint": "端到端的平台", "sub.air": "性能评分",
      "nav.maple_sub": "虚拟工程师", "nav.fdd": "故障检测", "sub.fdd": "Prescriptiv 引擎",
      "nav.reporting": "高管报告", "sub.reporting": "呈现美元价值，而非数据堆砌",
      "nav.portfolio": "建筑组合", "sub.portfolio": "每栋建筑，逐一排序",
      "nav.higher_ed": "高等教育", "nav.k12": "K-12 学校", "nav.museums": "博物馆与文化机构",
      "nav.healthcare": "医疗", "nav.commercial": "商业地产",
      "nav.about": "关于我们", "sub.about": "源自卡内基梅隆大学", "nav.contact": "联系我们", "sub.contact": "联系 LeanFM",
      "cta.report": "查看示例报告", "cta.request": "申请示例分析",
      "m.platform": "平台", "m.industries": "行业", "m.company": "公司",
      "foot.tagline": "建筑性能智能。源自卡内基梅隆大学。",
      "foot.platform": "平台", "foot.explore": "探索", "foot.company": "公司",
      "foot.industries": "行业", "foot.results": "成果", "foot.report": "示例报告",
      "foot.methodology": "AIR 方法论", "foot.insights": "洞察", "foot.security": "安全",
      "foot.investors": "投资者", "foot.cmu": "源自卡内基梅隆大学", "foot.privacy": "隐私", "foot.terms": "条款",
      "hero.kicker": "建筑性能智能",
      "hero.title": "在问题出现之前，发现隐藏的⟦暖通空调浪费⟧。",
      "hero.sub": "LeanFM 读取您的建筑已经采集的自动化数据 —— 由我们源自卡内基梅隆研究的 Prescriptiv 引擎进行分析 —— 找出能源浪费、舒适度问题和维护风险。无需新增传感器。",
      "hero.proof_stat": "已识别 $105,000/年", "hero.proof_meta": "220,000 平方英尺的学校 · 仅使用现有 BAS 数据",
      "hero.guarantee": "提供 3–5 倍退款保证。",
      "p.eyebrow": "01 — 问题", "p.h2": "建筑不会轰然倒下，⟦而是悄然流失。⟧",
      "air.eyebrow": "03 — 评分", "air.h2": "一个分数概览整栋建筑 —— 并展示其依据。",
      "cta.eyebrow": "申请示例分析", "cta.h2": "看看您的建筑藏着什么。",
      "cta.lead": "把一栋建筑的趋势数据发给我们，我们会回复一份示例分析 —— 真实的发现、真实的美元价值，无需承诺。我们会在 20 分钟的沟通通话中确认时间安排。"
    }
  };

  function detect() {
    try { var s = localStorage.getItem("lfm-lang"); if (s && SUPPORTED.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || "en").toLowerCase();
    if (n.indexOf("es") === 0) return "es";
    if (n.indexOf("zh") === 0) return "zh";
    return "en";
  }

  // Rebuild an element's content from a plain string with one optional ⟦…⟧ run.
  function buildRich(el, str, hl) {
    while (el.firstChild) el.removeChild(el.firstChild);
    var parts = String(str).split(/⟦|⟧/);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === "") continue;
      if (i % 2 === 1) {
        var s = document.createElement("span");
        s.className = hl || "thermal-text";
        s.textContent = parts[i];
        el.appendChild(s);
      } else {
        el.appendChild(document.createTextNode(parts[i]));
      }
    }
  }

  function restoreNodes(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    for (var i = 0; i < el._en.length; i++) el.appendChild(el._en[i].cloneNode(true));
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = "en";
    CUR = lang;
    var dict = DICT[lang] || {};
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.getAttribute("data-i18n-en") === null) el.setAttribute("data-i18n-en", el.textContent);
      var en = el.getAttribute("data-i18n-en");
      var key = el.getAttribute("data-i18n");
      el.textContent = lang === "en" ? en : (dict[key] || en);
    });

    document.querySelectorAll("[data-i18n-rich]").forEach(function (el) {
      if (!el._en) el._en = Array.prototype.map.call(el.childNodes, function (n) { return n.cloneNode(true); });
      var key = el.getAttribute("data-i18n-rich");
      if (lang === "en" || !dict[key]) restoreNodes(el);
      else buildRich(el, dict[key], el.getAttribute("data-i18n-hl"));
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      if (el.getAttribute("data-i18n-ph-en") === null) el.setAttribute("data-i18n-ph-en", el.getAttribute("placeholder") || "");
      var en = el.getAttribute("data-i18n-ph-en");
      var key = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", lang === "en" ? en : (dict[key] || en));
    });

    try { localStorage.setItem("lfm-lang", lang); } catch (e) {}
    document.querySelectorAll(".langsel").forEach(function (s) { s.value = lang; });
  }

  function init() {
    apply(detect());
    document.addEventListener("change", function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains("langsel")) apply(t.value);
    });
  }

  // Merge extra translations (per-page dictionary files call this) and re-apply.
  function add(extra) {
    if (!extra) return;
    ["es", "zh"].forEach(function (l) {
      if (extra[l]) { DICT[l] = DICT[l] || {}; for (var k in extra[l]) DICT[l][k] = extra[l][k]; }
    });
    apply(CUR);
  }

  window.LeanFMi18n = { apply: apply, add: add, LABEL: LABEL, SUPPORTED: SUPPORTED };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
