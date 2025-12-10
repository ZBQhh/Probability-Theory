/* ==========================================================================
   FILE: assets/js/search.js
   描述: 客户端全文模糊搜索 (基于 DOM 索引 + Fuse.js)
   依赖: Fuse.js (需在 index.html 引入), components.css
   ========================================================================== */
MathBook.search = {
  fuse: null,
  indexData: [],
  isOpen: false,

  // 配置项
  config: {
    fuseOptions: {
      keys: [
        { name: 'title', weight: 0.7 },  // 标题权重高
        { name: 'text', weight: 0.3 },   // 正文权重低
        { name: 'type', weight: 0.5 }    // 类型名称
      ],
      threshold: 0.3, // 模糊阈值 (0.0=精确匹配, 1.0=任意匹配)
      ignoreLocation: true,
      minMatchCharLength: 2
    }
  },

  /**
   * 初始化入口
   * 应在 MathBook.renderer.renderChapters() 之后调用
   */
  init() {
    // 1. 检查依赖
    if (typeof Fuse === 'undefined') {
      console.warn('[MathBook] Fuse.js not loaded. Search disabled.');
      return;
    }

    // 2. 注入 UI (模态框)
    this.injectUI();

    // 3. 建立索引 (延时执行，确保 DOM 已完全渲染)
    setTimeout(() => {
      this.buildIndexFromDOM();
      console.log(`[MathBook] Search index built: ${this.indexData.length} items.`);
    }, 500);

    // 4. 绑定事件
    this.bindEvents();
  },

  /**
   * 核心：从页面 DOM 抓取可搜索内容
   * 策略：遍历 H2, H3, 和 .block (数学环境)
   */
  buildIndexFromDOM() {
    this.indexData = [];
    const container = document.querySelector('main.content');
    if (!container) return;

    // A. 索引章节标题 (H2)
    container.querySelectorAll('h2').forEach(el => {
      this.addToIndex(el, '章节', el.textContent, 10);
    });

    // B. 索引小节标题 (H3)
    container.querySelectorAll('h3').forEach(el => {
      this.addToIndex(el, '小节', el.textContent, 8);
    });

    // C. 索引数学环境 (.block)
    container.querySelectorAll('.block').forEach(el => {
      // 1. 获取 ID
      const id = el.id;
      if (!id) return;

      // 2. 获取类型名称 (从 CSS类名 或 config 获取)
      // 提取类名中的 type-xxx
      const typeClass = Array.from(el.classList).find(c => c.startsWith('type-'));
      const typeKey = typeClass ? typeClass.replace('type-', '') : 'default';
      const typeName = MathBook.utils.getEnvName(typeKey); // 使用 config.js 中的中文名

      // 3. 获取标题 (env-title) 和 编号 (env-num)
      const titleEl = el.querySelector('.env-title');
      const numEl = el.querySelector('.env-num');
      const titleText = titleEl ? titleEl.textContent : '';
      const numText = numEl ? numEl.textContent : '';
      
      const displayTitle = `${typeName} ${numText} ${titleText}`.trim();

      // 4. 获取正文 (移除标题部分，避免重复)
      const bodyEl = el.querySelector('.env-body');
      let bodyText = bodyEl ? bodyEl.textContent : el.textContent;
      
      // 清理文本: 移除多余空格、换行、LaTeX 符号的大致清理
      bodyText = bodyText.replace(/\s+/g, ' ').trim();

      this.addToIndex(el, typeName, displayTitle, 5, bodyText);
    });
  },

  /**
   * 辅助：添加单条索引
   */
  addToIndex(el, type, title, priority, text = "") {
    if (!el.id) return; // 无锚点无法跳转
    
    this.indexData.push({
      id: el.id,
      type: type,
      title: title,
      text: text || title, // 如果没有正文，用标题填充
      priority: priority
    });
  },

  /**
   * 初始化 Fuse 实例
   */
  initFuse() {
    if (this.indexData.length > 0 && !this.fuse) {
      this.fuse = new Fuse(this.indexData, this.config.fuseOptions);
    }
  },

  /**
   * 💥 修复点：动态注入 HTML 结构，按钮位置修正
   * 对应 components.css 中的 .search-toggle, .search-overlay 等
   */
  injectUI() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 1. 在侧边栏插入搜索按钮 (如果尚未存在)
    if (!document.querySelector('.search-toggle')) {
      const btn = document.createElement('button');
      btn.className = 'search-toggle';
      // 图标 + 文字
      btn.innerHTML = `
        <span style="font-size:1.1em">🔍</span>
        <span>搜索内容 (Ctrl+K)</span>
      `;
      btn.onclick = () => this.open();
      
      // 💥 关键修复：插入到 .brand (Logo) 的后面，而不是 sidebar 的最后
      const brand = sidebar.querySelector('.brand');
      if (brand) {
        brand.insertAdjacentElement('afterend', btn);
      } else {
        // 如果找不到 brand，才插到最前面
        sidebar.insertBefore(btn, sidebar.firstChild);
      }
    }

    // 2. 插入全屏搜索模态框
    if (!document.getElementById('searchModal')) {
      const modalHtml = `
        <div class="search-overlay" id="searchModal">
          <div class="search-box">
            <input type="text" id="searchInput" placeholder="搜索定理、定义、内容..." autocomplete="off">
            <ul id="searchResults"></ul>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  },

  /**
   * 执行搜索
   */
  performSearch(query) {
    // 懒加载 Fuse
    if (!this.fuse) this.initFuse();

    const ul = document.getElementById('searchResults');
    ul.innerHTML = '';

    if (!query || query.trim().length === 0) {
      return;
    }

    const results = this.fuse.search(query);

    if (results.length === 0) {
      ul.innerHTML = '<li style="padding:1em; color:var(--muted, #888); text-align:center;">未找到相关内容</li>';
      return;
    }

    // 仅显示前 10 条结果
    results.slice(0, 10).forEach(res => {
      const item = res.item;
      const li = document.createElement('li');
      
      // 构建列表项 (对应 components.css 中的样式)
      li.innerHTML = `
        <a href="#${item.id}" data-id="${item.id}">
          <span class="res-tag">${item.type}</span>
          <span class="res-text">
            <strong>${item.title}</strong>
            <span style="font-size:0.85em; opacity:0.7; margin-left:0.5em;">
              ${item.text.substring(0, 30)}...
            </span>
          </span>
        </a>
      `;
      
      // 点击事件处理
      li.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
        this.jumpTo(item.id);
      });

      ul.appendChild(li);
    });
  },

  /**
   * 跳转逻辑
   */
  jumpTo(id) {
    const target = document.getElementById(id);
    if (target) {
      // 1. 滚动
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 2. 高亮动画 (复用 base.css 中的 .highlight-flash)
      target.classList.remove('highlight-flash');
      void target.offsetWidth; // 触发重绘
      target.classList.add('highlight-flash');
      
      // 3. 更新 URL hash
      history.pushState(null, null, `#${id}`);
      
      // 4. 移动端跳转后自动关闭侧边栏
      if (window.innerWidth < 900 && MathBook.toc && MathBook.toc.close) {
        MathBook.toc.close();
      }
    }
  },

  /**
   * 打开搜索框
   */
  open() {
    this.isOpen = true;
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    modal.style.display = 'flex'; // 对应 CSS flex 布局
    input.value = '';
    document.getElementById('searchResults').innerHTML = '';
    
    // 延时聚焦，防止移动端键盘弹起卡顿
    setTimeout(() => input.focus(), 50);
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
  },

  /**
   * 关闭搜索框
   */
  close() {
    this.isOpen = false;
    document.getElementById('searchModal').style.display = 'none';
    document.body.style.overflow = ''; // 恢复滚动
  },

  /**
   * 事件绑定
   */
  bindEvents() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');

    // 1. 输入监听 (防抖 200ms)
    let debounceTimer;
    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 200);
    });

    // 2. 点击遮罩层关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    // 3. 全局键盘事件
    document.addEventListener('keydown', (e) => {
      // Ctrl+K 唤起
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.isOpen ? this.close() : this.open();
      }
      
      // Esc 关闭
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
};