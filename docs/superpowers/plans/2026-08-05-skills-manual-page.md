# Skills 说明书页面 + 全站导航增强 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 skills-learning 课程站新增 `reference/skills-manual.html`（mattpocock/skills 全集工具字典），同时升级全站导航（toc-data.js + nav.js），让 9 课页面支持头部+底部双导航，并修复第 2 课页脚残留。

**Architecture:** 单一数据源（`assets/toc-data.js` 的 `COURSE_REFS` 数组）驱动所有"参考页面"导航；nav.js 重构后用 `querySelectorAll` 自动渲染页面任意位置的 `<nav id="course-nav">` 占位符；新增的 skills-manual.html 沿用 glossary.html 与 video-notes.html 的现有 reference 页面样式（共享 `assets/course.css`）。

**Tech Stack:** 纯静态 HTML + CSS + JavaScript（vanilla，无构建步骤），通过 GitHub REST API 部署到 GitHub Pages（已有的 `deploy_via_api.py` 脚本）。

**Spec:** `docs/superpowers/specs/2026-08-05-skills-manual-page-design.md`（commit `d036c3d`）

---

## File Structure

| 文件 | 状态 | 职责 |
|---|---|---|
| `reference/skills-manual.html` | **新建** | mattpocock/skills 全集 26 个活跃 skills + 9 个 in-progress + 2 个 personal 的速查手册 |
| `assets/toc-data.js` | 改：在 `COURSE_REFS` 数组末尾加 1 行 | 注册新页面，让 nav.js / index.html 自动发现 |
| `assets/nav.js` | 改：完整重写 | 用 `querySelectorAll` 支持多处 nav 占位符；自动从 `COURSE_REFS` 渲染所有内部参考链接 |
| `lessons/0001-0009.html`（9 个） | 改：每课尾部加 `<nav id="course-nav"></nav>` | 提供底部导航 |
| `lessons/0002-grilling-line-by-line.html` | 改：页脚删"上一课"残留 | 统一 9 课页脚格式 |

---

## Task 1: 创建 skills-manual.html 新页面

**Files:**
- Create: `reference/skills-manual.html`

- [ ] **Step 1: 写入完整 HTML 文件**

使用 `Write` 工具创建 `reference/skills-manual.html`，内容如下（结构与 glossary.html / video-notes.html 保持一致；表格内容来自 brainstorming 会话已产出的 9 张分类表）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>📚 Skills 说明书 · mattpocock/skills 项目全集</title>
  <link rel="stylesheet" href="../assets/course.css">
</head>
<body>

<h1>📚 Skills 说明书 · mattpocock/skills 项目全集</h1>
<p class="lesson-meta">
  工具字典（与课程主线配套） ｜ 来源：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a> 公开仓库
</p>

<nav id="course-nav"></nav>

<div class="callout">
  <span class="label">关于本说明书</span>
  本文是 <a href="https://github.com/mattpocock/skills">mattpocock/skills</a> 仓库所有 Skills 的反编译——
  把每个 skill 的 frontmatter 翻译成中文、分类、补充使用场景。
  <strong>它不是课程，是工具字典</strong>：课程教学在 9 课主线中，
  速查请用 <a href="glossary.html">术语表</a>。
</div>

<h2>一、主干道核心工作流（5 个 skills）★ 已在课程中深入讲解</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>grilling</code></td><td>（引擎）</td><td>🤖 m</td><td>拷问引擎：一次一问你建议答案；禁未对齐就动手</td><td>被任何 user-invoked 拷问 skill 内部调用；单独用也支持</td></tr>
  <tr><td><code>grill-me</code></td><td>productivity</td><td>👤 u</td><td>启动拷问会话（个人版）</td><td>想让 AI 拷问你打磨方案</td></tr>
  <tr><td><code>grill-with-docs</code></td><td>engineering</td><td>👤 u</td><td>拷问 + 顺带产 ADR/术语表</td><td>拷问时希望沉淀领域知识</td></tr>
  <tr><td><code>to-spec</code></td><td>engineering</td><td>👤 u</td><td>把对话综合成 spec 发到 issue tracker</td><td>共识已达成、需落档</td></tr>
  <tr><td><code>to-tickets</code></td><td>engineering</td><td>👤 u</td><td>把 spec 拆成可执行票据（带阻塞边）</td><td>spec 写好了、待开发</td></tr>
  <tr><td><code>implement</code></td><td>engineering</td><td>👤 u</td><td>按 spec/票据实现；嵌入 TDD + code-review</td><td>上游 spec 和票据齐全</td></tr>
  <tr><td><code>code-review</code></td><td>engineering</td><td>🤖 m</td><td>双轴审查（Standards + Spec）平行子代理</td><td>任何 PR 评审、WIP 复查</td></tr>
