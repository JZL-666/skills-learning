# Skills 说明书页面 + 全站导航增强

| 字段 | 值 |
|---|---|
| 日期 | 2026-08-05 |
| 状态 | **Draft（待用户审阅）** |
| 作者 | Qoder（GitHub 项目 AI） |
| 关联项目 | skills-learning（GitHub Pages 课程站） |
| 触发需求 | 用户在浏览 mattpocock/skills 仓库后指出课程站缺少"Skills 说明书"作为参考工具 |

---

## 1. 背景与动机

`skills-learning` 是基于 mattpocock/skills 仓库的 9 课中文自学课程，主线（grilling/TDD/深模组/坏味道/工作流主干道/writing-great-skills）已完整且已上线（GitHub Pages）。

用户在登录 mattpocock/skills 审阅所有 skills 后发现：**课程站缺一份"mattpocock/skills 全部 skills 的说明书"表格**——目前学员只能在术语表里遇到零散的词汇，不知道仓库里到底有哪些 skill、各自的功能与适用场景。这降低了课程第 9 课（writing-great-skills）"工具字典"的价值。

---

## 2. 目标

为课程站新增一个**独立 Skills 说明书页面**，作为"工具字典"性质的速查参考，同时**优化全站导航系统**（让该页面从目录页、术语表页、所有课程页都能直达）。

### 2.1 成功标准

- [ ] 用户打开 `reference/skills-manual.html` 能看到一张完整的 mattpocock/skills 仓库所有 skills 清单（含分类、功能、适用场景、调用方式）
- [ ] 从 `index.html`（目录页）能一键进入 Skills 说明书
- [ ] 从 `reference/glossary.html`（术语表）能一键进入 Skills 说明书
- [ ] 从 9 个课程页**顶部和底部**都能看到导航栏（含 Skills 说明书入口）
- [ ] 9 个课程页页脚统一为「skills-learning · 第 N 课 ｜ 教材：mattpocock/skills」格式
- [ ] 任何参考的增删**只改 `assets/toc-data.js` 一行**就完成（深模组 + 单点真相原则）

---

## 3. 非目标（明确不做）

- ❌ 不修改任何课程正文的文字内容、测验答案、嵌入式代码
- ❌ 不修改 glossary.html 页内的词汇内容
- ❌ 不修改 video-notes.html 页内容
- ❌ 不修改 index.html 的"课程地图"表格结构
- ❌ 不引入新的构建工具或依赖（保持纯静态 HTML/CSS/JS）
- ❌ 底部导航不做渐变（即与顶部完全一致）

---

## 4. 当前状态（已知信息）

通过现场勘察确认：

| 事实 | 状态 |
|---|---|
| `assets/toc-data.js` 已有 `COURSE_REFS` 数组（含 3 项：glossary、video-notes、YouTube 外部链接） | ✅ |
| `assets/nav.js` 当前硬编码只渲染 2 个参考链接（目录 + 术语表） | ⚠️ 与 COURSE_REFS 数量不一致 |
| 9 课中每课只**有 1 个** `<nav id="course-nav">` 占位符（位于头部） | 缺底部 |
| 只有 `lessons/0002-grilling-line-by-line.html` 的页脚有"上一课"残留 | 不一致 |
| 其他 8 课页脚均为标准格式：`skills-learning · 第 N 课 ｜ 教材：...mattpocock/skills` | ✅ |
| `reference/` 目录现有 `glossary.html` + `video-notes.html` + `MattPocock-skills工作流拆解-grill-me到深模组.md` | ✅ |

---

## 5. 设计

### 5.1 新建文件 `reference/skills-manual.html`

**结构**（与其他 reference 页面保持一致）：

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>📚 Skills 说明书 · mattpocock/skills 项目全集</title>
  <link rel="stylesheet" href="../assets/course.css">
</head>
<body>

<h1>📚 Skills 说明书 · mattpocock/skills 项目全集</h1>
<p class="lesson-meta">
  工具字典（与课程主线配套） ｜ 来源：mattpocock/skills 公开仓库
</p>

<nav id="course-nav"></nav>      <!-- 顶部导航（自动渲染） -->

