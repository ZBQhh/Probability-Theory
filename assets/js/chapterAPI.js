/* ==========================================================================
   FILE: assets/js/chapterAPI.js
   描述: 章节内容构建 API (增强版：含 ID 生成与锚点)
   ========================================================================== */
(function() {
  const { state, counters, utils } = MathBook;

  // 辅助：生成唯一 ID
  function generateId(type, number) {
    // 将 "1.2" 转换为 "thm-1-2"
    return `${type}-${number.replace(/\./g, '-')}`;
  }

  // 辅助：生成锚点 HTML
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

      _add(html) {
        this.content.push(html);
        return this;
      },

      text(html) {
        return this._add(`<p>${html}</p>`);
      },

      section(secTitle) {
        counters.increment('section');
        const num = `${this.num}.${counters.get('section')}`;
        // H3 也会在 renderer.js 中被再次处理，但这里先不做操作，交给 renderer 生成 ID
        return this._add(`<h3 data-generated="1">${utils.escapeHtml(secTitle)}</h3>`);
      },

      formula(latex, options = {}) {
        const { skipNumber = false, label = null } = options;
        if (!skipNumber) counters.increment('equation');
        
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        // 如果有 label，使用 label 作为 ID 基础，否则使用自动编号
        const id = label ? label : (skipNumber ? null : `eq-${this.num}-${counters.get('equation')}`);
        
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        return this._add(`
          <div class="formula-wrapper"${skipNumber ? ' data-skip-number="true"' : ""} id="${id || ''}">
            <div class="formula">$$${latex}$$</div>
            <div class="equation-num">
              ${number}
              ${(id && !skipNumber) ? renderPermalink(id) : ''}
            </div>
          </div>
        `);
      },

      formulaColor(latex, options = {}) {
        const { color = "#409EFF", name = null, label = null, skipNumber = false } = options;
        if (!skipNumber) counters.increment('equation');
        
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-col-${this.num}-${counters.get('equation')}`);
        
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        return this._add(`
          <div class="formula-wrapper color-formula" style="--fcolor:${color}" id="${id || ''}">
            <div class="formula-core" style="display:flex; align-items:center; justify-content:center; gap:1em;">
              <div class="formula">$$${latex}$$</div>
              <div class="formula-meta">
                ${!skipNumber ? `<span class="equation-num">${number}</span>` : ""}
                ${name ? `<span class="equation-name">${utils.escapeHtml(name)}</span>` : ""}
              </div>
            </div>
            ${(id && !skipNumber) ? `<div style="margin-left:auto">${renderPermalink(id)}</div>` : ''}
          </div>
        `);
      },

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

    // 生成章节主标题
    const chapId = `chap-${chapterNum}`;
    chap.content.push(`<h2 id="${chapId}" data-generated="1">${utils.escapeHtml(title)}</h2>`);

    // 绑定环境块方法
    ["definition", "theorem", "corollary", "example", "note"].forEach(type => {
      chap[type] = function(title, html) {
        counters.increment(type);
        const number = `${chapterNum}.${counters.get(type)}`;
        
        let id = generateId(type, number); // 默认 ID: theorem-1-2

        // 提取 \label{}
        const matchLabel = html.match(/\\label\{(.+?)\}/);
        if (matchLabel) {
          const customLabel = matchLabel[1];
          id = customLabel; // 如果用户定义了 label，优先使用 label 作为 ID
          state.formulaMap[customLabel] = { number, id, type }; // 记录类型，为 Tooltip 做准备
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