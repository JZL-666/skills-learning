// nav.js — 课程页导航条组件（配合 toc-data.js 使用）
// 用法：课程 HTML 内放 <nav id="course-nav"></nav>，
// 并在 </body> 前依次引入 ../assets/toc-data.js 与本文件。
// 上一课/下一课/下拉跳转全部由 COURSE_TOC 计算，课程文件本身零维护。
(function () {
  var nav = document.getElementById('course-nav');
  if (!nav || !window.COURSE_TOC) return;
  var toc = window.COURSE_TOC;
  var here = decodeURIComponent(location.pathname.split('/').pop());
  var idx = -1;
  toc.forEach(function (c, i) { if (c.file === here) idx = i; });

  var html = '<a href="../index.html">🏠 目录</a>';
  html += '<a href="../reference/glossary.html">📖 术语表</a>';
  if (idx > 0) html += '<a href="./' + toc[idx - 1].file + '">← 上一课</a>';
  if (idx >= 0 && idx < toc.length - 1) html += '<a href="./' + toc[idx + 1].file + '">下一课 →</a>';

  var sel = '<select id="toc-jump"><option value="">跳转到某一课…</option>';
  toc.forEach(function (c, i) {
    sel += '<option value="./' + c.file + '"' + (i === idx ? ' selected' : '') + '>' + c.title + '</option>';
  });
  sel += '</select>';

  nav.innerHTML = html + sel;
  document.getElementById('toc-jump').addEventListener('change', function () {
    if (this.value && this.value !== './' + here) location.href = this.value;
  });
})();
