/* assets/js/mathJaxConfig.js */
window.MathJax = {
  tex: {
    // ... 保持宏定义不变 ...
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$']],
    tags: 'ams',
    processEnvironments: true,
    processRefs: true
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  chtml: {
    scale: 1.0,
    matchFontHeight: false, 
    adaptiveCSS: false,      /* ❌ 必须关掉，防止 MathJax 乱加换行 */
    displayAlign: 'center'   /* 默认居中 */
  },
  startup: {
    typeset: false
  }
};