</table>

<h2>二、架构与代码质量</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>codebase-design</code></td><td>engineering</td><td>🤖 m</td><td>深模组词汇（Module/Interface/Seam/Adapter/Leverage/Locality）</td><td>任何模块设计讨论、做接口、写测试时</td></tr>
  <tr><td><code>improve-codebase-architecture</code></td><td>engineering</td><td>👤 u</td><td>扫描代码库深模组机会，出 HTML 报告再 grill</td><td>周期性架构大扫除</td></tr>
  <tr><td><code>domain-modeling</code></td><td>engineering</td><td>🤖 m</td><td>主动磨利项目领域模型（术语/场景/代码交叉）</td><td>任何设计阶段，或需要更新 CONTEXT.md 时</td></tr>
  <tr><td><code>tdd</code></td><td>engineering</td><td>🤖 m</td><td>红-绿-重构 TDD 纪律</td><td>写功能/修 bug 想测试先行</td></tr>
  <tr><td><code>prototyping</code></td><td>engineering</td><td>🤖 m</td><td>一次性原型验证状态/逻辑/UI 假设</td><td>设计不确定时先做抛型</td></tr>
</table>

<h2>三、调试与问题排查</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>diagnosing-bugs</code></td><td>engineering</td><td>🤖 m</td><td>硬 bug/性能退化诊断循环（重现→最小化→假设→仪器→修复→回归）</td><td>报告"坏了/慢/挂了"</td></tr>
  <tr><td><code>systematic-debugging</code></td><td>engineering</td><td>（来自 using-superpowers）</td><td>任何 bug 排查前先用</td><td>任何非显然 bug</td></tr>
  <tr><td><code>resolving-merge-conflicts</code></td><td>engineering</td><td>🤖 m</td><td>按意图逐 hunk 处理合并/rebase 冲突，不 --abort</td><td>推送/合并时冲突</td></tr>
</table>

<h2>四、规划设计</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>brainstorming</code></td><td>engineering</td><td>🤖 m</td><td>通过自然对话把想法变成完整设计</td><td>任何创造性功能/组件/行为前</td></tr>
  <tr><td><code>wayfinder</code></td><td>engineering</td><td>👤 u</td><td>超大块工作→多个决策票的地图</td><td>跨多个会话的大型工作</td></tr>
  <tr><td><code>research</code></td><td>engineering</td><td>🤖 m</td><td>一手资料调研，结果存为 Markdown</td><td>需要查文档/API 事实时</td></tr>
  <tr><td><code>setup-matt-pocock-skills</code></td><td>engineering</td><td>👤 u</td><td>配 issues tracker / triage labels / domain docs</td><td>首次使用整套 skills 前</td></tr>
  <tr><td><code>triage</code></td><td>engineering</td><td>👤 u</td><td>把 issue/PR 推过 triage 状态机</td><td>收到新 issue 时</td></tr>
</table>

<h2>五、通用工作流 + 写作</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>ask-matt</code></td><td>engineering</td><td>👤 u</td><td>路由 skill：不知道用哪个时问它</td><td>入门/不确定时</td></tr>
  <tr><td><code>teach</code></td><td>productivity</td><td>👤 u</td><td>多会话教学</td><td>想学一个技能或概念</td></tr>
  <tr><td><code>writing-great-skills</code></td><td>productivity</td><td>👤 u</td><td>写 Skill 的词汇与原则</td><td>想写自己的 skill</td></tr>
  <tr><td><code>handoff</code></td><td>productivity</td><td>👤 u</td><td>把当前对话压缩成交接文档</td><td>会话太长要换</td></tr>
  <tr><td><code>grilling</code></td><td>productivity</td><td>🤖 m</td><td>（与 engineering 同名，是总引擎）</td><td>任何拷问场景</td></tr>
</table>

<h2>六、工具与设置</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>git-guardrails-claude-code</code></td><td>misc</td><td>🤖 m</td><td>给 Claude Code 装 hooks 阻止危险 git 命令</td><td>想防止 AI 误推 push/reset</td></tr>
  <tr><td><code>setup-pre-commit</code></td><td>misc</td><td>🤖 m</td><td>用 Husky + lint-staged 配 pre-commit（prettier/typecheck/test）</td><td>想要提交时格式化</td></tr>
  <tr><td><code>scaffold-exercises</code></td><td>misc</td><td>🤖 m</td><td>创建练习目录结构（题目/解答/讲解）</td><td>教学课程需要习题</td></tr>
  <tr><td><code>migrate-to-shoehorn</code></td><td>misc</td><td>🤖 m</td><td>从 <code>as</code> 类型断言迁移到 @total-typescript/shoehorn</td><td>测文件用 <code>as</code> 想清理</td></tr>
