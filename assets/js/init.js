/* ==========================================================================
   FILE: assets/js/init.js
   描述: 应用入口与错误边界处理 (增强健壮性)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.time("MathBook Init");

    // 1. 初始化渲染器
    if (MathBook.renderer) {
      MathBook.renderer.init();
    } else {
      throw new Error("Renderer module not loaded");
    }

    // 2. 渲染章节 (加入错误边界)
    if (!MathBook.state.chapters || MathBook.state.chapters.length === 0) {
      console.warn("[MathBook] No chapters loaded.");
      // 如果没有章节，不一定报错，可能是正在加载
    } else {
      MathBook.renderer.renderChapters();
    }

    // 3. 结构化处理
    MathBook.renderer.generateHeadingNumbering();

    // 4. 目录生成
    if (MathBook.toc) MathBook.toc.init();

    // 5. 核心：引用解析与公式渲染
    await MathBook.renderer.updateRefsAndMathJax();
    
    // 6. [修复] 安全地初始化搜索组件
    // 即使 search.js 加载失败，也不应该阻塞页面其他功能
    if (MathBook.search) {
      MathBook.search.init();
    } else {
      console.warn("[MathBook] Search module not loaded or disabled.");
    }

    console.timeEnd("MathBook Init");
    console.log("MathBook Engine Initialized Successfully.");

  } catch (error) {
    console.error("Critical Error during MathBook initialization:", error);
    // 紧急降级 UI
    document.body.innerHTML = `
      <div style="padding: 2em; color: #d73a49; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 0.5em;">应用加载错误 (Application Error)</h2>
        <p>未能加载书籍内容，请尝试 <strong>清除浏览器缓存</strong> 或 <strong>强制刷新 (Ctrl+F5)</strong>。</p>
        <p>Failed to load content. Please clear browser cache.</p>
        <details style="margin-top: 1em; padding: 1em; background: #f6f8fa; border-radius: 6px;">
          <summary style="cursor: pointer; font-weight: bold;">错误详情 (Error Details)</summary>
          <pre style="margin-top: 1em; white-space: pre-wrap;">${error.stack || error.message}</pre>
        </details>
      </div>
    `;
  }
});