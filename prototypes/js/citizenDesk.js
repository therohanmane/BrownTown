/**
 * INBrownTown - Citizen Desk & Community Assistance Engine
 * Manages "Report an Issue" wizard, Emergency Help Board, and Civic Tracker
 */

const CitizenDesk = {
  // Open "Report an Issue" Submission Modal
  openReportModal() {
    let modal = document.getElementById('report-issue-modal');
    if (modal) modal.remove(); // Recreate with current language strings
    this.createReportModalDOM();
    modal = document.getElementById('report-issue-modal');
    modal.classList.add('active');
  },

  closeReportModal() {
    const modal = document.getElementById('report-issue-modal');
    if (modal) modal.classList.remove('active');
  },

  createReportModalDOM() {
    const modalHtml = `
      <div class="modal-backdrop" id="report-issue-modal">
        <div class="modal-window">
          <div class="modal-header">
            <h3>📢 ${UI.t('reportTitle')}</h3>
            <button class="modal-close-btn" onclick="CitizenDesk.closeReportModal()">&times;</button>
          </div>
          <form id="citizen-issue-form" onsubmit="CitizenDesk.submitIssueForm(event)">
            <div class="modal-body">
              <div class="alert-box-warning" style="background: rgba(179,84,30,0.1); border-left: 3px solid var(--brand-brown-600); padding: 0.75rem; border-radius: 4px; font-size: 0.8rem; margin-bottom: 1.25rem;">
                🛡️ <strong>${UI.t('privacyPolicy')}:</strong> ${UI.t('yourContact')}
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('issueCategory')} *</label>
                <select class="form-control" id="report-cat" required>
                  ${window.INB_CONFIG.issueCategories.map(c => `<option value="${c.id}">${UI.getI18n(c.label)}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('location')} *</label>
                <input type="text" class="form-control" id="report-loc" placeholder="e.g. Hinjawadi Phase 1, Pune / FC Road" required>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('reportTitle')} *</label>
                <input type="text" class="form-control" id="report-title-input" placeholder="e.g. Deep waterlogged potholes near main junction" required>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('description')} *</label>
                <textarea class="form-control" id="report-desc" rows="3" placeholder="Provide detailed description of the civic problem..." required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('uploadPhoto')}</label>
                <div class="file-upload-zone" onclick="document.getElementById('report-photo-file').click()">
                  <input type="file" id="report-photo-file" accept="image/*" style="display:none;" onchange="CitizenDesk.handlePhotoSelect(event)">
                  <div id="upload-preview-text">
                    📷 ${UI.t('uploadPhoto')} (Click to upload)
                  </div>
                  <img id="upload-preview-img" style="display:none; max-height: 120px; margin: 0.5rem auto; border-radius: 4px;">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('yourContact')} *</label>
                <input type="text" class="form-control" id="report-contact" placeholder="Name and 10-digit mobile number" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="CitizenDesk.closeReportModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">🚀 ${UI.t('reportIssueBtn')}</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = document.getElementById('upload-preview-img');
        const text = document.getElementById('upload-preview-text');
        preview.src = event.target.result;
        preview.style.display = 'block';
        text.textContent = `✓ Selected: ${file.name}`;
      };
      reader.readAsDataURL(file);
    }
  },

  submitIssueForm(e) {
    e.preventDefault();
    const cat = document.getElementById('report-cat').value;
    const loc = document.getElementById('report-loc').value;
    const title = document.getElementById('report-title-input').value;
    const desc = document.getElementById('report-desc').value;
    const contact = document.getElementById('report-contact').value;
    const photoImg = document.getElementById('upload-preview-img');
    const photoSrc = (photoImg && photoImg.src && photoImg.src.startsWith('data:')) ? photoImg.src : 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80';

    window.INB_STORE.addCitizenReport({
      category: cat,
      district: 'pune',
      locality: loc,
      reporterName: contact.split(' ')[0] || 'Citizen',
      imageBefore: photoSrc,
      title: { mr: title, hi: title, en: title },
      description: { mr: desc, hi: desc, en: desc }
    });

    this.closeReportModal();
    UI.showToast(UI.t('submitSuccess'), 'success');
    if (window.location.hash === '#/citizen-reports') {
      this.renderCitizenReportsView();
    } else {
      window.INB_ROUTER.navigate('/citizen-reports');
    }
  },

  // Open "Emergency Help" Submission Modal
  openEmergencyModal() {
    let modal = document.getElementById('emergency-help-modal');
    if (modal) modal.remove(); // Recreate with current language strings
    this.createEmergencyModalDOM();
    modal = document.getElementById('emergency-help-modal');
    modal.classList.add('active');
  },

  closeEmergencyModal() {
    const modal = document.getElementById('emergency-help-modal');
    if (modal) modal.classList.remove('active');
  },

  createEmergencyModalDOM() {
    const modalHtml = `
      <div class="modal-backdrop" id="emergency-help-modal">
        <div class="modal-window">
          <div class="modal-header">
            <h3 style="color: var(--accent-red)">🚨 ${UI.t('requestHelp')}</h3>
            <button class="modal-close-btn" onclick="CitizenDesk.closeEmergencyModal()">&times;</button>
          </div>
          <form id="emergency-help-form" onsubmit="CitizenDesk.submitEmergencyForm(event)">
            <div class="modal-body">
              <div class="alert-box-warning" style="background: rgba(211,47,47,0.1); border-left: 3px solid var(--accent-red); padding: 0.75rem; border-radius: 4px; font-size: 0.8rem; margin-bottom: 1.25rem;">
                ⚠️ <strong>${UI.t('urgentNeed')}:</strong> ${UI.t('helpDeskSub')}
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('helpDesk')} *</label>
                <select class="form-control" id="help-type" required>
                  <option value="blood">🩸 Blood Requirement</option>
                  <option value="missing">👤 Missing Person Alert</option>
                  <option value="medical_aid">🏥 Medical Emergency Relief</option>
                  <option value="disaster">🌊 Disaster Help</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('patientName')} *</label>
                <input type="text" class="form-control" id="help-patient" required>
              </div>

              <div class="form-group">
                <label class="form-label">Blood Group (if applicable)</label>
                <input type="text" class="form-control" id="help-blood-grp" placeholder="e.g. O-ve, AB+ve">
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('hospitalLocation')} *</label>
                <input type="text" class="form-control" id="help-hosp" placeholder="e.g. Sassoon General Hospital, Pune" required>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('description')} *</label>
                <textarea class="form-control" id="help-details" rows="3" required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">${UI.t('yourContact')} *</label>
                <input type="text" class="form-control" id="help-contact" placeholder="Contact person & phone number" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="CitizenDesk.closeEmergencyModal()">Cancel</button>
              <button type="submit" class="btn btn-danger">🚨 ${UI.t('requestHelp')}</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  submitEmergencyForm(e) {
    e.preventDefault();
    const type = document.getElementById('help-type').value;
    const patient = document.getElementById('help-patient').value;
    const bloodGrp = document.getElementById('help-blood-grp').value || 'N/A';
    const hosp = document.getElementById('help-hosp').value;
    const details = document.getElementById('help-details').value;
    const contact = document.getElementById('help-contact').value;

    window.INB_STORE.addHelpRequest({
      type: type,
      urgency: 'HIGH',
      patientName: patient,
      bloodGroup: bloodGrp,
      unitsNeeded: 2,
      hospital: hosp,
      city: 'Pune',
      contactPerson: 'Verified Coordinator',
      contactPhone: contact,
      details: { mr: details, hi: details, en: details }
    });

    this.closeEmergencyModal();
    UI.showToast('Emergency request submitted and verified!', 'success');
    if (window.location.hash === '#/help') {
      this.renderHelpView();
    } else {
      window.INB_ROUTER.navigate('/help');
    }
  },

  upvoteReport(reportId, btn) {
    window.INB_STORE.upvoteCitizenReport(reportId);
    const rep = window.INB_STORE.state.citizenReports.find(r => r.id === reportId);
    if (rep && btn) {
      btn.textContent = `${UI.t('supportedBtn')} (${rep.upvotes})`;
      btn.style.background = 'var(--brand-brown-600)';
      btn.style.color = '#fff';
    }
    UI.showToast('Support registered!', 'success');
  },

  // --- FULL VIEW: INBROWNTOWN HELP BOARD ---
  renderHelpView() {
    const appEl = document.getElementById('app-main');
    const requests = window.INB_STORE.getHelpRequests();

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title" style="color: var(--accent-red)">🚨 ${UI.t('helpDesk')}</h1>
            <p class="section-subtitle">${UI.t('helpDeskSub')}</p>
          </div>
          <button class="btn btn-danger" onclick="CitizenDesk.openEmergencyModal()">
            + ${UI.t('requestHelp')}
          </button>
        </div>

        <div class="help-board-grid">
          ${requests.map(req => UI.renderHelpCardHtml(req)).join('')}
        </div>
      </div>
    `;
  },

  // --- FULL VIEW: CITIZEN REPORTS ---
  renderCitizenReportsView() {
    const appEl = document.getElementById('app-main');
    const reports = window.INB_STORE.getCitizenReports();

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">📢 ${UI.t('citizenReports')}</h1>
            <p class="section-subtitle">${UI.t('citizenReportsSub')}</p>
          </div>
          <button class="btn btn-primary" onclick="CitizenDesk.openReportModal()">
            + ${UI.t('reportIssue')}
          </button>
        </div>

        <div class="citizen-reports-grid">
          ${reports.map(rep => UI.renderCitizenReportCardHtml(rep, false)).join('')}
        </div>
      </div>
    `;
  }
};

window.CitizenDesk = CitizenDesk;
