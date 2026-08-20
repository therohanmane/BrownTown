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

    // Trigger stat counters, scrollspy & hero parallax
    setTimeout(() => {
      this.initStatCounters();
      this.initScrollSpy();
      this.initHeroParallax();
    }, 150);
  },

  initHeroParallax() {
    const banner = document.getElementById('hero-banner-container');
    const bg = document.getElementById('hero-parallax-bg');
    const content = document.getElementById('hero-parallax-content');
    if (!banner || !bg) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          const bannerHeight = banner.offsetHeight || 520;
          if (scrollY <= bannerHeight + 100) {
            const factor = scrollY / bannerHeight;
            bg.style.transform = `translate3d(0, ${scrollY * 0.24}px, 0)`;
            if (content) {
              content.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
              content.style.opacity = Math.max(0, 1 - factor * 1.12);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
      <div class="hero-cinematic-banner" id="hero-banner-container">
        <!-- Live Studio Ambient Elements -->
        <div class="hero-backdrop-gradient" id="hero-parallax-bg"></div>
        <div class="hero-spotlight-glow" aria-hidden="true"></div>
        <div class="hero-broadcast-grid" aria-hidden="true"></div>
        
        <div class="container hero-content-inner" id="hero-parallax-content">
          <!-- Live On-Air Pill with Audio Waveform -->
          <div class="hero-badge-tag hero-badge-reveal">
            <span class="live-rec-dot" aria-hidden="true"></span>
            <span class="live-on-air-text">ON AIR</span>
            <div class="hero-live-waveform" aria-hidden="true" title="Audio Feed Active">
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
            </div>
            <span class="hero-badge-separator">•</span>
            <span>${this.t('heroTag')}</span>
          </div>

          <!-- Staggered Focus Headline Reveal -->
          <h1 class="hero-title-main hero-title-reveal">
            ${this.t('heroHeadline')}
          </h1>

          <!-- Staggered Subtext Reveal -->
          <p class="hero-subtext hero-subtext-reveal">
            ${this.t('heroSubheadline')}
          </p>

          <!-- Staggered CTA Buttons -->
          <div class="hero-action-buttons hero-cta-reveal">
            <a href="#videos" class="btn btn-primary btn-lg" onclick="Channel.scrollToSection('videos', event)">
              <span>▶</span> ${this.t('ctaWatchVideos')}
            </a>
            <a href="#work-with-us" class="btn btn-outline btn-lg" style="color:#fff; border-color:rgba(255,255,255,0.35); backdrop-filter:blur(6px);" onclick="Channel.scrollToSection('work-with-us', event)">
              <span>💼</span> ${this.t('ctaWorkWithUs')}
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
    this.sortBy = 'all';
    this.renderVideoSection();
    this.scrollToSection('videos');
  },

  sortVideos(sortType, btnEl) {
    this.sortBy = sortType;
    if (btnEl) {
      document.querySelectorAll('.gallery-sort-pill').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    this.renderVideoGrid();
  },

  filterVideos(catId, btnEl) {
    this.activeCategory = catId;
    if (btnEl) {
      document.querySelectorAll('.gallery-filter-pill').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    this.renderVideoGrid();
  },

  scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const scrollAmount = 340 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  },

  renderVideoCard(v, lang) {
    const currentLang = lang || this.currentLang || 'mr';
    const publishTime = (v.publishText && v.publishText[currentLang]) ? v.publishText[currentLang] : (v.publishText && v.publishText['mr']) || '';
    
    let flagBadge = '';
    if (v.isPopular || v.viewsRaw >= 1000) {
      flagBadge = `<span class="video-card-flag-badge video-card-flag-popular">${this.t('popularBadge')}</span>`;
    } else if (v.isLatest || v.publishDateDaysAgo <= 30) {
      flagBadge = `<span class="video-card-flag-badge video-card-flag-latest">${this.t('latestBadge')}</span>`;
    }

    const catLabel = v.category.replace(/_/g, ' ');

    return `
      <div class="video-card" onclick="Channel.openVideoModal('${v.youtubeId}', '${this.getI18n(v.title).replace(/'/g, "\\'")}')">
        <!-- 16:9 Thumbnail -->
        <div class="video-thumbnail-wrap">
          <img src="${v.thumbnail}" alt="${this.getI18n(v.title)}" loading="lazy">
          
          <!-- Category Badge: Top-Left -->
          <span class="video-card-cat-badge">${catLabel}</span>
          
          <!-- Popular / Latest Flag: Top-Right -->
          ${flagBadge}
          
          <!-- Duration Tag: Bottom-Right -->
          <span class="video-duration-tag">${v.duration}</span>
          
          <!-- Centered Play Overlay -->
          <div class="video-play-overlay">
            <div class="play-circle-icon">▶</div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="video-card-body">
          <h3 class="video-card-title">${this.getI18n(v.title)}</h3>
          <p class="video-card-summary">${this.getI18n(v.summary)}</p>
          <div class="video-card-meta">
            <span class="video-card-views">👁️ ${v.views} ${this.t('viewsLabel')} • ${publishTime}</span>
            <a href="https://www.youtube.com/watch?v=${v.youtubeId}" target="_blank" rel="noreferrer" class="video-card-ext-btn" onclick="event.stopPropagation()">
              YouTube ↗
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderVideoSection() {
    const sec = document.getElementById('videos');
    if (!sec) return;

    if (!this.sortBy) this.sortBy = 'all';
    if (!this.activeCategory) this.activeCategory = 'all';

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category" style="background:var(--brand-brown-600); color:#fff;">OFFICIAL CHANNEL SHOWCASE</span>
          <h2 class="section-heading-title">${this.t('videosTitle')}</h2>
          <p class="section-heading-sub">${this.t('videosSub')}</p>
        </div>

        <!-- Unified Compact Filter & Sort Bar -->
        <div class="gallery-controls-bar">
          <!-- Category Filter Pills -->
          <div class="filter-pills-group">
            <button class="gallery-filter-pill ${this.activeCategory === 'all' ? 'active' : ''}" onclick="Channel.filterVideos('all', this)">
              ${this.t('filterAll')}
            </button>
            <button class="gallery-filter-pill ${this.activeCategory === 'interviews' ? 'active' : ''}" onclick="Channel.filterVideos('interviews', this)">
              ${this.t('filterInterviews')}
            </button>
            <button class="gallery-filter-pill ${this.activeCategory === 'ground_reports' ? 'active' : ''}" onclick="Channel.filterVideos('ground_reports', this)">
              ${this.t('filterGround')}
            </button>
            <button class="gallery-filter-pill ${this.activeCategory === 'community' ? 'active' : ''}" onclick="Channel.filterVideos('community', this)">
              ${this.t('filterCommunity')}
            </button>
            <button class="gallery-filter-pill ${this.activeCategory === 'explainers' ? 'active' : ''}" onclick="Channel.filterVideos('explainers', this)">
              ${this.t('filterExplainers')}
            </button>
          </div>

          <!-- Sorting Pills Group (Popular / Latest) -->
          <div class="sort-pills-group">
            <span class="sort-label-text">${this.t('sortLabel')}</span>
            <button class="gallery-sort-pill ${this.sortBy === 'all' ? 'active' : ''}" onclick="Channel.sortVideos('all', this)">
              ${this.t('sortAll')}
            </button>
            <button class="gallery-sort-pill ${this.sortBy === 'popular' ? 'active' : ''}" onclick="Channel.sortVideos('popular', this)">
              ${this.t('sortPopular')}
            </button>
            <button class="gallery-sort-pill ${this.sortBy === 'latest' ? 'active' : ''}" onclick="Channel.sortVideos('latest', this)">
              ${this.t('sortLatest')}
            </button>
          </div>
        </div>

        <!-- Video Container (Category Carousels OR 4-Column Grid) -->
        <div id="video-cards-container">
          ${this.getVideoCardsHtml()}
        </div>

        <!-- Official YouTube & Instagram Channel Banner Showcase -->
        <div class="youtube-channel-banner">
          <div class="yt-banner-left">
            <div class="yt-play-badge">▶</div>
            <div>
              <div class="yt-banner-title">INBrownTown Official Channels</div>
              <div class="yt-banner-sub">@INBrownTown (1.8k+ Subscribers) • @inbrowntown (4.8k+ Followers) • Ground Reporting</div>
            </div>
          </div>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center;">
            <a href="https://www.instagram.com/inbrowntown" target="_blank" rel="noreferrer" class="btn btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.4); background:rgba(255,255,255,0.08);">
              📸 Official Instagram
            </a>
            <a href="${window.INB_BRAND_DATA.channelUrl}" target="_blank" rel="noreferrer" class="btn btn-primary" style="background:#ff0000; border-color:#ff0000;">
              ${this.t('watchOnYoutube')}
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderVideoGrid() {
    const cont = document.getElementById('video-cards-container');
    if (cont) cont.innerHTML = this.getVideoCardsHtml();
  },

  getVideoCardsHtml() {
    const allVideos = window.INB_BRAND_DATA.videos;
    const currentLang = this.currentLang || 'mr';

    // 1. DEFAULT VIEW: Group into Category Carousels if "All" is active and no specific sorting applied
    if (this.activeCategory === 'all' && this.sortBy === 'all') {
      const categories = [
        { id: 'interviews', titleKey: 'filterInterviews', icon: '🎙️' },
        { id: 'ground_reports', titleKey: 'filterGround', icon: '🌱' },
        { id: 'community', titleKey: 'filterCommunity', icon: '🤝' },
        { id: 'explainers', titleKey: 'filterExplainers', icon: '💡' }
      ];

      return categories.map(cat => {
        const catVideos = allVideos.filter(v => v.category === cat.id);
        if (catVideos.length === 0) return '';
        const trackId = `carousel-track-${cat.id}`;

        return `
          <div class="category-row-section">
            <div class="category-row-header">
              <div class="category-row-title-wrap">
                <h3 class="category-row-title">${this.t(cat.titleKey)}</h3>
                <span class="badge badge-category" style="font-size:0.7rem; padding:2px 8px;">${catVideos.length} Videos</span>
              </div>
              <button class="category-row-view-all" onclick="Channel.filterAndScrollVideos('${cat.id}')">
                ${this.t('viewAll')}
              </button>
            </div>

            <div class="carousel-container">
              <button class="carousel-nav-btn carousel-nav-prev" onclick="Channel.scrollCarousel('${trackId}', -1)" aria-label="Previous Videos">
                ❮
              </button>
              <div class="carousel-track" id="${trackId}">
                ${catVideos.map(v => this.renderVideoCard(v, currentLang)).join('')}
              </div>
              <button class="carousel-nav-btn carousel-nav-next" onclick="Channel.scrollCarousel('${trackId}', 1)" aria-label="Next Videos">
                ❯
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    // 2. FILTERED OR SORTED VIEW: Render 4-Column Responsive Grid
    let list = [...allVideos];

    if (this.activeCategory && this.activeCategory !== 'all') {
      list = list.filter(v => v.category === this.activeCategory);
    }

    if (this.sortBy === 'popular') {
      list.sort((a, b) => b.viewsRaw - a.viewsRaw);
    } else if (this.sortBy === 'latest') {
      list.sort((a, b) => a.publishDateDaysAgo - b.publishDateDaysAgo);
    }

    return `
      <div class="video-gallery-grid">
        ${list.map(v => this.renderVideoCard(v, currentLang)).join('')}
      </div>
    `;
  },

  renderTestimonials() {
    const sec = document.getElementById('testimonials');
    if (!sec) return;

    const currentLang = this.currentLang || 'mr';
    const founder = window.INB_BRAND_DATA.founder;
    const tests = window.INB_BRAND_DATA.testimonials;

    const founderName = (founder.nameLocalized && founder.nameLocalized[currentLang]) || founder.name;
    const founderRoles = (founder.roles && founder.roles[currentLang]) || founder.roles['en'] || [];
    const founderQuote = (founder.bioQuote && founder.bioQuote[currentLang]) || founder.bioQuote['mr'];
    const founderStory = (founder.story && founder.story[currentLang]) || founder.story['mr'];

    sec.innerHTML = `
      <div class="container">
        <!-- Section Heading -->
        <div class="section-heading-center">
          <span class="badge badge-category" style="background:var(--brand-brown-600); color:#fff;">${this.t('founderEyebrow')}</span>
          <h2 class="section-heading-title">${this.t('founderSectionTitle')}</h2>
          <p class="section-heading-sub">${this.t('founderSectionSub')}</p>
        </div>

        <!-- Founder Spotlight Feature (Asymmetric Split) -->
        <div class="founder-spotlight-card">
          <!-- Left: Large Editorial Portrait Photo -->
          <div class="founder-portrait-col">
            <div class="founder-portrait-frame">
              <img src="${founder.photo}" alt="${founderName}" loading="lazy">
              <a href="https://www.instagram.com/ayesha.sayyad/" target="_blank" rel="noreferrer" class="founder-ig-pill">
                <span>📸</span> @ayesha.sayyad
              </a>
            </div>
          </div>

          <!-- Right: Editorial Content -->
          <div class="founder-content-col">
            <div>
              <h3 class="founder-name">${founderName}</h3>
              <div class="founder-badges-row" style="margin-top:0.4rem;">
                ${founderRoles.map(role => `<span class="founder-role-badge">${role}</span>`).join('')}
              </div>
            </div>

            <!-- Pull-Quote Vision -->
            <div class="founder-quote-block">
              <p class="founder-quote-text">${founderQuote}</p>
            </div>

            <!-- Narrative Story -->
            <p class="founder-story-text">${founderStory}</p>

            <!-- Credibility Stats Grid -->
            <div class="founder-stats-grid">
              ${founder.stats.map(s => {
                const sLabel = (s.label && s.label[currentLang]) || s.label['mr'] || '';
                return `
                  <div class="founder-stat-item">
                    <div class="founder-stat-num">${s.value}</div>
                    <div class="founder-stat-lbl">${sLabel}</div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Social Connect Row -->
            <div class="founder-connect-row">
              <span style="font-size:0.78rem; font-weight:700; color:var(--text-muted);">${this.t('founderConnect')}</span>
              <div class="founder-social-pills">
                ${founder.social.map(soc => `
                  <a href="${soc.url}" target="_blank" rel="noreferrer" class="founder-social-btn">
                    <span>${soc.icon}</span> ${soc.platform}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Compact Testimonials Strip (What People Say) -->
        <div class="compact-testimonials-section">
          <div class="compact-testimonials-header">
            <div>
              <span class="badge badge-category" style="font-size:0.68rem; padding:2px 8px;">${this.t('founderTestimonialsEyebrow')}</span>
              <h3 style="font-size:1.15rem; font-weight:800; margin-top:0.3rem; margin-bottom:0;">${this.t('founderTestimonialsTitle')}</h3>
            </div>
          </div>

          <div class="compact-test-grid">
            ${tests.map(t => `
              <div class="compact-test-card">
                <p class="compact-test-quote">“${this.getI18n(t.quote)}”</p>
                <div class="compact-test-author-row">
                  <img src="${t.avatar}" alt="${t.author}" class="compact-test-avatar" loading="lazy">
                  <div>
                    <div class="compact-test-name">${t.author}</div>
                    <div class="compact-test-role">${this.getI18n(t.role)}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
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
                  <strong>Targeted Local Reach:</strong> Direct promotional access to 6.6k+ engaged community followers across Pune & Maharashtra.
                </div>
              </div>
              <div class="perk-item">
                <span class="perk-icon">🎨</span>
                <div>
                  <strong>Done-For-You Ad Posters:</strong> Custom promotional posters, banners & social media creatives crafted specifically for busy business owners.
                </div>
              </div>
              <div class="perk-item">
                <span class="perk-icon">⏱️</span>
                <div>
                  <strong>Hassle-Free Marketing:</strong> We handle your digital advertising and promotion so you can focus 100% on running your business.
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
          <div style="color: #94a3b8; font-size: 0.85rem;">
            ${this.t('copyright')}
          </div>
          <div style="display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
            <a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('privacy')}</a>
            <a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('terms')}</a>
            <a href="#who-we-are" onclick="Channel.scrollToSection('who-we-are', event)">${this.t('ethics')}</a>
            <span class="made-by-pill">
              Made by <strong style="color: #fff; margin-left: 2px;">PaviqLabs</strong>
            </span>
          </div>
        </div>
      </div>
    `;
  }
};

window.Channel = Channel;
