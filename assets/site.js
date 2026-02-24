(function () {
  // Active menu highlight
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // Hero fallback: hide blocks if hero image missing
  document.querySelectorAll('[data-hero]').forEach((el) => {
    const img = el.getAttribute('data-hero');
    if (!img) return;
    const test = new Image();
    test.onerror = () => {
      el.style.display = 'none';
    };
    test.src = img;
  });

  // Language toggle
  const LANG_KEY = 'msf_lang';
  const defaultLang = 'cs';

 function applyLang(lang) {
  document.documentElement.classList.toggle('lang-cs', lang === 'cs');
  document.documentElement.classList.toggle('lang-en', lang === 'en');
   
  document.documentElement.lang = lang;
   
  const btnCs = document.getElementById('btn-cs');
  const btnEn = document.getElementById('btn-en');
  if (btnCs && btnEn) {
    btnCs.classList.toggle('active', lang === 'cs');
    btnEn.classList.toggle('active', lang === 'en');
    btnCs.setAttribute('aria-pressed', String(lang === 'cs'));
    btnEn.setAttribute('aria-pressed', String(lang === 'en'));
  }

  try { localStorage.setItem('msf_lang', lang); } catch {}
}

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'cs' || saved === 'en') return saved;
    } catch {}
    return defaultLang;
  }

  // Wire buttons (if present)
  const btnCs = document.getElementById('btn-cs');
  const btnEn = document.getElementById('btn-en');

  if (btnCs && btnEn) {
    btnCs.addEventListener('click', () => applyLang('cs'));
    btnEn.addEventListener('click', () => applyLang('en'));
  }

  applyLang(getSavedLang());
})();
