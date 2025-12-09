/* ==========================================================================
   FILE: assets/js/mathJaxConfig.js
   描述: MathJax 基础配置 (重构版)
   ========================================================================== */
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$']],
    tags: 'ams',
    macros: {
      R: "\\mathbb{R}",
      N: "\\mathbb{N}",
      Z: "\\mathbb{Z}",
      e: "\\mathrm{e}",
      d: "\\mathrm{d}",
      P: ["P(#1)", 1],
      Prob: ["\\mathrm{P}\\left(#1\\right)", 1],
      E: ["E\\left[#1\\right]", 1],
      Var: ["\\mathrm{Var}\\left(#1\\right)", 1],
      bm: ["\\boldsymbol{#1}", 1]
    }
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  chtml: {
    scale: 1.0,
    matchFontHeight: false,
    adaptiveCSS: false, // 禁用 MathJax 的自适应 CSS
    displayAlign: 'center'
  },
  startup: {
    typeset: false
  }
};