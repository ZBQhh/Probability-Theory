/* =========================================================
   env-template-full-optimized-labels.js
   完全优化版 + 公式标签 \label{} 与引用 \ref{}
   ========================================================= */

/* =====================================================
   全局变量
   ===================================================== */
const chapters = [];
let currentChapterIndex = -1;

// 章节计数器
let counters = {
  definition: 0,
  theorem: 0,
  corollary: 0,
  example: 0,
  note: 0,
  section: 0,
  equation: 0,
  formulaBox: 0
};

// 标签映射表 (label -> 编号)
const formulaMap = {};

// 环境类型中文名称映射
const ENV_CHINESE_NAMES = {
  definition: "定义",
  theorem: "定理",
  corollary: "推论",
  example: "例",
  note: "注"
};

/* =====================================================
   工具函数
   ===================================================== */
function escapeHtml(str) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return String(str).replace(/[&<>"']/g, s => map[s]);
}

function envChinese(type) {
  return ENV_CHINESE_NAMES[type] || type;
}

function triggerMathJax() {
  if (window.MathJax) {
    return MathJax.typesetPromise();
  }
  return Promise.resolve();
}

/* =====================================================
   章节 API
   ===================================================== */
function chapter(title) {
  currentChapterIndex++;
  const chapterNum = currentChapterIndex + 1;

  // 重置计数器
  counters = {
    definition: 0,
    theorem: 0,
    corollary: 0,
    example: 0,
    note: 0,
    section: 0,
    equation: 0,
    formulaBox: 0
  };

  const chap = {
    num: chapterNum,
    title,
    content: [],
    _rendered: false,

    // ===== 普通文本 =====
    text(html) {
      this.content.push(`<p>${html}</p>`);
      return this;
    },

    // ===== 小节标题 =====
    section(secTitle) {
      counters.section++;
      this.content.push(`<h3 data-generated="1">${escapeHtml(secTitle)}</h3>`);
      return this;
    },

    // ===== 标准公式 =====
    formula(latex, options = {}) {
      const { skipNumber = false, label = null } = options;

      if (!skipNumber) {
        counters.equation++;
      }

      const number = skipNumber ? "" : `${this.num}.${counters.equation}`;

      // 保存标签
      if (label && !skipNumber) {
        formulaMap[label] = number;
      }

      this.content.push(`
        <div class="formula-wrapper"${skipNumber ? ' data-skip-number="true"' : ""}>
          <div class="formula">$$${latex}$$</div>
          <div class="equation-num">${number}</div>
        </div>
      `);

      return this;
    },

    // ===== 彩色公式 =====
    formulaColor(latex, options = {}) {
      const {
        color = "#409EFF",
        name = null,
        label = null,
        skipNumber = false
      } = options;

      if (!skipNumber) {
        counters.equation++;
      }

      const number = skipNumber ? "" : `${this.num}.${counters.equation}`;

      // 保存标签
      if (label && !skipNumber) {
        formulaMap[label] = number;
      }

      this.content.push(`
        <div class="formula-wrapper color-formula" style="--fcolor:${color}">
          <div class="formula-core" style="display:flex; align-items:center; justify-content:center; gap:1em;">
            <div class="formula">$$${latex}$$</div>
            <div class="formula-meta">
              ${!skipNumber ? `<span class="equation-num">${number}</span>` : ""}
              ${name ? `<span class="equation-name">${escapeHtml(name)}</span>` : ""}
            </div>
          </div>
        </div>
      `);

      return this;
    },

    // ===== 公式盒子 (独立编号，可含文字 + 公式) =====
    formulaBox(htmlContent, options = {}) {
      const {
        title = "",
        label = null,
        color = "#e24ac1"
      } = options;

      counters.formulaBox++;
      const number = `${this.num}.${counters.formulaBox}`;

      // 保存标签
      if (label) {
        formulaMap[label] = number;
      }

      this.content.push(`
        <div class="block type-formula-box" data-generated="1" data-envtype="formula-box" style="--box-color:${color};">
          <div class="env-heading" style="display:flex; align-items:center; gap:0.5em;">
            <span class="env-label">公式</span>
            <span class="env-num">${number}</span>
            <span class="env-title">${escapeHtml(title)}</span>
          </div>
          <div class="env-body">
            ${htmlContent}
          </div>
        </div>
      `);

      // 延迟触发 MathJax 渲染
      setTimeout(() => triggerMathJax(), 0);

      return this;
    }
  };

  // 生成章节标题
  chap.content.push(`<h2 data-generated="1">${escapeHtml(title)}</h2>`);

  // ===== 环境块方法 (定义、定理、推论、例、注) =====
  ["definition", "theorem", "corollary", "example", "note"].forEach(type => {
    chap[type] = function(title, html) {
      counters[type]++;
      const number = `${chapterNum}.${counters[type]}`;

      // 提取 \label{} 标签
      const matchLabel = html.match(/\\label\{(.+?)\}/);
      if (matchLabel) {
        formulaMap[matchLabel[1]] = number;
        html = html.replace(/\\label\{(.+?)\}/g, "");
      }

      this.content.push(`
        <div class="block type-${type}" data-generated="1" data-envtype="${type}">
          <div class="env-heading">
            <span class="env-label">${envChinese(type)}</span>
            <span class="env-num">${number}</span>
            <span class="env-title">${escapeHtml(title)}</span>
          </div>
          <div class="env-body">${html}</div>
        </div>
      `);

      return this;
    };
  });

  chapters.push(chap);
  return chap;
}

/* =====================================================
   渲染与更新
   ===================================================== */
function syncNumbers() {
  const container = document.querySelector("main.content");
  if (!container) return;

  // 渲染章节内容
  chapters.forEach(ch => {
    if (!ch._rendered) {
      ch.content.forEach(html => {
        container.insertAdjacentHTML("beforeend", html);
      });
      ch._rendered = true;
    }
  });

  // 依次执行初始化
  generateHeadingNumbering();
  initTOC();
  updateRefsAndMathJax();
  setTimeout(initScrollSpy, 100);
}

/* =====================================================
   标题自动编号 (H2/H3)
   ===================================================== */
function generateHeadingNumbering() {
  const container = document.querySelector("main.content");
  if (!container) return;

  // 清除旧编号
  container.querySelectorAll(".heading-number").forEach(el => el.remove());

  let h2Count = 0;
  let h3Count = 0;

  container.querySelectorAll("h2, h3").forEach(heading => {
    if (heading.tagName === "H2") {
      h2Count++;
      h3Count = 0;
      heading.dataset.number = `${h2Count}`;
    } else {
      h3Count++;
      heading.dataset.number = `${h2Count}.${h3Count}`;
    }

    // 生成 ID
    if (!heading.id) {
      heading.id = "sec-" + heading.dataset.number.replace(/\./g, "-");
    }

    // 插入编号
    const span = document.createElement("span");
    span.className = "heading-number";
    span.textContent = heading.dataset.number + " ";
    heading.insertBefore(span, heading.firstChild);
  });
}

/* =====================================================
   更新公式引用 & MathJax 渲染
   ===================================================== */
function updateRefsAndMathJax() {
  const container = document.querySelector("main.content");
  if (!container) return;

  // 替换 \ref{} 为实际编号
  container.innerHTML = container.innerHTML.replace(
    /\\ref\{(.+?)\}/g,
    (match, key) => {
      return formulaMap[key] ? `(${formulaMap[key]})` : match;
    }
  );

  // 触发 MathJax 渲染
  return triggerMathJax();
}

/* =====================================================
   目录 (TOC) 生成
   ===================================================== */
function initTOC() {
  const tocList = document.getElementById("tocList");
  if (!tocList) return;

  tocList.innerHTML = "";
  const container = document.querySelector("main.content");
  let lastH2Li = null;

  container.querySelectorAll("h2, h3").forEach(heading => {
    const id = heading.id;
    const num = heading.dataset.number;
    const text = heading.textContent.replace(/^\s*\d+(\.\d+)?\s*/, "").trim();

    if (heading.tagName === "H2") {
      // H2 条目
      const li = document.createElement("li");
      li.className = "toc-h2";

      const row = document.createElement("div");
      row.className = "toc-row";

      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = num + " " + text;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        closeToc();
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setActiveTocLink(id);
      });

      const caret = document.createElement("span");
      caret.className = "caret";

      row.appendChild(link);
      row.appendChild(caret);

      const subList = document.createElement("ul");
      subList.className = "toc-sub";

      // 折叠/展开功能
      row.addEventListener("click", (e) => {
        if (e.target === link) return;
        subList.classList.toggle("open");
        caret.classList.toggle("rot");
      });

      li.appendChild(row);
      li.appendChild(subList);
      tocList.appendChild(li);
      lastH2Li = li;

    } else {
      // H3 条目
      const li = document.createElement("li");
      li.className = "toc-h3";

      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = num + " " + text;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        closeToc();
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setActiveTocLink(id);
      });

      li.appendChild(link);

      // 添加到上一个 H2 的子列表
      lastH2Li?.querySelector(".toc-sub")?.appendChild(li);
    }
  });
}

