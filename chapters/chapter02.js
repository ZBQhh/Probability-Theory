/* ==
   FILE: chapters/chapter02.js
   描述: 第2章 随机变量及其分布
   == */
chapter('随机变量及其分布')
  .section('随机变量及分布')
    .definition('随机变量', `
      在随机试验$E$中,$\\Omega$是相应的样本空间,如果对$\\Omega$中的每一个样本点$\\omega$,有唯一一个实数$X(\\omega)$与它对应,那么就把这个定义域为$\\Omega$的单值实值函数$X=X(\\omega)$称为(一维)随机变量.
    `)
    .definition('分布函数', `
      设$X$是一个随机变量,对于任意实数$x$,称函数
      $$F(x) = P(X \\leqslant x), \\quad -\\infty < x < +\\infty$$
      为随机变量$X$的分布函数.
    `)
    .property('分布函数的性质', `
      <ol>
        <li>对于任意实数$x$,有$$
\\begin{align*}
        0 \\leqslant F(x) \\leqslant 1\\\\   \\lim\\limits_{x \\to -\\infty} F(x) = 0\\\\
    \\lim\\limits_{x \\to +\\infty} F(x) = 1\\end{align*}$$</li>
        <li>$F(x)$单调不减,即当$x_1 < x_2$时,有$$F(x_1) \\leqslant F(x_2)$$</li>
        <li>$F(x)$是$x$的右连续函数,即$\\lim\\limits_{x \\to x_0^+} F(x) = F(x_0)$</li>
        <li>$P(X < x) = F(x^-)$</li>
      </ol>
    `)
    .property('分布函数计算概率', `
      对任意的两个常数$-\\infty < a < b < +\\infty$,有
      $$P(a < X \\leqslant b) = F(b) - F(a).$$
    `)
  .section('一维离散型随机变量')
    .definition('离散型随机变量', `
      设$E$是随机试验,$\\Omega$是相应的样本空间,$X$是$\\Omega$上的随机变量,若$X$的值域(记为$\\Omega_X$)为有限集或可列集,此时称$X$为(一维)离散型随机变量.
    `)
    .definition('分布律（分布列/概率函数）', `
      若一维离散型随机变量$X$的取值为$x_1, x_2, \\cdots, x_n, \\cdots$,称相应的概率
      $$P(X = x_i) = p_i, \\quad i=1,2,\\cdots$$
      为离散型随机变量$X$的分布律.且满足：
      <ol>
        <li>（非负性）$p_i \\geqslant 0, \\quad i=1,2,\\cdots$;</li>
        <li>（规范性）$\\sum\\limits_{i=1}^{+\\infty} p_i = 1$.</li>
      </ol>
      分布律常用下表表示：
      
    `)
    .text(`$$\\begin{array}{c|cccccc}
      \\hline
X & x_1 & x_2 & \\cdots & x_n & \\cdots \\\\ \\hline
\\text{概率} & p_1 & p_2 & \\cdots & p_n & \\cdots \\\\ \\hline
\\end{array}$$`)
  .section('一维连续型随机变量')
    .definition('连续型随机变量', `
      设$E$是随机试验,$\\Omega$是相应的样本空间,$X$是$\\Omega$上的随机变量,$F(x)$是$X$的分布函数,若存在非负函数$f(x)$使得
      $$F(x) = \\int_{-\\infty}^{x} f(t) dt,$$
      则称$X$为(一维)连续型随机变量.其取值充满了数轴上的一个区间(或某几个区间的并).
    `)
    .property('（概率）密度函数', `
      $f(x)$称为$X$的(概率)密度函数,满足：
      <ol>
        <li>（非负性）$f(x) \\geqslant 0, \\quad -\\infty < x < +\\infty$;</li>
        <li>（规范性）$\\int_{-\\infty}^{+\\infty} f(x) dx = 1$.</li>
      </ol>
    `)
    .property('连续型随机变量的性质', `
      <ol>
        <li>分布函数$F(x)$是连续函数,在$f(x)$的连续点处,$F^{\\prime}(x) = f(x)$;</li>
        <li>对任意一个常数$c$,$P(X=c)=0$.所以,在事件$\\{a \\leqslant X \\leqslant b\\}$中剔除$X=a$或$X=b$,都不影响概率的大小,即
        $$P(a \\leqslant X \\leqslant b) = P(a < X \\leqslant b) = P(a \\leqslant X < b) = P(a < X < b).$$</li>
        <li>对任意的两个常数$a, b$,$P(a < X \\leqslant b) = \\int_{a}^{b} f(x) dx$.</li>
      </ol>
    `)
  .section('常用的离散型随机变量')
    .definition('伯努利(Bernoulli)试验', `
      设对一随机试验$E$,只关心某一事件$A$发生还是不发生,即该随机试验只有两种可能的试验结果：$A$和$\\overline{A}$,则称这样的随机试验叫伯努利试验.
    `)
    .definition('$n$重伯努利试验', `
      设事件$A$在一次试验中发生的概率$P(A)=p(0 < p < 1)$,则$P(\\overline{A})=1-p$.将该随机试验独立重复地进行$n$次,则称这$n$次独立重复试验叫$n$重伯努利试验.
    `)
    .definition('二项分布 $B(n, p)$', `
      记随机变量$X$表示在$n$重伯努利试验中$A$事件发生的次数,则$X$的取值为$0, 1, 2, \\cdots, n$,相应的分布律为
      $$
P(X = k) = \\binom{n}{k} p^{k}(1-p)^{n-k},
\\quad 0 < p < 1,\\quad k = 0,1,\\ldots,n.
$$

      称随机变量$X$服从参数为$n, p$的二项分布,记为$X \\sim B(n, p)$.
    `)
    .definition('$0-1$分布 $B(1, p)$', `
      二项分布$B(n, p)$中,当$n=1$时,$X \\sim B(1, p)$,即有
      $$
P(X = k) = p^{k}(1-p)^{1-k},
\\quad 0 < p < 1,\\quad k = 0,1.
$$
    `)
    .definition('泊松分布 $P(\\lambda)$', `
      设随机变量$X$的取值为$0, 1, 2, \\cdots, n, \\cdots$,相应的分布律为
      $$P(X=k)=\\frac{\\lambda^{k}}{k!}e^{-\\lambda}, \\quad \\lambda>0, \\quad k=0, 1, 2, \\cdots, n, \\cdots.$$
      称随机变量$X$服从参数为$\\lambda$的泊松分布,记为$X \\sim P(\\lambda)$.
    `)
    .theorem('泊松定理', `
      在$n$重伯努利试验中,记$A$事件在一次试验中发生的概率为$p_n$,如果当$n \\to +\\infty$时,有$np_n \\to \\lambda(\\lambda>0)$,则
      $$\\lim\\limits_{n \\to +\\infty} \\binom{n}{k} p_{n}^{k}(1-p_{n})^{n-k} = \\frac{\\lambda^{k}}{k!}e^{-\\lambda}.$$
      `)
    .text(`泊松定理告诉我们,在二项分布计算中,当$n$较大$p$较小而$np=\\lambda$适中时,常用泊松分布近似二项分布.
    `)
    .definition('超几何分布 $H(N, M, n)$', `
      设有$N$件产品,其中有$M(M \\leqslant N)$件是不合格品.若从中不放回地抽取$n(n \\leqslant N)$件,设其中含有的不合格品的件数为$X$,则$X$的分布律为
      $$P(X=k) = \\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}, \\quad k = \\max(0, n+M-N), \\cdots, \\min(n, M).$$
      称$X$服从参数为$N, M$和$n$的超几何分布,记为$X \\sim H(N, M, n)$,其中$N, M$和$n$均为正整数.
    `)
    .definition('几何分布 $G(p)$',`
      在伯努利试验中,记每次试验中$A$事件发生的概率$P(A)=p(0 < p < 1)$.设随机变量$X$表示$A$事件首次出现时已经试验的次数,则$X$的取值为$1, 2, \\cdots, n, \\cdots$,相应的分布律为
      $$P(X=k)=p(1-p)^{k-1},\\quad 0 < p < 1,\\quad k=1, 2, \\cdots, n, \\cdots.$$
      称随机变量$X$服从参数为$p$的几何分布,记为$X \\sim Ge(p)$.
    `)
    .definition('负二项分布 $NB(r, p)$', `
      在伯努利试验中,记每次试验中$A$事件发生的概率为$P(A)=p(0 < p < 1)$.设随机变量$X$表示$A$事件第$r$次出现时已经试验的次数,则$X$的取值为$r, r+1, \\cdots, r+n, \\cdots$,相应的分布律为
      $$P(X=k)=\\binom{k-1}{r-1} p^{r}(1-p)^{k-r},\\quad 0 < p < 1,\\quad k=r, r+1, \\cdots, r+n, \\cdots.$$
      称随机变量$X$服从参数为$r, p$的负二项分布,记为$X \\sim NB(r, p)$.当$r=1$时,即为几何分布.
    `)
  .section('常用的连续型随机变量')
    .definition('均匀分布 $U(a, b)$', `
      随机变量$X$的取值范围为区间$(a, b)(a < b)$,密度函数和分布函数为：
      $$f(x) = \\begin{cases} \\frac{1}{b-a}, & a < x < b, \\\\ 0, & \\text{其他}. \\end{cases}$$
      $$F(x) = \\begin{cases} 0, & x < a, \\\\ \\frac{x-a}{b-a}, & a \\leqslant x < b, \\\\ 1, & x \\geqslant b. \\end{cases}$$
      记为$X \\sim U(a, b)$.
    `)
    .definition('指数分布 $E(\\lambda)$', `
      随机变量$X$的取值范围为区间$(0, +\\infty)$,密度函数和分布函数为：
      $$f(x) = \\begin{cases} \\lambda e^{-\\lambda x}, & x > 0, \\\\ 0, & \\text{其他}. \\end{cases}$$
      $$F(x) = \\begin{cases} 0, & x < 0, \\\\ 1 - e^{-\\lambda x}, & x \\geqslant 0. \\end{cases}$$
      记为$X \\sim E(\\lambda)$.
    `)
    .definition('正态分布 $N(μ, σ²)$', `
      设随机变量$X$的取值范围为$\\mathbb{R}$,密度函数和分布函数为：
      $$f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}}, \\quad -\\infty < x < +\\infty.$$
      $$F(x) = \\int_{-\\infty}^{x} \\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{(t-\\mu)^{2}}{2\\sigma^{2}}} dt, \\quad -\\infty < x < +\\infty.$$
      记为$X \\sim N(\\mu, \\sigma^{2})$.
    `)
    .definition('标准正态分布 $N(0, 1)$', `
      随机变量$X$的取值范围为$\\mathbb{R}$,密度函数和分布函数为：
      $$f(x) = \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{x^{2}}{2}} \\triangleq \\varphi(x), \\quad -\\infty < x < +\\infty.$$
      $$F(x) = \\int_{-\\infty}^{x} \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{t^{2}}{2}} dt \\triangleq \\Phi(x), \\quad -\\infty < x < +\\infty.$$
      记为$X \\sim N(0, 1)$.
    `)
    .theorem('正态分布的概率计算', `
      <ul>
        <li>若$X \\sim N(0,1)$,则$P(a < X \\leqslant b) = \\Phi(b) - \\Phi(a)$.</li>
        <li>若$X \\sim N(\\mu, \\sigma^{2})$,则$P(a < X \\leqslant b) = \\Phi(\\frac{b-\\mu}{\\sigma}) - \\Phi(\\frac{a-\\mu}{\\sigma})$.</li>
      </ul>
      其中$\\Phi(x)$的值,当$x \\geqslant 0$时可从正态分布表直接查得;当$x < 0$时,可用公式$\\Phi(x) = 1 - \\Phi(-x)$求得.
    `)
    .definition('标准正态分布的α分位数', `
      当$X \\sim N(0,1)$时,满足概率表达式$P(X \\leqslant u_{\\alpha}) = \\alpha$的$u_{\\alpha}$称为标准正态分布的$\\alpha$分位数.
    `)
  .section('随机变量函数的分布')
    .definition('一维离散型随机变量函数的分布', `
      设$X$为一维离散型随机变量,分布律为$P(X=x_{i})=p_{i}(i=1,2,\\cdots)$,$Y=g(x)$为任一函数,则随机变量$Y=g(X)$的取值为$g(x_{i})$,$i=1,2,\\cdots$,相应的分布律为
    $$
\\begin{array}{c|cccc}
\\hline
Y = g(X) & g(x_1) & \\cdots & g(x_i) & \\cdots \\\\
\\hline
\\text{概率} & p_1 & \\cdots & p_i & \\cdots\\\\ \\hline
\\end{array}
$$
  
      注意：与$g(x_{i})$取相同值对应的那些概率应合并相加.
    `)
    .definition('一维连续型随机变量函数分布的求解步骤', `
      设连续型随机变量$X$的密度函数为$f_X(x)$,当$Y=g(X)$是连续型随机变量时,其分布函数与概率密度函数求解的一般步骤如下：
      <ol>
        <li>由随机变量$X$的取值范围$\\Omega_X$确定随机变量$Y$的取值范围$\\Omega_Y$;</li>
        <li>对任意一个$y \\in \\Omega_Y$,求出
        $$F_Y(y)=P(Y \\leqslant y)=P(g(X) \\leqslant y)=P\\{X \\in G_{y}\\}=\\int_{G_{y}} f_X(x)dx,$$
        其中$\\{X \\in G_{y}\\}$是与$\\{g(X) \\leqslant y\\}$相同的随机事件,而$G_{y}=\\{x:g(x) \\leqslant y\\}$是实数轴上的某个集合（通常是一个区间或若干个区间的并集）;</li>
        <li>按分布函数的定义写出$F_{Y} (y),-\\infty < y < +\\infty$;</li>
        <li>通过对分布函数求导,得到$Y$的密度函数$$f_{Y}(y)=F_{Y}^{\\prime}(y),-\\infty < y < + \\infty$$</li>
      </ol>
    `)
    .theorem('连续型随机变量单调函数分布的结论', `
      设连续型随机变量$X$的密度函数为$f_X(x)$,$Y=g(X)$是连续型随机变量,若$y=g(x)$为严格单调函数,$x=g^{-1}(y)$为相应的反函数,且为可导函数,则$Y=g(X)$的密度函数为
      $$f_Y(y)=f_X(g^{-1}(y)) \\times |[g^{-1}(y)]^\\prime|.$$
    `)
    .theorem('正态分布的线性变换性质', `
      设$X \\sim N(\\mu, \\sigma^{2})$,则当$k \\neq 0$时,$$Y = kX + b \\sim N(k\\mu + b, k^{2}\\sigma^{2})$$特别地,$$\\frac{X-\\mu}{\\sigma} \\sim N(0,1)$$
    `)