const defaultLang = localStorage.getItem('siteLang') || 'en';

function applyLanguage(lang) {
  document.documentElement.lang = lang === 'el' ? 'el' : 'en';
  document.querySelectorAll('[data-en]').forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) el.textContent = text;
  });
  document.querySelectorAll('[data-en-html]').forEach((el) => {
    const html = el.getAttribute(`data-${lang}-html`);
    if (html !== null) el.innerHTML = html;
  });
  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('siteLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(defaultLang);

  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');
  document.querySelectorAll('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = item.getAttribute('data-lightbox');
      lightbox.classList.add('open');
    });
  });
  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
