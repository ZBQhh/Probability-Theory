/* ==========================================================================
   FILE: assets/js/theme.js
   描述: 主题管理与持久化 (Dark Mode)
   ========================================================================== */
MathBook.theme = {
  STORAGE_KEY: 'mathbook_theme_preference',
  
  init() {
    // 1. 检查本地存储
    const storedTheme = localStorage.getItem(this.STORAGE_KEY);
    
    // 2. 检查系统偏好
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 3. 决定是否开启深色模式
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
    
    // 暴露全局切换函数供按钮调用
    window.toggleTheme = () => this.toggle();
  },

  toggle() {
    const html = document.documentElement;
    html.classList.toggle('theme-dark');
    
    // 保存状态
    const isDark = html.classList.contains('theme-dark');
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }
};

// 立即执行初始化，防止页面加载时的白色闪烁
MathBook.theme.init();