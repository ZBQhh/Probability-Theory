/* ==========================================================================
   FILE: assets/js/chapterAPI.js
   描述: 章节内容构建 API (嵌入式链接版 - 对接 Config - 含 Image 方法)
   ========================================================================== */
(function() {
  // 确保 config 已加载 (MathBook.config 必须存在)
  const { state, counters, utils, config } = MathBook;

  function generateId(type, number) {
    return `${type}-${number.replace(/\./g, '-')}`;
  }

  // ==================== Chapter 主逻辑 ====================
  window.chapter = function(title) {
    state.currentChapterIndex++;
    const chapterNum = state.currentChapterIndex + 1;
    counters.reset();

    const chap = {
      num: chapterNum,
      title,
      content: [],
      _rendered: false,

      _add(html) { this.content.push(html); return this; },
      text(html) { return this._add(`<p>${html}</p>`); },
      section(secTitle) {
        counters.increment('section');
        return this._add(`<h3 id="sec-${this.num}-${counters.get('section')}" data-generated="1">${utils.escapeHtml(secTitle)}</h3>`);
      },
      subsection(subTitle) {
        counters.increment('subsection');
        return this._add(`<h4 data-generated="1">${utils.escapeHtml(subTitle)}</h4>`);
      },

      /* 1. 普通公式 */
      formula(latex, options = {}) {
        const { skipNumber = false, label = null } = options;
        if (!skipNumber) counters.increment('equation');
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-${this.num}-${counters.get('equation')}`);
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        const linkHtml = (id && !skipNumber) ? `<a href="#${id}" class="permalink-formula" title="链接">¶</a>` : '';

        return this._add(`
          <div class="math-display-block" id="${id || ''}" ${skipNumber ? 'data-no-num="true"' : ''}>
            <div class="math-scroll-view"><div class="math-content">$$${latex}$$</div></div>
            <div class="math-info">
              <span class="math-number">${number ? `(${number})` : ''}</span>
              ${linkHtml}
            </div>
          </div>
        `);
      },

      /* 2. 彩色公式 */
      formulaColor(latex, options = {}) {
        const { color = "#409EFF", name = null, label = null, skipNumber = false } = options;
        if (!skipNumber) counters.increment('equation');
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-col-${this.num}-${counters.get('equation')}`);
        if (label && !skipNumber) state.formulaMap[label] = { number, id };
        const linkHtml = (id && !skipNumber) ? `<a href="#${id}" class="permalink-formula" title="链接">¶</a>` : '';

        return this._add(`
          <div class="math-display-block color-mode" style="--fcolor:${color}" id="${id || ''}">
            <div class="math-scroll-view"><div class="math-content">$$${latex}$$</div></div>
            <div class="math-info">
              ${!skipNumber ? `<span class="math-number" style="color:${color}; font-weight:bold;">(${number})</span>` : ""}
              ${name ? `<span class="math-name">${utils.escapeHtml(name)}</span>` : ""}
              ${linkHtml}
            </div>
          </div>
        `);
      },

      /* 3. 公式盒子 */
      formulaBox(htmlContent, options = {}) {
        const { title = "", label = null, color = "#e24ac1" } = options;
        counters.increment('formulaBox');
        const number = `${this.num}.${counters.get('formulaBox')}`;
        const id = label ? label : `box-${this.num}-${counters.get('formulaBox')}`;
        if (label) state.formulaMap[label] = { number, id };
        const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';

        return this._add(`
          <div class="block type-formula-box" id="${id}" data-generated="1" style="--box-color:${color};">
            <div class="env-heading">
              <a href="#${id}" class="env-link" title="点击复制链接">
                <span class="env-label">公式</span>
                <span class="env-num">${number}</span>
              </a>
              ${titleHtml}
            </div>
            <div class="env-body">${htmlContent}</div>
          </div>
        `);
      },

      /* 4. 图片插入 (新增!) */
      image(src, caption = "", width = "100%") {
        // 如果是 svg，width 默认给小一点可能更好看，比如 80%
        // 但为了通用，默认给 100% 或者 auto
        return this._add(`
          <div class="block-image" style="text-align: center; margin: 2em 0;">
            <img src="${src}" alt="${utils.escapeHtml(caption)}" style="max-width: ${width}; height: auto; border-radius: 4px;">
            ${caption ? `<div class="image-caption" style="font-size: 0.9em; color: var(--muted); margin-top: 0.5em; font-style: italic;">${utils.escapeHtml(caption)}</div>` : ''}
          </div>
        `);
      },

      /* 5. 警告/提示/引用/代码 */
      warning(title, html) {
        const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';
        return this._add(`<div class="block type-warning" data-generated="1"><div class="env-heading"><span class="env-label">⚠️ ${config.language === 'en' ? 'Warning' : '警告'}</span>${titleHtml}</div><div class="env-body">${html}</div></div>`);
      },
      tip(title, html) {
        const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';
        return this._add(`<div class="block type-tip" data-generated="1"><div class="env-heading"><span class="env-label">💡 ${config.language === 'en' ? 'Tip' : '提示'}</span>${titleHtml}</div><div class="env-body">${html}</div></div>`);
      },
      quote(text, author = "") {
        return this._add(`<blockquote class="custom-quote"><p>${text}</p>${author ? `<cite>— ${utils.escapeHtml(author)}</cite>` : ''}</blockquote>`);
      },
      code(code, language = "") {
        return this._add(`<pre><code class="language-${language}">${utils.escapeHtml(code)}</code></pre>`);
      }
    };

    const chapId = `chap-${chapterNum}`;
    chap.content.push(`<h2 id="${chapId}" data-generated="1">${utils.escapeHtml(title)}</h2>`);

    // ==================== 批量生成环境 (读取 Config) ====================
    const envKeys = Object.keys(config.environments).filter(k => k !== 'default');
    
    envKeys.forEach(type => {
      chap[type] = function(title = "", html = "") {
        if (arguments.length === 1) { html = title; title = ""; }
        counters.increment(type);
        const number = `${chapterNum}.${counters.get(type)}`;
        
        let id = generateId(type, number);
        const matchLabel = html.match(/\\label\{(.+?)\}/);
        if (matchLabel) {
          const customLabel = matchLabel[1];
          id = customLabel;
          state.formulaMap[customLabel] = { number, id, type };
          html = html.replace(/\\label\{(.+?)\}/g, "");
        }
        
        const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';
        
        // 从 Config 获取颜色和名称
        const color = utils.getEnvColor(type);
        const envName = utils.getEnvName(type);
        
        return this._add(`
          <div class="block type-${type}" id="${id}" data-generated="1" style="--color:${color}; border-left: 4px solid ${color};">
            <div class="env-heading">
              <a href="#${id}" class="env-link" title="点击复制链接" style="color:${color};">
                <span class="env-label" style="font-weight:600;">${envName}</span>
                <span class="env-num">${number}</span>
              </a>
              ${titleHtml}
            </div>
            <div class="env-body">${html}</div>
          </div>
        `);
      };
    });

    state.chapters.push(chap);
    return chap;
  };
})();