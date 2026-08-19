/**
 * INBrownTown - Reactive State Store & LocalStorage Persistence Engine
 */

class INBrownTownStore {
  constructor() {
    this.storageKey = 'INB_STATE_V1';
    this.listeners = new Set();
    this.state = this.loadState();
  }

  // Load state from localStorage or initialize with Master Dataset
  loadState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required collections exist
        return {
          lang: parsed.lang || window.INB_CONFIG.defaultLanguage,
          theme: parsed.theme || 'light',
          selectedDistrict: parsed.selectedDistrict || 'pune',
          articles: parsed.articles || window.INB_INITIAL_DATA.articles,
          liveTimeline: parsed.liveTimeline || window.INB_INITIAL_DATA.liveTimeline,
          helpRequests: parsed.helpRequests || window.INB_INITIAL_DATA.helpRequests,
          citizenReports: parsed.citizenReports || window.INB_INITIAL_DATA.citizenReports,
          factChecks: parsed.factChecks || window.INB_INITIAL_DATA.factChecks,
          schemes: parsed.schemes || window.INB_INITIAL_DATA.schemes,
          jobs: parsed.jobs || window.INB_INITIAL_DATA.jobs,
          originals: parsed.originals || window.INB_INITIAL_DATA.originals,
          businesses: parsed.businesses || window.INB_INITIAL_DATA.businesses,
          communityPoll: parsed.communityPoll || window.INB_INITIAL_DATA.communityPoll,
          votedPolls: parsed.votedPolls || {},
          bookmarks: parsed.bookmarks || [],
          likedArticles: parsed.likedArticles || [],
          adCampaigns: parsed.adCampaigns || [
            {
              id: 'ad-01',
              title: 'Punekar Traditional Sweets Festival Campaign',
              advertiser: 'Punekar Foods Pvt Ltd',
              placement: 'hero_banner',
              budget: '₹१५,०००',
              durationDays: 15,
              impressions: 48920,
              clicks: 2180,
              status: 'ACTIVE',
              createdAt: '2026-08-10'
            },
            {
              id: 'ad-02',
              title: 'Rooftop Solar Subsidy Drive 2026',
              advertiser: 'Sahyadri Solar Pune',
              placement: 'sidebar_spotlight',
              budget: '₹२५,०००',
              durationDays: 30,
              impressions: 89300,
              clicks: 4320,
              status: 'ACTIVE',
              createdAt: '2026-08-05'
            }
          ],
          notifications: parsed.notifications || [
            { id: 'notif-1', text: 'पुणे मेट्रो स्वारगेट ते कात्रज भूमिगत मार्गास गती', time: '१० मिनिटांपूर्वी', read: false },
            { id: 'notif-2', text: 'तातडीची मदत: ससून रुग्णालयात O-ve रक्ताची गरज', time: '१ तासापूर्वी', read: false }
          ]
        };
      }
    } catch (e) {
      console.warn('Could not read state from localStorage, using fresh initial data', e);
    }

    return {
      lang: window.INB_CONFIG.defaultLanguage,
      theme: 'light',
      selectedDistrict: 'pune',
      articles: window.INB_INITIAL_DATA.articles,
      liveTimeline: window.INB_INITIAL_DATA.liveTimeline,
      helpRequests: window.INB_INITIAL_DATA.helpRequests,
      citizenReports: window.INB_INITIAL_DATA.citizenReports,
      factChecks: window.INB_INITIAL_DATA.factChecks,
      schemes: window.INB_INITIAL_DATA.schemes,
      jobs: window.INB_INITIAL_DATA.jobs,
      originals: window.INB_INITIAL_DATA.originals,
      businesses: window.INB_INITIAL_DATA.businesses,
      communityPoll: window.INB_INITIAL_DATA.communityPoll,
      votedPolls: {},
      bookmarks: [],
      likedArticles: [],
      adCampaigns: [
        {
          id: 'ad-01',
          title: 'Punekar Traditional Sweets Festival Campaign',
          advertiser: 'Punekar Foods Pvt Ltd',
          placement: 'hero_banner',
          budget: '₹१५,०००',
          durationDays: 15,
          impressions: 48920,
          clicks: 2180,
          status: 'ACTIVE',
          createdAt: '2026-08-10'
        },
        {
          id: 'ad-02',
          title: 'Rooftop Solar Subsidy Drive 2026',
          advertiser: 'Sahyadri Solar Pune',
          placement: 'sidebar_spotlight',
          budget: '₹२५,०००',
          durationDays: 30,
          impressions: 89300,
          clicks: 4320,
          status: 'ACTIVE',
          createdAt: '2026-08-05'
        }
      ],
      notifications: [
        { id: 'notif-1', text: 'पुणे मेट्रो स्वारगेट ते कात्रज भूमिगत मार्गास गती', time: '१० मिनिटांपूर्वी', read: false },
        { id: 'notif-2', text: 'तातडीची मदत: ससून रुग्णालयात O-ve रक्ताची गरज', time: '१ तासापूर्वी', read: false }
      ]
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // --- GETTERS & ACTIONS ---

  getLang() {
    return this.state.lang;
  }

  setLang(langCode) {
    if (['mr', 'hi', 'en'].includes(langCode)) {
      this.state.lang = langCode;
      this.saveState();
      document.documentElement.lang = langCode;
    }
  }

  getTheme() {
    return this.state.theme;
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.saveState();
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const nextTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    return nextTheme;
  }

  getSelectedDistrict() {
    return this.state.selectedDistrict;
  }

  setSelectedDistrict(distId) {
    this.state.selectedDistrict = distId;
    this.saveState();
  }

  // Articles CRUD & Interactions
  getArticles(filter = {}) {
    let list = [...this.state.articles];
    if (filter.category && filter.category !== 'all') {
      list = list.filter(a => a.category === filter.category);
    }
    if (filter.district) {
      list = list.filter(a => a.district === filter.district);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(a => {
        const title = (a.title.mr + ' ' + a.title.hi + ' ' + a.title.en).toLowerCase();
        const summary = (a.summary.mr + ' ' + a.summary.hi + ' ' + a.summary.en).toLowerCase();
        const tags = (a.tags || []).join(' ').toLowerCase();
        return title.includes(q) || summary.includes(q) || tags.includes(q);
      });
    }
    return list;
  }

  getArticleById(id) {
    return this.state.articles.find(a => a.id === id || a.slug === id);
  }

  getHeroArticle() {
    return this.state.articles.find(a => a.isHero) || this.state.articles[0];
  }

  getBreakingArticles() {
    return this.state.articles.filter(a => a.isBreaking);
  }

  incrementArticleViews(id) {
    const art = this.getArticleById(id);
    if (art) {
      art.views = (art.views || 0) + 1;
      this.saveState();
    }
  }

  toggleBookmark(id) {
    const idx = this.state.bookmarks.indexOf(id);
    if (idx > -1) {
      this.state.bookmarks.splice(idx, 1);
    } else {
      this.state.bookmarks.push(id);
    }
    this.saveState();
    return this.isBookmarked(id);
  }

  isBookmarked(id) {
    return this.state.bookmarks.includes(id);
  }

  toggleLike(id) {
    const idx = this.state.likedArticles.indexOf(id);
    const art = this.getArticleById(id);
    if (idx > -1) {
      this.state.likedArticles.splice(idx, 1);
      if (art && art.likes > 0) art.likes--;
    } else {
      this.state.likedArticles.push(id);
      if (art) art.likes = (art.likes || 0) + 1;
    }
    this.saveState();
    return this.isLiked(id);
  }

  isLiked(id) {
    return this.state.likedArticles.includes(id);
  }

  createArticle(articleData) {
    const newArticle = {
      id: 'art-' + Date.now(),
      slug: (articleData.title.en || 'news-story').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      views: 1,
      likes: 0,
      publishedAt: new Date().toISOString(),
      factCheckBadge: 'VERIFIED_OFFICIAL',
      ...articleData
    };
    this.state.articles.unshift(newArticle);
    this.saveState();
    return newArticle;
  }

  deleteArticle(id) {
    this.state.articles = this.state.articles.filter(a => a.id !== id);
    this.saveState();
  }

  // Citizen Reports & Civic Desk
  getCitizenReports(filter = {}) {
    let list = [...this.state.citizenReports];
    if (filter.status && filter.status !== 'all') {
      list = list.filter(r => r.status === filter.status);
    }
    if (filter.category && filter.category !== 'all') {
      list = list.filter(r => r.category === filter.category);
    }
    if (filter.district && filter.district !== 'all') {
      list = list.filter(r => r.district === filter.district);
    }
    return list;
  }

  addCitizenReport(reportData) {
    const newReport = {
      id: 'rep-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'PENDING', // PENDING -> VERIFIED -> ESCALATED -> RESOLVED
      upvotes: 1,
      officialResponse: 'Under review by INBrownTown editorial verification desk.',
      ...reportData
    };
    this.state.citizenReports.unshift(newReport);
    this.saveState();
    return newReport;
  }

  updateReportStatus(reportId, newStatus, officialResponse = '') {
    const rep = this.state.citizenReports.find(r => r.id === reportId);
    if (rep) {
      rep.status = newStatus;
      if (officialResponse) rep.officialResponse = officialResponse;
      this.saveState();
    }
  }

  upvoteCitizenReport(reportId) {
    const rep = this.state.citizenReports.find(r => r.id === reportId);
    if (rep) {
      rep.upvotes = (rep.upvotes || 0) + 1;
      this.saveState();
    }
  }

  // Help Desk Requests
  getHelpRequests(filter = {}) {
    let list = [...this.state.helpRequests];
    if (filter.type && filter.type !== 'all') {
      list = list.filter(h => h.type === filter.type);
    }
    if (filter.status && filter.status !== 'all') {
      list = list.filter(h => h.status === filter.status);
    }
    return list;
  }

  addHelpRequest(helpData) {
    const newHelp = {
      id: 'help-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      verified: true,
      ...helpData
    };
    this.state.helpRequests.unshift(newHelp);
    this.saveState();
    return newHelp;
  }

  updateHelpStatus(helpId, status) {
    const item = this.state.helpRequests.find(h => h.id === helpId);
    if (item) {
      item.status = status;
      this.saveState();
    }
  }

  // Community Polls
  votePoll(optionId) {
    const pollId = this.state.communityPoll.id;
    if (this.state.votedPolls[pollId]) {
      return { success: false, message: 'You have already voted in this poll.' };
    }

    const opt = this.state.communityPoll.options.find(o => o.id === optionId);
    if (opt) {
      opt.votes = (opt.votes || 0) + 1;
      this.state.communityPoll.totalVotes = (this.state.communityPoll.totalVotes || 0) + 1;
      this.state.votedPolls[pollId] = optionId;
      this.saveState();
      return { success: true, message: 'Vote recorded successfully!' };
    }
    return { success: false, message: 'Invalid option selected.' };
  }

  hasVotedPoll(pollId) {
    return !!this.state.votedPolls[pollId];
  }

  // Ad Campaigns
  addAdCampaign(campaignData) {
    const newCampaign = {
      id: 'ad-' + Date.now(),
      impressions: 0,
      clicks: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      ...campaignData
    };
    this.state.adCampaigns.unshift(newCampaign);
    this.saveState();
    return newCampaign;
  }
}

// Global Store Instance
window.INB_STORE = new INBrownTownStore();