</table>

<h2>七、个人偏好</h2>
<table>
  <tr><th>Skill</th><th>分类</th><th>调用方式</th><th>功能</th><th>适用场景</th></tr>
  <tr><td><code>edit-article</code></td><td>personal</td><td>🤖 m</td><td>编辑文章（重组/润色/收紧）</td><td>想改文章草稿</td></tr>
  <tr><td><code>obsidian-vault</code></td><td>personal</td><td>🤖 m</td><td>搜/创建/管理 Obsidian 笔记（wikilinks + 索引）</td><td>用 Obsidian 记笔记</td></tr>
</table>

<h2>八、开发中</h2>
<table>
  <tr><th>Skill</th><th>一句话功能</th></tr>
  <tr><td><code>batch-grill-me</code></td><td>一次性问所有边界问题，逐轮推进</td></tr>
  <tr><td><code>claude-handoff</code></td><td>把当前对话交接给 fresh 背景 agent</td></tr>
  <tr><td><code>loop-me</code></td><td>在本工作空间拷问工作流 spec</td></tr>
  <tr><td><code>setup-ts-deep-modules</code></td><td>用 dependency-cruiser 让每个 TS 包成为深模组</td></tr>
  <tr><td><code>to-questionnaire</code></td><td>把决策转成问卷交给别人填</td></tr>
  <tr><td><code>wizard</code></td><td>生成交互式 bash 向导（手动流程 + 写 .env + 填 GitHub Actions secrets）</td></tr>
  <tr><td><code>writing-beats</code></td><td>写作：把素材组织成 beats 旅程</td></tr>
  <tr><td><code>writing-fragments</code></td><td>写作：挖掘原始碎片（无结构）</td></tr>
  <tr><td><code>writing-shape</code></td><td>写作：把素材塑造成文章骨架</td></tr>
</table>

<h2>九、已弃用（仅留作历史）</h2>
<p><code>design-an-interface</code>、<code>qa</code>、<code>request-refactor-plan</code>、<code>ubiquitous-language</code> —— 已被新 skill 取代。</p>

<nav id="course-nav"></nav>

<footer>
  skills-learning · Skills 说明书 ｜ 教材：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a>
</footer>

<script src="../assets/toc-data.js"></script>
<script src="../assets/nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: 验证文件创建成功**

```bash
ls -la /Users/code/git\ github/skills-learning/reference/skills-manual.html
wc -l /Users/code/git\ github/skills-learning/reference/skills-manual.html
```

Expected: 文件存在、行数约 200-250 行。

---

## Task 2: 在 toc-data.js 注册新页面

**Files:**
- Modify: `assets/toc-data.js:23-26`（在 `COURSE_REFS` 数组末尾追加一行）

- [ ] **Step 1: 添加 skills-manual 条目**

使用 `SearchReplace` 工具，把 `assets/toc-data.js` 中现有的 `window.COURSE_REFS` 数组：

```js
window.COURSE_REFS = [
  { file: "glossary.html", title: "术语表（Glossary）" },
  { file: "video-notes.html", title: "📺 视频笔记：700 万人下载的 /grill-me（Gary Chen 拆解）" },
  { url: "https://www.youtube.com/watch?v=aR97E7aKEgg", title: "▶ 原视频（YouTube，约 20 分钟）" },
];
```

改为：

```js
window.COURSE_REFS = [
  { file: "glossary.html", title: "术语表（Glossary）" },
  { file: "video-notes.html", title: "📺 视频笔记：700 万人下载的 /grill-me（Gary Chen 拆解）" },
  { url: "https://www.youtube.com/watch?v=aR97E7aKEgg", title: "▶ 原视频（YouTube，约 20 分钟）" },
  { file: "skills-manual.html", title: "📚 Skills 说明书 · mattpocock/skills 项目全集" },
];
```

- [ ] **Step 2: 验证**

```bash
grep -n "skills-manual" /Users/code/git\ github/skills-learning/assets/toc-data.js
```

Expected: 输出 1 行包含 `skills-manual.html`。

---

## Task 3: 重构 nav.js 支持多个 nav 占位符 + 自动渲染所有参考链接

