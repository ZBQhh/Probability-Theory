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