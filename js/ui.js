/**
 * INBrownTown - UI Engine, Responsive View Renderers & Navigation Controller
 * Full responsiveness across Mobile (320px-480px), Tablets (768px-1024px), Laptops & 4K Displays
 */

const UI = {
  // Localization string lookup
  t(key) {
    const lang = window.INB_STORE.getLang();
    const dict = window.INB_I18N[lang] || window.INB_I18N.mr || window.INB_I18N.en;
    return dict[key] || (window.INB_I18N.en && window.INB_I18N.en[key]) || key;
  },

  // Extract multilingual string from {mr, hi, en}
  getI18n(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const lang = window.INB_STORE.getLang();
    return obj[lang] || obj.mr || obj.hi || obj.en || Object.values(obj)[0] || '';
  },

  // Mobile Drawer Controls
  toggleMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.toggle('active');
  },

  openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.add('active');
  },

  closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
  },

  updateBottomNavUI(path) {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.classList.remove('active'));
    if (path === '/' || path === '') {
      const b = document.getElementById('bnav-home');
      if (b) b.classList.add('active');
    } else if (path.includes('citizen-reports')) {
      const b = document.getElementById('bnav-reports');
      if (b) b.classList.add('active');
    } else if (path.includes('help')) {
      const b = document.getElementById('bnav-help');
      if (b) b.classList.add('active');
    } else if (path.includes('live-map')) {
      const b = document.getElementById('bnav-map');
      if (b) b.classList.add('active');
    }
  },

  // Show Toast notification
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // Audio News Reader (Speech Synthesis)
  currentSpeechUtterance: null,
  isAudioPlaying: false,

  playArticleAudio(title, summary) {
    const bar = document.getElementById('audio-narrator-bar');
    const titleEl = document.getElementById('audio-narrator-title');
    const labelEl = document.getElementById('audio-narrator-label');
    const stopBtn = document.getElementById('audio-stop-btn');
    if (!bar) return;

    if (labelEl) labelEl.textContent = this.t('nowReading');
    if (stopBtn) stopBtn.textContent = '⏹️ ' + this.t('stopAudio');
    if (titleEl) titleEl.textContent = title;
    bar.classList.add('active');
    this.isAudioPlaying = true;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${title}. ${summary}`);
      const lang = window.INB_STORE.getLang();
      if (lang === 'mr') utterance.lang = 'mr-IN';
      else if (lang === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      
      utterance.rate = 1.0;
      utterance.onend = () => this.stopArticleAudio();
      window.speechSynthesis.speak(utterance);
      this.currentSpeechUtterance = utterance;
    }
  },

  stopArticleAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const bar = document.getElementById('audio-narrator-bar');
    if (bar) bar.classList.remove('active');
    this.isAudioPlaying = false;
  },

  // Format relative timestamp
  formatTimeAgo(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    const lang = window.INB_STORE.getLang();
    if (diffMins < 1) return lang === 'mr' ? 'आत्ताच' : (lang === 'hi' ? 'अभी' : 'Just now');
    if (diffMins < 60) return `${diffMins} ${lang === 'mr' ? 'मिनिटांपूर्वी' : (lang === 'hi' ? 'मिनट पहले' : 'mins ago')}`;
    if (diffHours < 24) return `${diffHours} ${lang === 'mr' ? 'तासांपूर्वी' : (lang === 'hi' ? 'घंटे पहले' : 'hours ago')}`;
    return date.toLocaleDateString();
  },

  // Indian numeral formatter
  formatNumber(num) {
    if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  },

  renderCategoryBadge(catId) {
    const cat = window.INB_CONFIG.categories.find(c => c.id === catId);
    const label = cat ? this.getI18n(cat.label) : catId.toUpperCase();
    return `<span class="badge badge-category">${label}</span>`;
  },

  // --- RE-RENDER ENTIRE STATIC SHELL (HEADER, DRAWER, NAV, FOOTER) ---
  updateStaticHeaderAndFooter() {
    // 1. Top Helpline
    const helpEl = document.getElementById('topbar-helpline-label');
    if (helpEl) helpEl.textContent = this.t('emergencyHelpline');

    // 2. Breaking Badge
    const breakEl = document.getElementById('topbar-breaking-badge');
    if (breakEl) breakEl.innerHTML = `<span class="pulse-dot"></span> ${this.t('breaking')}`;

    // 3. Search Button Placeholder
    const searchPlaceholder = document.getElementById('header-search-placeholder');
    if (searchPlaceholder) searchPlaceholder.textContent = this.t('searchPlaceholder');

    // 4. Header Buttons
    const btnReport = document.getElementById('header-btn-report');
    if (btnReport) btnReport.innerHTML = `📢 ${this.t('reportIssueBtn')}`;

    const btnAi = document.getElementById('header-btn-ai');
    if (btnAi) btnAi.innerHTML = `🤖 <strong>${this.t('askAiBtn')}</strong>`;

    const btnCms = document.getElementById('header-btn-cms');
    if (btnCms) btnCms.innerHTML = `⚙️ ${this.t('adminCmsBtn')}`;

    // 5. Brand Tagline
    const brandTagline = document.getElementById('brand-tagline-text');
    if (brandTagline) brandTagline.textContent = this.t('brandTagline');

    // 6. Navigation Items (Desktop & Mobile Drawer)
    this.renderHeaderNav();
    this.renderMobileDrawer();

    // 7. Footer
    this.renderFooter();

    // 8. Bottom Nav Labels
    const bHome = document.getElementById('bnav-label-home');
    if (bHome) bHome.textContent = this.t('navHome').replace(/[^a-zA-Z\u0900-\u097F]/g, '');
    const bRep = document.getElementById('bnav-label-reports');
    if (bRep) bRep.textContent = this.t('citizenReports').split(' ')[0];
    const bHelp = document.getElementById('bnav-label-help');
    if (bHelp) bHelp.textContent = this.t('helpDesk').split(' ')[0];
    const bMap = document.getElementById('bnav-label-map');
    if (bMap) bMap.textContent = this.t('liveMap').split(' ')[0];
  },

  getNavItems() {
    return [
      { path: '/', label: this.t('navHome'), icon: '🏠' },
      { path: '/category/pune', label: this.t('navPune'), icon: '📍' },
      { path: '/category/maharashtra', label: this.t('navMaharashtra'), icon: '🚩' },
      { path: '/category/rural', label: this.t('navRural'), icon: '🌾' },
      { path: '/category/politics', label: this.t('navPolitics'), icon: '🗳️' },
      { path: '/category/crime', label: this.t('navCrime'), icon: '🛡️' },
      { path: '/category/tech', label: this.t('navTech'), icon: '💻' },
      { path: '/schemes', label: this.t('navSchemes'), icon: '📜' },
      { path: '/jobs', label: this.t('navJobs'), icon: '💼' },
      { path: '/citizen-reports', label: this.t('navCitizenReports'), icon: '📢', highlight: true },
      { path: '/help', label: this.t('navHelpDesk'), icon: '🚨', isDanger: true },
      { path: '/live-map', label: this.t('navLiveMap'), icon: '🗺️' },
      { path: '/fact-check', label: this.t('navFactCheck'), icon: '🔍' },
      { path: '/directory', label: this.t('navDirectory'), icon: '🏬' },
      { path: '/advertise', label: this.t('navAdvertise'), icon: '📢' },
      { path: '/media', label: this.t('navMedia'), icon: '🎬' },
      { path: '/admin', label: this.t('adminDesk'), icon: '⚙️' }
    ];
  },

  renderHeaderNav() {
    const navContainer = document.getElementById('main-nav-list');
    if (!navContainer) return;

    const navItems = this.getNavItems();
    navContainer.innerHTML = navItems.map(item => `
      <li>
        <a href="#${item.path}" class="nav-item-link ${item.highlight ? 'highlight-pill' : ''}" style="${item.isDanger ? 'color:var(--accent-red); font-weight:700;' : ''}">
          ${item.label}
        </a>
      </li>
    `).join('');

    const currentHash = window.location.hash.slice(1) || '/';
    window.INB_ROUTER.updateActiveNavUI(currentHash);
  },

  renderMobileDrawer() {
    const drawerLinks = document.getElementById('mobile-drawer-links');
    if (!drawerLinks) return;

    const navItems = this.getNavItems();
    drawerLinks.innerHTML = `
      <div style="padding: 0 0.5rem 0.5rem 0.5rem;">
        <button class="btn btn-primary" style="width:100%; margin-bottom:0.5rem;" onclick="UI.closeMobileDrawer(); CitizenDesk.openReportModal();">
          📢 ${this.t('reportIssueBtn')}
        </button>
        <button class="btn btn-outline" style="width:100%;" onclick="UI.closeMobileDrawer(); AIAssistant.openChatModal();">
          🤖 ${this.t('askAiBtn')}
        </button>
      </div>
      <div style="border-top: 1px solid var(--border-light); padding-top: 0.5rem;">
        ${navItems.map(item => `
          <a href="#${item.path}" class="drawer-link" onclick="UI.closeMobileDrawer();">
            <span>${item.icon}</span>
            <span>${item.label.replace(/^[^\w\u0900-\u097F\s]+\s*/, '')}</span>
          </a>
        `).join('')}
      </div>
    `;
  },

  renderFooter() {
    const footerContainer = document.getElementById('site-footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <!-- Brand & Product Flow Mission -->
          <div class="footer-brand">
            <h2>INBrownTown</h2>
            <p>${this.t('footerAboutText')}</p>
            <div class="footer-flow-badge">
              NEWS → PEOPLE → PROBLEMS → REPORT → VERIFY → INFORM → CONNECT → ACTION
            </div>
          </div>

          <!-- Column 1: News Categories -->
          <div class="footer-col">
            <h3>${this.t('footerColNews')}</h3>
            <ul class="footer-links">
              <li><a href="#/category/pune">${this.t('navPune')}</a></li>
              <li><a href="#/category/maharashtra">${this.t('navMaharashtra')}</a></li>
              <li><a href="#/category/rural">${this.t('navRural')}</a></li>
              <li><a href="#/category/tech">${this.t('navTech')}</a></li>
              <li><a href="#/fact-check">${this.t('factCheck')}</a></li>
            </ul>
          </div>

          <!-- Column 2: Public Service & Help -->
          <div class="footer-col">
            <h3>${this.t('footerColHelp')}</h3>
            <ul class="footer-links">
              <li><a href="#/citizen-reports">${this.t('citizenReports')}</a></li>
              <li><a href="#/help">${this.t('helpDesk')}</a></li>
              <li><a href="#/schemes">${this.t('govSchemes')}</a></li>
              <li><a href="#/jobs">${this.t('jobsEdu')}</a></li>
              <li><a href="#/live-map">${this.t('liveMap')}</a></li>
            </ul>
          </div>

          <!-- Column 3: Business & Agency -->
          <div class="footer-col">
            <h3>${this.t('footerColBiz')}</h3>
            <ul class="footer-links">
              <li><a href="#/directory">${this.t('businessDir')}</a></li>
              <li><a href="#/advertise">${this.t('advertise')}</a></li>
              <li><a href="#/media">${this.t('mediaAgency')}</a></li>
              <li><a href="#/about-trust">${this.t('editorialEthics')}</a></li>
              <li><a href="#/admin">${this.t('adminDesk')}</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsroom Contact -->
          <div class="footer-col">
            <h3>${this.t('footerColContact')}</h3>
            <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.6; margin-bottom: 0.75rem;">
              ${this.t('footerAddress')}<br>
              📧 editorial@inbrowntown.com<br>
              📞 1800-889-2769 (${this.t('emergencyHelpline')})
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <a href="https://youtube.com/@inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="color: #fff; border-color: rgba(255,255,255,0.3)">YouTube</a>
              <a href="https://instagram.com/inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="color: #fff; border-color: rgba(255,255,255,0.3)">Instagram</a>
            </div>
          </div>
        </div>

        <!-- Bottom Legal Bar -->
        <div class="footer-bottom-bar">
          <div>${this.t('copyright')}</div>
          <div style="display: flex; gap: clamp(0.75rem, 2vw, 1.5rem); flex-wrap: wrap;">
            <a href="#/about-trust">${this.t('editorialEthics')}</a>
            <a href="#/about-trust">${this.t('privacyPolicy')}</a>
            <a href="#/about-trust">${this.t('correctionPolicy')}</a>
          </div>
        </div>
      </div>
    `;
  },

  // --- VIEW: HOMEPAGE PORTAL ---
  renderHomeView() {
    const appEl = document.getElementById('app-main');
    const hero = window.INB_STORE.getHeroArticle();
    const selectedDist = window.INB_STORE.getSelectedDistrict();
    const nearArticles = window.INB_STORE.getArticles({ district: selectedDist }).slice(0, 3);
    const latestArticles = window.INB_STORE.getArticles().filter(a => a.id !== hero.id).slice(0, 4);
    const timeline = window.INB_STORE.state.liveTimeline.slice(0, 4);
    const helpRequests = window.INB_STORE.state.helpRequests.slice(0, 3);
    const citizenReports = window.INB_STORE.state.citizenReports.slice(0, 3);
    const factChecks = window.INB_STORE.state.factChecks.slice(0, 2);
    const schemes = window.INB_STORE.state.schemes.slice(0, 3);
    const originals = window.INB_STORE.state.originals.slice(0, 2);
    const poll = window.INB_STORE.state.communityPoll;
    const hasVoted = window.INB_STORE.hasVotedPoll(poll.id);

    appEl.innerHTML = `
      <!-- 1. HERO ARTICLE SECTION -->
      <section class="hero-section">
        <div class="hero-story-card">
          <div class="hero-img-wrap" onclick="window.INB_ROUTER.navigate('/article/${hero.id}')" style="cursor:pointer">
            <img src="${hero.image}" alt="${this.getI18n(hero.title)}" loading="lazy">
            <div class="card-category-overlay">
              <span class="badge badge-breaking">🚨 ${this.t('breaking')}</span>
              ${this.renderCategoryBadge(hero.category)}
            </div>
          </div>
          <div class="hero-content-wrap">
            <div class="hero-meta-top">
              <span class="badge badge-verified">🛡️ ${this.t('verifiedNewsroom')}</span>
              <span style="font-size:0.8rem; color:var(--text-muted)">⏱️ ${this.formatTimeAgo(hero.publishedAt)}</span>
            </div>
            <h2 class="hero-headline" onclick="window.INB_ROUTER.navigate('/article/${hero.id}')">${this.getI18n(hero.title)}</h2>
            <p class="hero-excerpt">${this.getI18n(hero.summary)}</p>
            <div class="hero-cta-row">
              <button class="btn btn-primary" onclick="window.INB_ROUTER.navigate('/article/${hero.id}')">
                📖 ${hero.readTimeMin} ${this.t('minRead')}
              </button>
              <button class="btn btn-outline" onclick="UI.playArticleAudio('${this.getI18n(hero.title).replace(/'/g, "\\'")}', '${this.getI18n(hero.summary).replace(/'/g, "\\'")}')">
                🔊 ${this.t('audioListen')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. MAIN SPLIT GRID (LATEST + LIVE NEWSROOM TIMELINE) -->
      <div class="home-split-grid">
        <!-- Left: Latest News Cards -->
        <div>
          <div class="section-header">
            <h2 class="section-title">📰 ${this.t('latest')}</h2>
            <a href="#/category/all" class="btn btn-outline btn-sm">${this.t('viewAll')}</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 100%, 320px), 1fr)); gap: clamp(1rem, 2.5vw, 1.5rem);">
            ${latestArticles.map(art => this.renderArticleCardHtml(art)).join('')}
          </div>
        </div>

        <!-- Right: What's Happening Now (Live Newsroom Timeline) -->
        <div>
          <div class="section-header">
            <h2 class="section-title">⚡ ${this.t('happeningNow')}</h2>
            <span class="ticker-badge"><span class="pulse-dot"></span> LIVE</span>
          </div>
          <div class="timeline-stream">
            ${timeline.map(item => `
              <div class="timeline-item">
                <span class="timeline-time-badge">${item.time}</span>
                <div class="timeline-content">
                  <div class="timeline-meta">
                    <strong>📍 ${item.location}</strong>
                    <span class="badge ${item.status === 'BREAKING' ? 'badge-danger' : 'badge-verified'}">${item.status}</span>
                  </div>
                  <p class="timeline-headline">${this.getI18n(item.headline)}</p>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 1.25rem; text-align: center;">
            <a href="#/live-map" class="btn btn-navy btn-sm" style="width: 100%;">
              ${this.t('openLiveMap')}
            </a>
          </div>
        </div>
      </div>

      <!-- 3. NEWS NEAR YOU (HYPERLOCAL DISTRICT SELECTOR) -->
      <section style="margin-bottom: clamp(2rem, 4vw, 3.5rem);">
        <div class="section-header">
          <div>
            <h2 class="section-title">📍 ${this.t('nearYou')}</h2>
            <p class="section-subtitle">${this.t('nearYouSub')}</p>
          </div>
        </div>
        <div class="district-pills-bar">
          ${window.INB_CONFIG.districts.map(d => `
            <button class="district-pill ${d.id === selectedDist ? 'active' : ''}" onclick="UI.changeDistrictFilter('${d.id}')">
              ${this.getI18n(d.name)}
            </button>
          `).join('')}
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 100%, 340px), 1fr)); gap: clamp(1rem, 2.5vw, 1.5rem);">
          ${nearArticles.length > 0 ? nearArticles.map(art => this.renderArticleCardHtml(art)).join('') : `
            <div style="grid-column: 1/-1; padding: 2rem; text-align: center; background: var(--bg-surface); border-radius: var(--radius-lg);">
              <p>Loading updates for this district...</p>
            </div>
          `}
        </div>
      </section>

      <!-- 4. INBROWNTOWN HELP BOARD & CITIZEN REPORTS -->
      <div class="home-duo-grid">
        <!-- Emergency Help Board -->
        <div>
          <div class="section-header">
            <h2 class="section-title" style="color: var(--accent-red)">🚨 ${this.t('helpDesk')}</h2>
            <button class="btn btn-danger btn-sm" onclick="CitizenDesk.openEmergencyModal()">
              + ${this.t('requestHelp')}
            </button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${helpRequests.map(req => this.renderHelpCardHtml(req)).join('')}
          </div>
          <div style="margin-top: 1rem; text-align: right;">
            <a href="#/help" class="btn btn-outline btn-sm">${this.t('allHelpRequests')}</a>
          </div>
        </div>

        <!-- Citizen Reports & Issue Tracker -->
        <div>
          <div class="section-header">
            <h2 class="section-title">📢 ${this.t('citizenReports')}</h2>
            <button class="btn btn-primary btn-sm" onclick="CitizenDesk.openReportModal()">
              + ${this.t('reportIssue')}
            </button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${citizenReports.map(rep => this.renderCitizenReportCardHtml(rep, true)).join('')}
          </div>
          <div style="margin-top: 1rem; text-align: right;">
            <a href="#/citizen-reports" class="btn btn-outline btn-sm">${this.t('allReports')}</a>
          </div>
        </div>
      </div>

      <!-- 5. FACT CHECK & GOVERNMENT SCHEMES -->
      <div class="home-duo-grid">
        <!-- Fact Check Desk -->
        <div>
          <div class="section-header">
            <h2 class="section-title">🔍 ${this.t('factCheck')}</h2>
            <a href="#/fact-check" class="btn btn-outline btn-sm">${this.t('allFactChecks')}</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${factChecks.map(fc => `
              <div class="fact-check-card">
                <div class="verdict-header-row">
                  <span class="badge ${fc.verdict === 'TRUE' ? 'badge-verified' : 'badge-danger'}">
                    ${fc.verdict === 'TRUE' ? '✓ ' + this.t('factTrue') : '✗ ' + this.t('factFalse')}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-muted)">📅 ${fc.date}</span>
                </div>
                <div class="claim-quote-box">
                  <strong>${this.t('claim')}</strong> "${this.getI18n(fc.claim)}"
                </div>
                <div class="reality-box">
                  <strong>${this.t('reality')}</strong> ${this.getI18n(fc.reality)}
                </div>
                <div class="sources-row">
                  <strong>${this.t('sources')}</strong> ${fc.sources}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Government Schemes Hub -->
        <div>
          <div class="section-header">
            <h2 class="section-title">📜 ${this.t('govSchemes')}</h2>
            <a href="#/schemes" class="btn btn-outline btn-sm">${this.t('allSchemes')}</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${schemes.map(sch => `
              <div class="scheme-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
                  <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">${this.getI18n(sch.name)}</h3>
                </div>
                <div class="scheme-benefit-badge">${this.t('schemeBenefit')} ${sch.financialBenefit}</div>
                <p style="font-size: 0.84rem; color: var(--text-secondary);"><strong>${this.t('schemeEligibility')}</strong> ${this.getI18n(sch.eligibility)}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.5rem; border-top: 1px solid var(--border-light); flex-wrap: wrap; gap: 0.5rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted)">🏛️ ${sch.department}</span>
                  <a href="${sch.officialLink}" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm">${this.t('applyOfficial')}</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 6. COMMUNITY POLL & BROWN TOWN ORIGINALS -->
      <div class="home-duo-grid">
        <!-- People's Voice Poll -->
        <div>
          <div class="section-header">
            <h2 class="section-title">🗳️ ${this.t('peoplesVoice')}</h2>
          </div>
          <div class="poll-container" id="poll-box">
            <h3 class="poll-question">${this.getI18n(poll.question)}</h3>
            <div class="poll-option-list">
              ${poll.options.map(opt => {
                const percent = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
                return `
                  <button class="poll-option-btn" onclick="UI.votePollOption('${opt.id}')" ${hasVoted ? 'disabled' : ''}>
                    <div class="poll-bar-fill" style="width: ${hasVoted ? percent : 0}%"></div>
                    <span class="poll-option-text">${this.getI18n(opt.label)}</span>
                    ${hasVoted ? `<span class="poll-percent-label">${percent}%</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted)">
              <span>👥 ${this.formatNumber(poll.totalVotes)}</span>
              <span>${hasVoted ? '✓ Voted' : ''}</span>
            </div>
          </div>
        </div>

        <!-- Brown Town Originals -->
        <div>
          <div class="section-header">
            <h2 class="section-title">🎬 ${this.t('originals')}</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(200px, 100%, 260px), 1fr)); gap: 1rem;">
            ${originals.map(orig => `
              <div class="news-card" style="cursor: pointer;" onclick="UI.showToast('Playing video...', 'info')">
                <div class="news-card-img-wrap">
                  <img src="${orig.thumbnail}" alt="${this.getI18n(orig.title)}">
                  <span style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.72rem; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 700;">
                    ▶ ${orig.duration}
                  </span>
                </div>
                <div class="news-card-body">
                  <span class="badge badge-category" style="align-self: flex-start; margin-bottom: 0.4rem;">${orig.category}</span>
                  <h4 style="font-size: 0.92rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.5rem;">${this.getI18n(orig.title)}</h4>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: auto;">
                    🎙️ ${orig.host} • 👁️ ${orig.views}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 7. ADVERTISE & BUSINESS DIRECTORY MARKETPLACE CTA -->
      <section style="background: linear-gradient(135deg, var(--brand-navy-900) 0%, var(--brand-navy-800) 100%); color: #fff; padding: clamp(1.5rem, 4vw, 3rem); border-radius: var(--radius-xl); margin-bottom: clamp(2rem, 4vw, 3.5rem); border: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div style="max-width: 600px;">
            <span class="footer-flow-badge" style="margin-bottom: 0.75rem;">GROW WITH INBROWNTOWN</span>
            <h2 style="font-size: clamp(1.3rem, 3vw, 1.85rem); font-weight: 900; margin-bottom: 0.75rem; color: #fff;">${this.t('advertiseSub')}</h2>
            <p style="color: #94a3b8; font-size: clamp(0.85rem, 1vw, 0.95rem); line-height: 1.6;">
              ${this.t('footerAboutText')}
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/advertise" class="btn btn-primary btn-lg">📢 ${this.t('advertise')}</a>
            <a href="#/media" class="btn btn-outline btn-lg" style="color: #fff; border-color: rgba(255,255,255,0.3)">💼 ${this.t('mediaAgency')}</a>
          </div>
        </div>
      </section>
    `;
  },

  // Helper: Article Card HTML
  renderArticleCardHtml(art) {
    const isBookmarked = window.INB_STORE.isBookmarked(art.id);
    const isLiked = window.INB_STORE.isLiked(art.id);
    return `
      <article class="news-card">
        <div class="news-card-img-wrap" onclick="window.INB_ROUTER.navigate('/article/${art.id}')" style="cursor:pointer">
          <img src="${art.image}" alt="${this.getI18n(art.title)}" loading="lazy">
          <div class="card-category-overlay">
            ${art.isBreaking ? `<span class="badge badge-breaking">🚨 ${this.t('breaking')}</span>` : ''}
            ${this.renderCategoryBadge(art.category)}
          </div>
        </div>
        <div class="news-card-body">
          <div class="news-card-meta">
            <span>⏱️ ${this.formatTimeAgo(art.publishedAt)}</span>
            <span>•</span>
            <span>👁️ ${this.formatNumber(art.views)}</span>
          </div>
          <h3 class="news-card-title" onclick="window.INB_ROUTER.navigate('/article/${art.id}')" style="cursor:pointer">
            ${this.getI18n(art.title)}
          </h3>
          <p class="news-card-summary">${this.getI18n(art.summary)}</p>
          <div class="news-card-footer">
            <div class="card-author-info">
              <img src="${art.author.avatar}" alt="${art.author.name}" class="card-author-avatar">
              <span>${art.author.name}</span>
            </div>
            <div class="card-actions">
              <button class="card-action-btn ${isLiked ? 'active' : ''}" onclick="UI.toggleArticleLike('${art.id}', this)" title="${this.t('share')}">
                ❤️ <span>${art.likes || 0}</span>
              </button>
              <button class="card-action-btn ${isBookmarked ? 'active' : ''}" onclick="UI.toggleArticleBookmark('${art.id}', this)" title="${this.t('save')}">
                🔖
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  },

  // Helper: Help Request Card HTML
  renderHelpCardHtml(req) {
    return `
      <div class="help-alert-card type-${req.type}">
        <div class="help-card-header">
          <span class="badge ${req.urgency === 'HIGH' || req.urgency === 'CRITICAL' ? 'badge-danger' : 'badge-warning'}">
            🚨 ${req.urgency} URGENCY
          </span>
          <span class="badge badge-verified">🛡️ ${this.t('verifiedNewsroom')}</span>
        </div>
        <div class="help-title-line">
          ${req.type === 'blood' ? `🩸 ${this.t('urgentNeed')}: <strong>${req.bloodGroup}</strong> (${req.unitsNeeded} Units)` : ''}
          ${req.type === 'missing' ? `👤 ${this.t('patientName')} <strong>${req.patientName}</strong>` : ''}
          ${req.type === 'medical_aid' ? `🏥 ${this.t('urgentNeed')}: <strong>${req.patientName}</strong>` : ''}
        </div>
        <div class="help-info-table">
          <div class="help-info-row">
            <span class="help-info-label">${this.t('patientName')}</span>
            <span class="help-info-val">${req.patientName}</span>
          </div>
          <div class="help-info-row">
            <span class="help-info-label">${this.t('hospitalLocation')}</span>
            <span class="help-info-val">${req.hospital} (${req.city})</span>
          </div>
        </div>
        <p style="font-size: 0.84rem; color: var(--text-secondary);">${this.getI18n(req.details)}</p>
        <div class="help-contact-reveal-box">
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.3rem;">📞 ${req.contactPerson}</div>
          <a href="tel:${req.contactPhone}" class="btn btn-danger btn-sm" style="width: 100%;">
            📞 ${this.t('callNow')}: ${req.contactPhone}
          </a>
        </div>
      </div>
    `;
  },

  // Helper: Citizen Report Card HTML
  renderCitizenReportCardHtml(rep, isCompact = false) {
    let statusClass = 'badge-warning';
    let statusText = this.t('statusPending');
    if (rep.status === 'VERIFIED') { statusClass = 'badge-info'; statusText = this.t('statusVerified'); }
    if (rep.status === 'ESCALATED') { statusClass = 'badge-danger'; statusText = this.t('statusEscalated'); }
    if (rep.status === 'RESOLVED') { statusClass = 'badge-resolved'; statusText = '✓ ' + this.t('statusResolved'); }

    return `
      <div class="citizen-report-card">
        ${!isCompact && rep.imageBefore ? `
          <div class="report-media-banner">
            <img src="${rep.imageBefore}" alt="${this.getI18n(rep.title)}">
            <div class="report-status-pill">
              <span class="badge ${statusClass}">${statusText}</span>
            </div>
          </div>
        ` : ''}
        <div class="report-body">
          ${isCompact ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; gap: 0.5rem; flex-wrap: wrap;">
              <span class="report-location-tag">📍 ${rep.locality}</span>
              <span class="badge ${statusClass}">${statusText}</span>
            </div>
          ` : `<span class="report-location-tag">📍 ${rep.locality}</span>`}
          <h3 class="report-title">${this.getI18n(rep.title)}</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45;">${this.getI18n(rep.description)}</p>
          ${rep.officialResponse ? `
            <div class="report-official-box">
              <strong>${this.t('officialAction')}</strong> ${rep.officialResponse}
            </div>
          ` : ''}
        </div>
        <div class="report-footer">
          <span style="font-size: 0.75rem; color: var(--text-muted)">👤 ${rep.reporterName}</span>
          <button class="upvote-btn" onclick="CitizenDesk.upvoteReport('${rep.id}', this)">
            ${this.t('supportBtn')} (${rep.upvotes || 1})
          </button>
        </div>
      </div>
    `;
  },

  // --- VIEW: SINGLE ARTICLE ---
  renderArticleView(id) {
    const appEl = document.getElementById('app-main');
    const article = window.INB_STORE.getArticleById(id);

    if (!article) {
      appEl.innerHTML = `
        <div style="padding: 4rem 1.5rem; text-align: center;">
          <h2>Article Not Found</h2>
          <a href="#/" class="btn btn-primary">${this.t('navHome')}</a>
        </div>
      `;
      return;
    }

    window.INB_STORE.incrementArticleViews(article.id);
    const related = window.INB_STORE.getArticles({ category: article.category }).filter(a => a.id !== article.id).slice(0, 3);
    const isBookmarked = window.INB_STORE.isBookmarked(article.id);
    const isLiked = window.INB_STORE.isLiked(article.id);

    appEl.innerHTML = `
      <article style="max-width: 860px; margin: 0 auto clamp(2rem, 5vw, 4rem) auto; padding: 1rem 0;">
        <nav style="display: flex; gap: 0.5rem; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.25rem; flex-wrap: wrap;">
          <a href="#/">${this.t('navHome')}</a> &gt; 
          <a href="#/category/${article.category}">${this.renderCategoryBadge(article.category)}</a>
        </nav>

        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
          <span class="badge badge-verified">🛡️ ${this.t('verifiedNewsroom')}</span>
          <span class="badge badge-category">📍 ${article.district.toUpperCase()}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">⏱️ ${this.formatTimeAgo(article.publishedAt)}</span>
        </div>

        <h1 style="font-family: var(--font-serif); font-size: clamp(1.35rem, 3.5vw, 2.2rem); font-weight: 800; line-height: 1.25; margin-bottom: 1.25rem; color: var(--text-primary);">
          ${this.getI18n(article.title)}
        </h1>

        <p style="font-size: clamp(0.95rem, 1.5vw, 1.15rem); color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem; font-weight: 500;">
          ${this.getI18n(article.summary)}
        </p>

        <!-- Author & Interaction Toolbar -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img src="${article.author.avatar}" alt="${article.author.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${article.author.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${article.author.role}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="UI.playArticleAudio('${this.getI18n(article.title).replace(/'/g, "\\'")}', '${this.getI18n(article.summary).replace(/'/g, "\\'")}')">
              🔊 ${this.t('audioListen')}
            </button>
            <button class="btn btn-outline btn-sm ${isLiked ? 'btn-primary' : ''}" onclick="UI.toggleArticleLike('${article.id}', this)">
              ❤️ ${article.likes || 0}
            </button>
            <button class="btn btn-outline btn-sm ${isBookmarked ? 'btn-primary' : ''}" onclick="UI.toggleArticleBookmark('${article.id}', this)">
              🔖 ${isBookmarked ? this.t('saved') : this.t('save')}
            </button>
            <button class="btn btn-outline btn-sm" onclick="UI.shareArticle('${this.getI18n(article.title).replace(/'/g, "\\'")}')">
              📤 ${this.t('share')}
            </button>
          </div>
        </div>

        <!-- Featured Media Banner -->
        <figure style="margin-bottom: 2rem;">
          <img src="${article.image}" alt="${this.getI18n(article.title)}" style="width: 100%; border-radius: var(--radius-lg); max-height: 480px; object-fit: cover;">
          <figcaption style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; text-align: center;">
            📷 ${article.imageCaption || ''}
          </figcaption>
        </figure>

        <!-- Article Core Content -->
        <div class="article-body-text" style="font-size: clamp(0.95rem, 1.2vw, 1.08rem); line-height: 1.8; color: var(--text-primary); margin-bottom: 2.5rem;">
          ${this.getI18n(article.content)}
        </div>

        <!-- Tags -->
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2.5rem;">
          ${(article.tags || []).map(t => `<span class="badge badge-category">#${t}</span>`).join('')}
        </div>

        <!-- Editorial Trust Statement -->
        <div style="background: var(--bg-surface-subtle); border-left: 4px solid var(--brand-brown-600); padding: 1.25rem; border-radius: 4px; margin-bottom: 3rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.35rem;">🛡️ ${this.t('verifiedNewsroom')}</h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
            ${this.t('footerAboutText')} <a href="#/about-trust" style="color: var(--brand-brown-600); text-decoration: underline;">${this.t('editorialEthics')}</a>.
          </p>
        </div>

        <!-- Related Stories -->
        ${related.length > 0 ? `
          <div style="margin-top: 2.5rem; border-top: 2px solid var(--border-light); padding-top: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem;">${this.t('latest')}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(240px, 100%, 280px), 1fr)); gap: 1.5rem;">
              ${related.map(r => this.renderArticleCardHtml(r)).join('')}
            </div>
          </div>
        ` : ''}
      </article>
    `;
  },

  // --- VIEW: CATEGORY / FILTERED ---
  renderCategoryView(catId) {
    const appEl = document.getElementById('app-main');
    const articles = window.INB_STORE.getArticles({ category: catId });
    const catObj = window.INB_CONFIG.categories.find(c => c.id === catId);
    const catName = catObj ? this.getI18n(catObj.label) : catId.toUpperCase();

    appEl.innerHTML = `
      <div style="margin-bottom: 3rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">${catName}</h1>
            <p class="section-subtitle">${articles.length} ${this.t('verifiedNewsroom')}</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 100%, 340px), 1fr)); gap: clamp(1rem, 2.5vw, 1.5rem);">
          ${articles.length > 0 ? articles.map(a => this.renderArticleCardHtml(a)).join('') : `
            <div style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center; background: var(--bg-surface); border-radius: var(--radius-lg);">
              <h3>No stories currently in this category</h3>
            </div>
          `}
        </div>
      </div>
    `;
  },

  // --- VIEW: FACT CHECK DESK ---
  renderFactCheckView() {
    const appEl = document.getElementById('app-main');
    const fcs = window.INB_STORE.state.factChecks;

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">🔍 ${this.t('factCheck')}</h1>
            <p class="section-subtitle">${this.t('factCheckSub')}</p>
          </div>
        </div>

        <div class="fact-check-grid">
          ${fcs.map(fc => `
            <div class="fact-check-card">
              <div class="verdict-header-row">
                <span class="badge ${fc.verdict === 'TRUE' ? 'badge-verified' : 'badge-danger'}">
                  ${fc.verdict === 'TRUE' ? '✓ ' + this.t('factTrue') : '✗ ' + this.t('factFalse')}
                </span>
                <span style="font-size: 0.75rem; color: var(--text-muted)">📅 ${fc.date}</span>
              </div>
              <div class="claim-quote-box">
                <strong>${this.t('claim')}</strong> "${this.getI18n(fc.claim)}"
              </div>
              <div class="reality-box">
                <strong>${this.t('reality')}</strong> ${this.getI18n(fc.reality)}
              </div>
              <div class="sources-row">
                <strong>${this.t('sources')}</strong> ${fc.sources}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- VIEW: GOVERNMENT SCHEMES ---
  renderSchemesView() {
    const appEl = document.getElementById('app-main');
    const schemes = window.INB_STORE.state.schemes;

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">📜 ${this.t('govSchemes')}</h1>
            <p class="section-subtitle">${this.t('govSchemesSub')}</p>
          </div>
        </div>

        <div class="schemes-grid">
          ${schemes.map(sch => `
            <div class="scheme-card">
              <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${this.getI18n(sch.name)}</h2>
              <div class="scheme-benefit-badge">${this.t('schemeBenefit')} ${sch.financialBenefit}</div>
              <p style="font-size: 0.88rem; color: var(--text-secondary);"><strong>${this.t('schemeEligibility')}</strong> ${this.getI18n(sch.eligibility)}</p>
              <div>
                <strong style="font-size: 0.82rem; color: var(--text-primary);">${this.t('schemeDocs')}</strong>
                <ul class="docs-checklist" style="margin-top: 0.35rem;">
                  ${sch.documentsRequired.map(d => `<li>${d}</li>`).join('')}
                </ul>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-light); flex-wrap: wrap; gap: 0.5rem;">
                <span style="font-size: 0.75rem; color: var(--text-muted)">🏛️ ${sch.department}</span>
                <a href="${sch.officialLink}" target="_blank" rel="noreferrer" class="btn btn-primary btn-sm">${this.t('applyOfficial')}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- VIEW: JOBS & CAREERS ---
  renderJobsView() {
    const appEl = document.getElementById('app-main');
    const jobs = window.INB_STORE.state.jobs;

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">💼 ${this.t('jobsEdu')}</h1>
            <p class="section-subtitle">${this.t('jobsEduSub')}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 100%, 360px), 1fr)); gap: clamp(1rem, 2.5vw, 1.5rem);">
          ${jobs.map(j => `
            <div class="scheme-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
                <span class="badge badge-category">${j.type}</span>
                <span style="font-size: 0.75rem; color: var(--accent-red); font-weight: 700;">${this.t('lastDate')} ${j.lastDate}</span>
              </div>
              <h3 style="font-size: 1.1rem; font-weight: 700;">${this.getI18n(j.title)}</h3>
              <div style="font-size: 0.85rem; color: var(--text-muted);">🏢 ${j.organization} • 📍 ${j.location}</div>
              <div class="scheme-benefit-badge" style="background: rgba(2,136,209,0.08); color: var(--accent-blue); border-color: rgba(2,136,209,0.2);">
                ${this.t('salaryStipend')} ${j.salary}
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary);"><strong>${this.t('schemeEligibility')}</strong> ${j.qualification} | <strong>${this.t('openingsCount')}</strong> ${j.openings}</p>
              <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-light); text-align: right;">
                <a href="${j.applyLink}" target="_blank" rel="noreferrer" class="btn btn-primary btn-sm">${this.t('applyOfficial')}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- VIEW: LOCAL BUSINESS DIRECTORY ---
  renderDirectoryView() {
    const appEl = document.getElementById('app-main');
    const businesses = window.INB_STORE.state.businesses;

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">🏬 ${this.t('businessDir')}</h1>
            <p class="section-subtitle">${this.t('businessDirSub')}</p>
          </div>
          <a href="#/advertise" class="btn btn-primary btn-sm">${this.t('addBusiness')}</a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 100%, 340px), 1fr)); gap: clamp(1rem, 2.5vw, 1.5rem);">
          ${businesses.map(b => `
            <div class="news-card">
              <div class="news-card-img-wrap" style="padding-top: 50%;">
                <img src="${b.image}" alt="${b.name}">
                <div class="card-category-overlay">
                  <span class="badge badge-verified">⭐ ${b.rating} (${b.reviewsCount} ${this.t('reviewsLabel')})</span>
                </div>
              </div>
              <div class="news-card-body">
                <span class="badge badge-category" style="align-self:flex-start; margin-bottom:0.4rem;">${b.category}</span>
                <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.35rem;">${b.name}</h3>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.5rem;">📍 ${b.locality}</p>
                <div style="background: rgba(46,125,50,0.08); border: 1px dashed var(--accent-green); border-radius: 4px; padding: 0.4rem 0.6rem; font-size: 0.8rem; color: var(--accent-green); font-weight: 700; margin-bottom: 0.75rem;">
                  ${this.t('offerLabel')} ${b.offer}
                </div>
                <div class="news-card-footer">
                  <a href="tel:${b.phone}" class="btn btn-navy btn-sm" style="width: 100%;">
                    ${this.t('callNow')}: ${b.phone}
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- VIEW: ADVERTISE SELF-SERVE MARKETPLACE ---
  renderAdvertiseView() {
    const appEl = document.getElementById('app-main');

    appEl.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto clamp(2rem, 5vw, 4rem) auto;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="footer-flow-badge">INBROWNTOWN AD MARKETPLACE</span>
          <h1 style="font-family: var(--font-serif); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 900; margin: 0.75rem 0; color: var(--text-primary);">
            ${this.t('advertise')}
          </h1>
          <p style="font-size: clamp(0.88rem, 1vw, 1rem); color: var(--text-secondary); max-width: 680px; margin: 0 auto;">
            ${this.t('advertiseSub')}
          </p>
        </div>

        <!-- Pricing Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(clamp(240px, 100%, 280px), 1fr)); gap: clamp(1rem, 2vw, 1.5rem); margin-bottom: 3rem;">
          <div class="ad-pricing-card">
            <h3 style="font-size: 1.15rem; font-weight: 700;">${this.t('planDirectory')}</h3>
            <div class="plan-price">₹२,९९९ <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">${this.t('perYear')}</span></div>
            <ul style="list-style: none; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; text-align: left;">
              <li>✓ Verified Business Listing</li>
              <li>✓ Direct Call & WhatsApp Action</li>
              <li>✓ Google Maps Link</li>
              <li>✓ Verified Brand Badge</li>
            </ul>
            <button class="btn btn-outline" onclick="UI.openCampaignBuilder('${this.t('planDirectory')}', '₹२,९९९')">${this.t('startCampaignBtn')}</button>
          </div>

          <div class="ad-pricing-card featured-plan">
            <span class="badge badge-breaking" style="align-self: center;">POPULAR</span>
            <h3 style="font-size: 1.15rem; font-weight: 700;">${this.t('planHeroBanner')}</h3>
            <div class="plan-price">₹९,९९९ <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">${this.t('perMonth')}</span></div>
            <ul style="list-style: none; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; text-align: left;">
              <li>✓ Top Homepage Banner Placement</li>
              <li>✓ 50,000+ Verified Impressions</li>
              <li>✓ District Hyperlocal Targeting</li>
              <li>✓ Weekly Performance Analytics</li>
            </ul>
            <button class="btn btn-primary" onclick="UI.openCampaignBuilder('${this.t('planHeroBanner')}', '₹९,९९९')">${this.t('startCampaignBtn')}</button>
          </div>

          <div class="ad-pricing-card">
            <h3 style="font-size: 1.15rem; font-weight: 700;">${this.t('planSponsored')}</h3>
            <div class="plan-price">₹१४,९९९ <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">${this.t('perArticle')}</span></div>
            <ul style="list-style: none; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; text-align: left;">
              <li>✓ Full In-Depth Editorial Article</li>
              <li>✓ Social Media Promotion</li>
              <li>✓ Permanent Portal Archive</li>
              <li>✓ Brand Video Embedding</li>
            </ul>
            <button class="btn btn-outline" onclick="UI.openCampaignBuilder('${this.t('planSponsored')}', '₹१४,९९९')">${this.t('startCampaignBtn')}</button>
          </div>
        </div>

        <div id="campaign-builder-container"></div>
      </div>
    `;
  },

  openCampaignBuilder(planName, price) {
    const cont = document.getElementById('campaign-builder-container');
    if (!cont) return;

    cont.innerHTML = `
      <div style="background: var(--bg-surface); border: 2px solid var(--brand-brown-600); border-radius: var(--radius-lg); padding: clamp(1.25rem, 3vw, 2rem); box-shadow: var(--shadow-xl); animation: toast-slide-in 0.3s ease;">
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">🚀 ${planName}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Price: <strong>${price}</strong></p>

        <form onsubmit="UI.submitCampaignForm(event, '${planName}', '${price}')">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Business Name *</label>
              <input type="text" class="form-control" id="ad-biz-name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Campaign Headline *</label>
              <input type="text" class="form-control" id="ad-campaign-title" required>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Target District *</label>
              <select class="form-control" id="ad-dist">
                <option value="pune">Pune</option>
                <option value="mumbai">Mumbai</option>
                <option value="maharashtra">All Maharashtra</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Website / Phone *</label>
              <input type="text" class="form-control" id="ad-link" required>
            </div>
          </div>
          <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
            <button type="submit" class="btn btn-primary btn-lg">${this.t('payAndLaunchBtn')} (${price})</button>
            <button type="button" class="btn btn-outline" onclick="document.getElementById('campaign-builder-container').innerHTML=''">Cancel</button>
          </div>
        </form>
      </div>
    `;
    cont.scrollIntoView({ behavior: 'smooth' });
  },

  submitCampaignForm(e, planName, price) {
    e.preventDefault();
    const biz = document.getElementById('ad-biz-name').value;
    const title = document.getElementById('ad-campaign-title').value;

    window.INB_STORE.addAdCampaign({
      title: title,
      advertiser: biz,
      placement: planName.toLowerCase().replace(/ /g, '_'),
      budget: price,
      durationDays: 30
    });

    document.getElementById('campaign-builder-container').innerHTML = '';
    UI.showToast('Campaign successfully submitted to newsroom desk!', 'success');
  },

  // --- VIEW: BROWN TOWN MEDIA AGENCY ---
  renderMediaAgencyView() {
    const appEl = document.getElementById('app-main');

    appEl.innerHTML = `
      <div style="max-width: 960px; margin: 0 auto clamp(2rem, 5vw, 4rem) auto;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="footer-flow-badge">BROWN TOWN MEDIA SERVICES</span>
          <h1 style="font-family: var(--font-serif); font-size: clamp(1.4rem, 3.5vw, 2.3rem); font-weight: 900; margin: 0.75rem 0; color: var(--text-primary);">
            ${this.t('mediaAgency')}
          </h1>
          <p style="font-size: clamp(0.9rem, 1.2vw, 1.05rem); color: var(--text-secondary); max-width: 720px; margin: 0 auto; line-height: 1.6;">
            ${this.t('mediaAgencySub')}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(clamp(240px, 100%, 280px), 1fr)); gap: clamp(1rem, 2vw, 1.5rem); margin-bottom: 2.5rem;">
          <div class="scheme-card">
            <h3 style="font-size: 1.15rem; font-weight: 800;">🎥 4K Video & Documentary Studio</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
              High-end cinematic field production, drone cinematography, podcasts, and social reels.
            </p>
          </div>
          <div class="scheme-card">
            <h3 style="font-size: 1.15rem; font-weight: 800;">📱 Social Media Growth Management</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
              Daily social handles management, viral hooks, community engagement across YouTube, Instagram & X.
            </p>
          </div>
          <div class="scheme-card">
            <h3 style="font-size: 1.15rem; font-weight: 800;">🗳️ Political & Corporate PR</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
              Strategic public relations, press releases, election campaign branding, and crisis management.
            </p>
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: clamp(1.25rem, 3vw, 2.5rem); box-shadow: var(--shadow-md);">
          <h2 style="font-size: clamp(1.15rem, 2vw, 1.4rem); font-weight: 800; margin-bottom: 0.5rem;">${this.t('requestProposal')}</h2>
          <form onsubmit="event.preventDefault(); UI.showToast('Proposal request received!', 'success'); this.reset();">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Name *</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Phone *</label>
                <input type="tel" class="form-control" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg">📩 Submit Proposal Request</button>
          </form>
        </div>
      </div>
    `;
  },

  // --- VIEW: EDITORIAL TRUST & POLICY ---
  renderTrustPolicyView() {
    const appEl = document.getElementById('app-main');

    appEl.innerHTML = `
      <div style="max-width: 820px; margin: 0 auto clamp(2rem, 5vw, 4rem) auto;">
        <h1 style="font-family: var(--font-serif); font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 900; margin-bottom: 1.5rem; color: var(--text-primary);">
          ${this.t('trustPolicy')}
        </h1>

        <div style="font-size: clamp(0.9rem, 1.2vw, 1rem); line-height: 1.8; color: var(--text-secondary); display: flex; flex-direction: column; gap: 1.5rem;">
          <p>
            <strong>INBrownTown</strong> ${this.t('footerAboutText')}
          </p>

          <div style="background: var(--bg-surface-subtle); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--brand-brown-600);">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">1. Verification Standards</h3>
            <p>Every story published on INBrownTown is verified across at least 2 independent primary official sources before publication.</p>
          </div>

          <div style="background: var(--bg-surface-subtle); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--brand-brown-600);">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">2. ${this.t('correctionPolicy')}</h3>
            <p>We believe in transparent corrections. Any editorial errors are prominently flagged and corrected immediately.</p>
          </div>

          <div style="background: var(--bg-surface-subtle); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--brand-brown-600);">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">3. ${this.t('privacyPolicy')}</h3>
            <p>Citizen contact information for civic issues and help requests is held strictly confidential.</p>
          </div>
        </div>
      </div>
    `;
  },

  // Interactions
  changeDistrictFilter(districtId) {
    window.INB_STORE.setSelectedDistrict(districtId);
    this.renderHomeView();
    this.showToast(`District changed: ${districtId.toUpperCase()}`, 'info');
  },

  toggleArticleLike(id, btn) {
    const isNowLiked = window.INB_STORE.toggleLike(id);
    const art = window.INB_STORE.getArticleById(id);
    btn.innerHTML = `❤️ <span>${art ? art.likes : 0}</span>`;
    btn.classList.toggle('active', isNowLiked);
    this.showToast(isNowLiked ? 'Liked!' : 'Unliked', 'info');
  },

  toggleArticleBookmark(id, btn) {
    const isBookmarked = window.INB_STORE.toggleBookmark(id);
    btn.classList.toggle('active', isBookmarked);
    this.showToast(isBookmarked ? 'Bookmarked!' : 'Removed', 'info');
  },

  shareArticle(title) {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.showToast('Link copied to clipboard!', 'success');
    }
  },

  votePollOption(optionId) {
    const res = window.INB_STORE.votePoll(optionId);
    if (res.success) {
      this.showToast('Vote recorded!', 'success');
      this.renderHomeView();
    } else {
      this.showToast(res.message, 'danger');
    }
  }
};

window.UI = UI;
