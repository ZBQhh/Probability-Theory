这是专业且详尽的 `README.md` 文件。它不仅包含了项目介绍，还详细拆解了**内容编写指南**、**样式定制手册**以及**系统扩展教程**。

您可以直接将以下内容保存为项目根目录下的 `README.md`。

---

# Modern MathBook Template

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![MathJax](https://img.shields.io/badge/MathJax-3.0-green) ![Layout](https://img.shields.io/badge/Layout-Responsive-orange)

这是一个基于 **HTML5**、**CSS3 (Variables)** 和 **MathJax 3** 构建的现代化在线数学书籍/笔记前端架构。

它专为学术写作设计，支持**链式调用 API** 编写内容，拥有**流式排版**、**沉浸式阅读体验**和**高度可定制**的样式系统。

## ✨ 核心特性

*   **📚 专业数学排版**: 内置 ISO 标准数学宏，支持多种数学环境（定义、定理、证明等）。
*   **📱 极致移动端体验**:
    *   **流式标题布局**: 完美解决长标题换行与对齐问题。
    *   **智能交互**: 目录按钮滑动时自动隐藏，点击环境序号（如 "定义 1.1"）直接复制引用链接。
    *   **公式滚动**: 移动端长公式自动开启横向滚动，不撑破页面。
*   **🎨 高度可定制**: 通过 CSS 变量 (`variables.css`) 集中管理字体、颜色、间距和深色模式。
*   **🔍 全文检索**: 集成 Fuse.js，支持毫秒级客户端全文模糊搜索。
*   **🛠 工程化架构**: 内容与逻辑分离，支持模块化编写章节。

---

## 📁 目录结构

```text
math-book/
├── index.html              # 🚀 应用入口
├── README.md               # 📖 项目文档
├── assets/
│   ├── css/
│   │   ├── variables.css   # 🎨 [核心] 全局变量 (字体/颜色/间距/深色模式)
│   │   ├── base.css        # 基础 Reset 与 排版
│   │   ├── layout.css      # 宏观布局 (侧边栏/主内容区)
│   │   ├── components.css  # 🧩 [核心] 组件样式 (环境块/搜索/TOC/按钮)
│   │   └── print.css       # 打印样式
│   └── js/
│       ├── config.js       # 全局配置
│       ├── chapterAPI.js   # ⚙️ [核心] 内容生成逻辑与环境定义
│       ├── toc.js          # 目录交互 (含滑动隐藏逻辑)
│       ├── mathJaxConfig.js# MathJax 配置与宏定义
│       └── ...
└── chapters/               # 📝 书籍内容 (在此编写)
    ├── chapter01.js
    └── ...
```

---

## ✍️ 编写指南 (How to Use)

本项目采用 **链式调用 (Chainable API)** 编写内容，无需接触 HTML。

### 1. 创建章节
在 `chapters/` 目录下新建 JS 文件（例如 `chapter01.js`），格式如下：

```javascript
chapter('线性代数基础') // 章节大标题
  
  .text('本章主要介绍矩阵的基本运算。') // 普通段落
  
  .section('矩阵定义') // 二级标题 (Section)
  
    // --- 定义环境 ---
    // 自动生成编号 "定义 1.1"，点击 "定义 1.1" 可复制链接
    .definition('矩阵', '矩阵是一个按照长方阵列排列的复数或实数集合...')
    
    // --- 公式环境 ---
    // label 用于引用，skipNumber: true 可隐藏编号
    .formula('A + B = B + A', { label: 'comm-law' })
    
    .text('由公式 \\ref{comm-law} 可知...') // 引用公式
  
  .subsection('特殊矩阵') // 三级标题
  
    // --- 定理环境 ---
    .theorem('秩的不等式', '对于 $A \\in \\R^{m \\times n}$，有 $rank(A) \\leq \\min(m, n)$。')
    
    // --- 证明环境 ---
    .proof('显然成立。')

    // --- 彩色公式 (强调) ---
    .formulaColor('E = mc^2', { color: '#e63946', name: '质能方程' })

    // --- 警告框 ---
    .warning('注意', '矩阵乘法通常不满足交换律！');
```

### 2. 注册章节
在 `index.html` 底部引入该文件：
```html
<script src="chapters/chapter01.js"></script>
```

### 3. 常用 LaTeX 宏
已内置常用宏，可直接在字符串中使用：
| 宏 | 渲染 | 说明 |
| :--- | :--- | :--- |
| `\R`, `\N`, `\Z` | $\mathbb{R}, \mathbb{N}, \mathbb{Z}$ | 数集 |
| `\P{A}` | $P(A)$ | 概率 |
| `\E{X}` | $E[X]$ | 期望 |
| `\bm{x}` | $\boldsymbol{x}$ | 向量加粗 |

---

## 🎨 样式定制 (Customization)

所有核心样式配置都集中在 **`assets/css/variables.css`**。

### 1. 修改字体
找到 `:root` 下的字体变量进行修改：

```css
:root {
  /* 标题字体 (推荐无衬线体: 思源黑体/苹方) */
  --font-heading: "Source Han Sans SC", "PingFang SC", sans-serif;
  
  /* 正文字体 (推荐衬线体: 宋体/Noto Serif) */
  --font-body: "Noto Serif SC", "Songti SC", serif;
}
```

### 2. 修改颜色 (支持深色模式)
你可以分别定义浅色和深色模式下的配色：

```css
/* ☀️ 浅色模式 */
:root {
  --accent: #3b82f6;       /* 全站强调色 (链接、按钮) */
  --block-bg: rgba(255, 255, 255, 0.95); /* 环境块背景 */
  --env-title-color: #111; /* 标题文字颜色 */
}

/* 🌙 深色模式 */
html.theme-dark {
  --accent: #60a5fa;
  --block-bg: rgba(30, 41, 59, 0.8); /* 深色背景 */
  --env-title-color: #f8fafc;        /* 标题文字变白 */
}
```

### 3. 调整排版间距
如果你觉得“定义 1.1”和后面的标题挨得太近，可以调整这里：

```css
:root {
  /* 序号 (1.1) 与 标题内容 之间的距离 */
  --env-num-spacing: 1.2em; 
  
  /* 环境名 (定义) 与 序号 (1.1) 之间的距离 */
  --env-label-spacing: 0.3em;
}
```

### 4. 高级：为特定环境设置特殊样式
如果你想让 **“定理”** 的内容变成斜体，或者让 **“定义”** 的标题变成蓝色。
请编辑 **`assets/css/components.css`** 底部的 **“个性化定制区”**：

```css
/* 示例：修改“定义”环境 */
.block.type-definition .env-title {
  color: #2563eb; /* 标题变蓝 */
}

/* 示例：修改“定理”环境 */
.block.type-theorem .env-body {
  font-style: italic; /* 正文变斜体 */
  font-family: "Times New Roman", serif;
}
```

---

## 🛠 系统扩展 (Advanced)

### 如何添加一个新的环境？
假设你想增加一个名为 **“Conjecture (猜想)”** 的环境，颜色为**粉色**。

1.  **打开 `assets/js/chapterAPI.js`**。
2.  在 `envColors` 对象中添加颜色配置：
    ```javascript
    const envColors = {
      // ... 原有配置
      conjecture: "#db2777", // 添加这一行
    };
    ```
3.  在 `utils.getEnvName` 函数中添加中文映射：
    ```javascript
    const envNames = {
      // ... 原有配置
      conjecture: "猜想", // 添加这一行
    };
    ```
4.  **完成！** 现在你可以在章节文件中使用了：
    ```javascript
    chapter().conjecture('黎曼猜想', '所有非平凡零点的实部都为 1/2。');
    ```

---

## 🚀 部署

由于使用了 ES Modules，本地开发需要启动静态服务器 (如 Live Server)。
部署时，直接将整个文件夹上传至 **GitHub Pages**、**Vercel** 或 **Netlify** 即可，无需构建过程。

---

## License

MIT License.这是你**封版**时的最终项目结构。

为了实现**逻辑与视图分离**（Separation of Concerns）以及**单一数据源**（Single Source of Truth），现在的架构如下：

### 📁 项目完整目录结构

```text
math-book/
├── index.html              # 🚀 入口：引入 CSS, TikZJax, Config, Templates, API
├── README.md               # 📖 说明文档
├── assets/
│   ├── css/                # 🎨 样式层 (完全变量化)
│   │   ├── variables.css   # [配置中心] 定义字体、颜色、间距变量 (修改这里即可全站变色/变排版)
│   │   ├── base.css        # [基础排版] h1-h6, p, MathJax 间距 (引用变量)
│   │   ├── components.css  # [组件样式] 环境块、搜索、目录、悬浮按钮 (引用变量)
│   │   ├── layout.css      # [布局框架] 侧边栏与主内容区的网格布局
│   │   └── style.css       # [总入口] @import 所有 css
│   │
│   └── js/                 # ⚙️ 逻辑层 (模块化)
│       ├── config.js       # [数据中心] 定义语言(zh/en)、环境名称/颜色映射
│       ├── templates.js    # [视图层] 纯 HTML 字符串模板 (Section, Formula, Image...)
│       ├── chapterAPI.js   # [控制层] 链式调用逻辑，计算 ID/编号，调用 Templates
│       ├── renderer.js     # [渲染层] DOM 操作、激活 TikZ、解析引用 \ref
│       ├── mathJaxConfig.js# [公式配置] MathJax 宏定义 (\R, \E), 包加载
│       ├── toc.js          # [目录交互] 默认折叠、点击展开、滑动隐藏
│       ├── search.js       # [搜索] Fuse.js 搜索逻辑
│       ├── theme.js        # [主题] 深色模式切换
│       └── init.js         # [启动] 初始化脚本
│
└── chapters/               # 📝 内容层
    ├── chapter01.js        # 具体书籍内容
    └── ...
```

---

### 🔑 关键文件指引

#### 1. 想改 **颜色/字体/间距**？
👉 **`assets/css/variables.css`**
*   修改 `--accent` 改变主题色。
*   修改 `--font-heading` 改变标题字体。
*   修改 `--heading-num-spacing` 改变“1.1”和标题的距离。

#### 2. 想加 **新环境** (如“猜想”)？
👉 **`assets/js/config.js`**
*   在 `environments` 对象里加一行：`conjecture: { zh: "猜想", color: "#db2777" }`。
*   代码里直接用 `chapter().conjecture(...)`，**不需要**改 API 或 Template。

#### 3. 想改 **HTML 结构** (比如给公式加个边框)？
👉 **`assets/js/templates.js`**
*   找到 `formula` 函数，修改返回的 HTML 字符串。

#### 4. 内容写在哪？
👉 **`chapters/xxx.js`**
*   使用链式语法：`chapter().section().definition()...`

#### 5. 为什么我的图没出来？
*   检查 **`index.html`** 是否引入了 `tikzjax.js`。
*   检查 **`renderer.js`** 是否包含了 `activateTikZ` 函数。

这个架构非常稳健，既方便写书（API 简单），又方便后续维护（样式和逻辑分离）。祝贺封版！🎉