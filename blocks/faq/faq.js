export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const faqRows = rows.map((row) => {
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
    return faqRow;
  });

  // Show only first 3 initially
  faqRows.forEach((row, i) => {
    if (i < 3) {
      block.append(row);
    } else {
      row.style.display = 'none';
      block.append(row);
    }
  });

  // Add Show More button if needed
  if (faqRows.length > 3) {
    const showMoreBtn = document.createElement('button');
    showMoreBtn.className = 'faq__showmore';
    showMoreBtn.textContent = 'Show More';

    showMoreBtn.addEventListener('click', () => {
      faqRows.forEach((row) => {
        row.style.display = 'block';
      });
      showMoreBtn.remove();
    });

    block.append(showMoreBtn);
  }
}
