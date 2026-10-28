/**
 * INBrownTown - Editorial CMS & Newsroom Desk
 * Fully localized newsroom article publishing, AI Copilot, and moderation
 */

const AdminCMS = {
  currentTab: 'dashboard',

  renderAdminView() {
    const appEl = document.getElementById('app-main');
    const articles = window.INB_STORE.state.articles;
    const reports = window.INB_STORE.state.citizenReports;
    const helpReqs = window.INB_STORE.state.helpRequests;

    const pendingReports = reports.filter(r => r.status === 'PENDING').length;
    const activeHelp = helpReqs.filter(h => h.status === 'ACTIVE').length;

    const lang = window.INB_STORE.getLang();
    const tabDashboard = lang === 'en' ? '📊 Dashboard & Analytics' : (lang === 'hi' ? '📊 डैशबोर्ड व एनालिटिक्स' : '📊 डॅशबोर्ड व Analytics');
    const tabEditor = lang === 'en' ? '✍️ Create New Article (AI)' : (lang === 'hi' ? '✍️ नया समाचार लिखें (AI)' : '✍️ नवीन बातमी तयार करा (AI)');
    const tabMod = lang === 'en' ? '🛡️ Citizen Moderation' : (lang === 'hi' ? '🛡️ नागरिक समस्या जांच' : '🛡️ नागरी समस्या पडताळणी');
    const tabHelp = lang === 'en' ? '🚨 Emergency Help Desk' : (lang === 'hi' ? '🚨 आपातकालीन सहायता कक्ष' : '🚨 आपत्कालीन मदत कक्ष');
    const tabAds = lang === 'en' ? '💰 Ads & Campaigns' : (lang === 'hi' ? '💰 विज्ञापन व अभियान' : '💰 जाहिराती व मोहीम व्यवस्थापन');
    const backToPortal = lang === 'en' ? '🌐 Back to Public Portal' : (lang === 'hi' ? '🌐 मुख्य पोर्टल पर लौटें' : '🌐 मुख्य पोर्टलवर परत जा');

    appEl.innerHTML = `
      <div class="admin-layout">
        <!-- Sidebar Navigation -->
        <aside class="admin-sidebar">
          <div style="padding: 0.5rem 0.75rem 1rem 0.75rem; border-bottom: 1px solid var(--border-light); margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display:flex; align-items:center; gap:0.4rem;">
              📰 Newsroom Desk
            </h3>
            <span style="font-size: 0.72rem; color: var(--brand-brown-600); font-weight: 700;">INBROWNTOWN CMS V1</span>
          </div>

          <button class="admin-nav-item ${this.currentTab === 'dashboard' ? 'active' : ''}" onclick="AdminCMS.switchTab('dashboard')">
            ${tabDashboard}
          </button>
          <button class="admin-nav-item ${this.currentTab === 'editor' ? 'active' : ''}" onclick="AdminCMS.switchTab('editor')">
            ${tabEditor}
          </button>
          <button class="admin-nav-item ${this.currentTab === 'moderation' ? 'active' : ''}" onclick="AdminCMS.switchTab('moderation')">
            ${tabMod} <span class="badge-count">${pendingReports}</span>
          </button>
          <button class="admin-nav-item ${this.currentTab === 'help-queue' ? 'active' : ''}" onclick="AdminCMS.switchTab('help-queue')">
            ${tabHelp} <span class="badge-count">${activeHelp}</span>
          </button>
          <button class="admin-nav-item ${this.currentTab === 'ads' ? 'active' : ''}" onclick="AdminCMS.switchTab('ads')">
            ${tabAds}
          </button>
          <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-light);">
            <a href="#/" class="btn btn-outline btn-sm" style="width: 100%;">
              ${backToPortal}
            </a>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="admin-main" id="admin-tab-content">
          ${this.getTabContentHtml()}
        </main>
      </div>
    `;
  },

  switchTab(tabName) {
    this.currentTab = tabName;
    this.renderAdminView();
  },

  getTabContentHtml() {
    if (this.currentTab === 'dashboard') return this.renderDashboardTab();
    if (this.currentTab === 'editor') return this.renderEditorTab();
    if (this.currentTab === 'moderation') return this.renderModerationTab();
    if (this.currentTab === 'help-queue') return this.renderHelpQueueTab();
    if (this.currentTab === 'ads') return this.renderAdsTab();
    return this.renderDashboardTab();
  },

  // 1. DASHBOARD & KPI ANALYTICS
  renderDashboardTab() {
    const articles = window.INB_STORE.state.articles;
    const reports = window.INB_STORE.state.citizenReports;
    const lang = window.INB_STORE.getLang();

    return `
      <div>
        <div class="admin-header-row">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800;">${lang === 'en' ? 'Newsroom Real-Time Dashboard' : (lang === 'hi' ? 'न्यूज़रूम रियल-टाइम डैशबोर्ड' : 'न्यूजरूम थेट डॅशबोर्ड')}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${lang === 'en' ? 'Live readership, civic issues pipeline, and editorial metrics' : 'थेट वाचक संख्या, नागरी समस्या आणि संपादकीय आकडेवारी'}</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="AdminCMS.switchTab('editor')">
            + ${lang === 'en' ? 'Write New Story' : 'नवीन बातमी लिहा'}
          </button>
        </div>

        <!-- KPI Grid -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">${lang === 'en' ? 'Live Active Readers' : 'थेट वाचक (Live Readers)'}</span>
            <span class="kpi-value" style="color: var(--brand-brown-600)">२,४८०</span>
            <span class="kpi-trend">↑ 12% vs last hour</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${lang === 'en' ? 'Published Articles' : 'प्रकाशित बातम्या'}</span>
            <span class="kpi-value">${articles.length}</span>
            <span class="kpi-trend">✓ ${UI.t('verifiedNewsroom')}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${lang === 'en' ? 'Citizen Civic Reports' : 'नागरी समस्या अहवाल'}</span>
            <span class="kpi-value">${reports.length}</span>
            <span class="kpi-trend">${reports.filter(r => r.status === 'RESOLVED').length} ${UI.t('statusResolved')}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${lang === 'en' ? 'Ad Revenue (MTD)' : 'जाहिरात महसूल (चालू महिना)'}</span>
            <span class="kpi-value">₹४०,०००</span>
            <span class="kpi-trend">↑ 2 Active Campaigns</span>
          </div>
        </div>

        <!-- Recent Articles List -->
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">${lang === 'en' ? 'Recently Published Stories' : 'नुकत्याच प्रसिद्ध झालेल्या बातम्या'}</h3>
        <table class="moderation-table">
          <thead>
            <tr>
              <th>${lang === 'en' ? 'Title' : 'शीर्षक'}</th>
              <th>${lang === 'en' ? 'Category' : 'श्रेणी'}</th>
              <th>${lang === 'en' ? 'District' : 'जिल्हा'}</th>
              <th>${lang === 'en' ? 'Views' : 'वाचक'}</th>
              <th>${lang === 'en' ? 'Action' : 'कृती'}</th>
            </tr>
          </thead>
          <tbody>
            ${articles.slice(0, 5).map(art => `
              <tr>
                <td>
                  <strong>${UI.getI18n(art.title)}</strong>
                  ${art.isBreaking ? '<span class="badge badge-breaking" style="margin-left:6px;">BREAKING</span>' : ''}
                </td>
                <td><span class="badge badge-category">${art.category}</span></td>
                <td>📍 ${art.district}</td>
                <td>👁️ ${art.views || 0}</td>
                <td>
                  <a href="#/article/${art.id}" class="btn btn-outline btn-sm">${lang === 'en' ? 'View ↗' : 'पहा ↗'}</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // 2. ARTICLE PUBLISHER WITH AI COPILOT
  renderEditorTab() {
    const lang = window.INB_STORE.getLang();
    return `
      <div>
        <div class="admin-header-row">
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">${lang === 'en' ? 'Article Publishing Studio (AI Copilot)' : 'नवीन बातमी संपादक (Newsroom Article Studio)'}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${lang === 'en' ? 'Draft verified news, generate headlines, and auto-summarize' : 'AI को-पायलटच्या मदतीने बातमी लिहा, मथळे सुचवा आणि प्रसिद्ध करा'}</p>
          </div>
        </div>

        <div class="editor-grid">
          <!-- Left: Article Inputs -->
          <form id="article-publish-form" onsubmit="AdminCMS.handlePublishArticle(event)">
            <div class="form-group">
              <label class="form-label">${lang === 'en' ? 'Article Title (Primary Language)' : 'बातमीचे मुख्य शीर्षक'} *</label>
              <input type="text" class="form-control" id="art-title-mr" placeholder="e.g. Pune Swargate to Katraj Metro Corridor Work Accelerated..." required>
            </div>

            <div class="form-group">
              <label class="form-label">English Headline (Multilingual)</label>
              <input type="text" class="form-control" id="art-title-en" placeholder="Pune Metro Phase 2 Underground Line Updates...">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">${lang === 'en' ? 'Category' : 'श्रेणी'} *</label>
                <select class="form-control" id="art-category" required>
                  ${window.INB_CONFIG.categories.map(c => `<option value="${c.id}">${UI.getI18n(c.label)}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${lang === 'en' ? 'District' : 'जिल्हा'} *</label>
                <select class="form-control" id="art-district" required>
                  ${window.INB_CONFIG.districts.map(d => `<option value="${d.id}">${UI.getI18n(d.name)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${lang === 'en' ? 'Executive Summary' : 'संक्षिप्त गोषवारा (Summary)'} *</label>
              <textarea class="form-control" id="art-summary-mr" rows="2" placeholder="2-sentence executive summary..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">${lang === 'en' ? 'Full Article Content' : 'सविस्तर बातमी (Full Content)'} *</label>
              <textarea class="form-control" id="art-content-mr" rows="6" placeholder="Detailed editorial investigation, quotes, and impact analysis..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Featured Image URL</label>
              <input type="url" class="form-control" id="art-image-url" value="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80">
            </div>

            <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; cursor: pointer;">
                <input type="checkbox" id="art-is-breaking"> 🚨 ${UI.t('breaking')} Ticker
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; cursor: pointer;">
                <input type="checkbox" id="art-is-hero"> ⭐ Homepage Hero Story
              </label>
            </div>

            <div style="display: flex; gap: 1rem;">
              <button type="submit" class="btn btn-primary btn-lg">🚀 ${lang === 'en' ? 'Publish Story' : 'बातमी प्रसिद्ध करा'}</button>
              <button type="button" class="btn btn-outline" onclick="UI.showToast('Draft Saved!', 'info')">💾 Save Draft</button>
            </div>
          </form>

          <!-- Right: AI Copilot Panel -->
          <div class="ai-copilot-panel">
            <div class="ai-copilot-header">
              ✨ AI Editorial Copilot
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted);">
              Instant headline ideation, automatic summaries, and SEO optimization:
            </p>

            <button class="btn btn-outline btn-sm" onclick="AdminCMS.runAiHeadlineGen()">
              💡 Generate 3 Catchy Headlines
            </button>

            <div id="ai-headline-results" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>

            <button class="btn btn-outline btn-sm" onclick="AdminCMS.runAiSummaryGen()">
              📝 Auto-Generate 2-Line Summary
            </button>

            <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-light); font-size: 0.75rem; color: var(--text-muted);">
              🛡️ <strong>Rule:</strong> AI assists human journalists; it does not publish autonomously.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  runAiHeadlineGen() {
    const inputTitle = document.getElementById('art-title-mr').value || 'Pune Metro Phase 2';
    const ideas = window.AIAssistant.generateHeadlineIdeas(inputTitle);
    const box = document.getElementById('ai-headline-results');
    box.innerHTML = ideas.map(idea => `
      <div class="ai-suggestion-box" onclick="document.getElementById('art-title-mr').value = '${idea.replace(/'/g, "\\'")}'; UI.showToast('Headline applied!', 'success');">
        ${idea}
      </div>
    `).join('');
  },

  runAiSummaryGen() {
    const content = document.getElementById('art-content-mr').value || document.getElementById('art-title-mr').value;
    if (!content) {
      UI.showToast('Please write some content first!', 'danger');
      return;
    }
    const summary = window.AIAssistant.generateAutoSummary(content);
    document.getElementById('art-summary-mr').value = summary;
    UI.showToast('AI Summary Generated!', 'success');
  },

  handlePublishArticle(e) {
    e.preventDefault();
    const titleMr = document.getElementById('art-title-mr').value;
    const titleEn = document.getElementById('art-title-en').value || titleMr;
    const cat = document.getElementById('art-category').value;
    const dist = document.getElementById('art-district').value;
    const summaryMr = document.getElementById('art-summary-mr').value;
    const contentMr = document.getElementById('art-content-mr').value;
    const imgUrl = document.getElementById('art-image-url').value;
    const isBreaking = document.getElementById('art-is-breaking').checked;
    const isHero = document.getElementById('art-is-hero').checked;

    window.INB_STORE.createArticle({
      category: cat,
      district: dist,
      isBreaking: isBreaking,
      isHero: isHero,
      author: {
        name: 'INBrownTown Newsroom',
        role: 'Editorial Desk',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      image: imgUrl,
      imageCaption: titleMr,
      readTimeMin: 3,
      tags: [cat, dist, 'Maharashtra'],
      title: { mr: titleMr, hi: titleMr, en: titleEn },
      summary: { mr: summaryMr, hi: summaryMr, en: summaryMr },
      content: { mr: `<p>${contentMr}</p>`, hi: `<p>${contentMr}</p>`, en: `<p>${contentMr}</p>` }
    });

    UI.showToast('Story published successfully!', 'success');
    window.INB_ROUTER.navigate('/');
  },

  // 3. CITIZEN MODERATION TAB
  renderModerationTab() {
    const reports = window.INB_STORE.state.citizenReports;
    const lang = window.INB_STORE.getLang();

    return `
      <div>
        <div class="admin-header-row">
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">${lang === 'en' ? 'Citizen Reports Moderation Desk' : 'नागरी समस्या पडताळणी डेस्क'}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${lang === 'en' ? 'Review citizen complaints, verify ground facts, and escalate to authorities' : 'नागरिकांनी पाठवलेल्या तक्रारींची तपासणी व प्रशासकीय पाठपुरावा'}</p>
          </div>
        </div>

        <table class="moderation-table">
          <thead>
            <tr>
              <th>${lang === 'en' ? 'Issue & Location' : 'समस्या व परिसर'}</th>
              <th>${lang === 'en' ? 'Reporter' : 'तक्रारदार'}</th>
              <th>${lang === 'en' ? 'Status' : 'सद्यस्थिती'}</th>
              <th>${lang === 'en' ? 'Editorial Action' : 'संपादकीय कृती'}</th>
            </tr>
          </thead>
          <tbody>
            ${reports.map(rep => `
              <tr>
                <td>
                  <strong>${UI.getI18n(rep.title)}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">📍 ${rep.locality}</div>
                </td>
                <td>${rep.reporterName}</td>
                <td><span class="badge ${rep.status === 'RESOLVED' ? 'badge-resolved' : (rep.status === 'ESCALATED' ? 'badge-danger' : 'badge-warning')}">${rep.status}</span></td>
                <td>
                  <div style="display: flex; gap: 0.35rem;">
                    <button class="btn btn-outline btn-sm" onclick="AdminCMS.updateRepStatus('${rep.id}', 'VERIFIED')">Verify</button>
                    <button class="btn btn-navy btn-sm" onclick="AdminCMS.updateRepStatus('${rep.id}', 'ESCALATED')">Escalate</button>
                    <button class="btn btn-success btn-sm" onclick="AdminCMS.updateRepStatus('${rep.id}', 'RESOLVED')">Resolved ✓</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  updateRepStatus(repId, status) {
    window.INB_STORE.updateReportStatus(repId, status, `Updated by Newsroom Desk at ${new Date().toLocaleTimeString()}`);
    UI.showToast(`Status updated to '${status}'!`, 'success');
    this.renderAdminView();
  },

  // 4. HELP QUEUE TAB
  renderHelpQueueTab() {
    const reqs = window.INB_STORE.state.helpRequests;
    const lang = window.INB_STORE.getLang();

    return `
      <div>
        <div class="admin-header-row">
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">${lang === 'en' ? 'Emergency Assistance Queue' : 'आपत्कालीन मदत पडताळणी कक्ष'}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${lang === 'en' ? 'Verification with hospitals and blood banks' : 'रक्त व वैद्यकीय मदतीची रुग्णालयामार्फत खात्री'}</p>
          </div>
        </div>

        <table class="moderation-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Patient / Individual</th>
              <th>Hospital & Location</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${reqs.map(h => `
              <tr>
                <td><span class="badge badge-danger">${h.type.toUpperCase()}</span></td>
                <td><strong>${h.patientName}</strong></td>
                <td>${h.hospital}</td>
                <td>${h.contactPhone}</td>
                <td>
                  <button class="btn btn-success btn-sm" onclick="AdminCMS.resolveHelp('${h.id}')">
                    ${h.status === 'FULFILLED' ? '✓ Fulfilled' : 'Mark Fulfilled'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  resolveHelp(id) {
    window.INB_STORE.updateHelpStatus(id, 'FULFILLED');
    UI.showToast('Marked as fulfilled!', 'success');
    this.renderAdminView();
  },

  // 5. ADS & CAMPAIGNS TAB
  renderAdsTab() {
    const ads = window.INB_STORE.state.adCampaigns;

    return `
      <div>
        <div class="admin-header-row">
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">Advertising & Campaign Analytics</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Self-serve local merchant campaigns and performance</p>
          </div>
        </div>

        <table class="moderation-table">
          <thead>
            <tr>
              <th>Campaign Title</th>
              <th>Advertiser</th>
              <th>Placement</th>
              <th>Budget</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${ads.map(ad => `
              <tr>
                <td><strong>${ad.title}</strong></td>
                <td>${ad.advertiser}</td>
                <td><code>${ad.placement}</code></td>
                <td>${ad.budget}</td>
                <td>👁️ ${ad.impressions.toLocaleString()}</td>
                <td>🖱️ ${ad.clicks.toLocaleString()}</td>
                <td><span class="badge badge-verified">${ad.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
};

window.AdminCMS = AdminCMS;
