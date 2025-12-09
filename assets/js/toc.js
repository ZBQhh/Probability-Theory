/* ==========================================================================
   FILE: assets/js/toc.js
   描述: 目录生成与交互逻辑
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
      const text = textContent.replace(/^\s*\d+(\.\d+)?\s*/, "").trim();

      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = `${num} ${text}`;
      link.onclick = (e) => this.handleLinkClick(e, id);

      if (tagName === "H2") {
        const li = document.createElement("li");
        li.className = "toc-h2";
        
        const row = document.createElement("div");
        row.className = "toc-row"; // 需要在 CSS 补充此样式确保对齐
        
        const caret = document.createElement("span");
        caret.className = "caret";
        
        // 折叠交互
        const toggleRow = document.createElement("div");
        toggleRow.className = "collapse-toggle";
        toggleRow.appendChild(link);
        toggleRow.appendChild(caret);
        toggleRow.onclick = (e) => {
          if(e.target !== link) {
            subList.classList.toggle("open");
            li.classList.toggle("collapsed");
          }
        };

        const subList = document.createElement("ul");
        subList.className = "toc-sub";

        li.appendChild(toggleRow);
        li.appendChild(subList);
        tocList.appendChild(li);
        lastH2Li = li;
      } else {
        const li = document.createElement("li");
        li.className = "toc-h3";
        li.appendChild(link);
        if (lastH2Li) lastH2Li.querySelector(".toc-sub").appendChild(li);
      }
    });
  },

  handleLinkClick(e, targetId) {
    e.preventDefault();
    this.close();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    this.setActive(targetId);
  },

  setActive(targetId) {
    document.querySelectorAll("#tocList a").forEach(l => l.classList.remove("active"));
    const active = document.querySelector(`#tocList a[href="#${targetId}"]`);
    if (active) active.classList.add("active");
  },

  // 侧边栏开关逻辑
  open() {
    document.querySelector(".sidebar")?.classList.add("open");
    document.querySelector(".toc-overlay")?.classList.add("show");
    document.querySelector(".toc-toggle")?.classList.add("hidden");
  },

  close() {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".toc-overlay")?.classList.remove("show");
    document.querySelector(".toc-toggle")?.classList.remove("hidden");
  },

  bindEvents() {
    document.querySelector(".toc-toggle")?.addEventListener("click", () => this.open());
    document.querySelector(".toc-overlay")?.addEventListener("click", () => this.close());
  },

  initScrollSpy() {
    const headings = [...document.querySelectorAll("main.content h2, h3")];
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) this.setActive(visible[0].target.id);
    }, { threshold: [0.1] });

    headings.forEach(h => this.observer.observe(h));
  }
};
