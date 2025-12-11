/* ==========================================================================
   FILE: assets/js/chapterAPI.js
   描述: 章节内容构建 API (支持多级标题编号 + TikZ/Image)
   ========================================================================== */
(function() {
  // 确保 config 已加载
  const { state, counters, utils, config } = MathBook;

  function generateId(type, number) {
    return `${type}-${number.replace(/\./g, '-')}`;
  }

  // ==================== Chapter 主逻辑 ====================
  window.chapter = function(title) {
    state.currentChapterIndex++;
    const chapterNum = state.currentChapterIndex + 1;
    counters.reset(); // 重置所有计数器

    const chap = {
      num: chapterNum,
      title,
      content: [],
      _rendered: false,

      _add(html) { this.content.push(html); return this; },
      text(html) { return this._add(`<p>${html}</p>`); },
      
      // 💥 1. Section (二级标题)
      section(secTitle) {
        counters.increment('section');
        
        // 关键：进入新的一节时，重置 subsection 计数器
        if(MathBook.counters.data) MathBook.counters.data.subsection = 0;

        return this._add(`<h3 id="sec-${this.num}-${counters.get('section')}" data-generated="1">${utils.escapeHtml(secTitle)}</h3>`);
      },

      // 💥 2. Subsection (三级标题)
      subsection(subTitle) {
        counters.increment('subsection');
        
        // 生成 ID: sec-{章}-{节}-{小节}
        const id = `sec-${this.num}-${counters.get('section')}-${counters.get('subsection')}`;
        
        return this._add(`<h4 id="${id}" data-generated="1">${utils.escapeHtml(subTitle)}</h4>`);
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

      /* 4. 图片插入 */
      image(src, caption = "", width = "100%") {
        return this._add(`
          <div class="block-image" style="text-align: center; margin: 2em 0;">
            <img src="${src}" alt="${utils.escapeHtml(caption)}" style="max-width: ${width}; height: auto; border-radius: 4px;">
            ${caption ? `<div class="image-caption" style="font-size: 0.9em; color: var(--muted); margin-top: 0.5em; font-style: italic;">${utils.escapeHtml(caption)}</div>` : ''}
          </div>
        `);
      },

      /* 5. TikZ 绘图 */
      tikz(code, caption = "") {
        return this._add(`
          <div class="block-image block-tikz" style="text-align: center; margin: 2em 0;">
            <script type="text/tikz">
              \\begin{tikzpicture}
                ${code}
              \\end{tikzpicture}
            </script>
            ${caption ? `<div class="image-caption" style="font-size: 0.9em; color: var(--muted); margin-top: 0.5em; font-style: italic;">${utils.escapeHtml(caption)}</div>` : ''}
          </div>
        `);
      },

      /* 6. 警告/提示/引用/代码 */
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

    // ==================== 批量生成环境 ====================
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