/* ==========================================================================
   FILE: assets/js/renderer.js
   描述: 渲染核心 (TreeWalker 高性能版 + MathJax 懒加载)
   ========================================================================== */
MathBook.renderer = {
  container: null,

  init() {
    this.container = document.querySelector("main.content");
  },

  /**
   * 1. 将章节内容挂载到 DOM
   * 使用 DocumentFragment 减少页面重排 (Reflow)
   */
  renderChapters() {
    if (!this.container) return;

    const fragment = document.createDocumentFragment();
    
    MathBook.state.chapters.forEach(ch => {
      if (!ch._rendered) {
        // 创建章节容器
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-wrapper';
        chapterDiv.innerHTML = ch.content.join('');
        fragment.appendChild(chapterDiv);
        ch._rendered = true;
      }
    });

    this.container.appendChild(fragment);
  },

  /**
   * 2. 生成标题序号 (1.1, 1.2...)
   */
  generateHeadingNumbering() {
    if (!this.container) return;

    let h2Count = 0, h3Count = 0;

    // 仅查询 main.content 下的标题
    this.container.querySelectorAll("h2, h3").forEach(heading => {
      // 防止重复生成
      if (heading.querySelector('.heading-number')) return;

      if (heading.tagName === "H2") {
        h2Count++;
        h3Count = 0;
        heading.dataset.number = `${h2Count}`;
      } else {
        h3Count++;
        heading.dataset.number = `${h2Count}.${h3Count}`;
      }

      // 确保有 ID 用于跳转
      if (!heading.id) {
        heading.id = "sec-" + heading.dataset.number.replace(/\./g, "-");
      }

      // 插入序号 span
      const span = document.createElement("span");
      span.className = "heading-number";
      span.textContent = heading.dataset.number + " ";
      heading.insertBefore(span, heading.firstChild);
    });
  },

  /**
   * 3. 核心：更新引用并触发 MathJax
   * 使用 TreeWalker 进行精准文本替换，性能最优
   */
  async updateRefsAndMathJax() {
    if (!this.container) return;

    // A. 解析 \ref{...}
    this.processReferences(this.container);

    // B. 绑定平滑滚动
    this.bindSmoothScroll();

    // C. 触发 MathJax 渲染 (Lazy 模式)
    if (window.MathJax) {
      // 等待 MathJax 核心加载完毕
      await window.MathJax.startup.promise;
      
      // 如果启用了 lazy 扩展，调用 typeset 会初始化观察器
      if (window.MathJax.typeset) {
        window.MathJax.typeset([this.container]);
      } else if (window.MathJax.typesetPromise) {
        // 降级兼容
        await window.MathJax.typesetPromise([this.container]);
      }
    }
  },

  /**
   * [Helper] 使用 TreeWalker 替换文本节点中的引用
   */
  processReferences(rootNode) {
    const map = MathBook.state.formulaMap;
    // 正则：匹配 \ref{任意字符}
    const refRegex = /\\ref\{([^}]+)\}/g;

    // 创建 TreeWalker，只看文本节点 (SHOW_TEXT)
    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // 优化：只有包含 \ref 的文本节点才处理
          return node.nodeValue.includes('\\ref{') 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_SKIP;
        }
      }
    );

    const nodesToReplace = [];
    
    // 1. 收集阶段 (不能边遍历边修改，会打乱 walker)
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    // 2. 替换阶段
    nodesToReplace.forEach(textNode => {
      const text = textNode.nodeValue;
      let match;
      let lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let hasMatch = false;

      // 重置正则索引
      refRegex.lastIndex = 0;

      while ((match = refRegex.exec(text)) !== null) {
        hasMatch = true;
        
        // A. 添加匹配前的纯文本
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex, match.index))
          );
        }

        // B. 创建链接元素
        const key = match[1]; // 获取 \ref{key} 中的 key
        const entry = map[key];
        
        if (entry) {
          const num = entry.number || entry; // 兼容旧数据
          const id = entry.id;
          
          if (id) {
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.className = 'ref-link';
            a.title = `跳转至 ${num}`;
            a.textContent = `(${num})`;
            fragment.appendChild(a);
          } else {
            fragment.appendChild(document.createTextNode(`(${num})`));
          }
        } else {
          // 未找到引用，显示红色的 ??
          const span = document.createElement('span');
          span.style.color = 'red';
          span.style.fontWeight = 'bold';
          span.textContent = '??';
          fragment.appendChild(span);
          console.warn(`[Ref] Missing reference: ${key}`);
        }

        lastIndex = refRegex.lastIndex;
      }

      // C. 添加剩余文本
      if (hasMatch) {
        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
        }
        // 执行 DOM 替换
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    });
  },

  /**
   * [Helper] 绑定平滑滚动效果
   */
  bindSmoothScroll() {
    // 这里使用事件委托，性能更好
    this.container.addEventListener('click', (e) => {
      const link = e.target.closest('a.ref-link');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            // 添加高亮闪烁动画
            target.classList.remove('highlight-flash');
            void target.offsetWidth; // 触发重绘
            target.classList.add('highlight-flash');
            
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    });
  }
};