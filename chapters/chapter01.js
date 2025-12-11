/* ==
   FILE: chapters/chapter01.js
   描述: 第1章 随机事件和概率
   == */
chapter('随机事件和概率')          .text('随机现象在自然界、生产实践、科学实验和日常生活中发生的现象，按其结果能否准确预测来划分，可以分为两大类：一类是必然现象；另一类是随机现象.')
    .text('在一定条件下，可能会出现多种不同的结果，但在观测之前无法预知其确切结果的现象，称为随机现象.这类现象的共同特点是：在相同条件下可重复进行试验，但每次试验不止出现一个结果，即试验结果呈现出不确定性.')
    .text(' 事实上，在个别试验中，随机现象的结果虽然呈现出不确定性，但是经多次重复试验，却可发现它仍然呈现出某种规律性，这种规律性称为随机事件的统计规律性.')
    .section('随机事件')
    .subsection('随机试验')
    .definition('随机试验', `
      满足下列三个条件的试验称为随机试验：
      <ul>
        <li>试验在相同条件下可重复进行.</li>
        <li>每次试验的可能结果不止一个，但能事先明确试验的所有可能结果.</li>
        <li>每次试验前不能确定哪一个结果发生.</li>
      </ul>
      随机试验简称试验，常用字母$E_{1}, E_{2}, \\cdots$表示.
    `)
  .subsection('样本空间')
    .definition('样本空间与样本点', `
      对于任一个随机试验，每次实验的所有可能结果都是事先知道的，而且结果不止一个.把随机试验的一切可能结果的集合称为样本空间.在概率论中常用大写的希腊字母$\\Omega$来表示.<br>试验的每个结果称之为样本点或基本事件，通常用小写的希腊字母$\\omega$或$\\omega_{1}, \\omega_{2}, \\cdots$来表示.
    `)
    .subsection('随机事件')
    .definition('随机事件、必然事件、不可能事件', `
      在实际问题中，我们往往关心某种满足一定条件样本点的集合，这种满足一定条件样本的集合称为随机事件，简称事件.所以随机事件就是某些样本点的集合，也就是样本空间$\\Omega$的某些子集合.<br>
      在试验时，如果出现了事件$A$中的样本点，我们就说事件$A$发生了或者说$A$出现了.<ul>
      <li>$\\Omega$作为自身的子集合，在每次试验中总是发生的，称为必然事件</li>
      <li>空集$\\varnothing$不包含任何样本点，在每次试验中总是不发生，称为不可能事件.</li>
      <li>事件通常用大写的英文字母$A, B, C, \\cdots$表示.</li>
      </ul>
    `)
  .section('事件间的关系与运算')
    .definition('事件间的关系与运算（集合论）', `
      事件是$\\Omega$的子集合，它们之间的关系与运算即集合间的关系与运算.下面设$A, B, A_{1}, A_{2}, \\cdots$均为事件.
      <ol>
        <li>（包含）若$A \\subset B$，则称$B$包含事件$A$或$A$含于$B$.这表示事件$A$发生必导致$B$发生.<br>
  若$A \\subset B$，且$B \\subset A$，即$A = B$，则称事件$A$与$B$相等.</li>
        <li>（并事件）事件$A \\cup B = \\{\\omega \\in \\Omega: \\omega \\in A$ 或 $\\omega \\in B\\}$，称为事件$A$与$B$的并事件.$A \\cup B$发生当且仅当$A, B$中至少有一个发生.<br>
  类似地，称$\\bigcup_{i=1}^{n} A_{i} = \\{\\omega \\in \\Omega: \\omega$至少属于$A_{1}, A_{2}, \\cdots, A_{n}$中一个事件$\\}$为$n$个事件的并事件，称$\\bigcup_{i=1}^{\\infty} A_{i} = \\{\\omega \\in \\Omega: \\omega$至少属于$A_{1}, A_{2}, \\cdots$中一个事件$\\}$为可列个事件的并事件.</li>
        <li>（交事件）事件$A \\cap B = \\{\\omega \\in \\Omega: \\omega \\in A$并且$\\omega \\in B\\}$称为事件$A$与$B$的交事件，简记为$AB$.$AB$发生当且仅当$A$与$B$同时发生.<br>
  类似地，称$\\bigcap_{i=1}^{n} A_{i} = \\{\\omega \\in \\Omega: \\omega$属于一切$A_{i}, i=1,2,\\cdots,n\\}$为$n$个事件的交事件，称$\\bigcap_{i=1}^{\\infty} A_{i} = \\{\\omega \\in \\Omega: \\omega$属于一切$A_{1}, A_{2}, \\cdots\\}$为可列个事件的交事件.</li>
        <li>（差事件）事件$A - B = \\{\\omega \\in \\Omega: \\omega \\in A$但$\\omega \\notin B\\}$称为事件$A$与$B$的差事件，事件$A - B$发生当且仅当$A$发生，而$B$不发生.</li>
        <li>（互不相容）若$A \\cap B = \\varnothing$，则称事件$A$与$B$互不相容或互斥，即两事件不能同时发生.</li>
        <li>（逆事件）若$A \\cup B = \\Omega$，且$A \\cap B = \\varnothing$，则称两事件互为逆事件，并记$B = \\overline{A}$或$A = \\overline{B}$.</li>
      </ol>
    `)
    .property('事件运算的性质', `
      <ol>
        <li>交换律：$$A \\cup B = B \\cup A \\quad A \\cap B = B \\cap A$$</li>
        <li>结合律：$$
  \\begin{align*}A \\cup (B \\cup C) = (A \\cup B) \\cup C\\\\
    \A \\cap (B \\cap C) = (A \\cap B) \\cap C\\end{align*}$$</li>
        <li>分配律：$$\\begin{align*}A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\\\
        \A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\end{align*}$$</li>
        <li>对偶律：$$\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}\\quad\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}$$</li>
      </ol>
      
    `)
  .section('事件运算举例')
    .example('事件运算的表示（例1.1.2）', `
      某灯泡厂取样检查灯泡的寿命，设$A$表示“灯泡寿命大于1500h”，$B$表示“灯泡寿命为1000~2000h”，请用集合的形式写出下列事件：$\\Omega$, $A$, $B$, $A \\cup B$, $AB$, $A-B$, $B-A$.
      <ul>
        <li>$\\Omega = \\{x \\mid x \\geqslant 0 \\} = [0, +\\infty)$</li>
        <li>$A = \\{x \\mid x > 1500 \\} = (1500, +\\infty)$</li>
        <li>$B = \\{x \\mid 1000 \\leqslant x \\leqslant 2000 \\} = [1000, 2000]$</li>
        <li>$A \\cup B = [1000, +\\infty)$</li>
        <li>$AB = (1500, 2000]$</li>
        <li>$A-B = (2000, +\\infty)$</li>
        <li>$B-A = [1000, 1500]$</li>
      </ul>
    `)
    .example('事件运算的表示（例1.1.3）', `
      一个货箱中装有12只同类型的产品，其中3只是一等品，9只是二等品，从中随机地抽取两次，每次任取1只，$A_{i}(i=1,2)$表示第$i$次抽取的是一等品，试用字母及事件间的关系表示下列事件：
      <ol>
        <li>两只都是一等品；</li>
        <li>两只都是二等品；</li>
        <li>一只是一等品，另一只是二等品；</li>
        <li>第二次抽取的是一等品.</li>
      </ol>
      解 由题意，用$\\overline{A}_{i}$表示第$i$次抽取的是二等品($i=1,2$)，则
      <ol>
        <li>两只都是一等品：$A_{1} \\cap A_{2}$</li>
        <li>两只都是二等品：$\\overline{A}_{1} \\cap \\overline{A}_{2}$</li>
        <li>一只是一等品，另一只是二等品：$\\overline{A}_{1}A_{2} \\cup A_{1}\\overline{A}_{2}$</li>
        <li>第二次抽取的是一等品：$\\overline{A}_{1}A_{2} \\cup A_{1}A_{2} = A_{2}$</li>
      </ol>
    `)
    .example('事件运算的表示（例1.1.4）', `
      甲、乙、丙三人各向目标射击一发子弹，以$A, B, C$分别表示甲、乙、丙命中目标，试用$A, B, C$的运算关系表示下列事件.
      <ul>
        <li>$A_{0}$：“甲命中，乙和丙都没有命中” $A \\overline{B} \\overline{C}$</li>
        <li>$A_{1}$：“至少有一人命中” $A \\cup B \\cup C$</li>
        <li>$A_{2}$：“恰有一个命中目标” $A \\overline{B} \\overline{C} \\cup \\overline{A} B \\overline{C} \\cup \\overline{A} \\overline{B} C$</li>
        <li>$A_{3}$：“恰有两个命中目标” $AB \\overline{C} \\cup A \\overline{B} C \\cup \\overline{A} BC$</li>
        <li>$A_{4}$：“最多有一个命中目标” $\\overline{A} \\overline{B} \\cup \\overline{A} \\overline{C} \\cup \\overline{B} \\overline{C}$</li>
        <li>$A_{5}$：“三人都命中目标” $ABC$</li>
        <li>$A_{6}$：“三人均未命中目标” $\\overline{A} \\overline{B} \\overline{C}$</li>
      </ul>
      注：事件的表示不是唯一的，例如，利用对偶律或事件的差，例1.1.4中事件$A_{0}$也可表示为如下几种形式：
      $$A_{0}=A\\overline{(B \\cup C)}$$
      $$A_{0}=A-B-C$$
    `)
  .section('概率的定义')
    .note('概率定义引言', `
      1.1节介绍了随机现象，通过大量试验可以观察到会有哪些结果出现.实际上，我们更希望能对这些结果出现的可能性作出定量的描述.事件发生可能性的定量描述的实质就是事件发生的概率.有些事件发生的概率直觉就可以确定，但是，对于一...
    `)

