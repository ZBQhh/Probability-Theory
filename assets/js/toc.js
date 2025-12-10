/* ==========================================================================
   FILE: assets/js/toc.js
   描述: 目录生成与交互逻辑 (支持折叠/展开 + 自动隐藏按钮)
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
      const text = textContent.replace(/^\d+(\.\d+)?\s*/, "").trim();

      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = `${num} ${text}`;
      link.className = "toc-link";
      link.onclick = (e) => this.handleLinkClick(e, id);

      if (tagName === "H2") {
        const li = document.createElement("li");
        li.className = "toc-item-h2";
        
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
  },

  setActive(targetId) {
    document.querySelectorAll(".toc a").forEach(l => l.classList.remove("active"));
    const active = document.querySelector(`.toc a[href="#${targetId}"]`);
    if (active) {
      active.classList.add("active");
      const parentLi = active.closest('.toc-item-h2');
      if (parentLi) {
        parentLi.classList.remove("collapsed");
      }
    }
  },

  // --- 侧边栏开关逻辑 ---
  open() {
    document.querySelector(".sidebar")?.classList.add("open");
    document.querySelector(".toc-overlay")?.classList.add("show");
    // NEW: 打开侧边栏时，强制隐藏目录按钮
    document.querySelector(".toc-toggle")?.classList.add("hidden");
  },

  close() {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".toc-overlay")?.classList.remove("show");
    // NEW: 关闭侧边栏时，恢复显示目录按钮
    document.querySelector(".toc-toggle")?.classList.remove("hidden");
  },

  bindEvents() {
    // 顶部汉堡菜单点击
    const toggleBtn = document.querySelector(".toc-toggle");
    toggleBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.open();
    });

    // 遮罩层点击关闭
    document.querySelector(".toc-overlay")?.addEventListener("click", () => this.close());

    // NEW: 监听滚动事件，控制按钮显隐
    let lastScrollY = window.scrollY;
    
    window.addEventListener("scroll", () => {
      // 如果侧边栏是打开状态，不要执行滚动逻辑（保持按钮隐藏）
      if (document.querySelector(".sidebar")?.classList.contains("open")) return;

      const currentScrollY = window.scrollY;
      
      // 增加一个阈值(10px)，防止微小抖动触发
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 向下滚动 且 滚动超过100px -> 隐藏按钮
        toggleBtn?.classList.add("hidden");
      } else {
        // 向上滚动 -> 显示按钮
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