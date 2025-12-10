/* ==========================================================================
   FILE: chapters/chapter02.js
   描述: 演示章节
   ========================================================================== */
chapter('第一章 概率论基础')
  .text('下面演示不同公式环境')
  .formula('E=mc^2')
  .formulaColor('a^2 + b^2 = c^2', {
    color: '#e63946',
    name: '勾股定理',
    label: 'pythagoras'
  })
  .formulaColor('\\int_0^1 x^2 dx = \\frac{1}{3}', {
    color: '#3a86ff',
    name: '积分示例'
  })
  .formulaBox('这是公式盒子: $$E[X] = \\int x dF(x)$$', {
    title: '期望的积分形式',
    color: '#e24ac1'
  });
  chapter("实分析基础")
  .section("基本概念")
  .definition("连续性", "函数 $f$ 在点 $x_0$ 连续...")
  .axiom("完备性公理", "实数集 $\\mathbb{R}$ 是完备的...")
  .theorem("中值定理", "若 $f$ 连续... \\label{thm:mvt}")
  .proof("", "由连续性定义...")
  .corollary("推论", "由定理 \\ref{thm:mvt} 可得...")
  
  .section("重要性质")
  .proposition("单调性", "若导数恒正...")
  .lemma("辅助引理", "对于任意 $\\epsilon > 0$...")
  .remark("", "注意这里不能推广到...")
  .example("具体例子", "考虑函数 $f(x) = x^2$...")
  
  .section("应用")
  .application("实际应用", "在优化问题中...")
  .algorithm("牛顿迭代法", "1. 选择初值 $x_0$...")
  .exercise("习题1", "证明...")
  .solution("", "解：根据定义...")
  
  .warning("常见错误", "不要混淆连续性和可微性")
  .tip("学习建议", "建议先掌握基础概念再学习高级内容")
  .quote("数学是科学的语言", "伽利略");