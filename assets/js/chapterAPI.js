/* ==========================================================================
   FILE: assets/js/chapterAPI.js
   描述: 章节内容构建 API (Controller Layer - 逻辑控制)
   ========================================================================== */
(function() {
  const { state, counters, utils, config, templates } = MathBook;

  function generateId(type, number) {
    return `${type}-${number.replace(/\./g, '-')}`;
  }

  window.chapter = function(title) {
    state.currentChapterIndex++;
    const chapterNum = state.currentChapterIndex + 1;
    counters.reset();

    // 章节大标题 HTML
    const chapId = `chap-${chapterNum}`;
    const chapterHtml = `<h2 id="${chapId}" data-generated="1">${utils.escapeHtml(title)}</h2>`;

    const chap = {
      num: chapterNum,
      title,
      content: [chapterHtml], // 初始化放入标题
      _rendered: false,

      // 私有方法：追加内容
      _add(html) { this.content.push(html); return this; },

      // --- 基础文本 ---
      text(html) { return this._add(`<p>${html}</p>`); },
      
      // --- 标题 ---
      section(secTitle) {
        counters.increment('section');
        if(MathBook.counters.data) MathBook.counters.data.subsection = 0; // 重置子节
        const id = `sec-${this.num}-${counters.get('section')}`;
        return this._add(templates.section(id, secTitle));
      },

      subsection(subTitle) {
        counters.increment('subsection');
        const id = `sec-${this.num}-${counters.get('section')}-${counters.get('subsection')}`;
        return this._add(templates.subsection(id, subTitle));
      },

      // --- 公式相关 ---
      formula(latex, options = {}) {
        const { skipNumber = false, label = null } = options;
        if (!skipNumber) counters.increment('equation');
        
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-${this.num}-${counters.get('equation')}`);
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        return this._add(templates.formula(latex, id, number, skipNumber));
      },

      formulaColor(latex, options = {}) {
        const { color = "#409EFF", name = null, label = null, skipNumber = false } = options;
        if (!skipNumber) counters.increment('equation');
        
        const number = skipNumber ? "" : `${this.num}.${counters.get('equation')}`;
        const id = label ? label : (skipNumber ? null : `eq-col-${this.num}-${counters.get('equation')}`);
        if (label && !skipNumber) state.formulaMap[label] = { number, id };

        return this._add(templates.formulaColor(latex, id, number, color, name, skipNumber));
      },

      formulaBox(htmlContent, options = {}) {
        const { title = "", label = null, color = "#e24ac1" } = options;
        counters.increment('formulaBox');
        
        const number = `${this.num}.${counters.get('formulaBox')}`;
        const id = label ? label : `box-${this.num}-${counters.get('formulaBox')}`;
        if (label) state.formulaMap[label] = { number, id };

        return this._add(templates.formulaBox(htmlContent, id, number, title, color));
      },

      // --- 图像 ---
      image(src, caption = "", width = "100%") {
        return this._add(templates.image(src, caption, width));
      },

      tikz(code, caption = "") {
        return this._add(templates.tikz(code, caption));
      },

      // --- 辅助块 ---
      warning(title, html) {
        const label = config.language === 'en' ? 'Warning' : '警告';
        return this._add(templates.alert('warning', title, html, `⚠️ ${label}`));
      },
      tip(title, html) {
        const label = config.language === 'en' ? 'Tip' : '提示';
        return this._add(templates.alert('tip', title, html, `💡 ${label}`));
      },
      quote(text, author = "") {
        return this._add(templates.quote(text, author));
      },
      code(code, lang = "") {
        return this._add(templates.code(code, lang));
      }
    };

    // --- 动态生成数学环境 (Definition, Theorem...) ---
    // 逻辑：遍历 Config -> 计算编号/ID -> 调用 Template -> 存入 Content
    const envKeys = Object.keys(config.environments).filter(k => k !== 'default');
    
    envKeys.forEach(type => {
      chap[type] = function(title = "", html = "") {
        if (arguments.length === 1) { html = title; title = ""; }
        
        counters.increment(type);
        const number = `${chapterNum}.${counters.get(type)}`;
        
        let id = generateId(type, number);
        // 处理 LaTeX label 提取逻辑
        const matchLabel = html.match(/\\label\{(.+?)\}/);
        if (matchLabel) {
          const customLabel = matchLabel[1];
          id = customLabel;
          state.formulaMap[customLabel] = { number, id, type };
          html = html.replace(/\\label\{(.+?)\}/g, "");
        }
        
        const color = utils.getEnvColor(type);
        const envName = utils.getEnvName(type);
        
        return this._add(templates.environment(type, html, id, number, title, color, envName));
      };
    });

    state.chapters.push(chap);
    return chap;
  };
})();