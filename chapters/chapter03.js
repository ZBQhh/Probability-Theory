/* ==
   FILE: chapters/chapter03.js
   描述: 第3章 二维随机变量及其分布
   == */
chapter('二维随机变量及其分布')
  .section('二维随机变量及其联合分布')
    .definition('二维随机变量（二维随机向量）', `
      设有随机试验E，其样本空间为 $\\Omega$。若对 $\\Omega$ 中的每一个样本点 $\\omega$ 都有一对有序实数 $(X(\\omega), Y(\\omega))$ 与其对应，则称 $(X, Y)$ 为二维随机变量或二维随机向量。称 $(X, Y)$ 的取值范围为它的值域，记为 $\\Omega_{(X,Y)}$。
    `)
    .definition('n维随机变量（n维随机向量）', `
      设有随机试验E，其样本空间为 $\\Omega$。若对 $\\Omega$ 中的每一个样本点 $\\omega$ 都有一组有序实数列 $(X_1(\\omega), X_2(\\omega), \\cdots, X_n(\\omega))$ 与其对应，则称 $(X_1, X_2, \\cdots, X_n)$ 为 n 维随机变量或 n 维随机向量。其值域记为 $\\Omega_{(X_1, X_2, \\cdots, X_n)}$。
    `)
    .definition('二维随机变量的联合分布函数', `
      设 $(X, Y)$ 为二维随机变量，对任意 $(x, y) \\in \\mathbb{R}^2$，称
      $$F(x, y) = P(X \\le x, Y \\le y)$$
      为随机变量 $(X, Y)$ 的联合分布函数。
    `)
    .definition('n维随机变量的联合分布函数', `
      设 $(X_1, X_2, \\cdots, X_n)$ 为 n 维随机变量，对任意 $(x_1, x_2, \\cdots, x_n) \\in \\mathbb{R}^n$，称
      $$F(x_1, \\cdots, x_n)=P(X_1\\le x_1, \\cdots, X_n \\le x_n)$$
      为其联合分布函数。
    `)
    .property('联合分布函数的性质（二维情形）', `
      设 $F(x, y)$ 为 $(X, Y)$ 的联合分布函数，则
      <ol>
        <li>$0 \\le F(x, y) \\le 1$；</li>
        <li>固定 $y$ 时，$F(x, y)$ 关于 $x$ 单调不减；固定 $x$ 时同理；</li>
        <li>$\\lim_{x\\to -\\infty}F(x, y)=0,\ \\lim_{y\\to -\\infty}F(x, y)=0$，且 $\\lim_{x,y\\to +\\infty}F(x,y)=1$；</li>
        <li>关于每个变量均右连续；</li>
        <li>矩形公式：  
        $$P(x_1 < X\\le x_2,\ y_1 < Y\\le y_2)=F(x_2,y_2)-F(x_2,y_1)-F(x_1,y_2)+F(x_1,y_1)$$
        </li>
      </ol>
    `)
    .definition('二维离散型随机变量', `
      若 $(X, Y)$ 仅取有限或可列个值，则称 $(X, Y)$ 为二维离散型随机变量。
    `)
    .definition('二维随机变量的联合分布律', `
      若 $P(X=x_i, Y=y_j)=p_{ij}$，$i,j=1,2,\\cdots$，且 $p_{ij}\\ge 0$，$\\sum_i\\sum_j p_{ij}=1$，则称为联合分布律。
    `)
    .definition('二维连续型随机变量的联合密度函数', `
      若
      $$F(x, y)=\\int_{-\\infty}^{x}\\int_{-\\infty}^{y} f(u, v) \\,du\\,dv$$
      则 $(X, Y)$ 为二维连续型随机变量，$f(x,y)$ 为联合密度函数。
    `)
    .definition('n维连续型随机变量的联合密度函数', `
      若
      $$F(x_1,\\cdots,x_n)=\\int_{-\\infty}^{x_1}\\cdots\\int_{-\\infty}^{x_n} f(u_1,\\cdots,u_n) \\,du_1\\cdots du_n$$
      则 $f$ 为 $n$ 维连续型随机变量的联合密度函数。
    `)
    .property('联合密度函数的性质（二维）', `
      <ol>
        <li>$f(x, y) \\ge 0$；</li>
        <li>$$\\int_{-\\infty}^{+\\infty}\\int_{-\\infty}^{+\\infty} f(x, y)dxdy =1$$</li>
      </ol>
    `)
    .property('二维连续型随机变量的性质', `
      <ol>
        <li>$P((X,Y)\\in L)=0$（任意平面曲线 $L$）；</li>
        <li>若 $f$ 在点连续，则  
        $$\\frac{\\partial^2 F}{\\partial x\\partial y}=f(x,y)$$</li>
        <li>区域 $D$ 上  
        $$P((X,Y)\\in D)=\\iint_D f(x,y)dxdy$$</li>
      </ol>
    `)
  .section('常用的二维随机变量')
    .definition('二维均匀分布', `
      $$f(x,y)=
      \\begin{cases}
        \\frac{1}{S_G}, & (x,y)\\in G, \\\\
        0, & \\text{其他}
      \\end{cases}$$
      其中 $G$ 为区域，$S_G$ 为面积。
    `)
    .definition('二维正态分布 $N(\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho)$', `
      $$(X, Y)\\sim N(\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho)$$  
      若其密度为  
      $$f(x,y)=\\frac{1}{2\\pi\\sigma_1\\sigma_2\\sqrt{1-\\rho^2}}
      \\exp\\Bigg\\{-\\frac{1}{2(1-\\rho^2)}
      \\Big[
        \\frac{(x-\\mu_1)^2}{\\sigma_1^2}
        -2\\rho\\frac{(x-\\mu_1)(y-\\mu_2)}{\\sigma_1\\sigma_2}
        +\\frac{(y-\\mu_2)^2}{\\sigma_2^2}
      \\Big]\\Bigg\\}$$
    `)
  .section('边缘分布')
    .definition('随机变量的边缘分布函数', `
      $$F_X(x)=F(x,+\\infty),\\quad
        F_Y(y)=F(+\\infty,y)$$
    `)
    .definition('二维离散型变量的边缘分布律', `
      $$P(X=x_i)=\\sum_j p_{ij}=p_{i\\cdot},\\quad
        P(Y=y_j)=\\sum_i p_{ij}=p_{\\cdot j}$$
    `)
    .definition('边缘密度函数', `
      $$f_X(x)=\\int_{-\\infty}^{+\\infty} f(x,y)dy$$
      $$f_Y(y)=\\int_{-\\infty}^{+\\infty} f(x,y)dx$$
    `)
  .section('二维正态分布的性质')
    .property('二维正态与一维正态的关系', `
      若 $(X,Y)\\sim N(\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho)$，  
      则  
      $$X\\sim N(\\mu_1,\\sigma_1^2),\quad Y\\sim N(\\mu_2,\\sigma_2^2)$$
    `)
  .section('随机变量的相互独立性')
    .definition('两个随机变量相互独立', `
      $$F(x,y)=F_X(x)F_Y(y)$$
    `)
    .definition('二维离散型随机变量独立的条件', `
      $$p_{ij}=p_{i\\cdot}p_{\\cdot j}$$
    `)
    .definition('二维连续型随机变量独立的条件', `
      $$f(x,y)=f_X(x)f_Y(y)$$
    `)
    .property('二维正态的独立性条件', `
      $$X\\perp Y \\iff \\rho=0$$
    `)
    .definition('n个随机变量相互独立', `
      $$F(x_1,\\cdots,x_n)=\\prod_{i=1}^n F_{X_i}(x_i)$$
    `)
    .definition('n维离散型随机变量独立条件', `
      $$P(X_1=x_1,\\cdots,X_n=x_n)=\\prod_{i=1}^n P(X_i=x_i)$$
    `)
    .definition('n维连续型随机变量独立条件', `
      $$f(x_1,\\cdots,x_n)=\\prod_{i=1}^n f_{X_i}(x_i)$$
    `)
  .section('条件分布')
    .definition('离散型随机变量的条件分布律', `
      $$P(X=x_i\\mid Y=y_j)=\\frac{p_{ij}}{p_{\\cdot j}}$$
      $$P(Y=y_j\\mid X=x_i)=\\frac{p_{ij}}{p_{i\\cdot}}$$
    `)
    .definition('连续型随机变量的条件密度函数', `
      $$f_{X\\mid Y}(x\\mid y)=\\frac{f(x,y)}{f_Y(y)}$$
      $$f_{Y\\mid X}(y\\mid x)=\\frac{f(x,y)}{f_X(x)}$$
    `)
