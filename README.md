# Modern MathBook Template

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![MathJax](https://img.shields.io/badge/MathJax-3.0-green) ![PWA](https://img.shields.io/badge/PWA-Ready-orange)

这是一个基于 HTML5、CSS3 (ITCSS 架构) 和 MathJax 3 的现代化数学书籍/笔记前端架构模板。它按**世界级数字出版物标准**打造，专注于语义化、可访问性 (A11y)、极致性能与学术排版体验。

## ✨ 核心特性

### 📚 阅读体验
*   **专业数学排版**: 基于 ISO 80000-2 标准配置 MathJax，内置常用数学宏 (如 `\R`, `\P`, `\E`)。
*   **全文模糊搜索**: 集成 Fuse.js，支持毫秒级客户端全文检索 (Ctrl+K 唤起)。
*   **交互式引用**: 支持 `\label{key}` 和 `\ref{key}`，点击引用自动跳转并**高亮闪烁**目标区域。
*   **深度链接 (Deep Linking)**: 每个定理、公式、定义均自动生成永久锚点 (¶)，便于分享特定段落。
*   **离线阅读 (PWA)**: 内置 Service Worker，支持断网环境访问已缓存内容，类 App 体验。
*   **深色模式**: 自动跟随系统或手动切换，状态持久化存储 (LocalStorage)。

### 🛠 工程架构
*   **模块化设计**: 内容 (Chapters) 与逻辑 (Core) 完全分离，非程序员也能轻松维护内容。
*   **ITCSS 样式架构**: 变量、基础、布局、组件分层管理，易于扩展。
*   **SEO 与性能**: 预连接 (Preconnect) CDN，Open Graph 社交分享优化，语义化 HTML5 结构。
*   **打印优化**: 专用的 Print CSS，`Ctrl + P` 即可输出符合学术标准的 PDF (自动分页、去噪、黑白优化)。

## 📁 目录结构

```text
math-book/
├── index.html              # 🚀 应用入口 (骨架与资源加载)
├── sw.js                   # 📡 PWA Service Worker (离线缓存)
├── README.md               # 📖 说明文档
├── assets/
│   ├── css/                # 🎨 样式层 (ITCSS)
│   │   ├── variables.css   # 全局变量 (颜色、圆角)
│   │   ├── base.css        # 标签重置与排版
│   │   ├── layout.css      # 布局与响应式
│   │   ├── components.css  # 组件 (Block, Search, TOC)
│   │   ├── print.css       # 打印专用样式
│   │   └── style.css       # 样式总入口
│   └── js/                 # ⚙️ 核心逻辑
│       ├── config.js       # 全局配置
│       ├── theme.js        # 主题管理 (立即执行)
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
    🚀 快速开始
1. 环境准备
由于项目使用了 ES Modules 且涉及跨域资源加载 (CDN)，不能直接双击 index.html 打开。你需要一个本地静态服务器。
推荐方式 (VS Code):
安装插件 Live Server。
右键 index.html -> "Open with Live Server"。
命令行方式 (Python):
code
Bash
# Python 3
python -m http.server 8000
# 访问 http://localhost:8000
2. 编写内容
在 chapters/ 目录下新建 JS 文件 (如 chapter03.js)，使用链式 API 编写：
code
JavaScript
chapter('线性代数基础')
  .section('矩阵运算')
    .definition('矩阵', '矩阵是一个按照长方阵列排列的复数或实数集合...')
    
    // 使用 LaTeX 编写公式
    // 支持 \label{} 定义标签，自动编号
    .formula('A + B = B + A', { label: 'comm-law' })
    
    .text('由公式 \\ref{comm-law} 可知矩阵加法满足交换律。')
    
    // 使用内置宏简写 (见 assets/js/mathJaxConfig.js)
    // \R -> 实数集, \rank -> 秩
    .theorem('秩的不等式', '对于 $A \\in \\R^{m \\times n}$...')
    
    .example('计算示例', '...');
3. 注册章节
在 index.html 的 <head> 区域引入新文件：
code
Html
<!-- ... -->
<script src="chapters/chapter01.js" defer></script>
<script src="chapters/chapter02.js" defer></script>
<script src="chapters/chapter03.js" defer></script> <!-- 新增 -->
<!-- ... -->
⚙️ 高级配置
自定义数学宏 (Macros)
在 assets/js/mathJaxConfig.js 中添加自定义 LaTeX 命令：
code
JavaScript
macros: {
  R: "\\mathbb{R}",        // 实数集
  P: ["P(#1)", 1],         // 概率 P(A)
  bm: ["\\boldsymbol{#1}", 1] // 向量加粗
}
修改主题色
在 assets/css/variables.css 中修改 CSS 变量：
code
CSS
:root {
  --accent: #4a90e2;      /* 全站主色 */
  --block-radius: 8px;    /* 卡片圆角 */
}
📦 部署
本项目是纯静态网站 (Static Site)，可以部署到任何静态托管服务：
GitHub Pages: 推送代码到 GitHub，在 Settings -> Pages 中开启即可。
Netlify / Vercel: 拖拽文件夹或连接 Git 仓库即可上线。
注意: 部署后请确保 HTTPS 已启用，否则 Service Worker (PWA) 将无法工作。
📄 License
MIT License.
Designed by Zbq.
code
Code
---

至此，您的项目**架构、代码、文档**均已交付完毕。这就相当于一套**“交钥匙”**的解决方案：

1.  **对于读者**：这是极致流畅、支持离线、搜索便捷的数学书。
2.  **对于作者（您）**：只需关注 `chapters/` 下的内容创作，无需关心底层技术。
3.  **对于开发者**：这是一个标准化的、易于扩展的现代前端工程。

祝您的《概率论与数理统计》编写顺利！