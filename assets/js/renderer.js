/* ==========================================================================
   FILE: assets/js/renderer.js
   描述: DOM 操作、交互式引用与 MathJax 渲染
   ========================================================================== */
MathBook.renderer = {
  container: null,

  init() {
    this.container = document.querySelector("main.content");
  },

  renderChapters() {
    if (!this.container) return;
    MathBook.state.chapters.forEach(ch => {
      if (!ch._rendered) {
        const fragment = document.createRange().createContextualFragment(ch.content.join(''));
        this.container.appendChild(fragment);
        ch._rendered = true;
      }
    });
  },

  generateHeadingNumbering() {
    if (!this.container) return;
    this.container.querySelectorAll(".heading-number").forEach(el => el.remove());

    let h2Count = 0, h3Count = 0;

    this.container.querySelectorAll("h2, h3").forEach(heading => {
      // 保持原有 ID 逻辑，如果 ChapterAPI 已经生成了 ID 则保留
      // 这里的逻辑主要是为 h3 生成 ID，以及处理没有手动指定 ID 的情况
      if (heading.tagName === "H2") {
        h2Count++;
        h3Count = 0;
        heading.dataset.number = `${h2Count}`;
      } else {
        h3Count++;
        heading.dataset.number = `${h2Count}.${h3Count}`;
      }

      // 如果 API 没生成 ID，这里补一个
      if (!heading.id) {
        heading.id = "sec-" + heading.dataset.number.replace(/\./g, "-");
      }

      const span = document.createElement("span");
      span.className = "heading-number";
      span.textContent = heading.dataset.number + " ";
      heading.insertBefore(span, heading.firstChild);
    });
  },

  updateRefsAndMathJax() {
    if (!this.container) return Promise.resolve();
    
    const map = MathBook.state.formulaMap;
    
    // 正则替换 \ref{key} 为 <a href="#id">number</a>
    // 使用 HTML 字符串处理虽然粗暴，但对于数学公式混合文本最有效
    const htmlContent = this.container.innerHTML;
    
    const newHtml = htmlContent.replace(/\\ref\{(.+?)\}/g, (match, key) => {
      const entry = map[key];
      if (entry) {
        // entry 结构: { number: "1.2", id: "thm-1-2", type: "theorem" }
        // 如果是 string (旧数据兼容)，则 fallback
        const num = typeof entry === 'object' ? entry.number : entry;
        const id = typeof entry === 'object' ? entry.id : null;
        
        if (id) {
          return `<a href="#${id}" class="ref-link" title="跳转至 ${num}">(${num})</a>`;
        } else {
          return `(${num})`;
        }
      }
      console.warn(`[MathBook] Reference not found: ${key}`);
      return `<span style="color:red; font-weight:bold">??</span>`;
    });

    this.container.innerHTML = newHtml;

    // 重新绑定平滑滚动 (因为 innerHTML 重写破坏了原有事件)
    this.bindSmoothScroll();

    // 触发 MathJax 渲染
    if (window.MathJax && window.MathJax.typesetPromise) {
      return window.MathJax.typesetPromise();
    }
    return Promise.resolve();
  },

  // 内部辅助：为动态生成的 .ref-link 添加平滑滚动
  bindSmoothScroll() {
    const links = this.container.querySelectorAll('a.ref-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.getElementById(href.substring(1));
          if (target) {
            // 添加高亮动画效果
            target.classList.add('highlight-flash');
            setTimeout(() => target.classList.remove('highlight-flash'), 2000);
            
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }
};