**Files:**
- Modify: `assets/nav.js`（完整重写）

- [ ] **Step 1: 完整重写 nav.js**

使用 `Write` 工具，**完整覆盖** `assets/nav.js`：

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
        ? r.file
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

- [ ] **Step 2: 验证 nav.js 重构**

```bash
grep -n "querySelectorAll\|COURSE_REFS" /Users/code/git\ github/skills-learning/assets/nav.js
```

Expected: 至少 2 行匹配（querySelectorAll + COURSE_REFS 各 1）。

---

## Task 4: 9 课加底部 nav 占位符

**Files:**
- Modify: 9 个 lesson 文件（每个加一个 `<nav id="course-nav"></nav>` 在 `<footer>` 之前）

- [ ] **Step 1: 写一个 Python 脚本批量插入**

使用 `Write` 工具创建临时脚本 `insert_bottom_nav.py`（仓库根目录），完成后会删除：

```python
import os
import re

ROOT = "/Users/code/git github/skills-learning"
LESSONS_DIR = os.path.join(ROOT, "lessons")
NAV_BLOCK = '<nav id="course-nav"></nav>'
placeholder = "<!--BOTTOM_NAV_PLACEHOLDER-->"

for fname in sorted(os.listdir(LESSONS_DIR)):
    if not fname.endswith(".html"):
        continue
    fpath = os.path.join(LESSONS_DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    if NAV_BLOCK in content:
        # 已存在则计数（用于报告）
        count = content.count(NAV_BLOCK)
        print(f"  {fname}: 已有 {count} 个 nav（跳过）")
        continue
    # 在 <footer> 之前插入 nav 占位符
    if "<footer>" not in content:
        print(f"  {fname}: ⚠️ 没找到 <footer>，跳过")
        continue
    new_content = content.replace("<footer>", NAV_BLOCK + "\n\n<footer>", 1)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"  {fname}: ✓ 已加底部 nav")
```

- [ ] **Step 2: 运行脚本并验证**

```bash
cd "/Users/code/git github/skills-learning"
python3 insert_bottom_nav.py
echo "--- 验证每课 nav 数量 ---"
for f in lessons/*.html; do echo "  $f: $(grep -c '<nav id="course-nav">' "$f") 个 nav"; done
```

Expected: 9 个文件全部输出 `✓ 已加底部 nav`；之后每课显示 `2 个 nav`。
**完成后立即删除脚本**：`rm "/Users/code/git github/skills-learning/insert_bottom_nav.py"`

- [ ] **Step 3: 验证脚本已被删除**

```bash
ls /Users/code/git\ github/skills-learning/insert_bottom_nav.py 2>&1
```

Expected: `No such file or directory`。

---

## Task 5: 修复第 2 课页脚残留

**Files:**
- Modify: `lessons/0002-grilling-line-by-line.html`（footer）

- [ ] **Step 1: 修改 footer**

使用 `SearchReplace` 工具，把：

```html
<footer>
  skills-learning · 第 2 课 ｜ 上一课：<a href="./0001-four-failure-modes.html">四大失控模式</a> ｜
  教材：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a>
</footer>
```

改为：

```html
<footer>
  skills-learning · 第 2 课 ｜ 教材：<a href="https://github.com/mattpocock/skills">mattpocock/skills</a>
</footer>
```

- [ ] **Step 2: 验证残留消失**

```bash
grep -n "上一课" /Users/code/git\ github/skills-learning/lessons/0002-grilling-line-by-line.html
```

Expected: 无输出。

---

## Task 6: 本地验证（5 项检查全部通过）

- [ ] **Step 1: 死链检查**

```bash
cd "/Users/code/git github/skills-learning"
echo "--- 1. skills-manual.html 是否被引用 ---"
grep -l "skills-manual.html" *.html reference/*.html lessons/*.html || echo "FAIL: 无任何页面引用"
echo "--- 2. 第 2 课页脚已修复 ---"
grep "上一课" lessons/0002-grilling-line-by-line.html && echo "FAIL" || echo "OK"
echo "--- 3. 9 课都有 2 个 nav ---"
for f in lessons/*.html; do
  N=$(grep -c '<nav id="course-nav">' "$f")
  [ "$N" = "2" ] && echo "  OK $f" || echo "  FAIL $f: $N"
done
echo "--- 4. toc-data.js 已加 skills-manual ---"
grep -c "skills-manual.html" assets/toc-data.js | grep -q "1" && echo "OK" || echo "FAIL"
echo "--- 5. nav.js 已重构 ---"
grep -c "querySelectorAll" assets/nav.js | grep -q "1" && echo "OK" || echo "FAIL"
```

