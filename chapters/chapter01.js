/* ==========================================================================
   FILE: chapters/chapter01.js
   描述: 第1章 随机事件和概率
   ========================================================================== */
chapter('随机事件和概率')
  .section('随机试验')
    .definition('随机试验', `
      满足下列三个条件的试验称为随机试验,简称实验,常用字母 $E_{1},E_{2},\\cdots,E_{n}$ 表示:
      <ul>
        <li>可重复性:试验在相同条件下可重复进行.</li>
        <li>可观察性:每次试验的可能结果不止一个,但能事先明确试验的所有可能结果.</li>
        <li>不确定性:每次试验前不能确定哪一个结果发生.</li>
      </ul>
    `)
    .definition('样本空间', `
      随机试验的每一种可能结果构成的集合称为样本空间,记为$\\Omega$.试验的每个结果称为样本点或基本事件,记为$\\omega$.
    `)
    .definition('随机事件', `
      随机事件是满足一定条件的样本点的集合,即样本空间$\\Omega$的某些子集合.必然事件是$\\Omega$本身,不可能事件是空集$\\varnothing$.
    `)
    .definition('事件间的关系与运算', `
      <ol>
        <li>若$A\\subset B$,则称$B$包含事件$A$或$A$含于$B$.若事件$A$发生,则事件$B$必然发生.若$A \\subset B$,且 $B \\subset A$,即$A =B$,则称事件$A$与事件$B$相等.</li>
        <li>事件$A\\cup B=\\lbrace\\omega\\in\\Omega:\\omega\\in A\\lor\\omega\\in B\\rbrace$称为事件$A$与$B$的并事件.$A \\cup B$发生当且仅当$A$发生或$B$发生.</li>
        <li>事件$A\\cap B=\\lbrace\\omega\\in\\Omega:\\omega\\in A\\land\\omega\\in B\\rbrace$称为事件$A$与$B$的交事件.$A \\cap B$发生当且仅当$A$和$B$同时发生.</li>
        <li>事件$A-B=\\lbrace\\omega\\in\\Omega:\\omega\\in A\\land\\omega\\notin B\\rbrace$称为事件$A$与$B$的差事件.$A-B$发生当且仅当$A$发生而$B$不发生.</li>
        <li>若$A \\cap B=\\varnothing$,则称事件$A$与$B$互不相容或互斥,即两事件不能同时发生.</li>
        <li>若$A \\cup B=\\Omega$,且$A \\cap B=\\varnothing$,则称两事件互为逆事件.并记为$A=\\overline{B}$或$B=\\overline{A}$.</li>
      </ol>
    `)
    .theorem('事件运算定律', `
      <ol>
        <li>交换律:$$ A\\cup B=B\\cup A $$ $$ A\\cap B=B\\cap A $$</li>
        <li>结合律:$$ A\\cup(B\\cup C)=(A\\cup B)\\cup C $$ $$ A\\cap(B\\cap C)=(A\\cap B)\\cap C $$</li>
        <li>分配律:$$ A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C) $$ $$ A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C) $$</li>
        <li>对偶律:$$ \\overline{A\\cup B}=\\overline{A}\\cap\\overline{B} $$ $$ \\overline{A\\cap B}=\\overline{A}\\cup\\overline{B} $$</li>
      </ol>
    `)

  .section('概率的统计定义')
    .definition('频率', `
      若事件A在n次试验中发生了$n_A$次,则称$n_A$为事件A在这n次试验中发生的频数,而比值$f_n(A)=\\frac{n_A}{n}$称为事件A在这n次试验中发生的频率.
    `)
    .theorem('频率的性质', `
      性质1.2.1 对于任何一个事件A,有$0\\leq f_n(A)\\leq 1$.<br>
      性质1.2.2 $f_n(\\Omega)=1$,$f_n(\\varnothing)=0$.<br>
      性质1.2.3 $f_n(A\\cup B)=f_n(A)+f_n(B)-f_n(AB)$.<br>
      性质1.2.4 $f_n(\\overline{A})=1-f_n(A)$.<br>
      性质1.2.5 若$A\\subset B$,则有$f_n(A)\\leq f_n(B)$,且$f_n(B-A)=f_n(B)-f_n(A)$.
    `)
    .definition('概率的统计定义', `
      事件A出现的频率$f_n(A)$随着重复试验的次数n的增大而稳定于某个常数p,则称这个常数p为事件A发生的概率,记为P(A),即P(A)=p.
    `)

  .section('概率的公理化定义')
    .definition('概率的公理化定义', `
      设随机试验E的样本空间为$\\Omega$,对E的每一个事件A赋予一个实值函数P(A),称其为事件A的概率,如果集合函数P(A)满足下列三条公理:<br>
      公理1.2.1(非负性)对任意事件A,有$P(A)\\geq 0$;<br>
      公理1.2.2(规范性)对必然事件$\\Omega$,有$P(\\Omega)=1$;<br>
      公理1.2.3(可数可加性)对于可数个两两互斥的事件$A_1,A_2,\\cdots,A_n,\\cdots$,有$P(\\bigcup\\limits_{i=1}^{\\infty}A_i)=\\sum\\limits_{i=1}^{\\infty}P(A_i)$.
    `)
    .theorem('概率的基本性质', `
      性质1.2.6 对于任一个事件A,有$0\\leq P(A)\\leq 1$.<br>
      性质1.2.7 $P(\\Omega)=1$,$P(\\varnothing)=0$.<br>
      性质1.2.8 $P(A\\cup B)=P(A)+P(B)-P(AB)$(概率的加法公式).<br>
      性质1.2.9 $P(\\overline{A})=1-P(A)$.<br>
      性质1.2.10 若$A\\subset B$,则有$P(A)\\leq P(B)$,且$P(B-A)=P(B)-P(A)$.
    `)
    .corollary('推论1.2.1', `
      设A,B,C为三个事件,则<br>
      $P(A\\cup B\\cup C)=P(A)+P(B)+P(C)-P(AB)-P(BC)-P(AC)+P(ABC)$.
    `)
    .example('例1.2.1 概率计算', `
      已知$P(A)=0.6$,$P(B)=0.7$,$P(A\\cup B)=0.8$,求$P(B-A)$与$P(A-B)$.<br>
      解:$P(AB)=P(A)+P(B)-P(A\\cup B)=0.6+0.7-0.8=0.5$,<br>
      $P(B-A)=P(B)-P(AB)=0.7-0.5=0.2$,<br>
      $P(A-B)=P(A)-P(AB)=0.6-0.5=0.1$.
    `)
    .example('例1.2.2 概率计算', `
      已知$P(AB)=0.5$,$P(C)=0.2$,$P(AB\\overline{C})=0.4$,求$P\\overline{(AB\\cup\\overline{C})}$.<br>
      解:$P\\overline{(AB\\cup\\overline{C})}=1-P(AB\\cup\\overline{C})=1-[P(AB)+P(\\overline{C})-P(AB\\overline{C})]=1-(0.5+0.8-0.4)=0.1$.
    `)

  .section('古典概型')
    .definition('古典概型', `
      若一个随机试验满足:<br>
      (1)试验的样本空间中只有有限个样本点(有限性);<br>
      (2)试验中每个样本点的出现是等可能的(等可能性),<br>
      则称该随机试验为古典随机试验,该模型称为古典概型.
    `)
    .formula('a^2+b^2=c^2', { label: 'pytha', skipNumber: false })
    .text('根据古典概型的定义,样本空间$\\Omega$中每个样本点$\\omega_i(i=1,2,\\cdots,n)$都是基本事件,且每个基本事件的概率都是$\\frac{1}{n}$.')
    .formula('P(A)=\\frac{k}{n}', { label: 'classical-prob' })
    .text('其中k为事件A包含的基本事件数,n为样本空间中基本事件的总数.')
    .example('例1.2.3 抽球概率', `
      从标号为1,2,$\\cdots$,10的10个同样大小的球中任取一个,求:<br>
      A={抽中2号},$P(A)=\\frac{1}{10}$;<br>
      B={抽中奇数号},$P(B)=\\frac{5}{10}$;<br>
      C={抽中的号数不小于7},$P(C)=\\frac{4}{10}$.
    `)
    .example('例1.2.4 鞋子配对概率', `
      从6双不同的鞋子中任取4只:<br>
      (1)设A表示事件"恰有一双配对",则<br>
      $$P(A)=\\frac{C_6^1 C_2^2 C_5^2 C_2^1 C_2^1}{C_{12}^4}=\\frac{16}{33}$$<br>
      (2)设B表示事件"至少有两只鞋子配成一双",则<br>
      $$P(B)=1-P(\\overline{B})=1-\\frac{C_6^4 C_2^1 C_2^1 C_2^1 C_2^1}{C_{12}^4}=\\frac{17}{33}$$
    `)
    .example('例1.2.5 球落入盒子概率', `
      设有n个球,每个球都等可能地落入N个盒子中的一个,其中$n\\leq N$,求下列事件的概率:<br>
      A:某指定的n个盒子中各落入一球,$P(A)=\\frac{n!}{N^n}$;<br>
      B:恰有某n个盒子,每盒子中各落入一球,$P(B)=\\frac{C_N^n\\cdot n!}{N^n}$;<br>
      C:某个指定的盒子中落入m个球,$$P(C)=\\frac{C_n^m\\cdot(N-1)^{n-m}}{N^n}=C_n^m(\\frac{1}{N})^m(1-\\frac{1}{N})^{n-m}$$;<br>
      D:恰好n-1个盒子里有球,$P(D)=\\frac{N C_{N-1}^{n-2}\\cdot\\frac{n!}{2!}}{N^n}=\\frac{n! C_{N-1}^{n-2}}{2 N^{n-1}}$.
    `)

  .section('几何概型')
    .definition('几何概型', `
      如果一个随机试验的样本空间$\\Omega$是一个大小可以度量的几何区域,向区域内任意投掷一点,落在区域内任何点都是等可能的,且落在区域内任何子区域A的可能性大小与A的度量成正比,而与A的位置和形状无关,则这类随机试验称为几何概型.
    `)
    .formula('P(A)=\\frac{L(A)}{L(\\Omega)}', { label: 'geometric-prob' })
    .text('其中L表示长度、面积或体积等.');