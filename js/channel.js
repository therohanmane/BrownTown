/**
 * INBrownTown - Brand & Channel Engine
 * Manages full top-to-bottom multilingual rendering, sticky header freeze & scroll transformation,
 * dynamic scroll progress bar, scrollspy active tabs, embedded video modal player, and inquiry processing.
 */

const Channel = {
  activeCategory: 'all',
  currentLang: localStorage.getItem('inb_brand_lang') || 'mr',
  currentTheme: localStorage.getItem('inb_brand_theme') || 'light',

  // String lookup helper
  t(key) {
    const dict = window.INB_I18N[this.currentLang] || window.INB_I18N.mr || window.INB_I18N.en;
    return dict[key] || (window.INB_I18N.en && window.INB_I18N.en[key]) || key;
  },

  // Extract multilingual object field
  getI18n(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[this.currentLang] || obj.mr || obj.hi || obj.en || Object.values(obj)[0] || '';
  },

  setLang(lang) {
    if (!window.INB_CONFIG.supportedLangs.includes(lang)) return;
    this.currentLang = lang;
    localStorage.setItem('inb_brand_lang', lang);
    document.documentElement.lang = lang;
    this.updateLangButtons();
    this.renderAll();
    this.showToast(`Language: ${lang === 'mr' ? 'मराठी' : (lang === 'hi' ? 'हिन्दी' : 'English')}`, 'info');
  },

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('inb_brand_theme', this.currentTheme);
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
  },

  // Toast feedback
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

  // Mobile Drawer
  toggleMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.toggle('active');
  },

  closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
  },

  // Smooth Scroll with fixed header offset
  scrollToSection(sectionId, e) {
    if (e && e.preventDefault) e.preventDefault();
    this.closeMobileDrawer();

    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerOffset = 72;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update active nav item
    this.setActiveNavTab(`#${sectionId}`);
  },

  setActiveNavTab(hash) {
    document.querySelectorAll('.nav-item-link').forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // ScrollSpy & Dynamic Sticky Header Transformation
  initScrollSpy() {
    const sections = ['hero', 'who-we-are', 'what-we-do', 'how-we-help', 'content', 'videos', 'testimonials', 'work-with-us', 'contact'];
    const header = document.getElementById('site-header');
    const progressBar = document.getElementById('scroll-progress-bar');
    
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // 1. FREEZE & TRANSFORM HEADER ON SCROLL
      if (header) {
        if (scrollY > 20) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      // 2. DYNAMIC SCROLL PROGRESS BAR
      if (progressBar) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalScroll > 0 ? (scrollY / totalScroll) * 100 : 0;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }

      // 3. ACTIVE TAB TRACKING
      let currentSection = '';
      const scrollPos = scrollY + 140;

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = `#${id}`;
          }
        }
      });

      if (currentSection) {
        document.querySelectorAll('.nav-item-link').forEach(link => {
          if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  },

  // ==================== VIDEO MODAL PLAYER (ZERO REDIRECT) ====================
  openVideoModal(youtubeId, videoTitle) {
    let modal = document.getElementById('video-modal-backdrop');
    if (!modal) {
      const modalHtml = `
        <div class="video-modal-backdrop" id="video-modal-backdrop" onclick="Channel.closeVideoModal()">
          <div class="video-modal-window" onclick="event.stopPropagation()">
            <div class="video-modal-header">
              <div class="video-modal-title-wrap">
                <span class="badge badge-category" style="background:var(--brand-brown-600); color:#fff;">INBROWNTOWN CINEMA</span>
                <h3 id="video-modal-title" class="video-modal-title"></h3>
              </div>
              <button class="video-modal-close" onclick="Channel.closeVideoModal()" title="Close (Esc)">&times;</button>
            </div>
            <div class="video-modal-iframe-wrap">
              <iframe id="video-modal-iframe" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="video-modal-footer">
              <span class="video-modal-hint">${this.t('modalEscHint')}</span>
              <a href="https://youtube.com/@inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="color:var(--text-primary);">
                ${this.t('modalYoutubeBtn')}
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modal = document.getElementById('video-modal-backdrop');
    }

    const titleEl = document.getElementById('video-modal-title');
    const iframeEl = document.getElementById('video-modal-iframe');

    if (titleEl) titleEl.textContent = videoTitle;
    
    // Inject YouTube embed with autoplay enabled
    if (iframeEl) {
      iframeEl.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  },

  closeVideoModal() {
    const modal = document.getElementById('video-modal-backdrop');
    const iframeEl = document.getElementById('video-modal-iframe');
    
    // IMPORTANT: Clear src immediately to stop audio and video playback
    if (iframeEl) {
      iframeEl.src = '';
    }

    if (modal) {
      modal.classList.remove('active');
    }
    document.body.style.overflow = '';
  },

  // Category filtering
  filterVideos(catId, btn) {
    this.activeCategory = catId;
    document.querySelectorAll('.video-filter-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderVideoGrid();
  },

  // Animate counter statistics
  initStatCounters() {
    const counters = document.querySelectorAll('.stat-counter-val');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = 25;
      const increment = Math.ceil(target / 40);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count.toLocaleString() + suffix;
          setTimeout(updateCount, speed);
        } else {
          counter.innerText = target.toLocaleString() + suffix;
        }
      };
      updateCount();
    });
  },

  // Handle Inquiry submission
  handleInquirySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('inq-name').value;
    const phone = document.getElementById('inq-phone').value;
    const email = document.getElementById('inq-email').value;
    const service = document.getElementById('inq-service').value;
    const message = document.getElementById('inq-message').value;

    const inquiries = JSON.parse(localStorage.getItem('inb_inquiries') || '[]');
    inquiries.push({
      name, phone, email, service, message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('inb_inquiries', JSON.stringify(inquiries));

    e.target.reset();
    this.showToast(this.t('formSuccessToast'), 'success');
  },

  updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },

  // ==================== FULL TOP-TO-BOTTOM VIEW RENDER ====================
  renderAll() {
    this.renderHeaderNav();
    this.renderHero();
    this.renderWhoWeAre();
    this.renderWhatWeDo();
    this.renderHowWeHelp();
    this.renderContentShowcase();
    this.renderVideoSection();
    this.renderTestimonials();
    this.renderWorkWithUs();
    this.renderFooter();

    // Trigger stat counters & scrollspy
    setTimeout(() => {
      this.initStatCounters();
      this.initScrollSpy();
    }, 150);
  },

  renderHeaderNav() {
    const navEl = document.getElementById('main-nav-list');
    const drawerEl = document.getElementById('mobile-drawer-links');
    if (!navEl) return;

    const navItems = [
      { id: 'who-we-are', label: this.t('navWhoWeAre') },
      { id: 'what-we-do', label: this.t('navWhatWeDo') },
      { id: 'how-we-help', label: this.t('navHowWeHelp') },
      { id: 'content', label: this.t('navContent') },
      { id: 'videos', label: this.t('navVideos'), isPrimary: true },
      { id: 'testimonials', label: this.t('navTestimonials') },
      { id: 'work-with-us', label: this.t('navWorkWithUs') },
      { id: 'contact', label: this.t('navContact') }
    ];

    navEl.innerHTML = navItems.map(item => `
      <li>
        <a href="#${item.id}" class="nav-item-link ${item.isPrimary ? 'highlight-pill' : ''}" onclick="Channel.scrollToSection('${item.id}', event)">
          ${item.label}
        </a>
      </li>
    `).join('');

    if (drawerEl) {
      drawerEl.innerHTML = `
        <div style="padding: 0 0.5rem 0.75rem 0.5rem;">
          <a href="#videos" class="btn btn-primary" style="width:100%; margin-bottom:0.5rem;" onclick="Channel.scrollToSection('videos', event)">
            ▶ ${this.t('ctaWatchVideos')}
          </a>
          <a href="#work-with-us" class="btn btn-outline" style="width:100%;" onclick="Channel.scrollToSection('work-with-us', event)">
            💼 ${this.t('ctaWorkWithUs')}
          </a>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: 0.5rem;">
          ${navItems.map(item => `
            <a href="#${item.id}" class="drawer-link" onclick="Channel.scrollToSection('${item.id}', event)">
              ${item.label}
            </a>
          `).join('')}
        </div>
        <div style="margin-top:auto; padding: 1.25rem 0.5rem 0.5rem 0.5rem; text-align:center; font-size:0.78rem; color:var(--text-muted); border-top:1px solid var(--border-light);">
          <span>Made by</span> <strong style="color:var(--brand-brown-600);">PaviqLabs</strong>
        </div>
      `;
    }
  },

  renderHero() {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    heroEl.innerHTML = `
      <div class="hero-cinematic-banner">
        <div class="hero-backdrop-gradient"></div>
        <div class="container hero-content-inner">
          <div class="hero-badge-tag">
            <span class="pulse-dot"></span> ${this.t('heroTag')}
          </div>
          <h1 class="hero-title-main">
            ${this.t('heroHeadline')}
          </h1>
          <p class="hero-subtext">
            ${this.t('heroSubheadline')}
          </p>
          <div class="hero-action-buttons">
            <a href="#videos" class="btn btn-primary btn-lg" onclick="Channel.scrollToSection('videos', event)">
              ${this.t('ctaWatchVideos')}
            </a>
            <a href="#work-with-us" class="btn btn-outline btn-lg" style="color:#fff; border-color:rgba(255,255,255,0.35);" onclick="Channel.scrollToSection('work-with-us', event)">
              ${this.t('ctaWorkWithUs')}
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderWhoWeAre() {
    const sec = document.getElementById('who-we-are');
    if (!sec) return;

    const stats = window.INB_BRAND_DATA.stats;

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category">WHO WE ARE</span>
          <h2 class="section-heading-title">${this.t('whoWeAreTitle')}</h2>
          <p class="section-heading-sub">${this.t('whoWeAreSub')}</p>
        </div>

        <div class="who-we-are-card">
          <div class="who-story-text">
            <p>${this.t('whoWeAreStory')}</p>
          </div>

          <div class="stats-counter-grid">
            ${stats.map(s => `
              <div class="stat-box">
                <div class="stat-counter-val" data-target="${s.value}" data-suffix="${s.suffix}">
                  0${s.suffix}
                </div>
                <div class="stat-counter-label">${this.getI18n(s.label)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderWhatWeDo() {
    const sec = document.getElementById('what-we-do');
    if (!sec) return;

    const acts = window.INB_BRAND_DATA.activities;

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category">WHAT WE DO</span>
          <h2 class="section-heading-title">${this.t('whatWeDoTitle')}</h2>
          <p class="section-heading-sub">${this.t('whatWeDoSub')}</p>
        </div>

        <div class="activities-grid">
          ${acts.map(act => `
            <div class="activity-card">
              <div class="activity-icon-wrap">${act.icon}</div>
              <h3 class="activity-title">${this.getI18n(act.title)}</h3>
              <p class="activity-desc">${this.getI18n(act.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderHowWeHelp() {
    const sec = document.getElementById('how-we-help');
    if (!sec) return;

    const pillars = window.INB_BRAND_DATA.pillars;

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category">COMMUNITY IMPACT</span>
          <h2 class="section-heading-title">${this.t('howWeHelpTitle')}</h2>
          <p class="section-heading-sub">${this.t('howWeHelpSub')}</p>
        </div>

        <div class="pillars-grid">
          ${pillars.map(p => `
            <div class="pillar-card">
              <div class="pillar-number">${p.number}</div>
              <h3 class="pillar-title">${this.getI18n(p.title)}</h3>
              <p class="pillar-desc">${this.getI18n(p.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderContentShowcase() {
    const sec = document.getElementById('content');
    if (!sec) return;

    const cats = window.INB_BRAND_DATA.categories;

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category">PROGRAMMING</span>
          <h2 class="section-heading-title">${this.t('contentTitle')}</h2>
          <p class="section-heading-sub">${this.t('contentSub')}</p>
        </div>

        <div class="content-tiles-grid">
          ${cats.map(c => `
            <div class="content-tile-card" onclick="Channel.filterAndScrollVideos('${c.id}')" style="cursor:pointer;">
              <img src="${c.image}" alt="${this.getI18n(c.name)}" loading="lazy">
              <div class="content-tile-overlay">
                <span class="tile-count-badge">${c.count}</span>
                <h3 class="tile-title">${this.getI18n(c.name)}</h3>
                <p class="tile-tagline">${this.getI18n(c.tagline)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  filterAndScrollVideos(catId) {
    this.activeCategory = catId;
    this.renderVideoSection();
    this.scrollToSection('videos');
  },

  renderVideoSection() {
    const sec = document.getElementById('videos');
    if (!sec) return;

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category" style="background:var(--brand-brown-600); color:#fff;">CORE VIDEO SHOWCASE</span>
          <h2 class="section-heading-title">${this.t('videosTitle')}</h2>
          <p class="section-heading-sub">${this.t('videosSub')}</p>
        </div>

        <!-- Video Filter Tabs -->
        <div class="video-filter-bar">
          <button class="video-filter-tab ${this.activeCategory === 'all' ? 'active' : ''}" onclick="Channel.filterVideos('all', this)">
            ${this.t('filterAll')}
          </button>
          <button class="video-filter-tab ${this.activeCategory === 'ground_reports' ? 'active' : ''}" onclick="Channel.filterVideos('ground_reports', this)">
            ${this.t('filterGround')}
          </button>
          <button class="video-filter-tab ${this.activeCategory === 'interviews' ? 'active' : ''}" onclick="Channel.filterVideos('interviews', this)">
            ${this.t('filterInterviews')}
          </button>
          <button class="video-filter-tab ${this.activeCategory === 'explainers' ? 'active' : ''}" onclick="Channel.filterVideos('explainers', this)">
            ${this.t('filterExplainers')}
          </button>
          <button class="video-filter-tab ${this.activeCategory === 'community' ? 'active' : ''}" onclick="Channel.filterVideos('community', this)">
            ${this.t('filterCommunity')}
          </button>
        </div>

        <!-- Video Grid Container -->
        <div id="video-cards-container">
          ${this.getVideoCardsHtml()}
        </div>
      </div>
    `;
  },

  renderVideoGrid() {
    const cont = document.getElementById('video-cards-container');
    if (cont) cont.innerHTML = this.getVideoCardsHtml();
  },

  getVideoCardsHtml() {
    const videos = window.INB_BRAND_DATA.videos;
    const filtered = this.activeCategory === 'all' ? videos : videos.filter(v => v.category === this.activeCategory);

    return `
      <div class="video-gallery-grid">
        ${filtered.map(v => `
          <div class="video-card" onclick="Channel.openVideoModal('${v.youtubeId}', '${this.getI18n(v.title).replace(/'/g, "\\'")}')">
            <div class="video-thumbnail-wrap">
              <img src="${v.thumbnail}" alt="${this.getI18n(v.title)}" loading="lazy">
              <div class="video-play-overlay">
                <div class="play-circle-icon">▶</div>
              </div>
              <span class="video-duration-tag">⏱️ ${v.duration}</span>
            </div>
            <div class="video-card-body">
              <div class="video-card-meta">
                <span class="badge badge-category">${v.category.toUpperCase().replace(/_/g, ' ')}</span>
                <span>👁️ ${v.views} ${this.t('viewsLabel')}</span>
              </div>
              <h3 class="video-card-title">${this.getI18n(v.title)}</h3>
              <p class="video-card-summary">${this.getI18n(v.summary)}</p>
              <div class="video-card-cta">
                <span class="video-watch-btn">▶ ${this.t('watchNow')}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderTestimonials() {
    const sec = document.getElementById('testimonials');
    if (!sec) return;

    const tests = window.INB_BRAND_DATA.testimonials;

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category">SOCIAL PROOF</span>
          <h2 class="section-heading-title">${this.t('testTitle')}</h2>
          <p class="section-heading-sub">${this.t('testSub')}</p>
        </div>

        <div class="testimonials-grid">
          ${tests.map(t => `
            <div class="testimonial-card">
              <div class="testimonial-quote-mark">“</div>
              <p class="testimonial-quote-text">${this.getI18n(t.quote)}</p>
              <div class="testimonial-author-row">
                <img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar" loading="lazy">
                <div>
                  <div class="testimonial-author-name">${t.author}</div>
                  <div class="testimonial-author-role">${this.getI18n(t.role)}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderWorkWithUs() {
    const sec = document.getElementById('work-with-us');
    if (!sec) return;

    sec.innerHTML = `
      <div class="container">
        <div class="work-with-us-wrapper">
          <div class="work-content-left">
            <span class="footer-flow-badge">PARTNER WITH US</span>
            <h2 class="work-title">${this.t('workTitle')}</h2>
            <p class="work-sub">${this.t('workSub')}</p>
            
            <div class="work-perks-list">
              <div class="perk-item">
                <span class="perk-icon">🎯</span>
                <div>
                  <strong>Targeted Local Reach:</strong> Direct access to 250k+ engaged viewers across Pune & Maharashtra.
                </div>
              </div>
              <div class="perk-item">
                <span class="perk-icon">🎬</span>
                <div>
                  <strong>High-End 4K Production:</strong> Cinematic field storytelling, aerial drone visuals, and crisp audio.
                </div>
              </div>
              <div class="perk-item">
                <span class="perk-icon">🛡️</span>
                <div>
                  <strong>Editorial Authenticity:</strong> High credibility and deep organic community trust.
                </div>
              </div>
            </div>
          </div>

          <div class="work-form-right">
            <form onsubmit="Channel.handleInquirySubmit(event)" class="inquiry-form">
              <div class="form-group">
                <label class="form-label">${this.t('formName')}</label>
                <input type="text" class="form-control" id="inq-name" required>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">${this.t('formPhone')}</label>
                  <input type="tel" class="form-control" id="inq-phone" required>
                </div>
                <div class="form-group">
                  <label class="form-label">${this.t('formEmail')}</label>
                  <input type="email" class="form-control" id="inq-email" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${this.t('formService')}</label>
                <select class="form-control" id="inq-service" required>
                  <option value="business_promo">${this.t('serviceOption1')}</option>
                  <option value="brand_sponsorship">${this.t('serviceOption2')}</option>
                  <option value="ngo_coverage">${this.t('serviceOption3')}</option>
                  <option value="podcast_interview">${this.t('serviceOption4')}</option>
                  <option value="other">${this.t('serviceOptionOther')}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">${this.t('formMessage')}</label>
                <textarea class="form-control" id="inq-message" rows="4" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                ${this.t('btnSubmitInquiry')}
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderFooter() {
    const footerEl = document.getElementById('contact');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand">
            <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;">
              <div class="brand-symbol" style="width:36px; height:36px; font-size:1.1rem;">IN</div>
              <h2 style="font-size:1.4rem; margin-bottom:0;">INBrownTown</h2>
            </div>
            <p>${this.t('footerAbout')}</p>
            <div class="footer-flow-badge">
              REAL VOICES • GROUND TRUTH • CINEMATIC STORIES
            </div>
          </div>

          <!-- Column 1: Quick Links -->
          <div class="footer-col">
            <h3>${this.t('footerQuickLinks')}</h3>
            <ul class="footer-links">
              <li><a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('navWhoWeAre')}</a></li>
              <li><a href="#what-we-do" onclick="Channel.scrollToSection('what-we-do', event)">${this.t('navWhatWeDo')}</a></li>
              <li><a href="#how-we-help" onclick="Channel.scrollToSection('how-we-help', event)">${this.t('navHowWeHelp')}</a></li>
              <li><a href="#videos" onclick="Channel.scrollToSection('videos', event)">${this.t('navVideos')}</a></li>
              <li><a href="#testimonials" onclick="Channel.scrollToSection('testimonials', event)">${this.t('navTestimonials')}</a></li>
            </ul>
          </div>

          <!-- Column 2: Collaboration -->
          <div class="footer-col">
            <h3>${this.t('footerServices')}</h3>
            <ul class="footer-links">
              <li><a href="#work-with-us" onclick="Channel.scrollToSection('work-with-us', event)">${this.t('serviceOption1')}</a></li>
              <li><a href="#work-with-us" onclick="Channel.scrollToSection('work-with-us', event)">${this.t('serviceOption2')}</a></li>
              <li><a href="#work-with-us" onclick="Channel.scrollToSection('work-with-us', event)">${this.t('serviceOption3')}</a></li>
              <li><a href="#work-with-us" onclick="Channel.scrollToSection('work-with-us', event)">${this.t('serviceOption4')}</a></li>
            </ul>
          </div>

          <!-- Column 3: Contact Details -->
          <div class="footer-col">
            <h3>${this.t('contactTitle')}</h3>
            <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.6; margin-bottom: 0.75rem;">
              ${this.t('footerAddress')}<br>
              ${this.t('footerEmail')}<br>
              ${this.t('footerPhone')}
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <a href="https://youtube.com/@inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="color: #fff; border-color: rgba(255,255,255,0.3)">YouTube</a>
              <a href="https://instagram.com/inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="color: #fff; border-color: rgba(255,255,255,0.3)">Instagram</a>
              <a href="https://facebook.com/inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="color: #fff; border-color: rgba(255,255,255,0.3)">Facebook</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom-bar">
          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
            <span>${this.t('copyright')}</span>
            <span class="made-by-pill">
              Made by <strong style="color:#fff;">PaviqLabs</strong>
            </span>
          </div>
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
            <a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('privacy')}</a>
            <a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('terms')}</a>
            <a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('ethics')}</a>
          </div>
        </div>
      </div>
    `;
  }
};

window.Channel = Channel;
