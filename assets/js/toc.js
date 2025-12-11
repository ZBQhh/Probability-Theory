/* ==========================================================================
   FILE: assets/js/toc.js
   描述: 目录生成与交互逻辑 (每次打开都重置为折叠状态)
   ========================================================================== */
MathBook.toc = {
  init() {
    this.build();
    this.bindEvents();
    this.initScrollSpy();
  },

  build() {
    const tocList = document.getElementById("tocList");
    const container = document.querySelector("main.content");
    if (!tocList || !container) return;

    tocList.innerHTML = "";
    let lastH2Li = null;

    container.querySelectorAll("h2, h3").forEach(heading => {
      const { id, textContent, tagName } = heading;
      const num = heading.dataset.number;
      // 移除标题中的序号，防止目录里显示双重序号
      const text = textContent.replace(/^\d+(\.\d+)?\s*/, "").trim();

      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = `${num} ${text}`;
      link.className = "toc-link";
      link.onclick = (e) => this.handleLinkClick(e, id);

      if (tagName === "H2") {
        const li = document.createElement("li");
        
        // 默认初始化也是折叠的
        li.className = "toc-item-h2 collapsed";
        
        const row = document.createElement("div");
        row.className = "toc-row";
        
        const toggleBtn = document.createElement("span");
        toggleBtn.className = "toc-toggle-btn";
        toggleBtn.innerHTML = "▼"; 
        toggleBtn.title = "折叠/展开";
        
        toggleBtn.onclick = (e) => {
          e.stopPropagation(); 
          li.classList.toggle("collapsed");
        };

        row.appendChild(link);
        row.appendChild(toggleBtn);
        li.appendChild(row);

        const subList = document.createElement("ul");
        subList.className = "toc-sub"; 
        
        li.appendChild(subList);
        tocList.appendChild(li);
        lastH2Li = li; 
      } else {
        if (lastH2Li) {
          const li = document.createElement("li");
          li.className = "toc-item-h3";
          li.appendChild(link);
          lastH2Li.querySelector(".toc-sub").appendChild(li);
        }
      }
    });
  },

  handleLinkClick(e, targetId) {
    e.preventDefault();
    if (window.innerWidth < 900) {
      this.close();
    }
    
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, null, `#${targetId}`);
    }
    
    this.setActive(targetId);

    // 点击链接时，强制展开当前父级，让用户看到子菜单
    const activeLink = document.querySelector(`.toc a[href="#${targetId}"]`);
    if (activeLink) {
      const parentLi = activeLink.closest('.toc-item-h2');
      if (parentLi) {
        parentLi.classList.remove("collapsed");
      }
    }
  },

  setActive(targetId) {
    document.querySelectorAll(".toc a").forEach(l => l.classList.remove("active"));
    const active = document.querySelector(`.toc a[href="#${targetId}"]`);
    if (active) {
      active.classList.add("active");
      // 注意：这里删除了自动 remove("collapsed") 的代码
      // 保证滚动页面时目录不会自己弹开
    }
  },

  // --- 侧边栏开关逻辑 ---
  // --- 侧边栏开关逻辑 ---
  open() {
    // 1. 显示侧边栏和遮罩
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.add("open");
    document.querySelector(".toc-overlay")?.classList.add("show");
    
    // 2. 隐藏悬浮按钮
    document.querySelector(".toc-toggle")?.classList.add("hidden");

    // 3. 强制重置所有菜单为折叠状态
    document.querySelectorAll('.toc-item-h2').forEach(li => {
      li.classList.add('collapsed');
    });
    
    // 💥 修正：滚动条通常在 .sidebar 上，而不是 #tocList 上
    if (sidebar) {
      sidebar.scrollTop = 0;
    }
  },

  close() {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".toc-overlay")?.classList.remove("show");
    document.querySelector(".toc-toggle")?.classList.remove("hidden");
  },

  bindEvents() {
    const toggleBtn = document.querySelector(".toc-toggle");
    toggleBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.open();
    });
    
    document.querySelector(".toc-overlay")?.addEventListener("click", () => this.close());

    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      if (document.querySelector(".sidebar")?.classList.contains("open")) return;
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        toggleBtn?.classList.add("hidden");
      } else {
        toggleBtn?.classList.remove("hidden");
      }
      lastScrollY = currentScrollY;
    });
  },

  initScrollSpy() {
    const headings = [...document.querySelectorAll("main.content h2, h3")];
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) {
        this.setActive(visible[0].target.id);
      }
    }, { threshold: [0, 1.0], rootMargin: "-20% 0px -60% 0px" }); 

    headings.forEach(h => this.observer.observe(h));
  }
};