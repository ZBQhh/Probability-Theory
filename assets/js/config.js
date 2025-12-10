/* ==========================================================================
   FILE: assets/js/config.js
   描述: 全局配置与数据中心 (支持中英切换)
   ========================================================================== */
window.MathBook = window.MathBook || {};

// 1. 全局配置
MathBook.config = {
  // 🌍 语言开关：'zh' (中文) 或 'en' (英文)
  language: 'en', 

  // 环境定义 (名称字典 + 颜色)
  environments: {
    // === 基础定义类 (蓝色) ===
    definition: { zh: "定义", en: "Definition", color: "#2563eb" },
    axiom:      { zh: "公理", en: "Axiom",      color: "#1e40af" },
    postulate:  { zh: "公设", en: "Postulate",  color: "#3b82f6" },
    principle:  { zh: "原理", en: "Principle",  color: "#60a5fa" },
    law:        { zh: "定律", en: "Law",        color: "#1e3a8a" },

    // === 定理命题类 (紫色) ===
    theorem:    { zh: "定理", en: "Theorem",     color: "#7c3aed" },
    proposition:{ zh: "命题", en: "Proposition", color: "#8b5cf6" },
    lemma:      { zh: "引理", en: "Lemma",       color: "#a78bfa" },
    corollary:  { zh: "推论", en: "Corollary",   color: "#c4b5fd" },
    claim:      { zh: "断言", en: "Claim",       color: "#6d28d9" },
    fact:       { zh: "事实", en: "Fact",        color: "#5b21b6" },
    
    // === 性质类 (红色) ===
    property:   { zh: "性质",     en: "Property",  color: "#ef4444" },
    case:       { zh: "情形",     en: "Case",      color: "#dc2626" },
    criterion:  { zh: "判别准则", en: "Criterion", color: "#f87171" },
    condition:  { zh: "条件",     en: "Condition", color: "#fca5a5" },

    // === 示例练习类 (绿色) ===
    example:    { zh: "例",   en: "Example",   color: "#059669" },
    exercise:   { zh: "练习", en: "Exercise",  color: "#10b981" },
    problem:    { zh: "问题", en: "Problem",   color: "#14b8a6" },
    question:   { zh: "疑问", en: "Question",  color: "#06b6d4" },

    // === 证明解答类 (橙色) ===
    proof:      { zh: "证明", en: "Proof",    color: "#ea580c" },
    solution:   { zh: "解答", en: "Solution", color: "#f97316" },
    answer:     { zh: "答案", en: "Answer",   color: "#fb923c" },
    sketch:     { zh: "概要", en: "Sketch",   color: "#fdba74" },

    // === 算法类 (青色) ===
    algorithm:  { zh: "算法", en: "Algorithm", color: "#0891b2" },
    method:     { zh: "方法", en: "Method",    color: "#22d3ee" },
    procedure:  { zh: "过程", en: "Procedure", color: "#06b6d4" },
    construction:{zh: "构造", en: "Construction", color: "#67e8f9" },

    // === 注释类 (灰色) ===
    remark:     { zh: "评注", en: "Remark",      color: "#64748b" },
    note:       { zh: "注记", en: "Note",        color: "#475569" },
    notation:   { zh: "记号", en: "Notation",    color: "#1e293b" },
    observation:{ zh: "观察", en: "Observation", color: "#94a3b8" },
    comment:    { zh: "评论", en: "Comment",     color: "#334155" },
    convention: { zh: "约定", en: "Convention",  color: "#0f172a" },
    
    // === 特殊类 ===
    warning:    { zh: "警告", en: "Warning",    color: "#ef4444" },
    tip:        { zh: "提示", en: "Tip",        color: "#f59e0b" },
    summary:    { zh: "总结", en: "Summary",    color: "#ca8a04" },
    conclusion: { zh: "结论", en: "Conclusion", color: "#eab308" },
    application:{ zh: "应用", en: "Application",color: "#facc15" },
    motivation: { zh: "动机", en: "Motivation", color: "#fde047" },
    conjecture: { zh: "猜想", en: "Conjecture", color: "#db2777" },
    hypothesis: { zh: "假设", en: "Hypothesis", color: "#ec4899" },
    assumption: { zh: "假定", en: "Assumption", color: "#f472b6" },
    
    // === 默认兜底 ===
    default:    { zh: "信息", en: "Info",       color: "#64748b" }
  }
};

// 2. 全局状态
MathBook.state = {
  chapters: [],
  currentChapterIndex: -1,
  formulaMap: {}
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
  
  // 💥 核心逻辑：根据当前配置的 language 返回对应的名称
  getEnvName(type) {
    const env = MathBook.config.environments[type];
    const lang = MathBook.config.language || 'zh'; // 默认中文
    if (env) {
      return env[lang] || env['en'] || type; // 优先当前语言，降级到英文
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  },
  
  // 获取颜色
  getEnvColor(type) {
    const env = MathBook.config.environments[type];
    return env ? env.color : MathBook.config.environments.default.color;
  }
};