/**
 * INBrownTown - Brand & Channel Application Bootstrapper
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme & Language
  const initialTheme = localStorage.getItem('inb_brand_theme') || 'light';
  const initialLang = localStorage.getItem('inb_brand_lang') || 'mr';

  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.lang = initialLang;

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) themeBtn.innerHTML = initialTheme === 'dark' ? '☀️' : '🌙';

  // 2. Render Full Page Showcase via Channel Engine
  Channel.setLang(initialLang);

  // 3. Setup Global Listeners
  setupGlobalControls();
});

function setupGlobalControls() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      Channel.toggleTheme();
    });
  }

  // Language Switcher Buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      Channel.setLang(lang);
    });
  });

  // Global Keyboard Shortcuts (Esc closes video modal and mobile drawer)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      Channel.closeVideoModal();
      Channel.closeMobileDrawer();
    }
  });
}
