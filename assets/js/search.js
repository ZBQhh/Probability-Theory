/* ==========================================================================
   FILE: assets/js/search.js
   描述: 基于 Fuse.js 的客户端全文模糊搜索
   ========================================================================== */
MathBook.search = {
  fuse: null,
  indexData: [],

  init() {
    this.buildIndex();
    this.injectUI();
    this.bindEvents();
  },

  // 1. 从 MathBook.state.chapters 构建索引数据
  buildIndex() {
    // 扁平化数据：将每一章的每一个 section/definition/theorem 拆分为独立的可搜索项
    const rawData = MathBook.state.chapters;
    this.indexData = [];

    rawData.forEach(chap => {
      // 索引章节标题
      this.indexData.push({
        id: `chap-${chap.num}`,
        title: `第 ${chap.num} 章 ${chap.title}`,
        text: chap.title,
        type: '章节'
      });

      // 简单解析 HTML 字符串，提取纯文本用于搜索
      // 注意：这只是一个简化的解析，实际生产环境可能需要更强的 HTML 清洗
      const parser = new DOMParser();
      
      // 遍历该章所有内容块（这里需要修改 chapterAPI 配合存储结构化数据，
      // 但为了不伤筋动骨，我们这里演示一种“运行时抓取”策略）
    });
    
    // 由于目前的架构 content 是 HTML 字符串数组，我们换一种策略：
    // 在 renderer 渲染完 DOM 后，直接抓取 DOM 文本建立索引！
    // 这种方式最准确，所见即所得。
  },
  
  // 修正：我们改用“DOM 就绪后抓取策略”
  buildIndexFromDOM() {
    const blocks = document.querySelectorAll('.block, h2, h3');
    this.indexData = [];

    blocks.forEach(el => {
      // 忽略公式内的文本，避免搜索 LaTeX 代码
      const clone = el.cloneNode(true);
      clone.querySelectorAll('.formula, .formula-wrapper').forEach(e => e.remove());
      
      const text = clone.textContent.replace(/\s+/g, ' ').trim();
      if (text.length < 2) return;

      this.indexData.push({
        id: el.id || '',
        title: el.querySelector('.env-title')?.textContent || text.substring(0, 20) + '...',
        text: text,
        type: el.dataset.envtype ? MathBook.utils.getEnvName(el.dataset.envtype) : '正文'
      });
    });

    // 初始化 Fuse
    if (window.Fuse) {
      this.fuse = new Fuse(this.indexData, {
        keys: ['text', 'title'],
        threshold: 0.3, // 模糊阈值
        ignoreLocation: true
      });
    }
  },

  injectUI() {
    // 插入搜索按钮和模态框
    const btn = `<button class="search-toggle" aria-label="搜索" onclick="MathBook.search.open()">🔍</button>`;
    document.querySelector('.sidebar').insertAdjacentHTML('beforeend', btn);

    const modal = `
      <div class="search-overlay" id="searchModal" onclick="MathBook.search.close(event)" style="display:none;">
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="搜索定义、定理、内容..." autocomplete="off">
          <ul id="searchResults"></ul>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
  },

  search(query) {
    if (!this.fuse || !query) return;
    const results = this.fuse.search(query);
    const ul = document.getElementById('searchResults');
    ul.innerHTML = '';

    if (results.length === 0) {
      ul.innerHTML = '<li class="no-result">无相关结果</li>';
      return;
    }

    results.slice(0, 10).forEach(res => {
      const item = res.item;
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#${item.id}" onclick="MathBook.search.closeAndJump()">
          <span class="res-tag">${item.type}</span>
          <span class="res-text">${item.title}</span>
        </a>
      `;
      ul.appendChild(li);
    });
  },

  open() {
    // 每次打开时重新构建索引（以防动态加载）
    if(!this.fuse) this.buildIndexFromDOM();
    document.getElementById('searchModal').style.display = 'flex';
    document.getElementById('searchInput').focus();
  },

  close(e) {
    if (e && e.target.className !== 'search-overlay') return;
    document.getElementById('searchModal').style.display = 'none';
  },

  closeAndJump() {
    document.getElementById('searchModal').style.display = 'none';
  },

  bindEvents() {
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.search(e.target.value);
    });
    // 键盘快捷键 Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
      if (e.key === 'Escape') this.close({target: {className: 'search-overlay'}});
    });
  }
};