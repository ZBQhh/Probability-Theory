/* ==
   FILE: chapters/chapter03.js
   描述: 第3章 连续型随机变量及其分布
   == */
chapter('连续型随机变量及其分布')
    .text(`
      第2章讨论了离散型随机变量及其分布,知道离散型随机变量是随机试验结果和实数之间的一种对应关系.但在许多实际问题中,对于某些随机试验的结果是不能用离散点来表示的.本章将讨论连续型随机变量的概率分布及其性质.
    `)
    .section('分布函数与概率密度函数')
    .text(`离散型随机变量可能的取值是有限多个或可数无穷多个，但是，还有一些随机变量，它们的取值是不可数的，只能在一个区间上取值．如晶体的寿命、测量的误差等，称之为非离散型随机变量，因此，需要研究随机变量取值落在一个区间内的概率．`)
    .definition('随机变量的分布函数', `
      设$X$是一个随机变量,$x$是任意实数,将函数
      $$F(x)=P\\{X\\leqslant x\\}$$
      称为随机变量$X$的分布函数.
    `)
    .text(`对于任意实数$x_1,x_2 (x_1 < x_2)$,有
      $$P\\{x_1 < X\\leqslant x_2\\}=P\\{X\\leqslant x_2\\}-P\\{X\\leqslant x_1\\}=F(x_2)-F(x_1).$$
      `)
      .text(`也就是说,如果知道随机变量的分布函数$F(x)$,就可以通过分布函数,计算随机变量落在一个区间的概率.从这个意义上说,分布函数完整地描述了随机变量$X$的统计规律性.`)
    .property('分布函数的性质', `
      下面不加证明地给出分布函数的一些性质：
      <ol>
        <li>（单调性）对于任意实数$x_1,x_2(x_1 < x_2)$,有$F(x_1)\\leq F(x_2)$.</li>
        <li>（有界性）$0\\leq F(x)\\leq 1$,$\\lim_{x\\rightarrow-\\infty} F(x)=0$,$\\lim_{x\\rightarrow+\\infty} F(x)=1$.</li>
        <li>（右连续性）$\\lim_{x\\rightarrow x_0^{+}} F(x)=F(x_0)$.</li>
      </ol>
    `)
    .text(`
      接着,通过一个例子引人连续型随机变量的概念.
    `)
    .example('连续型随机变量分布函数举例 (例3.1.2)', `
      设随机变量$X$在区间$[0,1]$上取值,这是一个连续随机变量.当$0\\leq x\\leq 1$时,概率$P\\{0\\leq X\\leq x\\}$与$x^{2}$成正比.试求$X$的分布函数$F(x)$.<br>
      解：当$x<0$时,$F(x)=P\\{X\\leq x\\}=P(\\varnothing)=0$.
      当$0\\leq x\\leq 1$时,由$P\\{X<0\\}=0$得到$F(x)=P\\{X\\leq x\\}=P\\{X<0\\}+P\\{0\\leq X\\leq x\\} = kx^{2}$.
      当$x\\geq 1$时,$F(x)=P\\{X\\leq x\\}=P(\\Omega)=1$.
      得到$k=1$.因此,$X$的分布函数（图3.2）为
      $$F(x)=\\left\\{\\begin{array}{lll}0,&x<0;\\\\x^{2},&0\\leq x<1,\\\\1,&x\\geq 1,\\end{array}\\right. F^{\\prime}(x)=f(x)=\\left\\{\\begin{array}{lll}2 x,&0\\leq x<1,\\\\0, &\\text{其他}.\\end{array}\\right.$$
    `)
    .definition('连续型随机变量与概率密度函数', `
      设$F(x)$是随机变量$X$的分布函数,若存在非负可积函数$f(x)$,对任意实数$x$,有
      $$F(x)=\\int_{-\\infty}^{x} f(t)dt$$
      则称$X$为连续型随机变量,称$f(x)$为$X$的概率密度函数或密度函数,也称概率密度.
    `)
    .text(`
      由概率密度的定义知,$f(x)$具有下列性质：
    `)
    .property('概率密度函数$f(x)$的性质', `
      <ol>
        <li>（非负性）$f(x)\\geqslant 0$.</li>
        <li>（规范性）$\\int_{-\\infty}^{+\\infty} f(x)dx = 1$.</li>
      </ol>
      反之,对于定义在$(-\\infty,+\\infty)$上的可积函数$f(x)$,若它满足上面两条性质,则它可作为一个连续型随机变量的概率密度函数.
      <ol start="3">
        <li>对于任意实数$x_1$,$x_2(x_1<x_2)$,有
        $$P\\{x_1<X\\leqslant x_2\\}=F(x_2)-F(x_1)=\\int_{x_1}^{x_2} f(x)dx.$$</li>
        <li>若$f(x)$在点$x$处连续,则有$F^{\\prime}(x)=f(x)$.</li>
      性质1说明随机变量$X$的概率密度曲线$f(x)$位于$x$轴上方,性质2说明概率密度曲线$f(x)$与$x$轴所围成的图形的面积为1,性质3说明随机变量$X$落在区间$(x_1,x_2)$内的概率等于曲边梯形的面积(图3.3),性质4说明随机变量$X$的密度函数与分布函数之间的关系为$f(x)=F^{\\prime}(x)$和$F(x)=\\int_{-\\infty}^{x} f(t)dt$.
    <li>连续型随机变量取任一指定实数值的概率为零.即$P\\{X=x_0\\}=0$.因为
      $$P\\{X=x_0\\}\\leqslant P\\{x_0-h < X\\leqslant x_0\\}=\\int_{x_0-h}^{x_0} f(x)dx.$$
      所以
      $$0\\leqslant P\\{X=x_0\\}\\leqslant\\lim_{h\\rightarrow 0}\\int_{x_0-h}^{x_0} f(x)dx=0$$
      因此
      $$P\\{X=x_0\\}=0$$</li>
      </ol> 
    `)
    .text(`
      对于连续型随机变量,由性质(5),我们可以不加区分区间是开区间、闭区间或半开半闭区间,即
      $$\\begin{align*}
      P\\{x_1 < X\\leqslant x_2\\}&=P\\{x_1\\leqslant X\\leqslant x_2\\}=P\\{x_1 < X < x_2\\}\\\\[0.75em]
      &=P\\{x_1\\leqslant X < x_2\\}=\\int_{x_1}^{x_2} f(x)dx.\\end{align*}$$
    `)
  .section('常用的一维连续型随机变量')
    .text(`
      下面介绍三种重要的连续型随机变量.
    `)
    .subsection('均匀分布')
    .definition('均匀分布', `
      若连续型随机变量$X$的概率密度为
      $$f(x)=\\left\\{\\begin{array}{ll}
        \\frac{1}{b-a}, &a\\leqslant x\\leqslant b,\\\\
        0, &\\text{其他},
        \\end{array}\\right.$$
      则称$X$服从$[a,b]$上的均匀分布,记为$X\\sim U[a, b]$.<br>
      易知$f(x)\\geqslant 0$,且$$\\int_{-\\infty}^{+\\infty} f(x) dx=\\int_{a}^{b} \\frac{1}{b-a} \\mathrm{d} x=1$$
    `)
    .text(`
      由公式$F(x) = \\int_{-\\infty}^{x} f(t) dt$，得均匀分布的分布函数为
      $$F(x) = \\left\\{\\begin{array}{ll}
        0, & x < a, \\\\
        \\frac{x-a}{b-a}, & a \\leqslant x \\leqslant b, \\\\
        1, & x > b.
        \\end{array}\\right.$$
      图3.4和图3.5分别给出了均匀分布的概率密度函数和分布函数的图形.
    `)
    .text(`
      若随机变量$X$在$[a, b]$上服从均匀分布，则$X$落在$[a, b]$中的任意一个小区间$[c, d]$的概率为
      $$P(c \\leqslant X \\leqslant d) = \\int_{c}^{d} \\frac{1}{b-a} dx = \\frac{d-c}{b-a}.$$
      换句话说，$X$落在$[a, b]$中的任意小区间$[c, d]$的概率取决于区间的长度.长度相同，概率相等.
    `)
    .subsection('指数分布')
    .definition('指数分布 $E(\\lambda)$', `
      若连续型随机变量$X$的概率密度为
      $$f(x) = \\left\\{\\begin{array}{ll}
        \\lambda e^{-\\lambda x}, & x > 0, \\\\
        0, & x \\leqslant 0,
        \\end{array}\\right.$$
      其中$\\lambda > 0$为常数，则称$X$服从参数为$\\lambda$的指数分布，记为$X \\sim E(\\lambda)$.易知$f(x) \\geqslant 0$，且$$\\int_{-\\infty}^{+\\infty} f(x) dx = \\int_{0}^{+\\infty} \\lambda e^{-\\lambda x} dx = 1$$
    `)
    .text(`
      由分布函数的定义，容易得到随机变量$X$的分布函数为
      $$F(x) = \\left\\{\\begin{array}{ll} 1 - e^{-\\lambda x}, & x > 0, \\\\ 0, & x \\leqslant 0. \\end{array}\\right.$$
    `)
    .text(`在实际应用中，到某个特定事件发生所需等待的时间往往服从指数分布.例如，从现在开始到下一次地震发生、到爆发一场新的战争、到一个元件的损坏、到你接到一次拨错号码的电话等所需的时间，都服从指数分布.指数分布在排队论、保险和可靠性理论中有广泛的应用.`)
    .definition('无记忆性', `
      对一个非负的随机变量，如果对于一切$s, t \\geqslant 0$，有
      $$P\\{X > s + t \\mid X > t\\} = P\\{X > s\\},$$
      则称这个随机变量具有无记忆性.
    `)
    .text(`
      若假设$X$表示某仪器的寿命，那么上式说明：已知此仪器已使用$t$小时，它总共能工作$s+t$小时的概率等于从开始使用时算起，它至少能工作$s$小时的概率.换句话说，如果仪器在$t$时仍“活”着，则它的剩余寿命的分布与它原来寿命的分布相同，这就是说，仪器对于它已使用过的$t$小时没有记忆.
      可以验证，当随机变量$X$服从指数分布时，随机变量$X$是无记忆的.
    `)
    .subsection('正态分布')
    .definition('正态分布 $N(\\mu, \\sigma^2)$', `
      若连续型随机变量$X$的概率密度为
      $$f(x)=\\frac{1}{\\sqrt{2\\pi}\\cdot\\sigma}e^{-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}},\\quad-\\infty < x < +\\infty$$
      其中$\\mu,\\sigma^{2}(\\sigma>0)$为常数，则称$X$服从参数为$\\mu$和$\\sigma^{2}$的正态分布或高斯分布，记为$X\\sim N(\\mu,\\sigma^{2})$，其图像如图3.6所示.
    `)
    .proof('正态分布密度函数的规范性', `
      显然$f(x)\\geqslant 0$，下面来证明$\\int_{-\\infty}^{+\\infty} f(x)dx=1$.
      令$\\frac{x-\\mu}{\\sigma}=t$，得到
      $$\\int_{-\\infty}^{+\\infty} f(x)dx=\\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}\\cdot\\sigma}e^{-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}}dx=\\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{t^{2}}{2}}dt.$$
      又
      $$\\begin{aligned}
        \\left(\\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dx\\right)^{2} &= \\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dx \\cdot \\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dy \\\\
        &= \\frac{1}{2\\pi} \\int_{-\\infty}^{+\\infty} \\int_{-\\infty}^{+\\infty} e^{-\\frac{x^{2}+y^{2}}{2}} dx dy
      \\end{aligned}$$
      利用极坐标变换，令$x = r\\cos\\theta, y = r\\sin\\theta$，得到
      $$\\frac{1}{2\\pi} \\int_{-\\infty}^{+\\infty} \\int_{-\\infty}^{+\\infty} e^{-\\frac{x^{2}+y^{2}}{2}} dx dy = \\frac{1}{2\\pi} \\int_{0}^{2\\pi} d\\theta \\int_{0}^{+\\infty} e^{-\\frac{r^{2}}{2}} r dr = 1.$$
      即$\\left(\\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dx\\right)^{2}=1$，且$\\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dx>0$.于是
      $$\\int_{-\\infty}^{+\\infty}f(x)dx=\\int_{-\\infty}^{+\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dx=1.$$
    `)
    .property('正态分布密度函数图形的特点', `
      正态分布概率密度函数的图形有如下特点：
      <ol>
        <li>$f(x)$是关于$x=\\mu$对称的钟形曲线，故对于常数$a>0$，有
        $$P\\{\\mu-a < X <\\mu\\}=P\\{\\mu < X < \\mu+a\\}$$</li>
        <li>$f(x)$在点$x=\\mu$处取得最大值$f(\\mu)=\\frac{1}{\\sqrt{2\\pi}\\cdot\\sigma}$</li>
        <li>若固定$\\mu$，改变$\\sigma$的值，则当$\\sigma$越小时，图形变得越尖，当$\\sigma$越大时，图形变得越扁，称$\\sigma$为形状参数.</li>
      </ol>
    `)
    .definition('正态分布的分布函数', `
      随机变量$X\\sim N(\\mu,\\sigma^{2})$，则$X$的分布函数为
      $$F(x)=\\int_{-\\infty}^{x}\\frac{1}{\\sqrt{2\\pi}\\cdot\\sigma}e^{-\\frac{(t-\\mu)^{2}}{2\\sigma^{2}}}dt.$$
      其图像如图3.7所示.
    `)
    .text(`
      特别地，当$\\mu=0, \\sigma^{2}=1$时，称$X$服从标准正态分布，记为$X\\sim N(0,1)$，其概率密度为
      $$\\varphi(x)=\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}},\\quad-\\infty < x < +\\infty,$$
      相应的分布函数记为
      $$\\Phi(x)=\\int_{-\\infty}^{x}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^{2}}{2}}dt,$$
      人们已编制了$\\Phi(x)$的函数表，可供查用.
    `)
    .property('标准正态分布的性质', `
      由概率密度函数的表达式，可知其为偶函数，关于$y$轴对称，从而有（图像见图3.8）
      $$\\Phi(-x)=1-\\Phi(x).$$
      通过上式，可以计算负数的函数值.
    `)
    .theorem('正态分布的标准化', `
      若$X\\sim N(\\mu,\\sigma^{2})$，则$Y=\\frac{X-\\mu}{\\sigma}\\sim N(0,1)$.
    `)
    .proof('', `
      随机变量$Y=\\frac{X-\\mu}{\\sigma}$的分布函数为
      $$\\begin{aligned}
        F_Y(x) &= P\\{Y\\leqslant x\\} = P\\{X\\leqslant\\sigma x+\\mu\\} \\\\
        &= \\int_{-\\infty}^{\\sigma x+\\mu}\\frac{1}{\\sqrt{2\\pi}\\sigma}e^{-\\frac{(t-\\mu)^{2}}{2\\sigma^{2}}}dt \\\\
        &\\xrightarrow{s=\\frac{t-\\mu}{\\sigma}} \\int_{-\\infty}^{x}\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{s^{2}}{2}}ds = \\Phi(x),
      \\end{aligned}$$
      即$Y=\\frac{X-\\mu}{\\sigma}\\sim N(0,1)$.
    `)
    .corollary('正态分布函数的标准形式', `
      于是，若$X\\sim N(\\mu,\\sigma^{2})$，则它的分布函数$F(x)$可写成
      $$F(x)=P\\{X\\leqslant x\\}=P\\left\\{\\frac{X-\\mu}{\\sigma}\\leqslant\\frac{x-\\mu}{\\sigma}\\right\\}=\\Phi\\left(\\frac{x-\\mu}{\\sigma}\\right).$$
    `)
  .section('二维随机变量及其分布')
    .subsection('联合密度函数')
    .definition('联合概率密度',`对二维随机变量$(X,Y)$的分布函数$F(x,y)$，若存在非可积函数$f(x,y)$，使得$\\forall x,y\\in\\mathbb{R}$有
      $$F(x,y)=P\\{X\\leqslant x,Y\\leqslant y\\}=\\int_{-\\infty}^{x}\\int_{-\\infty}^{y}f(u,v)\\mathrm{d}u\\mathrm{d}v$$
      则称$(X,Y)$是连续型的二维随机变量,函数$f(x,y)$称为二维随机变量$(X,Y)$的概率密度,或称为随机变量$(X,Y)$的联合概率密度.`)
    .property('联合概率密度函数的性质', `
      由概率密度的定义知，$f(x,y)$具有下列性质：
      <ol>
        <li>$f(x,y)\\geqslant 0$.</li>
        <li>$\\int_{-\\infty}^{+\\infty}\\int_{-\\infty}^{+\\infty} f(x,y) \\mathrm{d}x\\mathrm{d}y = F(+\\infty,+\\infty)=1$.</li>
        <li>若$(x,y)$是概率密度$f(x,y)$的连续点,则有$$\\frac{\\partial^{2}F(x,y)}{\\partial x \\partial y}=f(x,y)$$</li>
        <li>若$D$是$xOy$平面上的一个区域,则有$$P\\{(X,Y) \\in D\\}=\\iint_{D}f(x,y)\\mathrm{d}x\\mathrm{d}y$$</li>
      <li>$$P\\{X=x_0, Y=y_0\\}=P\\{X=x_0\\}=P\\{Y=y_0\\}=0$$</li>
      </ol>
      在几何上$z=f(x,y)$表示空间的一个曲面.性质(1)表明这个曲面位于$xOy$平面上方.性质(2)说明介于曲面$z=f(x,y)$和$xOy$平面的空间区域的体积为1.性质(3)显示了分布函数和概率密度函数之间的关系.性质(4)给出了二维随机变量$(X,Y)$落在区域$D$的概率等于以$D$为底，以曲面$z=f(x,y)$为顶的曲顶柱体体积.性质(5)只对连续型的二维随机变量$(X,Y)$成立，对离散型随机变量不一定成立.
    `)
    .text(`
      下面给出几个常见的二维连续型随机变量的分布.
    `)
    .definition('二维均匀分布', `
      若随机变量$(X,Y)$的概率密度为
      $$
f(x,y)=\\left\\{
\\begin{aligned}
\\frac{1}{A}, &\\quad (x,y) \\in D \\\\
0, &\\quad \\text{其他}
\\end{aligned}
\\right.
$$

      其中$A$为区域$D$的面积，则称$(X,Y)$服从$D$上的均匀分布.
    `)
    .definition('二维正态分布', `
      若随机变量$(X,Y)$的概率密度为
      $$f(x, y)=\\frac{1}{2 \\pi \\sigma_{1} \\sigma_{2} \\sqrt{1-\\rho^{2}}} e^{-\\frac{1}{2\\left(1-\\rho^{2}\\right)}\\left[\\frac{\\left(x-\\mu_{1}\\right)^{2}}{\\sigma_{1}^{2}}-2 \\rho \\frac{\\left(x-\\mu_{1}\\right)\\left(y-\\mu_{2}\\right)}{\\sigma_{1}\\sigma_{2}}+\\frac{\\left(y-\\mu_{2}\\right)^{2}}{\\sigma_{2}^{2}}\\right]}$$
      其中$\\sigma_{1}>0,\\sigma_{2}>0,|\\rho|<1$，则称$(X,Y)$服从参数为$\\mu_{1},\\mu_{2},\\sigma_{1},\\sigma_{2},\\rho$的二维正态分布，记为$(X,Y) \\sim N(\\mu_{1},\\mu_{2},\\sigma_{1}^{2},\\sigma_{2}^{2},\\rho)$.
    `)
  .text(`
      对于二维随机变量$(X,Y)$，它有分布函数$F(x,y)$，但是它的每个分量也是随机变量，因此我们可以分别考虑每个分量的分布函数：$F_{X}(x)$与$F_{Y}(y)$，依次称为二维随机变量$(X,Y)$关于$X$与$Y$的边缘分布函数.由此定义，我们有
      $$F_{X}(x)=P\\{X\\leqslant x\\}=P\\{X\\leqslant x,Y\\leqslant\\infty\\}=F(x,\\infty).\\qquad(3.3.1)$$
      同理，
      $$F_{Y}(y)=F(\\infty, y).\\qquad(3.3.2)$$
    `)
    .definition('边缘密度函数', `
      设连续型二维随机变量$(X,Y)$的分布函数为$F(x,y)$，对于任意的$x$，
      $$F_{X}(x)=F(x,-\\infty<y<+\\infty)=F(x,+\\infty),$$
      按照分布函数的定义，称$F_{X}(x)=F(x,+\\infty)$为$X$的边缘分布函数.类似地，称$F_{Y}(y)=F(+\\infty, y)$为$Y$的边缘分布函数.
      由于
      $$F_{X}(x)=F(x,+\\infty)=\\int_{-\\infty}^{x}\\left[\\int_{-\\infty}^{+\\infty} f(x,y)\\mathrm{d} y\\right]\\mathrm{d} x,$$
      因此，称$f_{X}(x)=F_{X}^{\\prime}(x)=\\int_{-\\infty}^{+\\infty} f(x,y)\\mathrm{d} y$为$X$的边缘密度函数.类似地，称$f_{Y}(y)=F_Y^{\\prime}(y)=\\int_{-\\infty}^{+\\infty} f(x,y)\\mathrm{d} x$为$Y$的边缘密度函数.
    `)
    .example('例3.3.2 二维均匀分布与边缘密度', `
      设$(X,Y)$在抛物线$y=x^{2}$和直线$y=x$所围区域$D$上服从二维均匀分布，试求其联合概率密度与边缘概率密度.
      解：区域$D$如图3.11所示，其面积为$S=\\int_{0}^{1}\\left(x-x^{2}\\right)\\mathrm{d} x=\\frac{1}{6}$.故$(X,Y)$的联合概率密度为
      $$f(x,y)=\\left\\{\\begin{array}{ll}6, & (x, y) \\in D, \\\\0, & (x, y) \\notin D.\\end{array}\\right.$$
      于是，
      $$f_{X}(x)=\\int_{-\\infty}^{+\\infty} f(x, y) \\mathrm{d} y=\\left\\{\\begin{array}{ll}\\int_{x^{2}}^{x} 6 \\mathrm{~d} y=6\\left(x-x^{2}\\right), & 0 \\leqslant x \\leqslant 1, \\\\0, & \\text { 其他, }\\end{array}\\right.$$
      $$f_{Y}(y)=\\int_{-\\infty}^{+\\infty} f(x, y) \\mathrm{d} x=\\left\\{\\begin{array}{ll}\\int_{y}^{\\sqrt{y}} 6 \\mathrm{~d} x=6(\\sqrt{y}-y), & 0 \\leqslant y \\leqslant 1, \\\\0, & \\text { 其他. }\\end{array}\\right.$$
    `)
    .example('例3.3.3 二维正态分布与边缘密度', `
      已知二维变量$(X,Y) \\sim N(\\mu_{1},\\mu_{2},\\sigma_{1}^{2},\\sigma_{2}^{2},\\rho)$，试求其边缘概率密度$f_{X}(x), f_{Y}(y)$.
      解：
      $$\\begin{aligned}
      f_{X}(x) &= \\int_{-\\infty}^{+\\infty} f(x, y) \\mathrm{d} y = \\int_{-\\infty}^{+\\infty} \\frac{1}{2 \\pi \\sigma_{1} \\sigma_{2} \\sqrt{1-\\rho^{2}}} e^{-\\frac{1}{2(1-\\rho^{2})}\\left[\\frac{\\left(x-\\mu_{1}\\right)^{2}}{\\sigma_{1}^{2}}-2 \\rho \\frac{\\left(x-\\mu_{1}\\right)}{\\sigma_{1}} \\frac{\\left(y-\\mu_{2}\\right)}{\\sigma_{2}}+\\frac{\\left(y-\\mu_{2}\\right)^{2}}{\\sigma_{2}^{2}}\\right]} \\mathrm{d} y \\\\
      &= \\frac{1}{2 \\pi \\sigma_{1} \\sigma_{2} \\sqrt{1-\\rho^{2}}} e^{-\\frac{\\left(x-\\mu_{1}\\right)^{2}}{2 \\sigma_{1}^{2}}} \\int_{-\\infty}^{+\\infty} e^{-\\frac{1}{2\\left(1-\\rho^{2}\\right)}\\left[\\frac{y-\\mu_{2}}{\\sigma_{2}} - \\rho \\frac{x-\\mu_{1}}{\\sigma_{1}}\\right]^{2}} \\mathrm{d} y \\\\
      &\\xrightarrow{u=\\frac{1}{\\sqrt{1-\\rho^{2}}}\\left[\\frac{y-\\mu_{2}}{\\sigma_{2}} - \\rho \\frac{x-\\mu_{1}}{\\sigma_{1}}\\right]} \\frac{1}{\\sqrt{2\\pi} \\sigma_{1}} e^{-\\frac{\\left(x-\\mu_{1}\\right)^{2}}{2 \\sigma_{1}^{2}}}
      \\end{aligned}$$
      即$f_{X}(x)=\\frac{1}{\\sqrt{2\\pi}\\sigma_{1}} e^{-\\frac{(x-\\mu_{1})^{2}}{2\\sigma_{1}^{2}}},-\\infty<x<+\\infty$.同理，$f_{Y}(y)=\\frac{1}{\\sqrt{2\\pi}\\sigma_{2}} e^{-\\frac{(y-\\mu_{2})^{2}}{2\\sigma_{2}^{2}}},-\\infty<y<+\\infty$.
    `)