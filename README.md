这是为您精心整理的最终版 **`README.md`** 项目文档。它不仅是说明书，更是这个“现代数学数字出版引擎”的技术白皮书，涵盖了从安装、写作到部署的全流程。

请将以下内容保存为项目根目录下的 **`README.md`**。

```markdown
# Modern MathBook Template

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![MathJax](https://img.shields.io/badge/MathJax-3.0-green) ![PWA](https://img.shields.io/badge/PWA-Ready-orange)

这是一个基于 **HTML5**、**CSS3 (ITCSS 架构)** 和 **MathJax 3** 构建的现代化在线数学书籍/笔记前端架构模板。它按**世界级数字出版物标准**打造，专注于语义化、可访问性 (A11y)、极致的移动端阅读体验与学术排版。

---

## ✨ 核心特性

### 📚 极致阅读体验
*   **专业数学排版**: 基于 ISO 80000-2 标准配置 MathJax，内置常用数学宏 (如 `\R`, `\P`, `\E`)。
*   **移动端完美适配**: 独创的公式滚动容器设计，解决长公式在手机端撑破屏幕的难题，支持手指左右滑动。
*   **全文模糊搜索**: 集成 Fuse.js，支持毫秒级客户端全文检索 (支持快捷键 `Ctrl+K` 唤起)。
*   **交互式引用**: 支持 `\label{key}` 和 `\ref{key}`，点击引用自动平滑跳转并**高亮闪烁**目标区域。
*   **深度链接 (Deep Linking)**: 每个定理、公式、定义均自动生成永久锚点 (¶)，便于精确分享特定段落。
*   **离线阅读 (PWA)**: 内置 Service Worker，支持断网环境访问已缓存内容，提供类 Native App 的体验。
*   **深色模式**: 自动跟随系统设置或手动切换，状态持久化存储。

### 🛠 工程架构
*   **内容与逻辑分离**: 书籍内容独立存放于 `chapters/` 目录，作者无需触碰核心 HTML/CSS 代码。
*   **链式 API**: 使用优雅的 `chapter().section().theorem()` 链式调用编写内容。
*   **ITCSS 样式架构**: 变量、基础、布局、组件分层管理，易于维护和扩展。
*   **动态环境系统**: 自动支持 40+ 种数学环境（定义、定理、证明、算法等），自动编号与着色。

---

## 📁 目录结构

```text
math-book/
├── index.html              # 🚀 应用入口 (骨架与资源加载)
├── sw.js                   # 📡 PWA Service Worker (离线缓存)
├── README.md               # 📖 项目文档
├── assets/
│   ├── css/                # 🎨 样式层 (ITCSS)
│   │   ├── variables.css   # 全局变量 (主题色、圆角)
│   │   ├── base.css        # 基础排版与公式滚动修复
│   │   ├── layout.css      # 宏观布局与响应式
│   │   ├── components.css  # 组件样式 (搜索、TOC)
│   │   ├── print.css       # 打印专用样式
│   │   └── style.css       # 样式总入口
│   └── js/                 # ⚙️ 核心逻辑
│       ├── config.js       # 全局配置与计数器
│       ├── theme.js        # 主题管理 (立即执行防闪烁)
│       ├── mathJaxConfig.js# MathJax 宏与性能配置
│       ├── chapterAPI.js   # 内容构建器 (Builder Pattern)
│       ├── renderer.js     # DOM 渲染与引用解析
│       ├── toc.js          # 目录生成与 ScrollSpy
│       ├── search.js       # 搜索组件 (Fuse.js)
│       └── init.js         # 初始化编排与错误边界
└── chapters/               # 📝 书籍内容数据
    ├── chapter01.js        # 第1章
    ├── chapter02.js        # 第2章
    └── ...
```

---

## 🚀 快速开始

### 1. 环境准备
由于项目使用了 **ES Modules** 且涉及跨域资源加载 (CDN)，**不能直接双击 `index.html` 打开**。你需要一个本地静态服务器。

**推荐方式 (VS Code)**:
1.  安装插件 **Live Server**。
2.  右键 `index.html` -> "Open with Live Server"。

**命令行方式 (Python)**:
```bash
# Python 3
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

### 2. 编写内容
在 `chapters/` 目录下新建 JS 文件 (如 `chapter03.js`)，使用链式 API 编写：

```javascript
chapter('线性代数基础')
  .section('矩阵运算')
    .definition('矩阵', '矩阵是一个按照长方阵列排列的复数或实数集合...')
    
    // 使用 LaTeX 编写公式，支持自动编号和 label
    .formula('A + B = B + A', { label: 'comm-law' })
    
    .text('由公式 \\ref{comm-law} 可知矩阵加法满足交换律。')
    
    // 丰富的环境支持
    .theorem('秩的不等式', '对于 $A \\in \\R^{m \\times n}$...')
    .proof('证明', '显然...')
    
    // 带颜色的公式环境
    .formulaColor('E = mc^2', { color: '#e63946', name: '质能方程' });
```

### 3. 注册章节
在 `index.html` 的 `<head>` 区域引入新文件：

```html
<!-- ... -->
<script src="chapters/chapter01.js?v=1.0" defer></script>
<script src="chapters/chapter02.js?v=1.0" defer></script>
<script src="chapters/chapter03.js?v=1.0" defer></script> <!-- 新增 -->
<!-- ... -->
```

---

## 🎨 编写指南

### 支持的数学环境
无需额外配置，直接调用以下方法即可生成带编号、带颜色的环境块：

*   **基础类**: `.definition()`, `.axiom()`, `.lemma()`, `.theorem()`, `.corollary()`
*   **示例类**: `.example()`, `.exercise()`, `.problem()`
*   **证明类**: `.proof()`, `.solution()`
*   **其他**: `.remark()`, `.note()`, `.algorithm()`, `.summary()`

### 常用 LaTeX 宏 (Macros)
已在 `assets/js/mathJaxConfig.js` 中预定义，可直接使用：

| 命令 | 渲染结果 | 含义 |
| :--- | :--- | :--- |
| `\R`, `\N`, `\Z` | $\mathbb{R}, \mathbb{N}, \mathbb{Z}$ | 数集 |
| `\P{A}` | $P(A)$ | 概率 |
| `\E{X}` | $E[X]$ | 期望 |
| `\bm{x}` | $\boldsymbol{x}$ | 向量加粗 |

---

## ⚙️ 高级配置

### 修改配色方案
打开 `assets/css/variables.css`，修改 CSS 变量即可一键换肤：

```css
:root {
  --accent: #4a90e2;      /* 全站主色调 */
  --c-theorem: #5A9BF0;   /* 定理环境颜色 */
  --c-definition: #61d4a0;/* 定义环境颜色 */
}
```

### 部署上线
本项目是纯静态网站 (Static Site)，可以免费部署到任何静态托管服务：

1.  **GitHub Pages**: 推送代码到 GitHub 仓库，在 Settings -> Pages 中开启即可。
2.  **Netlify / Vercel**: 导入 Git 仓库即可自动部署。

> **注意**: 部署后必须启用 **HTTPS**，否则 Service Worker (离线缓存) 将无法工作。

---

## 📄 License

MIT License.
Designed by Zbq.
```