/* ==========================================================================
   FILE: assets/js/config.js
   描述: 全局配置与数据中心 (Single Source of Truth)
   ========================================================================== */
window.MathBook = window.MathBook || {};

// 1. 全局状态容器
MathBook.state = {
  chapters: [],
  currentChapterIndex: -1,
  formulaMap: {}
};

// 2. 环境注册表 (统一管理颜色和名称)
MathBook.config = {
  environments: {
    // === 基础定义类 (蓝色) ===
    definition: { name: "定义", color: "#2563eb" },
    axiom:      { name: "公理", color: "#1e40af" },
    postulate:  { name: "公设", color: "#3b82f6" },
    principle:  { name: "原理", color: "#60a5fa" },
    law:        { name: "定律", color: "#1e3a8a" },

    // === 定理命题类 (紫色) ===
    theorem:    { name: "定理", color: "#7c3aed" },
    proposition:{ name: "命题", color: "#8b5cf6" },
    lemma:      { name: "引理", color: "#a78bfa" },
    corollary:  { name: "推论", color: "#c4b5fd" },
    claim:      { name: "断言", color: "#6d28d9" },
    fact:       { name: "事实", color: "#5b21b6" },

    // === 示例练习类 (绿色) ===
    example:    { name: "例",   color: "#059669" },
    exercise:   { name: "练习", color: "#10b981" },
    problem:    { name: "问题", color: "#14b8a6" },
    question:   { name: "疑问", color: "#06b6d4" },

    // === 证明解答类 (橙色) ===
    proof:      { name: "证明", color: "#ea580c" },
    solution:   { name: "解答", color: "#f97316" },
    answer:     { name: "答案", color: "#fb923c" },
    sketch:     { name: "概要", color: "#fdba74" },

    // === 算法类 (青色) ===
    algorithm:  { name: "算法", color: "#0891b2" },
    method:     { name: "方法", color: "#22d3ee" },

    // === 注释类 (灰色) ===
    remark:     { name: "评注", color: "#64748b" },
    note:       { name: "注记", color: "#475569" },
    notation:   { name: "记号", color: "#1e293b" },
    
    // === 特殊类 (红/黄/自定义) ===
    warning:    { name: "警告", color: "#ef4444" }, // 红色
    tip:        { name: "提示", color: "#f59e0b" }, // 黄色
    summary:    { name: "总结", color: "#ca8a04" },
    conjecture: { name: "猜想", color: "#db2777" },
    
    // === 默认兜底 ===
    default:    { name: "信息", color: "#64748b" }
  }
};

// 3. 计数器逻辑
MathBook.counters = {
  data: {},
  reset() { this.data = { section: 0, subsection: 0, equation: 0 }; },
  increment(key) {
    if (this.data[key] === undefined) this.data[key] = 0;
    this.data[key]++;
  },
  get(key) { return this.data[key] || 0; }
};

// 4. 工具函数
MathBook.utils = {
  escapeHtml(str) {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(str).replace(/[&<>"']/g, s => map[s]);
  },
  // 从配置中获取名称，找不到则返回首字母大写
  getEnvName(type) {
    const env = MathBook.config.environments[type];
    return env ? env.name : type.charAt(0).toUpperCase() + type.slice(1);
  },
  // 从配置中获取颜色
  getEnvColor(type) {
    const env = MathBook.config.environments[type];
    return env ? env.color : MathBook.config.environments.default.color;
  }
};

MathBook.counters.reset();