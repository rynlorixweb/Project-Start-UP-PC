  const input = document.getElementById('searchInput');
  const noResult = document.getElementById('no-result');
  const resultCount = document.getElementById('resultCount');
  const allCards = document.querySelectorAll('.card, .cmd-card');
  const allSections = document.querySelectorAll('[data-section]');

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;
    allCards.forEach(card => {
      const match = !q || (card.dataset.name + ' ' + card.dataset.desc).includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    allSections.forEach(sec => {
      const hasVisible = [...sec.querySelectorAll('.card, .cmd-card')].some(c => !c.classList.contains('hidden'));
      sec.classList.toggle('hidden', !hasVisible);
    });
    resultCount.textContent = q ? visible + ' result' + (visible !== 1 ? 's' : '') : '';
    noResult.style.display = (q && visible === 0) ? 'block' : 'none';
  });

  document.querySelectorAll('.cmd-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.cmd).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
      });
    });
  });