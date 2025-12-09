/* ==
   FILE: chapters/chapter01.js
   描述: 第1章 随机事件和概率
   == */
chapter('随机事件和概率')
  .section('随机事件及其运算')
    .definition('关于黎曼zeta函数非平凡零点分布的临界线定理的推广形式', `
      满足以下三个条件的试验称为随机试验:
      <ul>
        <li>在相同的条件下试验可以重复进行.</li>
        <li>每次试验的结果不止一种，但是试验之前必须明确试验的所有可能的结果.</li>
        <li>每次试验将会出现什么样的结果是事先无法预知的.</li>
      </ul>
    `)
    .definition('样本点与样本空间', `
      随机试验中每一个可能的结果称为一个样本点，记为 $\\omega$<br>
      随机试验所有的样本点组成的集合称为样本空间，记为 $\\Omega$。
    `)
    .definition('随机事件与基本事件', `
      一个随机试验样本空间的子集称为随机事件。即随机事件是由部分样本点组成的集合。从直观来说，随机事件是可能发生也可能不发生的事件。仅含一个样本点的随机事件称为基本事件。
    `)
    .definition('特殊事件', `
      <ul>
        <li>不可能事件$\\varnothing$: 由于$\\varnothing$中不包含任何元素，所以$\\varnothing$在每一次试验中一定不发生。</li>
        <li>必然事件$\\Omega$: 由于$\\Omega$包含所有可能试验结果，所以$\\Omega$在每一次试验中一定发生。</li>
      </ul>
    `)
    .definition('事件的关系与运算', `
      <ol>
        <li>A \\subset B: 事件A发生必然导致事件B发生。</li>
        <li>A = B: 事件A与事件B相等。</li>
        <li>AB=\\varnothing: 事件A与事件B不可能同时发生，称为互斥或互不相容。</li>
        <li>A \\cup B: 事件A与事件B至少有一个发生。</li>
        <li>A \\cap B (或 AB): 事件A与事件B都发生。</li>
        <li>A - B: 事件A发生并且事件B不发生。</li>
        <li>\\overline{A}: 事件A不发生，称为A的逆事件。</li>
      </ol>
    `)
    .theorem('事件运算性质', `
      <ol>
        <li>交换律: A \\cup B = B \\cup A, A \\cap B = B \\cap A.</li>
        <li>结合律: (A \\cup B) \\cup C = A \\cup (B \\cup C), (AB)C = A(BC).</li>
        <li>分配律: (A \\cup B) \\cap C = AC \\cup BC, (A \\cap B) \\cup C = (A \\cup C) \\cap (B \\cup C).</li>
        <li>对偶律: \\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}, \\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}.</li>
      </ol>
    `)

  .section('概率的定义及其性质')
    .definition('频率与频数', `
      在n次重复试验中，事件A出现了n_A次，n_A称为事件A在这n次试验中发生的频数。比值 f_n(A) = \\frac{n_A}{n} 称为事件A在这n次试验中发生的频率。
    `)
    .definition('概率的公理化定义', `
      设任一随机试验E的样本空间为\\Omega。若对任意事件A，有唯一实数P(A)与之对应，且满足下面条件，则数P(A)称为事件A的概率:
      <ol>
        <li>（非负性公理）对于任意事件A，总有 P(A) \\geqslant 0；</li>
        <li>（规范性公理） P(\\Omega) = 1；</li>
        <li>（可列可加性公理）若 A_1, A_2, \\cdots, A_n, \\cdots 为两两互不相容的事件，则有 P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} P(A_i).</li>
      </ol>
    `)
    .theorem('概率的性质', `
      <ol>
        <li>P(\\varnothing) = 0.</li>
        <li>（有限可加性）设 A_1, A_2, \\cdots, A_n 为两两互不相容的事件，则有 P\\left(\\bigcup_{i=1}^{n} A_i\\right) = \\sum_{i=1}^{n} P(A_i).</li>
        <li>对任意事件A，有 P(\\overline{A}) = 1 - P(A).</li>
        <li>若事件 A \\subset B，则 P(B-A) = P(\\overline{A}B) = P(B) - P(A).</li>
        <li>（减法公式）设A, B为任意事件，则 P(A-B) = P(A) - P(AB).</li>
        <li>（加法公式）设A, B为任意事件，则 P(A \\cup B) = P(A) + P(B) - P(AB).</li>
      </ol>
    `)

  .section('等可能概型')
    .definition('古典概型', `
      若随机试验满足：
      <ul>
        <li>随机试验的样本空间只有有限个样本点；</li>
        <li>每个基本事件发生的可能性相等。</li>
      </ul>
      则称此概型为古典概型。事件A的概率为：
      P(A) = \\frac{A \\text{中所含样本点的个数}}{\\Omega \\text{中所含样本点的总数}}.
    `)
    .definition('几何概型', `
      若随机试验满足：
      <ul>
        <li>随机试验的样本空间 \\Omega 是某个区域（可以是一维区间、二维平面区域或三维空间区域）；</li>
        <li>每个样本点发生的可能性相等。</li>
      </ul>
      则称此概型为几何概型。事件A的概率为：
      P(A) = \\frac{m(A)}{m(\\Omega)}.
      其中，m(\\cdot)在一维情况下表示长度，在二维情况下表示面积，在三维情况下表示体积。
    `)

  .section('条件概率与事件的相互独立性')
    .definition('条件概率', `
      设A, B为随机试验E上的两个事件，且P(A) > 0，则在事件A发生的条件下事件B发生的概率称为条件概率，记为P(B \\mid A)，定义为：
      P(B \\mid A) = \\frac{P(AB)}{P(A)}.
    `)
    .theorem('乘法公式', `
      设A, B为随机试验E上的两个事件，且P(A) > 0，则有：
      P(AB) = P(A)P(B \\mid A).
      类似可得，若P(B) > 0，有 P(AB) = P(B)P(A \\mid B)。
    `)
    .definition('事件的独立性（两两独立）', `
      设 A, B, C 是试验 E 的 3 个事件，若满足等式：
      P(AB)=P(A)P(B), \\quad P(AC)=P(A)P(C), \\quad P(BC)=P(B)P(C).
      则称事件 A, B, C 两两独立。
    `)
    .definition('事件的独立性（相互独立）', `
      设 A, B, C 是试验 E 的 3 个事件，若满足等式：
      P(AB)=P(A)P(B), \\quad P(AC)=P(A)P(C),
      P(BC)=P(B)P(C), \\quad P(ABC)=P(A)P(B)P(C).
      则称事件 A, B, C 相互独立。
    `)
    .definition('事件的独立性（n个事件）', `
      设 A_1, A_2, \\cdots, A_n 是试验 E 的 n(n \\geq 2) 个事件，如果事件 A_1, A_2, \\cdots, A_n 中任意 k 个（2 \\le k \\le n）事件的积事件的概率等于各事件概率的积，则称这 n 个事件相互独立。
    `)

  .section('全概率公式与贝叶斯公式')
    .definition('完备事件组（划分）', `
      设E是随机试验，\\Omega是相应的样本空间，A_1, A_2, \\cdots, A_n为E的一组事件，若满足条件：
      <ol>
        <li>A_i \\cap A_j = \\varnothing \\quad (i \\neq j)；</li>
        <li>A_1 \\cup A_2 \\cup \\cdots \\cup A_n = \\Omega。</li>
      </ol>
      则称事件组A_1, A_2, \\cdots, A_n为样本空间\\Omega的一个完备事件组（或称划分）。
    `)
    .theorem('全概率公式', `
      设A_1, A_2, \\cdots, A_n为样本空间\\Omega的一个完备事件组，且P(A_i) > 0 \\ (i=1,2,\\cdots,n)，B为任一事件，则：
      P(B) = \\sum_{i=1}^{n} P(A_i)P(B \\mid A_i).
    `)
    .theorem('贝叶斯公式（逆概率公式）', `
      设A_1, A_2, \\cdots, A_n为样本空间\\Omega的一个完备事件组，P(A_i) > 0 \\ (i=1,2,\\cdots,n)，B为满足条件P(B)>0的任一事件，则：
      P(A_i \\mid B) = \\frac{P(A_i)P(B \\mid A_i)}{\\sum_{j=1}^{n} P(A_j)P(B \\mid A_j)} = \\frac{P(A_i)P(B \\mid A_i)}{P(B)}, \\quad i=1,2,\\cdots,n.
    `)
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