Expected: 5 项检查全部输出 `OK` 或末尾 `FAIL` 不出现。

- [ ] **Step 2: 浏览器人工验证导航逻辑**

```bash
open /Users/code/git\ github/skills-learning/index.html
```

打开浏览器后逐一测试：
- 目录页应能看到"📚 Skills 说明书"链接（在速查参考区）
- 进入 Skills 说明书页 → 顶部 / 底部导航都应包含「目录 / 术语表 / 视频笔记 / Skills 说明书 / 上一课 / 下一课 / 跳转」（注意：Skills 说明书页本身不在课程内，所以应该没有"上一课/下一课"——这点要确认）
- 进入任一课程页 → 顶部底部导航都有「目录 / 术语表 / 视频笔记 / Skills 说明书 / 上一课 / 下一课 / 跳转」
- 点「Skills 说明书」应跳到 `reference/skills-manual.html`
- 点「目录」应回 `index.html`

如果 Skills 说明书页的"上一课/下一课"意外出现，是逻辑缺陷，需修复 nav.js 中的 idx 检查（idx == -1 时不渲染上一课/下一课）。

---

## Task 7: 提交所有改动

- [ ] **Step 1: 单次 commit**

```bash
cd "/Users/code/git github/skills-learning"
git add reference/skills-manual.html assets/toc-data.js assets/nav.js lessons/*.html
git -c user.name="Qoder(GitHub Project AI)" -c user.email="JZL-666@users.noreply.github.com" commit -m "feat: 新增 Skills 说明书页面 + 全站导航增强

- 新增 reference/skills-manual.html（mattpocock/skills 全集 26 个 skills 速查）
- toc-data.js 在 COURSE_REFS 注册新页面
- nav.js 重构：querySelectorAll 支持多处 nav + 自动渲染所有参考链接
- 9 课添加底部 <nav id=\"course-nav\"></nav> 占位符
- 修复第 2 课页脚'上一课'残留
- 详见 docs/superpowers/specs/2026-08-05-skills-manual-page-design.md"
```

Expected: 1 commit pushed to local main（不 push 到远程）。

---

## Task 8: 部署到 GitHub Pages + 线上验证

- [ ] **Step 1: 部署**

```bash
cd "/Users/code/git github/skills-learning"
python3 deploy_via_api.py
```

Expected: 输出 `🎉 完成！` 含 `https://jzl-666.github.io/skills-learning/` URL。

- [ ] **Step 2: 等待构建 + 验证（5 个文件 HTTP 200）**

```bash
sleep 30
for f in index.html reference/skills-manual.html reference/glossary.html reference/video-notes.html lessons/0001-four-failure-modes.html; do
  URL="https://jzl-666.github.io/skills-learning/${f}"
  CODE=$(curl -s -m 15 -o /dev/null -w "%{http_code}" "$URL")
  echo "  $URL : HTTP $CODE"
done
```

Expected: 全部 HTTP 200。

- [ ] **Step 3: 验证线上 Skills 说明书页内容已就位**

```bash
curl -s -m 15 "https://jzl-666.github.io/skills-learning/reference/skills-manual.html" | grep -c "Skills 说明书"
```

Expected: 输出 ≥ 1（页面标题、callout、内容等处出现）。

- [ ] **Step 4: 验证目录页能跳到 Skills 说明书**

```bash
curl -s -m 15 "https://jzl-666.github.io/skills-learning/index.html" | grep -c "skills-manual.html"
```

Expected: 输出 ≥ 1（目录页的速查参考区应包含新链接）。

- [ ] **Step 5: 验证任一课程页底部 nav 含 Skills 说明书链接**

```bash
curl -s -m 15 "https://jzl-666.github.io/skills-learning/lessons/0005-code-smells.html" | grep -c "skills-manual"
```

Expected: 输出 ≥ 1（顶部 + 底部 nav 都应出现该链接，最少 2 次）。

---

## 验收清单

- [ ] Task 1: skills-manual.html 创建完成
- [ ] Task 2: toc-data.js 已注册新页面
- [ ] Task 3: nav.js 已重构
- [ ] Task 4: 9 课都有 2 个 nav 占位符
- [ ] Task 5: 第 2 课页脚已修复
- [ ] Task 6: 5 项本地检查全部通过
- [ ] Task 7: 1 次 commit 包含所有改动
- [ ] Task 8: 5 项线上验证全部通过（HTTP 200 + 内容就位）
