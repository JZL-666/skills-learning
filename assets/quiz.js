// quiz.js — 课程测验组件：点击选项立即反馈
// 用法：.quiz 容器内，正确选项 label 加 data-right="1"，
// 容器内放 .feedback.right 与 .feedback.wrong 两个反馈块。
document.addEventListener('click', function (e) {
  var label = e.target.closest('.quiz label');
  if (!label) return;
  var quiz = label.closest('.quiz');
  quiz.classList.add('answered');
  var right = label.hasAttribute('data-right');
  quiz.querySelectorAll('label').forEach(function (l) {
    l.style.borderColor = '';
    l.style.background = '';
  });
  label.style.borderColor = right ? 'var(--ok)' : 'var(--accent)';
  label.style.background = right ? '#f2f9f2' : '#fbf0ee';
  quiz.querySelector('.feedback.right').style.display = right ? 'block' : 'none';
  quiz.querySelector('.feedback.wrong').style.display = right ? 'none' : 'block';
});
