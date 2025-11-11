export default function decorate(block) {
  // Take each authored row (question + answer)
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const question = row.firstElementChild;
    const answer = row.lastElementChild;

    const faqRow = document.createElement('div');
    faqRow.className = 'faq__row';

    const toggle = document.createElement('div');
    toggle.className = 'faq__toggle';
    toggle.textContent = question.textContent;

    const body = document.createElement('div');
    body.className = 'faq__body';
    body.innerHTML = answer.innerHTML;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      body.classList.toggle('open');
    });

    faqRow.append(toggle, body);
    block.append(faqRow);
  });
}
