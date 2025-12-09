/* ==========================================================================
   FILE: assets/js/config.js
   描述: 全局配置、常量定义与状态管理
   ========================================================================== */
window.MathBook = window.MathBook || {};

// 全局状态容器
MathBook.state = {
  chapters: [],
  currentChapterIndex: -1,
  // 标签映射表 (label -> 编号)
  formulaMap: {}
};

// 计数器初始化
MathBook.counters = {
  reset() {
    this.data = {
      definition: 0,
      theorem: 0,
      corollary: 0,
      example: 0,
      note: 0,
      section: 0,
      equation: 0,
      formulaBox: 0
    };
  },
  increment(key) {
    if (this.data[key] !== undefined) {
      this.data[key]++;
    }
  },
  get(key) {
    return this.data[key];
  }
};
MathBook.counters.reset();

// 环境类型中文名称映射
MathBook.CONSTANTS = {
  ENV_NAMES: {
    definition: "定义",
    theorem: "定理",
    corollary: "推论",
    example: "例",
    note: "注"
  }
};

// 工具函数：HTML 转义
MathBook.utils = {
  escapeHtml(str) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return String(str).replace(/[&<>"']/g, s => map[s]);
  },
  
  getEnvName(type) {
    return MathBook.CONSTANTS.ENV_NAMES[type] || type;
  }
};