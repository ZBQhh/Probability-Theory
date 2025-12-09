/* ==========================================================================
   FILE: assets/js/theme.js
   描述: 主题管理与持久化 (Dark Mode)
   ========================================================================== */
/* assets/js/theme.js */
(function() {
  // 定义常量
  const STORAGE_KEY = 'mathbook_theme_preference';
  
  // 核心逻辑
  function initTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 优先级：本地存储 > 系统偏好
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  }

  // 暴露给全局的切换函数
  window.toggleTheme = function() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('theme-dark');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    
    // 如果有图表等组件，可以在这里触发重绘事件
    window.dispatchEvent(new Event('theme-changed'));
  };

  // 立即执行
  initTheme();
})();