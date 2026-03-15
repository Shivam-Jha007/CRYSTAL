const blocks = document.querySelectorAll('.card, .quotes blockquote');

blocks.forEach((el, idx) => {
  el.classList.add('reveal');
  setTimeout(() => {
    el.classList.add('show');
  }, 120 * (idx + 1));
});