/* =====================================================
   目录高亮设置
   ===================================================== */
function setActiveTocLink(targetId) {
  document.querySelectorAll("#tocList a").forEach(link => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`#tocList a[href="#${targetId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

/* =====================================================
   滚动监听 (ScrollSpy)
   ===================================================== */
let intersectionObserver = null;

function initScrollSpy() {
  const headings = [...document.querySelectorAll("main.content h2, h3")];

  // 断开旧观察器
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }

  // 创建新观察器
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        setActiveTocLink(visibleEntries[0].target.id);
      }
    },
    { threshold: [0.2] }
  );

  // 观察所有标题
  headings.forEach(h => intersectionObserver.observe(h));
}

/* =====================================================
   目录开关
   ===================================================== */
function openToc() {
  document.querySelector(".sidebar")?.classList.add("open");
  document.querySelector(".toc-overlay")?.classList.add("show");
  document.querySelector(".toc-toggle")?.classList.add("hidden");
}

function closeToc() {
  document.querySelector(".sidebar")?.classList.remove("open");
  document.querySelector(".toc-overlay")?.classList.remove("show");
  document.querySelector(".toc-toggle")?.classList.remove("hidden");
}

/* =====================================================
   自动初始化
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  syncNumbers();

  // 绑定 TOC 按钮事件
  document.querySelector(".toc-toggle")?.addEventListener("click", openToc);
  document.querySelector(".toc-overlay")?.addEventListener("click", closeToc);
});