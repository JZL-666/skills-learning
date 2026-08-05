// nav.js — 课程页导航条组件（配合 toc-data.js 使用）
// 用法：页面 HTML 内放 <nav id="course-nav"></nav>（可放多个，将全部渲染），
// 并在 </body> 前依次引入 ../assets/toc-data.js 与本文件。
// 上一课/下一课/下拉跳转全部由 COURSE_TOC 计算；所有参考链接
// 从 COURSE_REFS 自动渲染；页面文件本身零维护。
(function () {
  var navs = document.querySelectorAll('#course-nav');
  if (!navs.length || !window.COURSE_TOC) return;
  var toc = window.COURSE_TOC;
  var here = decodeURIComponent(location.pathname.split('/').pop());
  var idx = -1;
  toc.forEach(function (c, i) { if (c.file === here) idx = i; });

  // 当前页面是否在 reference/ 下：决定 reference 链接和课程链接的相对路径
  var inReference = location.pathname.indexOf('/reference/') !== -1;
  var refPrefix = inReference ? '' : '../reference/';
  var coursePrefix = inReference ? '../lessons/' : './';

  // 1. 目录（永远在最左）
  var html = '<a href="../index.html">🏠 目录</a>';
  // 2. COURSE_REFS 中所有内部参考链接（自动从 toc-data.js 渲染）
  if (window.COURSE_REFS) {
    window.COURSE_REFS.forEach(function (r) {
      if (r.url) return; // 外部链接不进 nav
      html += '<a href="' + refPrefix + r.file + '">' + r.title + '</a>';
    });
  }
  // 3. 课程导航（上一课 / 下一课 / 跳转下拉）—— 仅在 lessons 页有意义
  if (idx > 0) html += '<a href="' + coursePrefix + toc[idx - 1].file + '">← 上一课</a>';
  if (idx >= 0 && idx < toc.length - 1) html += '<a href="' + coursePrefix + toc[idx + 1].file + '">下一课 →</a>';

  var sel = '<select id="toc-jump"><option value="">跳转到某一课…</option>';
  toc.forEach(function (c, i) {
    sel += '<option value="' + coursePrefix + c.file + '"' + (i === idx ? ' selected' : '') + '>' + c.title + '</option>';
  });
  sel += '</select>';
  html += sel;

  // 4. 渲染到所有 nav 占位符（顶部 + 底部）
  navs.forEach(function (nav) {
    nav.innerHTML = html;
    var sj = nav.querySelector('#toc-jump');
    if (sj) {
      sj.addEventListener('change', function () {
        if (this.value && this.value !== './' + here && this.value !== '../lessons/' + here) location.href = this.value;
      });
    }
  });
})();