<div class="callout">
  <span class="label">关于本说明书</span>
  本文是 [mattpocock/skills](https://github.com/mattpocock/skills) 仓库所有 Skills 的反编译——
  把每个 skill 的 frontmatter 翻译成中文、分类、补充使用场景。
  <strong>它不是课程，是工具字典</strong>：课程教学在 9 课主线中速查请用 <a href="glossary.html">术语表</a>。
</div>

<h2>一、主干道核心工作流（5 个 skills）★ 已在课程中深入讲解</h2>
<table>
  …
</table>

[后续 8 张分类表（B~I）：架构与代码质量、调试与问题排查、规划 / 设计、通用工作流与写作、工具与设置、个人偏好、开发中、已弃用]

<nav id="course-nav"></nav>      <!-- 底部导航（自动渲染） -->

<footer>
  skills-learning · Skills 说明书 ｜ 教材：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a>
</footer>

<script src="../assets/toc-data.js"></script>
<script src="../assets/nav.js"></script>
</body>
</html>
```

**HTML 表格内容**：使用本对话上一轮已产出的 8 张分类表（A. 主干道核心工作流 / B. 架构与代码质量 / C. 调试与问题排查 / D. 规划设计 / E. 通用工作流 / F. 工具与设置 / G. 个人偏好 / H. 开发中 / I. 已弃用）。本次实施时直接复用。

### 5.2 修改 `assets/toc-data.js`

**变更**：在 `window.COURSE_REFS` 数组中**插入一行**（按 COURSE_REFS 现有顺序：glossary → video-notes → 外部链接 → 新增 skills-manual）：

```js
window.COURSE_REFS = [
  { file: "glossary.html", title: "术语表（Glossary）" },
  { file: "video-notes.html", title: "📺 视频笔记：700 万人下载的 /grill-me（Gary Chen 拆解）" },
  { url: "https://www.youtube.com/watch?v=aR97E7aKEgg", title: "▶ 原视频（YouTube，约 20 分钟）" },
  { file: "skills-manual.html", title: "📚 Skills 说明书 · mattpocock/skills 项目全集" },  // ← 新增
];
```

**title 命名规范统一为 emoji + 类别 + 描述**：与 video-notes 现有格式一致。

### 5.3 重构 `assets/nav.js`（核心架构改动）

**现状问题**：当前 nav.js 硬编码 2 个链接（目录 + 术语表），与 toc-data.js 的 COURSE_REFS 数量不一致（实际有 3 个内部链接 + 1 个外部链接）。

**目标**：让 nav.js **自动从 `COURSE_REFS` 渲染所有内部参考链接**（不是只硬编码 2 个）；同时**支持多个 `<nav id="course-nav">` 占位符**（顶部 + 底部）。

**重构后逻辑**：

```js
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

  // 1. 目录（永远在最左）
  var html = '<a href="../index.html">🏠 目录</a>';
  // 2. COURSE_REFS 中所有内部参考链接（自动从 toc-data.js 渲染）
  if (window.COURSE_REFS) {
    window.COURSE_REFS.forEach(function (r) {
      if (r.url) return; // 外部链接不进 nav
      var href = location.pathname.indexOf('/reference/') !== -1
        ? r.file  // 当前页已在 reference/，兄弟文件直接引用
        : '../reference/' + r.file;
      html += '<a href="' + href + '">' + r.title + '</a>';
    });
  }
  // 3. 课程导航（上一课 / 下一课 / 跳转下拉）
  if (idx > 0) html += '<a href="./' + toc[idx - 1].file + '">← 上一课</a>';
  if (idx >= 0 && idx < toc.length - 1) html += '<a href="./' + toc[idx + 1].file + '">下一课 →</a>';

  var sel = '<select id="toc-jump"><option value="">跳转到某一课…</option>';
  toc.forEach(function (c, i) {
    sel += '<option value="./' + c.file + '"' + (i === idx ? ' selected' : '') + '>' + c.title + '</option>';
  });
  sel += '</select>';
  html += sel;

  // 4. 渲染到所有 nav 占位符（顶部 + 底部）
  navs.forEach(function (nav) {
    nav.innerHTML = html;
    var sj = nav.querySelector('#toc-jump');
    if (sj) {
      sj.addEventListener('change', function () {
        if (this.value && this.value !== './' + here) location.href = this.value;
      });
    }
  });
})();
```

**关键改进点**：
1. **多个 nav 占位符**：用 `querySelectorAll('#course-nav')` 替代 `getElementById`，自动渲染所有位置的 nav
2. **自动渲染所有参考链接**：从 `COURSE_REFS` 读取，**未来加新参考页只需在 toc-data.js 加一行，无需改 nav.js**
3. **跨目录路径支持**：判断当前页是否在 `reference/` 下，动态调整 href 路径（reference 下的页面之间用相对路径，否则用 `../reference/`）
4. **事件监听器修复**：旧版在 `if (!nav) return;` 后就无法绑定 select 事件；新版移到 forEach 内部每个 nav 单独绑定

### 5.4 9 个课程页加底部 nav

**变更**：在每课页面底部（`<footer>` 之前）添加：

```html
<nav id="course-nav"></nav>
```

**自动化**：9 个课程页通过 `for f in lessons/*.html; do ...; done` 批量插入。先读取现有 footer 的精确文本作为锚点，用 sed/python 在 footer 之前插入 nav 占位符。

### 5.5 修复第 2 课页脚

`lessons/0002-grilling-line-by-line.html` 当前页脚：

```html
<footer>
  skills-learning · 第 2 课 ｜ 上一课：<a href="./0001-four-failure-modes.html">四大失控模式</a> ｜
  教材：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a>
</footer>
```

**改为标准格式**：

```html
<footer>
  skills-learning · 第 2 课 ｜ 教材：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a>
</footer>
```

---

## 6. 验证（Verification）

按 `verification-before-completion` skill 原则，实施完成后必须跑以下验证：

```bash
# 1. 死链检查：所有 nav 链接是否都能解析
grep -l "skills-manual.html" /Users/code/git github/skills-learning/**/*.html

