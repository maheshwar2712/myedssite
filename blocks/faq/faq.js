export default function decorate(block) {
  const rows = block.querySelectorAll('.faq__row');
  const toggles = block.querySelectorAll('.faq__toggle');
  const gradient = block.querySelector('.faq__gradient');
  const showMoreToggle = block.querySelector('.faq__toggle--more');

  let faqCount = 1; // default visible count

  // Hide extra rows initially
  rows.forEach((row, index) => {
    if (index >= faqCount) {
      row.classList.add('hidden');
    }
  });

  // Accordion toggle
  toggles.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
      const row = rows[index];
      const body = row.querySelector('.faq__body');

      const isOpen = body.classList.contains('open');
      rows.forEach(r => {
        r.classList.remove('active');
        r.querySelector('.faq__body').classList.remove('open');
      });

      if (!isOpen) {
        row.classList.add('active');
        body.classList.add('open');
      }
    });
  });

  // Show More / Show Less toggle
  if (showMoreToggle) {
    showMoreToggle.addEventListener('click', () => {
      const hiddenRows = block.querySelectorAll('.faq__row.hidden');
      if (hiddenRows.length) {
        hiddenRows.forEach(r => r.classList.remove('hidden'));
        gradient?.classList.remove('active');
        showMoreToggle.textContent = 'Show Less';
      } else {
        rows.forEach((row, index) => {
          if (index >= faqCount) {
            row.classList.add('hidden');
          }
        });
        gradient?.classList.add('active');
        showMoreToggle.textContent = 'Show More';
      }
    });
  }

  // Activate gradient if more rows exist
  if (rows.length > faqCount) {
    gradient?.classList.add('active');
  }
}
