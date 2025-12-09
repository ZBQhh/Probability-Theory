/* ==========================================================================
   FILE: assets/js/mathJaxConfig.js
   描述: MathJax 基础配置 (重构版)
   ========================================================================== */
/* assets/js/mathJaxConfig.js */
window.MathJax = {
  loader: {
    load: ['ui/lazy'] // 💥 核心优化：加载懒渲染组件
  },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$']],
    tags: 'ams',
    macros: {
      // 常用宏定义保持不变
      R: "\\mathbb{R}", N: "\\mathbb{N}", Z: "\\mathbb{Z}",
      P: ["P(#1)", 1], E: ["E\\left[#1\\right]", 1],
      bm: ["\\boldsymbol{#1}", 1]
    }
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process',
    // 💥 开启懒加载：只渲染视口内的公式
    lazyMargin: '200px',
    enableMenu: false // 禁用右键菜单以提升少许性能
  },
  chtml: {
    adaptiveCSS: false,
    displayAlign: 'center'
  },
  startup: {
    typeset: false // 手动控制初始渲染
  }
};