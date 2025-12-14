/* ==========================================================================
   FILE: assets/js/templates.js
   描述: HTML 模板生成器 (View Layer)
   ========================================================================== */
(function() {
  window.MathBook = window.MathBook || {};
  
  // 工具函数引用
  const utils = MathBook.utils; // 假设 config.js 已经加载了 utils.escapeHtml

  MathBook.templates = {
    
    // 1. 标题模板
    section(id, title) {
      return `<h3 id="${id}" data-generated="1">${utils.escapeHtml(title)}</h3>`;
    },
    
    subsection(id, title) {
      return `<h4 id="${id}" data-generated="1">${utils.escapeHtml(title)}</h4>`;
    },

    // 2. 公式模板
    formula(latex, id, number, skipNumber) {
      const linkHtml = (id && !skipNumber) ? `<a href="#${id}" class="permalink-formula" title="链接">¶</a>` : '';
      return `
        <div class="math-display-block" id="${id || ''}" ${skipNumber ? 'data-no-num="true"' : ''}>
          <div class="math-scroll-view"><div class="math-content">$$${latex}$$</div></div>
          <div class="math-info">
            <span class="math-number">${number ? `(${number})` : ''}</span>
            ${linkHtml}
          </div>
        </div>
      `;
    },

    // 3. 彩色公式模板
    formulaColor(latex, id, number, color, name, skipNumber) {
      const linkHtml = (id && !skipNumber) ? `<a href="#${id}" class="permalink-formula" title="链接">¶</a>` : '';
      return `
        <div class="math-display-block color-mode" style="--fcolor:${color}" id="${id || ''}">
          <div class="math-scroll-view"><div class="math-content">$$${latex}$$</div></div>
          <div class="math-info">
            ${!skipNumber ? `<span class="math-number" style="color:${color}; font-weight:bold;">(${number})</span>` : ""}
            ${name ? `<span class="math-name">${utils.escapeHtml(name)}</span>` : ""}
            ${linkHtml}
          </div>
        </div>
      `;
    },

    // 4. 公式盒子模板
    formulaBox(htmlContent, id, number, title, color) {
      const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';
      return `
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
      `;
    },

    // 5. 通用环境模板 (定义、定理等)
    environment(type, htmlContent, id, number, title, color, envName) {
      const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';
      return `
        <div class="block type-${type}" id="${id}" data-generated="1" style="--color:${color}; border-left: 4px solid ${color};">
          <div class="env-heading">
            <a href="#${id}" class="env-link" title="点击复制链接" style="color:${color};">
              <span class="env-label" style="font-weight:600;">${envName}</span>
              <span class="env-num">${number}</span>
            </a>
            ${titleHtml}
          </div>
          <div class="env-body">${htmlContent}</div>
        </div>
      `;
    },

    // 6. 图片/TikZ 模板
    image(src, caption, width) {
      return `
        <div class="block-image" style="text-align: center; margin: 2em 0;">
          <img src="${src}" alt="${utils.escapeHtml(caption)}" style="max-width: ${width}; height: auto; border-radius: 4px;">
          ${caption ? `<div class="image-caption" style="font-size: 0.9em; color: var(--muted); margin-top: 0.5em; font-style: italic;">${utils.escapeHtml(caption)}</div>` : ''}
        </div>
      `;
    },

    tikz(code, caption) {
      return `
        <div class="block-image block-tikz" style="text-align: center; margin: 2em 0;">
          <script type="text/tikz">
            \\begin{tikzpicture}
              ${code}
            \\end{tikzpicture}
          </script>
          ${caption ? `<div class="image-caption" style="font-size: 0.9em; color: var(--muted); margin-top: 0.5em; font-style: italic;">${utils.escapeHtml(caption)}</div>` : ''}
        </div>
      `;
    },

    // 7. 警告/提示模板
    alert(type, title, htmlContent, labelText) {
      const titleHtml = (title && title.trim()) ? `<span class="env-title">${utils.escapeHtml(title)}</span>` : '';
      return `
        <div class="block type-${type}" data-generated="1">
          <div class="env-heading">
            <span class="env-label">${labelText}</span>
            ${titleHtml}
          </div>
          <div class="env-body">${htmlContent}</div>
        </div>
      `;
    },
    
    quote(text, author) {
      return `<blockquote class="custom-quote"><p>${text}</p>${author ? `<cite>— ${utils.escapeHtml(author)}</cite>` : ''}</blockquote>`;
    },

    code(code, language) {
      return `<pre><code class="language-${language}">${utils.escapeHtml(code)}</code></pre>`;
    }
  };
})();