/* ==
   FILE: chapters/chapter01.js
   描述: 第1章 随机事件和概率
   == */
chapter('随机事件和概率')
  .section('概率的定义及其性质')
    .definition('频率与频数', `
      若事件$A$在$n$次试验中发生了$n_A$次，则称$n_A$为事件$A$在这$n$次试验中发生的频数，而比值$f_n(A)=\\frac{n_A}{n}$称为事件$A$在这$n$次试验中发生的频率.
    `)
    .property('频率的性质', `
      <ol>
        <li>（有界性）对于任何一个事件$A$，有$0 \\leqslant f_n(A) \\leqslant 1$.</li>
        <li>（规范性）$f_n(\\Omega)=1, f_n(\\varnothing)=0$.</li>
        <li>（有限可加性）$f_n(A \\cup B)=f_n(A)+f_n(B)-f_n(AB)$.特别地，若$A,B$互不相容，则有$f_n(A+B)=f_n(A)+f_n(B)$.</li>
        <li>（对立事件）$f_n(\\overline{A})=1-f_n(A)$.</li>
        <li>（单调性）若$A \\subset B$，则有$f_n(A) \\leqslant f_n(B)$，且$f_n(B-A)=f_n(B)-f_n(A)$.</li>
      </ol>
    `)
    .definition('概率的统计定义', `
      事件$A$出现的频率$f_n(A)$随着重复试验的次数$n$的增大而稳定于某个常数$p$，则称这个常数$p$为事件$A$发生的概率，记为$P(A)$，即$P(A)=p$.
    `)
    .definition('概率的公理化定义', `
      设随机试验$E$的样本空间为$\\Omega$，对$E$的每一个事件$A$赋予一个实值函数$P(A)$，称其为事件$A$的概率，如果集合函数$P(A)$满足下列三条公理：
      <ol>
        <li>（非负性公理）对任意事件$A$，有$P(A) \\geqslant 0$；</li>
        <li>（规范性公理）对必然事件$\\Omega$，有$P(\\Omega)=1$；</li>
        <li>（可列可加性公理）对于可数个两两互斥的事件$A_1, A_2, \\cdots, A_n, \\cdots$，有$P(\\bigcup\\limits_{i=1}^{\\infty}A_i)=\\sum\\limits_{i=1}^{\\infty}P(A_i)$.</li>
      </ol>
    `)
    .property('概率的基本性质', `
      <ol>
        <li>对任意事件$A$，有$0 \\leqslant P(A) \\leqslant 1$.</li>
        <li>$P(\\Omega)=1, \\quad P(\\varnothing)=0$.</li>
        <li>（加法公式）$P(A \\cup B)=P(A)+P(B)-P(AB)$.特别地，若$A,B$互不相容，则有$P(A+B)=P(A)+P(B)$.</li>
        <li>（对立事件）$P(\\overline{A})=1-P(A)$.</li>
        <li>（单调性与减法公式）若$A \\subset B$，则有$P(A) \\leqslant P(B)$，且$P(B-A)=P(B)-P(A)$.</li>
      </ol>
    `)
    .corollary('概率加法公式的推广（三个事件）', `
      设$A, B, C$为三个事件，则
      $$P(A \\cup B \\cup C)=P(A)+P(B)+P(C)-P(AB)-P(BC)-P(AC)+P(ABC).$$
    `)
    .remark('概率的有限可加性', `
      若$A_1, A_2, \\cdots, A_m$两两互不相容，则有
      $$P(A_1+A_2+\\cdots+A_m)=P(A_1)+P(A_2)+\\cdots+P(A_m).$$
    `)
    .example('例1.2.1（已知$P(A), P(B), P(A \\cup B)$求$P(B-A)$与$P(A-B)$）', `
      已知$A,B$是两个事件，且$P(A)=0.6, P(B)=0.7, P(A \\cup B)=0.8$.求$P(B-A)$与$P(A-B)$.
      解：由加法公式得
      $$P(AB)=P(A)+P(B)-P(A \\cup B)=0.6+0.7-0.8=0.5.$$
      又由减法公式得
      $$P(B-A)=P(B)-P(AB)=0.7-0.5=0.2,$$
      $$P(A-B)=P(A)-P(AB)=0.6-0.5=0.1.$$
    `)
    .example('例1.2.2（已知$P(AB), P(C), P(AB\\overline{C})$求$P\\overline{(AB \\cup \\overline{C})}$）', `
      已知$P(AB)=0.5, P(C)=0.2, P(AB\\overline{C})=0.4$，求$P\\overline{(AB \\cup \\overline{C})}$.
      解：
      $$P\\overline{(AB \\cup \\overline{C})} = 1-P(AB \\cup \\overline{C}) = 1-[P(AB)+P(\\overline{C})-P(AB\\overline{C})] = 1-(0.5+0.8-0.4)=0.1.$$
    `)
  .section('古典概型')
    .definition('古典概型（古典随机试验）', `
      若一个随机试验满足：
      <ol>
        <li>试验的样本空间中只有有限个样本点（有限性）；</li>
        <li>试验中每个样本点的出现是等可能的（等可能性）.</li>
      </ol>
      则称该随机试验为古典随机试验，相应的模型称为古典概型.
    `)
    .definition('古典概型中事件概率的定义', `
      设古典概型的样本空间$\\Omega=\\{\\omega_1, \\omega_2, \\cdots, \\omega_n\\}$，若事件$A$中含有$k(k \\leqslant n)$个样本点，则称$\\frac{k}{n}$为事件$A$发生的概率，记为
      $$P(A)=\\frac{\\text{事件A包含的基本事件数}}{\\Omega\\text{中基本事件的总数}}=\\frac{k}{n}.$$
    `)
    .remark('古典概型中等可能样本点的概率', `
      对于古典概型，若样本空间的样本点为$\\omega_1, \\omega_2, \\cdots, \\omega_n$，则$P(\\omega_1)=P(\\omega_2)=\\cdots=P(\\omega_n)=\\frac{1}{n}$.
    `)
    .example('例1.2.3（简单抽球）', `
      从标号为$1,2,\\cdots,10$的10个同样大小的球中任取一个，求下列事件的概率：
      $A=\\{\\text{抽中2号}\\}$，
      $B=\\{\\text{抽中奇数号}\\}$，
      $C=\\{\\text{抽中的号数不小于7}\\}$.
      解：样本空间$\\Omega=\\{1,2,3,\\cdots,10\\}$，基本事件总数为$10$.事件$A,B,C$包含的基本事件数分别为$1$、$5$、$4$个，所以
      $$P(A)=\\frac{1}{10}, \\quad P(B)=\\frac{5}{10}, \\quad P(C)=\\frac{4}{10}.$$
    `)
    .example('例1.2.4（取鞋子配对问题）', `
      从6双不同的鞋子中任取4只，求：
      <ol>
        <li>其中恰有一双配对的概率；</li>
        <li>至少有两只鞋子配成一双的概率.</li>
      </ol>
      解：
      (1) 设$A$表示事件“恰有一双配对”.该事件可以按如下方式完成：先从6双中取出一双，两只全取，再从剩下的5双中任取两双，每双中各取一只.因此事件$A$所含的样本点数为$C_6^1 C_2^2 C_5^2 C_2^1 C_2^1$.所以
      $$P(A)=\\frac{C_6^1 C_2^2 C_5^2 C_2^1 C_2^1}{C_{12}^4}=\\frac{16}{33}.$$
      (2) 利用对立事件求解.设$B$表示事件“至少有两只鞋子配成一双”，则$\\overline{B}$表示“4只鞋子中没有两只成一双”，即4只来自4双不同的鞋子，每双各取一只.则
      $$P(\\overline{B}) = \\frac{C_6^4 C_2^1 C_2^1 C_2^1 C_2^1}{C_{12}^4}.$$
      所以，
      $$P(B)=1-P(\\overline{B})=1-\\frac{C_6^4 C_2^1 C_2^1 C_2^1 C_2^1}{C_{12}^4}=\\frac{17}{33}.$$
      注：不能把事件$B$所含的样本点数取为$C_6^1 C_2^2 C_{10}^2$，否则会造成重复计数.
    `)
  .section('古典概型的应用（分球入盒问题）')
    .example('例1.2.5（分球入盒问题）', `
      设有$n$个球，每个球都等可能地落入$N$个盒子中的一个，其中$n \\leq N$.求下列事件的概率：
      <ul>
        <li>$A$: 某指定的$n$个盒子中各落入一球；</li>
        <li>$B$: 恰有某$n$个盒子，每盒子中各落入一球；</li>
        <li>$C$: 某个指定的盒子中落入$m$个球；</li>
        <li>$D$: 恰好$n-1$个盒子里有球.</li>
      </ul>
      解：由于每个球都等可能地落入$N$个盒子中的任意一个，所以$n$个球共有$N^n$种落法，这是一个古典概型，基本事件总数为$N^n$.
      <ul>
        <li>事件$A$：$n$个球在指定的$n$个盒子中各放一个，有$n!$种放法，故$P(A)=\\frac{n!}{N^n}$.</li>
        <li>事件$B$：先从$N$个盒子中任选$n$个，有$C_N^n$种选法；选定$n$个盒子后，每个盒子各落入一球的方法为$n!$种，故$P(B)=\\frac{C_N^n \\cdot n!}{N^n}$.</li>
        <li>事件$C$：$m$个球可以在$n$个球中任选，有$C_n^m$种选法；其余$n-m$个球落入另外$N-1$个盒子，有$(N-1)^{n-m}$种落法.故$P(C)=\\frac{C_n^m (N-1)^{n-m}}{N^n} = C_n^m (\\frac{1}{N})^{m} (1-\\frac{1}{N})^{n-m}$.</li>
        <li>事件$D$：“$n-1$个盒子里有球”意味着一个盒子有$2$个球，另外$n-2$个盒子各有一个球.先任取落入$2$个球的盒子，有$N$种取法；再任取$n-2$个盒子各落入一个球，有$C_{N-1}^{n-2}$种取法；然后将球落进去，落法有$\\frac{n!}{2!}$种.故$P(D)=\\frac{N C_{N-1}^{n-2} \\frac{n!}{2!}}{N^n}=\\frac{n! C_{N-1}^{n-2}}{2 N^{n-1}}$.</li>
      </ul>
    `)
  .section('几何概型')
    .definition('几何概型', `
      如果一个随机试验的样本空间$\\Omega$是一个大小可以度量的几何区域，向$\\Omega$区域内任意投掷一个点，这个点落在$\\Omega$中任何一点的可能性是相同的，即落在某一区域$A$的概率与区域$A$的测度（长度、面积、体积等）成正比，而与其位置、形状无关，则称此试验为几何概型.<br>
      在几何概型中，事件$A$的概率定义为
      $$P(A)=\\frac{\\text{构成事件A的区域测度}}{\\text{样本空间}\\Omega\\text{的区域测度}}.$$
    `)    