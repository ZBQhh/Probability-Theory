/* ==========================================================================
   FILE: assets/js/toc.js
   描述: 目录生成与交互逻辑 (支持折叠/展开)
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
        li.className = "toc-item-h2";
        
        // 1. 创建 Flex 容器，容纳链接和折叠按钮
        const row = document.createElement("div");
        row.className = "toc-row";
        
        // 2. 折叠按钮 (Caret)
        const toggleBtn = document.createElement("span");
        toggleBtn.className = "toc-toggle-btn";
        toggleBtn.innerHTML = "▼"; // 默认展开状态图标
        toggleBtn.title = "折叠/展开";
        
        // 点击按钮触发折叠，不触发跳转
        toggleBtn.onclick = (e) => {
          e.stopPropagation(); // 阻止冒泡
          li.classList.toggle("collapsed");
        };

        row.appendChild(link);
        row.appendChild(toggleBtn);
        li.appendChild(row);

        // 3. 子菜单容器
        const subList = document.createElement("ul");
        subList.className = "toc-sub"; // CSS 控制默认展开，collapsed 类控制隐藏
        
        li.appendChild(subList);
        tocList.appendChild(li);
        lastH2Li = li; // 记录当前 H2，供后续 H3 挂载
      } else {
        // H3 逻辑
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
    // 移动端点击链接后自动收起侧边栏
    if (window.innerWidth < 900) {
      this.close();
    }
    
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // 更新 URL hash
      history.pushState(null, null, `#${targetId}`);
    }
    this.setActive(targetId);
  },

  setActive(targetId) {
    document.querySelectorAll(".toc a").forEach(l => l.classList.remove("active"));
    const active = document.querySelector(`.toc a[href="#${targetId}"]`);
    if (active) {
      active.classList.add("active");
      // 自动展开当前激活的父级目录
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
  },

  close() {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".toc-overlay")?.classList.remove("show");
  },

  bindEvents() {
    // 顶部汉堡菜单
    document.querySelector(".toc-toggle")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.open();
    });
    // 遮罩层点击关闭
    document.querySelector(".toc-overlay")?.addEventListener("click", () => this.close());
  },

  initScrollSpy() {
    const headings = [...document.querySelectorAll("main.content h2, h3")];
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      // 找出当前视口中可见比例最高的标题
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) {
        this.setActive(visible[0].target.id);
      }
    }, { threshold: [0, 1.0], rootMargin: "-20% 0px -60% 0px" }); // 调整检测区域

    headings.forEach(h => this.observer.observe(h));
  }
};