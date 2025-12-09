/* ==========================================================================
   FILE: assets/js/chapterAPI.js
   描述: 章节内容构建 API (修复样式渲染逻辑)
   ========================================================================== */
(function() {
  const { state, counters, utils, config } = MathBook;

  function generateId(type, number) {
    return `${type}-${number.replace(/\./g, '-')}`;
  }

  function renderPermalink(id) {
    return `<a href="#${id}" class="permalink" aria-label="本段链接" title="复制链接">¶</a>`;
  }

  // === 核心：统一块级环境渲染器 (修复版) ===
  function _renderBlock(type, title, htmlContent, chapterNum, customOptions = {}) {
    // 1. 计数与 ID 处理
    counters.increment(type);
    const counterVal = counters.get(type);
    const number = `${chapterNum}.${counterVal}`;
    
    let id = customOptions.id || generateId(type, number);
    let content = htmlContent;

    // 处理 \label
    const matchLabel = content.match(/\\label\{(.+?)\}/);
    if (matchLabel) {
      const customLabel = matchLabel[1];
      id = customLabel;
      state.formulaMap[customLabel] = { number, id, type };
      content = content.replace(/\\label\{(.+?)\}/g, "");
    }
    if (customOptions.label) {
      id = customOptions.label;
      state.formulaMap[id] = { number, id, type };
    }

    // 2. 样式参数获取
    const color = customOptions.color || utils.getEnvColor(type);
    const displayTitle = customOptions.name || utils.getEnvName(type);
    
    // 标题 HTML：使用 CSS 变量 --env-title-color 确保深色模式可见
    const extraTitle = (title && title.trim()) 
      ? `<span class="env-title" style="margin-left:0.5em; font-weight:500; color:var(--env-title-color);">${utils.escapeHtml(title)}</span>` 
      : '';

    // 3. 构建 HTML (核心修复点)
    // - background-color: var(--block-bg) --> 让 CSS 变量控制黑/白底
    // - border-left: solid ${color} --> 保持 JS 控制的彩色边框
    // - color: ${color} --> 仅应用在标签(定义)和序号(1.1)上，不要应用在整个块上
    return `
      <div class="block type-${type}" id="${id}" data-generated="1" 
           style="--block-color:${color}; border-left: 4px solid ${color}; background-color: var(--block-bg);">
        ${renderPermalink(id)}
        
        <div class="env-heading" style="display:flex; align-items:baseline; flex-wrap:wrap;">
          <span class="env-label" style="color:${color}; font-weight:700;">${displayTitle}</span>
          <span class="env-num" style="color:${color}; font-weight:700; margin-left:0.4em;">${number}</span>
          ${extraTitle}
        </div>
        
        <div class="env-body" style="color:var(--text);">${content}</div>
      </div>
    `;
  }

  // === Chapter 主逻辑 ===
  window.chapter = function(title) {
    state.currentChapterIndex++;
    const chapterNum = state.currentChapterIndex + 1;
    counters.reset();

    const chap = {
      num: chapterNum,
      title,
      content: [],
      
      _add(html) { this.content.push(html); return this; },

      text(html) { return this._add(`<div class="text-wrapper" style="margin:1em 0;">${html}</div>`); },
      section(t) { counters.increment('section'); return this._add(`<h3 data-generated="1">${utils.escapeHtml(t)}</h3>`); },
      subsection(t) { counters.increment('subsection'); return this._add(`<h4 data-generated="1">${utils.escapeHtml(t)}</h4>`); },
      code(c, l = "") { return this._add(`<pre><code class="language-${l}">${utils.escapeHtml(c)}</code></pre>`); },
      quote(t, a = "") { return this._add(`<blockquote class="custom-quote"><p>${t}</p>${a?`<cite>— ${utils.escapeHtml(a)}</cite>`:''}</blockquote>`); },
    };
    
    // 动态生成标准环境
    if(config && config.environments) {
        Object.keys(config.environments).forEach(envType => {
          if (envType === 'default') return;
          chap[envType] = function(titleOrHtml, html) {
            let title = "", content = "";
            if (arguments.length === 1) content = titleOrHtml;
            else { title = titleOrHtml; content = html; }
            return this._add(_renderBlock(envType, title, content, chapterNum));
          };
        });
    }

    // FormulaBox
    chap.formulaBox = function(htmlContent, options = {}) {
      const { title = "", label = null, color = "#e24ac1" } = options;
      const html = _renderBlock('formulaBox', title, htmlContent, chapterNum, {
        id: label, label: label, color: color, name: "公式"
      });
      return this._add(html);
    };

    // Formulas
    chap.formula = function(latex, options = {}) {
      const { skipNumber = false, label = null } = options;
      if (!skipNumber) counters.increment('equation');
      const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
      const id = label || (skipNumber ? null : `eq-${this.num}-${counters.get('equation')}`);
      if (label && !skipNumber) state.formulaMap[label] = { number, id };
      return this._add(`<div class="math-display-block" id="${id||''}"><div class="math-scroll-view"><div class="math-content">$$${latex}$$</div></div><div class="math-info"><span class="math-number">${number}</span>${(id&&!skipNumber)?renderPermalink(id):''}</div></div>`);
    };

    chap.formulaColor = function(latex, options = {}) {
      const { color = "#409EFF", name = null, label = null, skipNumber = false } = options;
      if (!skipNumber) counters.increment('equation');
      const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
      const id = label || (skipNumber ? null : `eq-col-${this.num}-${counters.get('equation')}`);
      if (label && !skipNumber) state.formulaMap[label] = { number, id };
      return this._add(`<div class="math-display-block color-mode" style="--fcolor:${color}" id="${id||''}"><div class="math-scroll-view"><div class="math-content">$$${latex}$$</div></div><div class="math-info"><span class="math-number" style="color:${color};font-weight:bold;">${number}</span>${name?`<span class="math-name">${utils.escapeHtml(name)}</span>`:""}${(id&&!skipNumber)?renderPermalink(id):''}</div></div>`);
    };

    const chapId = `chap-${chapterNum}`;
    chap.content.push(`<h2 id="${chapId}" data-generated="1">${utils.escapeHtml(title)}</h2>`);
    state.chapters.push(chap);
    return chap;
  };
})();