# 2. 第 2 课页脚已修复
grep "上一课" /Users/code/git github/skills-learning/lessons/0002-grilling-line-by-line.html
# 期望：无输出

# 3. 9 课都加了底部 nav
for f in /Users/code/git github/skills-learning/lessons/*.html; do
  echo "$f: $(grep -c '<nav id="course-nav">' "$f") 个 nav"
done
# 期望：每课 2 个

# 4. toc-data.js 已加 skills-manual
grep "skills-manual.html" /Users/code/git github/skills-learning/assets/toc-data.js

# 5. 部署后访问（信息架构肉眼验证）
# 浏览器打开 https://jzl-666.github.io/skills-learning/
# → 应能看到"📚 Skills 说明书"在速查里
# → 点击进入页面
# → 顶部 nav 应有"目录 / 术语表 / Skills 说明书 / 视频笔记 / 上一课 / 下一课 / 跳转"
# → 打开任一课程页
# → 底部应也有同样 nav
```

---

## 7. 实施顺序（粗略）

为降低风险，按以下顺序执行：

1. **Step 1**：写 `skills-manual.html`（纯新增，独立）
2. **Step 2**：改 `toc-data.js`（加一行，最小风险）
3. **Step 3**：重构 `nav.js`（核心改动，需谨慎）
4. **Step 4**：9 课加底部 nav（批量）
5. **Step 5**：改第 2 课页脚（单点修复）
6. **Step 6**：在本地浏览器逐一验证 5 项验证
7. **Step 7**：通过 `deploy_via_api.py` 部署到 GitHub Pages
8. **Step 8**：线上 HTTPS 验证

---

## 8. 风险与缓解

| 风险 | 缓解 |
|---|---|
| nav.js 重构后所有课页的 nav 渲染异常 | 关键路径，先在 `nav.js` 写一个最小可工作版本，复用现有测试方式（人工打开 1 课+ 1 参考页验证） |
| 底部 nav 双 select 冲突（多个 `#toc-jump` 同 id） | 验证 select 只绑定当前 nav 内的实例；改用 `this` 引用 |
| 课程页加底部 nav 后影响 SEO 或阅读流 | 不变（nav 不抢眼，恰当好处） |
| 部署到 GitHub Pages 后浏览器缓存 | 部署后 curl 验证 + 实际点击导航 |

---

## 9. 后续可考虑（不在本次范围）

- 把 skills-manual 的分类表做成可折叠（每张表可点击展开/收起）
- 在 glossary.html 添加"完整 skill 列表请见 skills-manual.html"链接
- 在 video-notes.html 添加"延伸阅读：skills-manual.html"链接
- 课程第 9 课正文里加"配套工具字典：skills-manual.html"指引
- 考虑用 `writing-great-skills` 用户的源码产出一个同款 SKILL.md 风格条目

---

## 10. 验收清单（用户审阅时使用）

- [ ] 目标是否清晰？
- [ ] 5 处文件改动是否合理？
- [ ] 决策 A/B/C/D 是否同意？
- [ ] 验证清单是否完整？
- [ ] 实施顺序是否合理？
- [ ] 风险评估是否到位？
- [ ] 后续可考虑项是否要纳入本次实施？
