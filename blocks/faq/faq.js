export default function decorate(block) {
  // Capture authored rows safely
  const authoredRows = [...block.children];
  block.innerHTML = '';

  const faqRows = authoredRows.map((row) => {
    // Find the first two block-level children (question + answer)
    const cells = [...row.children].filter((el) => el.nodeType === 1);
    const questionEl = cells[0] || document.createElement('div');
    const answerEl = cells[1] || document.createElement('div');

    const faqRow = document.createElement('div');
    faqRow.className = 'faq__row';

    const toggle = document.createElement('div');
    toggle.className = 'faq__toggle';
    toggle.textContent = questionEl.textContent.trim();

    const body = document.createElement('div');
    body.className = 'faq__body';
    body.innerHTML = answerEl.innerHTML;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      body.classList.toggle('open');
    });

    faqRow.append(toggle, body);
    return faqRow;
  });

  // Append all rows
  faqRows.forEach((row) => block.append(row));

  // Show only first 3 initially; add Show More if needed
  if (faqRows.length > 3) {
    faqRows.slice(3).forEach((row) => row.classList.add('is-hidden'));

    const showMoreBtn = document.createElement('button');
    showMoreBtn.className = 'faq__showmore';
    showMoreBtn.textContent = 'Show More';

    showMoreBtn.addEventListener('click', () => {
      faqRows.forEach((row) => row.classList.remove('is-hidden'));
      showMoreBtn.remove();
    });

    block.append(showMoreBtn);
  }
}
