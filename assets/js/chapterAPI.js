/* ==========================================================================
   FILE: assets/js/chapterAPI.js
   描述: 章节内容构建 API (结构完全统一版)
   ========================================================================== */
(function() {
  const { state, counters, utils } = MathBook;

  function generateId(type, number) {
    return `${type}-${number.replace(/\./g, '-')}`;
  }

  function renderPermalink(id) {
    return `<a href="#${id}" class="permalink" aria-label="本段链接" title="复制链接">¶</a>`;
  }

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
        return this._add(`<h3 data-generated="1">${utils.escapeHtml(secTitle)}</h3>`);
      },

      /* ==================== 1. 普通公式 ==================== */
      formula(latex, options = {}) {
        const { skipNumber = false, label = null } = options;
        if (!skipNumber) counters.increment('equation');
        
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-${this.num}-${counters.get('equation')}`);
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        return this._add(`
          <div class="math-display-block" id="${id || ''}" ${skipNumber ? 'data-no-num="true"' : ''}>
            <div class="math-scroll-view">
              <div class="math-content">$$${latex}$$</div>
            </div>
            <div class="math-info">
              <span class="math-number">${number}</span>
              ${(id && !skipNumber) ? renderPermalink(id) : ''}
            </div>
          </div>
        `);
      },

      /* ==================== 2. 彩色公式 (结构与普通公式完全一致) ==================== */
      formulaColor(latex, options = {}) {
        const { color = "#409EFF", name = null, label = null, skipNumber = false } = options;
        if (!skipNumber) counters.increment('equation');
        
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-col-${this.num}-${counters.get('equation')}`);
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        return this._add(`
          <div class="math-display-block color-mode" style="--fcolor:${color}" id="${id || ''}">
            <div class="math-scroll-view">
              <div class="math-content">$$${latex}$$</div>
            </div>
            <div class="math-info">
              ${!skipNumber ? `<span class="math-number" style="color:${color}; font-weight:bold;">${number}</span>` : ""}
              ${name ? `<span class="math-name">${utils.escapeHtml(name)}</span>` : ""}
              ${(id && !skipNumber) ? renderPermalink(id) : ''}
            </div>
          </div>
        `);
      },

      /* ==================== 3. 公式盒子 (保持不变) ==================== */
      formulaBox(htmlContent, options = {}) {
        const { title = "", label = null, color = "#e24ac1" } = options;
        counters.increment('formulaBox');
        const number = `${this.num}.${counters.get('formulaBox')}`;
        const id = label ? label : `box-${this.num}-${counters.get('formulaBox')}`;
        if (label) state.formulaMap[label] = { number, id };

        return this._add(`
          <div class="block type-formula-box" id="${id}" data-generated="1" style="--box-color:${color};">
            ${renderPermalink(id)}
            <div class="env-heading" style="display:flex; align-items:center; gap:0.5em;">
              <span class="env-label">公式</span>
              <span class="env-num">${number}</span>
              <span class="env-title">${utils.escapeHtml(title)}</span>
            </div>
            <div class="env-body">${htmlContent}</div>
          </div>
        `);
      }
    };

    const chapId = `chap-${chapterNum}`;
    chap.content.push(`<h2 id="${chapId}" data-generated="1">${utils.escapeHtml(title)}</h2>`);

    ["definition", "theorem", "corollary", "example", "note"].forEach(type => {
      chap[type] = function(title, html) {
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
        return this._add(`
          <div class="block type-${type}" id="${id}" data-generated="1">
            ${renderPermalink(id)}
            <div class="env-heading">
              <span class="env-label">${utils.getEnvName(type)}</span>
              <span class="env-num">${number}</span>
              <span class="env-title">${utils.escapeHtml(title)}</span>
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