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
    this.renderVideoSection();
    this.renderTestimonials();
    this.renderWorkWithUs();
    this.renderFooter();

    // Trigger stat counters, scrollspy & cinematic hero
    setTimeout(() => {
      this.initStatCounters();
      this.initScrollSpy();
      this.initHeroParallax();
      this.initCinematicHero();
    }, 150);
  },

  initCinematicHero() {
    // 1. Live Monospace REC Timecode Counter (Starts 00:00:54 -> 00:00:55 ...)
    const timerEl = document.getElementById('hero-rec-timer');
    if (timerEl) {
      let seconds = 54;
      if (this.recInterval) clearInterval(this.recInterval);
      this.recInterval = setInterval(() => {
        seconds++;
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${hrs}:${mins}:${secs}`;
      }, 1000);
    }

    // 2. Traveling Multi-City Live Feed Engine
    this.initTravelingCameraEngine();

    // 3. Stat Pills Count-Up Animation (0 -> target over 1.2s on initial load)
    this.initHeroStatCounters();
  },

  initTravelingCameraEngine() {
    const CITIES = [
      { id: 'pune', name: 'Pune HQ', tag: 'PUNE HQ', ticker: '🔴 LIVE GROUND REPORTING • PUNE HQ • CITIZEN VOICES, CIVIC ISSUES & LOCAL COMMERCE', x: 40.28, y: 53.33, svgX: 145, svgY: 160 },
      { id: 'mumbai', name: 'Mumbai', tag: 'MUMBAI', ticker: '🔴 LIVE GROUND REPORTING • MUMBAI • COASTAL MEDIA & REGIONAL COMMERCE', x: 26.39, y: 46.67, svgX: 95, svgY: 140 },
      { id: 'nashik', name: 'Nashik', tag: 'NASHIK', ticker: '🔴 LIVE GROUND REPORTING • NASHIK • NORTH MAHARASHTRA & AGRI-TECH HUB', x: 36.11, y: 33.33, svgX: 130, svgY: 100 },
      { id: 'nagpur', name: 'Nagpur', tag: 'NAGPUR', ticker: '🔴 LIVE GROUND REPORTING • NAGPUR • VIDARBHA REGIONAL COVERAGE & CIVIC ACTION', x: 80.56, y: 21.67, svgX: 290, svgY: 65 },
      { id: 'kolhapur', name: 'Kolhapur', tag: 'KOLHAPUR', ticker: '🔴 LIVE GROUND REPORTING • KOLHAPUR • HERITAGE, INDUSTRY & TRADE SPOTLIGHT', x: 37.50, y: 75.00, svgX: 135, svgY: 225 },
      { id: 'baramati', name: 'Baramati', tag: 'BARAMATI', ticker: '🔴 LIVE GROUND REPORTING • BARAMATI • RURAL ENTERPRISE & PROGRESS', x: 45.83, y: 60.00, svgX: 165, svgY: 180 }
    ];

    const stage = document.getElementById('newsroom-stage');
    const layerCam = document.getElementById('layer-camera');
    const cityTag = document.getElementById('cam-active-city-name');
    const focusBadge = document.getElementById('hero-focus-badge');
    const bracketGroup = document.querySelector('.autofocus-bracket-group');
    const micWaveform = document.getElementById('hero-mic-waveform');
    const signalTrail = document.getElementById('camera-signal-trail');
    const tickerText1 = document.getElementById('hero-live-ticker-text');
    const tickerText2 = document.getElementById('hero-live-ticker-text-copy');
    const mapNodes = document.querySelectorAll('.map-node');

    if (!layerCam || !stage) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentPos = { x: 40.28, y: 53.33, svgX: 145, svgY: 160 };

    const triggerFocusLock = () => {
      if (bracketGroup) bracketGroup.classList.add('focusing');
      setTimeout(() => {
        if (bracketGroup) bracketGroup.classList.remove('focusing');
        if (focusBadge) {
          focusBadge.classList.add('active');
          setTimeout(() => {
            focusBadge.classList.remove('active');
          }, 1800);
        }
      }, 300);
    };

    const triggerMicWaveformBoost = () => {
      if (micWaveform) {
        micWaveform.classList.add('mic-boost');
        setTimeout(() => {
          micWaveform.classList.remove('mic-boost');
        }, 1100);
      }
    };

    const drawSignalTrail = (fromX, fromY, toX, toY) => {
      if (!signalTrail || prefersReducedMotion) return;

      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const perpX = -dy / (dist || 1);
      const perpY = dx / (dist || 1);
      const curvature = Math.min(22, dist * 0.2);
      const ctrlX = midX + perpX * curvature;
      const ctrlY = midY + perpY * curvature;

      signalTrail.setAttribute('d', `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${toX} ${toY}`);
      signalTrail.classList.remove('traveling');
      void signalTrail.offsetWidth; // force reflow
      signalTrail.classList.add('traveling');
    };

    const moveToCoordinates = (targetX, targetY, targetSvgX, targetSvgY, cityObj = null) => {
      const prevX = currentPos.svgX;
      const prevY = currentPos.svgY;

      // Update position state
      currentPos = { x: targetX, y: targetY, svgX: targetSvgX, svgY: targetSvgY };

      // Highlight active city pin if matching
      mapNodes.forEach(node => {
        const nodeCity = node.getAttribute('data-city');
        node.classList.remove('active-city');
        if (cityObj && nodeCity === cityObj.id) {
          node.classList.add('active-city');
        }
      });

      // Move camera with smooth GPU translate3d
      if (prefersReducedMotion) {
        layerCam.style.transition = 'none';
      } else {
        layerCam.style.transition = 'transform 0.65s cubic-bezier(0.2, 0.9, 0.3, 1)';
      }
      layerCam.style.transform = `translate3d(calc(${targetX}% - 50%), calc(${targetY}% - 50%), 0)`;

      // Draw dynamic curved signal trail
      drawSignalTrail(prevX, prevY, targetSvgX, targetSvgY);

      // Update locator tag & ticker
      if (cityObj) {
        if (cityTag) cityTag.textContent = cityObj.tag;
        if (tickerText1) tickerText1.textContent = cityObj.ticker;
        if (tickerText2) tickerText2.textContent = cityObj.ticker;
      } else {
        if (cityTag) cityTag.textContent = 'LIVE FEED';
        const defaultTicker = '🔴 LIVE GROUND REPORTING • MAHARASHTRA • REAL VOICES, CIVIC ISSUES & LOCAL COMMERCE';
        if (tickerText1) tickerText1.textContent = defaultTicker;
        if (tickerText2) tickerText2.textContent = defaultTicker;
      }

      // Trigger arrival feedback
      triggerFocusLock();
      triggerMicWaveformBoost();
    };

    // Initial position at Pune HQ
    moveToCoordinates(40.28, 53.33, 145, 160, CITIES[0]);

    // Single Unified Click / Tap Handler on Map Stage
    stage.addEventListener('click', (e) => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const pctX = (clickX / rect.width) * 100;
      const pctY = (clickY / rect.height) * 100;

      // Check if clicked a specific city pin or near one
      const nodeEl = e.target.closest('.map-node');
      let matchedCity = null;

      if (nodeEl) {
        const cityId = nodeEl.getAttribute('data-city');
        matchedCity = CITIES.find(c => c.id === cityId);
      } else {
        // Check proximity to any city pin
        matchedCity = CITIES.find(c => {
          const dx = pctX - c.x;
          const dy = pctY - c.y;
          return Math.sqrt(dx * dx + dy * dy) < 8; // within 8% radius
        });
      }

      if (matchedCity) {
        moveToCoordinates(matchedCity.x, matchedCity.y, matchedCity.svgX, matchedCity.svgY, matchedCity);
      } else {
        // Clamp custom click within safe stage boundaries
        const clampedX = Math.max(14, Math.min(86, pctX));
        const clampedY = Math.max(16, Math.min(84, pctY));
        const svgX = (clampedX / 100) * 360;
        const svgY = (clampedY / 100) * 300;
        moveToCoordinates(clampedX, clampedY, svgX, svgY, null);
      }
    });
  },

  initHeroStatCounters() {
    const counters = document.querySelectorAll('.hero-counter-num');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target')) || 0;
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const isDecimal = String(target).includes('.');
      const duration = 1200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        if (isDecimal) {
          counter.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
        } else {
          counter.textContent = `${prefix}${Math.round(currentVal)}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = isDecimal ? `${prefix}${target.toFixed(1)}${suffix}` : `${prefix}${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
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
            bg.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0)`;
            if (content) {
              content.style.transform = `translate3d(0, ${scrollY * 0.10}px, 0)`;
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
        <!-- Atmospheric Newsroom Background Layers -->
        <div class="hero-backdrop-gradient" id="hero-parallax-bg"></div>
        <div class="newsroom-ambient-glow" id="hero-parallax-glow" aria-hidden="true"></div>
        <div class="newsroom-monitor-grid" aria-hidden="true"></div>

        <div class="container hero-split-layout" id="hero-parallax-content">
          
          <!-- LEFT COLUMN: Editorial Headline, Subtext & CTAs -->
          <div class="hero-text-col">
            <!-- On Air Eyebrow Pill -->
            <div class="hero-badge-tag hero-badge-reveal">
              <span class="live-rec-dot" aria-hidden="true"></span>
              <span class="live-on-air-text">ON AIR</span>
              <span class="hero-badge-separator">•</span>
              <span class="hero-badge-subtitle">LIVE REPORTING • REAL VOICES</span>
            </div>

            <!-- Main Headline -->
            <h1 class="hero-title-main hero-title-reveal">
              ${this.t('heroHeadline')}
            </h1>

            <!-- Supporting Subtext -->
            <p class="hero-subtext hero-subtext-reveal">
              ${this.t('heroSubheadline')}
            </p>

            <!-- Action Buttons -->
            <div class="hero-action-buttons hero-cta-reveal">
              <a href="#videos" class="btn btn-primary btn-lg hero-cta-btn" onclick="Channel.scrollToSection('videos', event)">
                <span>▶</span> ${this.t('ctaWatchVideos')}
              </a>
              <a href="#work-with-us" class="btn btn-outline btn-lg hero-cta-btn" style="color:#fff; border-color:rgba(255,255,255,0.35); backdrop-filter:blur(8px); background:rgba(255,255,255,0.06);" onclick="Channel.scrollToSection('work-with-us', event)">
                <span>💼</span> ${this.t('ctaWorkWithUs')}
              </a>
            </div>

            <!-- Animated Stat Pills on Left -->
            <div class="hero-editorial-stats-row hero-cta-reveal">
              <div class="hero-stat-pill">
                <span class="hero-stat-dot"></span>
                <span class="hero-counter-num" data-target="1.8" data-prefix="" data-suffix="k+">0.0k</span>
                <span class="hero-stat-lbl">Subscribers</span>
              </div>
              <div class="hero-stat-pill">
                <span class="hero-stat-dot"></span>
                <span class="hero-counter-num" data-target="4.8" data-prefix="" data-suffix="k+">0.0k</span>
                <span class="hero-stat-lbl">Followers</span>
              </div>
              <div class="hero-stat-pill">
                <span class="hero-stat-dot"></span>
                <span class="hero-counter-num" data-target="381" data-prefix="" data-suffix="">0</span>
                <span class="hero-stat-lbl">Videos</span>
              </div>
              <div class="hero-stat-pill">
                <span class="hero-stat-dot"></span>
                <span class="hero-counter-num" data-target="200" data-prefix="" data-suffix="+">0</span>
                <span class="hero-stat-lbl">Interviews</span>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: INBrownTown LIVE NEWSROOM Visual Composition -->
          <div class="hero-visual-col">
            <div class="newsroom-stage-wrap" id="newsroom-stage">
              
              <!-- Live HUD Header Overlay -->
              <div class="newsroom-hud-top" id="layer-hud">
                <div class="hud-pill hud-rec-pill">
                  <span class="hud-rec-beacon"></span>
                  <span class="hud-mono">REC</span>
                  <span class="hud-timecode" id="hero-rec-timer">00:00:54</span>
                </div>
                <div class="hud-pill hud-quality-pill">
                  <span class="hud-badge-4k">4K 60FPS</span>
                  <span class="hud-cam-id">CAM 01</span>
                </div>
              </div>

              <!--              <!-- Layer: Subtle Maharashtra Map with Interactive Glowing Hubs & Dynamic Signal Trail -->
              <div class="newsroom-map-layer" id="layer-map">
                <svg class="maharashtra-map-svg" viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.1" />
                      <stop offset="65%" stop-color="#38bdf8" stop-opacity="0.9" />
                      <stop offset="100%" stop-color="#e0662a" stop-opacity="1" />
                    </linearGradient>
                  </defs>

                  <!-- Broadcast Signal Waves Arcs -->
                  <g class="broadcast-waves" opacity="0.45">
                    <circle cx="280" cy="50" r="22" stroke="var(--brand-brown-400)" stroke-width="1.5" stroke-dasharray="4 4" class="wave-pulse-1" />
                    <circle cx="280" cy="50" r="42" stroke="var(--brand-brown-400)" stroke-width="1.2" stroke-dasharray="5 5" class="wave-pulse-2" />
                    <circle cx="280" cy="50" r="62" stroke="var(--brand-brown-400)" stroke-width="1" stroke-dasharray="6 6" class="wave-pulse-3" />
                  </g>

                  <!-- Maharashtra Map Contour Outline -->
                  <path class="map-contour-path" d="M45,130 C55,100 80,75 115,70 C145,65 170,45 210,40 C250,35 295,45 320,70 C340,90 330,120 310,135 C290,150 295,170 270,195 C245,220 220,215 190,235 C160,255 130,265 110,250 C95,238 100,210 90,190 C80,170 50,165 45,130 Z" stroke="rgba(216, 138, 88, 0.35)" stroke-width="2" fill="rgba(11, 25, 44, 0.4)" stroke-linejoin="round" />
                  
                  <!-- Flowing Ground Reporting Telemetry Base Lines -->
                  <path class="telemetry-flow-line" d="M95,140 L145,160 L130,100 L290,65" stroke="rgba(224, 102, 42, 0.45)" stroke-width="1.2" stroke-dasharray="4 4" />
                  <path class="telemetry-flow-line" d="M145,160 L165,180 L135,225" stroke="rgba(224, 102, 42, 0.45)" stroke-width="1.2" stroke-dasharray="4 4" />

                  <!-- Dynamic Traveling Signal Trail Path -->
                  <path id="camera-signal-trail" class="camera-signal-trail" d="" stroke="url(#trailGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" />

                  <!-- Interactive Location Beacon Hubs (Hover/Tap enabled) -->
                  <!-- Pune HQ -->
                  <g class="map-node node-pune active-city" data-city="pune" role="button" tabindex="0" aria-label="Live feed Pune HQ">
                    <circle cx="145" cy="160" r="22" fill="transparent" class="pin-hit-target" />
                    <circle cx="145" cy="160" r="12" fill="rgba(239, 68, 68, 0.5)" class="radar-ping-ring ping-pune" />
                    <circle cx="145" cy="160" r="3.5" fill="#ef4444" class="node-center-dot" />
                    <text x="156" y="164" fill="#f8fafc" font-size="10" font-weight="700" font-family="sans-serif" class="node-label">Pune HQ</text>
                  </g>
                  <!-- Mumbai -->
                  <g class="map-node node-mumbai" data-city="mumbai" role="button" tabindex="0" aria-label="Live feed Mumbai">
                    <circle cx="95" cy="140" r="22" fill="transparent" class="pin-hit-target" />
                    <circle cx="95" cy="140" r="10" fill="rgba(224, 102, 42, 0.5)" class="radar-ping-ring ping-mumbai" />
                    <circle cx="95" cy="140" r="3" fill="var(--brand-brown-400)" class="node-center-dot" />
                    <text x="46" y="143" fill="#cbd5e1" font-size="9" font-weight="600" font-family="sans-serif" class="node-label">Mumbai</text>
                  </g>
                  <!-- Nashik -->
                  <g class="map-node node-nashik" data-city="nashik" role="button" tabindex="0" aria-label="Live feed Nashik">
                    <circle cx="130" cy="100" r="22" fill="transparent" class="pin-hit-target" />
                    <circle cx="130" cy="100" r="9" fill="rgba(224, 102, 42, 0.45)" class="radar-ping-ring ping-nashik" />
                    <circle cx="130" cy="100" r="3" fill="var(--brand-brown-400)" class="node-center-dot" />
                    <text x="138" y="98" fill="#94a3b8" font-size="8.5" font-weight="600" font-family="sans-serif" class="node-label">Nashik</text>
                  </g>
                  <!-- Nagpur -->
                  <g class="map-node node-nagpur" data-city="nagpur" role="button" tabindex="0" aria-label="Live feed Nagpur">
                    <circle cx="290" cy="65" r="22" fill="transparent" class="pin-hit-target" />
                    <circle cx="290" cy="65" r="9" fill="rgba(224, 102, 42, 0.45)" class="radar-ping-ring ping-nagpur" />
                    <circle cx="290" cy="65" r="3" fill="var(--brand-brown-400)" class="node-center-dot" />
                    <text x="246" y="62" fill="#94a3b8" font-size="8.5" font-weight="600" font-family="sans-serif" class="node-label">Nagpur</text>
                  </g>
                  <!-- Kolhapur -->
                  <g class="map-node node-kolhapur" data-city="kolhapur" role="button" tabindex="0" aria-label="Live feed Kolhapur">
                    <circle cx="135" cy="225" r="22" fill="transparent" class="pin-hit-target" />
                    <circle cx="135" cy="225" r="9" fill="rgba(224, 102, 42, 0.45)" class="radar-ping-ring ping-kolhapur" />
                    <circle cx="135" cy="225" r="3" fill="var(--brand-brown-400)" class="node-center-dot" />
                    <text x="144" y="228" fill="#94a3b8" font-size="8.5" font-weight="600" font-family="sans-serif" class="node-label">Kolhapur</text>
                  </g>
                  <!-- Baramati -->
                  <g class="map-node node-baramati" data-city="baramati" role="button" tabindex="0" aria-label="Live feed Baramati">
                    <circle cx="165" cy="180" r="22" fill="transparent" class="pin-hit-target" />
                    <circle cx="165" cy="180" r="8" fill="rgba(234, 179, 8, 0.45)" class="radar-ping-ring ping-baramati" />
                    <circle cx="165" cy="180" r="2.5" fill="var(--accent-gold)" class="node-center-dot" />
                    <text x="174" y="183" fill="#cbd5e1" font-size="8" font-weight="600" font-family="sans-serif" class="node-label">Baramati</text>
                  </g>
                </svg>
              </div>

              <!-- Layer: Traveling Broadcast Camera Marker Assembly (~45% Scale) -->
              <div class="newsroom-camera-wrap" id="layer-camera">
                <!-- Floating City Locator Badge -->
                <div class="cam-city-badge" id="cam-city-badge">
                  <span class="cam-live-indicator"></span>
                  <span id="cam-active-city-name">PUNE HQ</span>
                </div>

                <svg class="broadcast-camera-svg" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#222b3a" />
                      <stop offset="50%" stop-color="#131924" />
                      <stop offset="100%" stop-color="#0a0f18" />
                    </linearGradient>
                    <linearGradient id="lensMetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#334155" />
                      <stop offset="40%" stop-color="#1e293b" />
                      <stop offset="70%" stop-color="#0f172a" />
                      <stop offset="100%" stop-color="#334155" />
                    </linearGradient>
                    <radialGradient id="lensGlassGrad" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95" />
                      <stop offset="35%" stop-color="#0284c7" stop-opacity="0.65" />
                      <stop offset="65%" stop-color="#e0662a" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="#070e1b" stop-opacity="0.95" />
                    </radialGradient>
                    <linearGradient id="lensFlareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
                      <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.2" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                    <filter id="cameraShadow" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.65" />
                    </filter>
                  </defs>

                  <!-- Camera Main Body with Shadow -->
                  <g filter="url(#cameraShadow)">
                    <!-- Top Accessory Handle & Shotgun Mount -->
                    <path d="M160,50 L250,50 C256,50 260,54 260,60 L260,75 L150,75 L150,60 C150,54 154,50 160,50 Z" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
                    <rect x="180" y="32" width="60" height="18" rx="4" fill="#0f172a" stroke="#334155" />
                    <!-- Red Tally Light Indicator -->
                    <rect x="230" y="38" width="8" height="6" rx="2" fill="#ef4444" class="camera-tally-beacon" />

                    <!-- Main Graphite Camera Body -->
                    <rect x="140" y="70" width="180" height="140" rx="16" fill="url(#bodyGrad)" stroke="#334155" stroke-width="2" />
                    
                    <!-- Ergonomic Grip Accent -->
                    <path d="M290,85 C308,95 315,115 315,140 C315,165 308,185 290,195 Z" fill="#1c1917" stroke="rgba(216, 138, 88, 0.4)" stroke-width="1.5" />
                    
                    <!-- Viewfinder Eyepiece -->
                    <rect x="200" y="58" width="34" height="14" rx="3" fill="#0b1320" stroke="#334155" />

                    <!-- Lens Mount Flange (Chrome Ring) -->
                    <circle cx="120" cy="140" r="72" fill="#1e293b" stroke="#cbd5e1" stroke-width="2" />
                    <circle cx="120" cy="140" r="68" fill="url(#lensMetalGrad)" stroke="#475569" stroke-width="1.5" />
                    
                    <!-- Continuous Rotating Knurled Focus Ring -->
                    <circle cx="120" cy="140" r="60" fill="#0f172a" stroke="#334155" stroke-width="2.5" stroke-dasharray="5 3" class="lens-aperture-ring" />
                    <circle cx="120" cy="140" r="52" fill="#1e293b" stroke="#e0662a" stroke-width="1" />

                    <!-- Pulsing Multi-Element Glass Sensor Lens Core -->
                    <circle cx="120" cy="140" r="46" fill="url(#lensGlassGrad)" class="lens-glass-core" />
                    
                    <!-- Lens Optical Flare Shimmer -->
                    <ellipse cx="106" cy="126" rx="28" ry="16" transform="rotate(-30 106 126)" fill="url(#lensFlareGrad)" class="lens-reflection-shimmer" />

                    <!-- Autofocus HUD Corner Brackets -->
                    <g class="autofocus-bracket-group">
                      <path d="M104,124 L104,116 L112,116" stroke="#38bdf8" stroke-width="2" fill="none" class="bracket-tl" />
                      <path d="M136,124 L136,116 L128,116" stroke="#38bdf8" stroke-width="2" fill="none" class="bracket-tr" />
                      <path d="M104,156 L104,164 L112,164" stroke="#38bdf8" stroke-width="2" fill="none" class="bracket-bl" />
                      <path d="M136,156 L136,164 L128,164" stroke="#38bdf8" stroke-width="2" fill="none" class="bracket-br" />
                      <circle cx="120" cy="140" r="3" fill="#38bdf8" class="bracket-center" />
                    </g>
                  </g>
                </svg>

                <!-- Dynamic Focus Lock Status Pill Overlay -->
                <div class="focus-lock-status-badge" id="hero-focus-badge">
                  <span class="focus-lock-icon">⚡</span>
                  <span class="focus-lock-text">FOCUS LOCKED ✓</span>
                </div>
              </div>

              <!-- Layer: Professional Reporter Microphone with INBT Flag & Equalizer -->
              <div class="newsroom-mic-wrap" id="layer-mic">
                <svg class="reporter-mic-svg" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="micMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#94a3b8" />
                      <stop offset="50%" stop-color="#475569" />
                      <stop offset="100%" stop-color="#1e293b" />
                    </linearGradient>
                    <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#1e293b" />
                      <stop offset="100%" stop-color="#0f172a" />
                    </linearGradient>
                  </defs>

                  <!-- Handheld Mic Body Shaft -->
                  <path d="M58,110 L82,110 L78,210 L62,210 Z" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
                  
                  <!-- Metallic Accent Ring -->
                  <rect x="58" y="105" width="24" height="6" rx="1" fill="#e0662a" />

                  <!-- INBT Broadcast Microphone Flag -->
                  <g class="mic-flag-box">
                    <rect x="42" y="55" width="56" height="48" rx="6" fill="url(#flagGrad)" stroke="#e0662a" stroke-width="1.5" />
                    <rect x="45" y="58" width="50" height="42" rx="4" fill="#090e17" />
                    <text x="70" y="84" fill="#ffffff" font-size="14" font-weight="900" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle" letter-spacing="1">INBT</text>
                    <circle cx="88" cy="68" r="2.5" fill="#ef4444" />
                  </g>

                  <!-- Microphone Capsule Metallic Grille -->
                  <path d="M52,52 C52,26 60,10 70,10 C80,10 88,26 88,52 Z" fill="url(#micMeshGrad)" stroke="#64748b" stroke-width="1.5" />
                  <line x1="56" y1="28" x2="84" y2="28" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
                  <line x1="53" y1="40" x2="87" y2="40" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
                </svg>

                <!-- 6-Bar Live Audio Waveform Equalizer Strip on Mic Body -->
                <div class="live-mic-waveform" id="hero-mic-waveform" aria-label="Microphone Live Audio Stream Active">
                  <span class="mic-wave-bar bar-1"></span>
                  <span class="mic-wave-bar bar-2"></span>
                  <span class="mic-wave-bar bar-3"></span>
                  <span class="mic-wave-bar bar-4"></span>
                  <span class="mic-wave-bar bar-5"></span>
                  <span class="mic-wave-bar bar-6"></span>
                </div>
              </div>

              <!-- Live HUD Bottom Telemetry Dynamic Live Feed Marquee Ticker -->
              <div class="newsroom-hud-bottom" id="layer-hud-bottom">
                <div class="hud-ticker-viewport">
                  <div class="hud-ticker-track" id="hero-live-ticker-track">
                    <span class="telemetry-dot"></span>
                    <span class="telemetry-text" id="hero-live-ticker-text">🔴 LIVE GROUND REPORTING • PUNE HQ • REAL VOICES, CIVIC ISSUES & LOCAL COMMERCE</span>
                    <span class="telemetry-dot"></span>
                    <span class="telemetry-text" id="hero-live-ticker-text-copy">🔴 LIVE GROUND REPORTING • PUNE HQ • REAL VOICES, CIVIC ISSUES & LOCAL COMMERCE</span>
                  </div>
                </div>
              </div>

            </div>
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
        <!-- Section Header with Distinct Slogan Statement -->
        <div class="section-heading-center">
          <span class="badge badge-category">WHO WE ARE</span>
          <div class="who-slogan-banner">
            <span class="slogan-lead">Real Stories. Real Reach.</span>
          </div>
          <h2 class="section-heading-title">${this.t('whoWeAreTitle')}</h2>
          <p class="section-heading-sub">${this.t('whoWeAreSub')}</p>
        </div>

        <!-- Premium Elevated Who We Are Card -->
        <div class="who-we-are-card">
          
          <!-- Narrative Overview -->
          <div class="who-story-text">
            <p>${this.t('whoWeAreStory')}</p>
          </div>

          <!-- Dual-Impact Visual Columns (Journalism vs Commercial Ads) -->
          <div class="who-dual-pillars-grid">
            <div class="who-pillar-item who-journalism-pillar">
              <div class="who-pillar-header">
                <span class="who-pillar-icon">🎙️</span>
                <h4 class="who-pillar-title">${this.t('whoJournalismTitle')}</h4>
              </div>
              <p class="who-pillar-desc">${this.t('whoJournalismDesc')}</p>
            </div>

            <div class="who-pillar-item who-advertising-pillar">
              <div class="who-pillar-header">
                <span class="who-pillar-icon">📢</span>
                <h4 class="who-pillar-title">${this.t('whoAdvertisingTitle')}</h4>
              </div>
              <p class="who-pillar-desc">${this.t('whoAdvertisingDesc')}</p>
            </div>
          </div>

          <!-- 4 Redesigned Unambiguous Stat Cards -->
          <div class="stats-counter-grid">
            ${stats.map(s => `
              <div class="stat-box">
                <div class="stat-box-icon">${s.icon || '⚡'}</div>
                <div class="stat-counter-val" data-target="${s.value}">
                  ${s.displayVal || s.value}
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

    const services = window.INB_BRAND_DATA.businessServices || [];
    const journalism = window.INB_BRAND_DATA.journalismContent || [];

    sec.innerHTML = `
      <div class="container">
        <!-- Main Section Header -->
        <div class="section-heading-center">
          <span class="badge badge-category">WHAT WE DO</span>
          <h2 class="section-heading-title">${this.t('whatWeDoTitle')}</h2>
          <p class="section-heading-sub">${this.t('whatWeDoSub')}</p>
        </div>

        <!-- TRACK 1: Commercial Advertising & Promotional Services (For Businesses & Merchants) -->
        <div class="dual-track-block business-services-block">
          <div class="track-header-bar">
            <div class="track-header-left">
              <span class="track-audience-pill business-pill">💼 FOR BUSINESSES & ADVERTISERS</span>
              <h3 class="track-title">${this.t('servicesGroupTitle')}</h3>
              <p class="track-sub">${this.t('servicesGroupSub')}</p>
            </div>
            <a href="#work-with-us" class="btn btn-primary btn-sm track-cta-btn" onclick="Channel.scrollToSection('work-with-us', event)">
              📢 ${this.t('ctaWorkWithUs')} →
            </a>
          </div>

          <div class="activities-grid">
            ${services.map(srv => `
              <div class="activity-card service-card">
                <div class="card-top-row">
                  <div class="activity-icon-wrap">${srv.icon}</div>
                  <span class="service-type-badge">${this.getI18n(srv.badge)}</span>
                </div>
                <h4 class="activity-title">${this.getI18n(srv.title)}</h4>
                <p class="activity-desc">${this.getI18n(srv.desc)}</p>
                <div class="service-card-action">
                  <a href="#work-with-us" class="service-link-btn" onclick="Channel.scrollToSection('work-with-us', event)">
                    ${this.t('ctaWorkWithUs')} ↗
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TRACK 2: Ground Journalism & Community Content (For Viewers & Public) -->
        <div class="dual-track-block journalism-content-block">
          <div class="track-header-bar">
            <div class="track-header-left">
              <span class="track-audience-pill journalism-pill">🎙️ JOURNALISM & COMMUNITY CONTENT</span>
              <h3 class="track-title">${this.t('contentGroupTitle')}</h3>
              <p class="track-sub">${this.t('contentGroupSub')}</p>
            </div>
            <a href="#videos" class="btn btn-outline btn-sm track-cta-btn" onclick="Channel.scrollToSection('videos', event)">
              ▶ ${this.t('ctaWatchVideos')} →
            </a>
          </div>

          <div class="activities-grid">
            ${journalism.map(cnt => `
              <div class="activity-card content-card">
                <div class="card-top-row">
                  <div class="activity-icon-wrap journalism-icon-wrap">${cnt.icon}</div>
                  <span class="journalism-type-badge">${this.getI18n(cnt.badge)}</span>
                </div>
                <h4 class="activity-title">${this.getI18n(cnt.title)}</h4>
                <p class="activity-desc">${this.getI18n(cnt.desc)}</p>
                <div class="service-card-action">
                  <a href="#videos" class="service-link-btn journalism-link-btn" onclick="Channel.scrollToSection('videos', event)">
                    ${this.t('ctaWatchVideos')} ↗
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  },

  renderHowWeHelp() {
    const sec = document.getElementById('how-we-help');
    if (!sec) return;

    const pillars = window.INB_BRAND_DATA.pillars || [];

    sec.innerHTML = `
      <div class="container">
        <div class="section-heading-center">
          <span class="badge badge-category">THE REAL PAYOFF</span>
          <h2 class="section-heading-title">${this.t('howWeHelpTitle')}</h2>
          <p class="section-heading-sub">${this.t('howWeHelpSub')}</p>
        </div>

        <div class="pillars-grid">
          ${pillars.map(p => `
            <div class="pillar-card">
              <div class="pillar-card-header">
                <span class="pillar-number">${p.number}</span>
                ${p.badge ? `<span class="pillar-impact-badge">${this.getI18n(p.badge)}</span>` : ''}
              </div>
              <h3 class="pillar-title">${this.getI18n(p.title)}</h3>
              <p class="pillar-desc">${this.getI18n(p.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
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
          <div class="yt-banner-actions">
            <a href="https://www.instagram.com/inbrowntown" target="_blank" rel="noreferrer" class="yt-banner-ig-btn">
              <span>📸</span> <span>Official Instagram</span>
            </a>
            <a href="${window.INB_BRAND_DATA.channelUrl}" target="_blank" rel="noreferrer" class="btn btn-primary yt-banner-yt-btn">
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

            <div class="work-trust-strip">
              <span class="trust-shield">🛡️</span>
              <span class="trust-text">100% Verified Community Reach • Pune HQ & Maharashtra • Direct Local Inquiries</span>
            </div>
            
            <div class="work-perks-list">
              <div class="perk-item">
                <span class="perk-icon">🎯</span>
                <div>
                  <strong>Targeted Local Reach:</strong> Direct promotional access to 1.8k+ YouTube subscribers & 4.8k+ Instagram followers across Pune & Maharashtra.
                </div>
              </div>
              <div class="perk-item">
                <span class="perk-icon">🎨</span>
                <div>
                  <strong>Done-For-You Ad Posters:</strong> Custom promotional ad posters, banners & social media creatives crafted specifically for busy shopkeepers and local business owners.
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
                  <option value="digital_ads">${this.t('serviceOption1')}</option>
                  <option value="ad_posters">${this.t('serviceOption2')}</option>
                  <option value="business_spotlight">${this.t('serviceOption3')}</option>
                  <option value="interview_feature">${this.t('serviceOption4')}</option>
                  <option value="custom_package">${this.t('serviceOption5')}</option>
                  <option value="other">${this.t('serviceOptionOther')}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">${this.t('formMessage')}</label>
                <textarea class="form-control" id="inq-message" rows="3" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; box-shadow: 0 4px 14px rgba(224, 102, 42, 0.4);">
                ${this.t('btnSubmitInquiry')}
              </button>

              <div class="form-turnaround-note">
                ${this.t('formExpectationNote')}
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  handleInquirySubmit(event) {
    event.preventDefault();
    const name = document.getElementById('inq-name')?.value?.trim();
    const phone = document.getElementById('inq-phone')?.value?.trim();
    const email = document.getElementById('inq-email')?.value?.trim();
    const serviceSelect = document.getElementById('inq-service');
    const serviceText = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
    const message = document.getElementById('inq-message')?.value?.trim();

    if (!name || !phone || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const formContainer = document.querySelector('.work-form-right');
    if (!formContainer) return;

    formContainer.innerHTML = `
      <div class="inquiry-success-card">
        <div class="success-icon-wrap">🎉</div>
        <h3 class="success-card-title">${this.t('formConfirmationTitle')}</h3>
        <p class="success-card-sub">${this.t('formConfirmationSub')}</p>
        
        <div class="inquiry-summary-box">
          <div class="summary-row"><strong>Name:</strong> <span>${name}</span></div>
          <div class="summary-row"><strong>Phone:</strong> <span>${phone}</span></div>
          <div class="summary-row"><strong>Email:</strong> <span>${email}</span></div>
          <div class="summary-row"><strong>Category:</strong> <span>${serviceText}</span></div>
        </div>

        <div class="success-turnaround-pill">
          <span>⏱️ Expected Turnaround: 24 Hours via WhatsApp / Phone</span>
        </div>

        <button class="btn btn-outline" style="margin-top: 1.25rem; width: 100%; border-color: rgba(255,255,255,0.3); color: #fff; background: rgba(255,255,255,0.06);" onclick="Channel.renderWorkWithUs()">
          ${this.t('btnSubmitAnother')}
        </button>
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
