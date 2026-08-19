/**
 * INBrownTown - Main Application Bootstrapper & Event Orchestrator
 * Full dynamic language switching for 100% of top-to-bottom elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme & Language from Store
  const initialTheme = window.INB_STORE.getTheme();
  const initialLang = window.INB_STORE.getLang();
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.lang = initialLang;

  // 2. Render Static Shell Components (Header, Nav, Footer)
  UI.updateStaticHeaderAndFooter();
  updateLangButtonUI(initialLang);

  // 3. Register SPA Routes
  window.INB_ROUTER.register('/', () => UI.renderHomeView());
  window.INB_ROUTER.register('/latest', () => UI.renderCategoryView('all'));
  window.INB_ROUTER.register('/category/:id', (params) => UI.renderCategoryView(params.id));
  window.INB_ROUTER.register('/article/:id', (params) => UI.renderArticleView(params.id));
  window.INB_ROUTER.register('/help', () => CitizenDesk.renderHelpView());
  window.INB_ROUTER.register('/citizen-reports', () => CitizenDesk.renderCitizenReportsView());
  window.INB_ROUTER.register('/live-map', () => LiveMap.renderLiveMapView());
  window.INB_ROUTER.register('/fact-check', () => UI.renderFactCheckView());
  window.INB_ROUTER.register('/schemes', () => UI.renderSchemesView());
  window.INB_ROUTER.register('/jobs', () => UI.renderJobsView());
  window.INB_ROUTER.register('/directory', () => UI.renderDirectoryView());
  window.INB_ROUTER.register('/advertise', () => UI.renderAdvertiseView());
  window.INB_ROUTER.register('/media', () => UI.renderMediaAgencyView());
  window.INB_ROUTER.register('/about-trust', () => UI.renderTrustPolicyView());
  window.INB_ROUTER.register('/admin', () => AdminCMS.renderAdminView());

  // 4. Start Routing
  window.INB_ROUTER.handleRouting();

  // 5. Setup Breaking News Ticker Cycler
  initBreakingTickerCycler();

  // 6. Setup Deep Search Modal & Keyboard Shortcuts
  setupSearchAndKeybindings();

  // 7. Setup Global Controls (Language switcher, Theme toggle)
  setupGlobalControls();
});

// Breaking Ticker Cycler
function initBreakingTickerCycler() {
  const tickerText = document.getElementById('breaking-ticker-text');
  if (!tickerText) return;

  const breakingArticles = window.INB_STORE.getBreakingArticles();
  if (breakingArticles.length === 0) return;

  let currentIndex = 0;

  function updateTicker() {
    const art = breakingArticles[currentIndex];
    tickerText.textContent = UI.getI18n(art.title);
    tickerText.onclick = () => window.INB_ROUTER.navigate(`/article/${art.id}`);
    currentIndex = (currentIndex + 1) % breakingArticles.length;
  }

  updateTicker();
  if (window._tickerInterval) clearInterval(window._tickerInterval);
  window._tickerInterval = setInterval(updateTicker, 6000);
}

// Global Controls & Header Handlers
function setupGlobalControls() {
  // Theme Toggle
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const newTheme = window.INB_STORE.toggleTheme();
      themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      UI.showToast(`Theme: ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`, 'info');
    });
    themeBtn.innerHTML = window.INB_STORE.getTheme() === 'dark' ? '☀️' : '🌙';
  }

  // Language Buttons: FULL TOP-TO-BOTTOM LOCALIZATION UPDATE
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      window.INB_STORE.setLang(lang);
      updateLangButtonUI(lang);
      
      // Update ALL top-to-bottom elements: Header, Ticker, Navigation, Active View, Footer
      UI.updateStaticHeaderAndFooter();
      initBreakingTickerCycler();
      window.INB_ROUTER.handleRouting();

      UI.showToast(`Language switched to: ${e.currentTarget.textContent}`, 'success');
    });
  });
}

function updateLangButtonUI(currentLang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Deep Search & Shortcuts
function setupSearchAndKeybindings() {
  // Press '/' key to open search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
      CitizenDesk.closeReportModal();
      CitizenDesk.closeEmergencyModal();
      AIAssistant.closeChatModal();
    }
  });
}

window.openSearchModal = function() {
  let modal = document.getElementById('search-modal');
  if (!modal) {
    const modalHtml = `
      <div class="modal-backdrop" id="search-modal">
        <div class="modal-window" style="max-width: 620px;">
          <div style="padding: 1rem 1.25rem; display:flex; align-items:center; gap:0.75rem; border-bottom: 1px solid var(--border-light);">
            <span style="font-size: 1.2rem;">🔍</span>
            <input type="text" id="deep-search-input" class="form-control" placeholder="${UI.t('searchPlaceholder')}" style="border:none; box-shadow:none; font-size:1.05rem;" oninput="handleSearchQuery(this.value)">
            <button class="modal-close-btn" onclick="closeSearchModal()">&times;</button>
          </div>
          <div id="search-results-box" style="max-height: 380px; overflow-y: auto; padding: 1rem;">
            <div style="font-size: 0.82rem; color: var(--text-muted); text-align: center; padding: 1.5rem 0;">
              ${UI.t('searchPlaceholder')}
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modal = document.getElementById('search-modal');
  }

  modal.classList.add('active');
  setTimeout(() => {
    const input = document.getElementById('deep-search-input');
    if (input) {
      input.placeholder = UI.t('searchPlaceholder');
      input.focus();
    }
  }, 100);
};

window.closeSearchModal = function() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.remove('active');
};

window.handleSearchQuery = function(query) {
  const box = document.getElementById('search-results-box');
  if (!box) return;

  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    box.innerHTML = `<div style="font-size: 0.82rem; color: var(--text-muted); text-align: center; padding: 1.5rem 0;">Type at least 2 characters...</div>`;
    return;
  }

  const articles = window.INB_STORE.getArticles({ search: q });
  const schemes = window.INB_STORE.state.schemes.filter(s => (s.name.mr + s.name.en + s.name.hi).toLowerCase().includes(q));

  let html = '';

  if (articles.length === 0 && schemes.length === 0) {
    html = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No results found.</div>`;
  } else {
    if (articles.length > 0) {
      html += `<div style="font-size: 0.75rem; font-weight: 700; color: var(--brand-brown-600); margin-bottom: 0.5rem; text-transform: uppercase;">📰 ${UI.t('latest')} (${articles.length})</div>`;
      html += articles.map(a => `
        <div style="padding: 0.65rem; border-radius: var(--radius-sm); cursor: pointer; transition: background 0.15s; border-bottom: 1px solid var(--border-light);" onclick="window.INB_ROUTER.navigate('/article/${a.id}'); closeSearchModal();" onmouseover="this.style.background='var(--bg-surface-subtle)'" onmouseout="this.style.background='transparent'">
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${UI.getI18n(a.title)}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">📍 ${a.district} • ⏱️ ${UI.formatTimeAgo(a.publishedAt)}</div>
        </div>
      `).join('');
    }

    if (schemes.length > 0) {
      html += `<div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-green); margin: 1rem 0 0.5rem 0; text-transform: uppercase;">📜 ${UI.t('govSchemes')} (${schemes.length})</div>`;
      html += schemes.map(s => `
        <div style="padding: 0.65rem; border-radius: var(--radius-sm); cursor: pointer; transition: background 0.15s; border-bottom: 1px solid var(--border-light);" onclick="window.INB_ROUTER.navigate('/schemes'); closeSearchModal();" onmouseover="this.style.background='var(--bg-surface-subtle)'" onmouseout="this.style.background='transparent'">
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${UI.getI18n(s.name)}</div>
          <div style="font-size: 0.78rem; color: var(--accent-green);">${s.financialBenefit}</div>
        </div>
      `).join('');
    }
  }

  box.innerHTML = html;
};
