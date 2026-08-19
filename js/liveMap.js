/**
 * INBrownTown - Interactive Live Map Engine
 * Fully responsive Leaflet canvas with auto-resize and multilingual pins
 */

const LiveMap = {
  mapInstance: null,
  markersLayer: null,
  activeFilter: 'all',

  initMap() {
    const container = document.getElementById('interactive-map-canvas');
    if (!container) return;

    if (this.mapInstance) {
      this.mapInstance.remove();
    }

    if (typeof L === 'undefined') {
      container.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#fff;">Loading Map...</div>`;
      return;
    }

    // Centered at Pune / Maharashtra
    this.mapInstance = L.map('interactive-map-canvas', {
      center: [18.5204, 73.8567],
      zoom: 12,
      zoomControl: true
    });

    // Dark sleek tile layer for editorial look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      maxZoom: 19
    }).addTo(this.mapInstance);

    this.markersLayer = L.layerGroup().addTo(this.mapInstance);
    this.renderPins();

    // Auto invalidate size on resize
    window.addEventListener('resize', () => {
      if (this.mapInstance) {
        this.mapInstance.invalidateSize();
      }
    });
  },

  renderPins() {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    const lang = window.INB_STORE.getLang();

    // Map pins data points with multilingual titles
    const mapPoints = [
      {
        id: 'p-1',
        type: 'breaking',
        title: {
          mr: 'पुणे मेट्रो स्वारगेट ते कात्रज भुयारी मार्ग प्रकल्प',
          hi: 'पुणे मेट्रो स्वारगेट से कात्रज भूमिगत परियोजना',
          en: 'Pune Metro Swargate to Katraj Underground Line'
        },
        category: 'METRO',
        lat: 18.4988,
        lng: 73.8580,
        color: '#d32f2f',
        icon: '🚇'
      },
      {
        id: 'p-2',
        type: 'civic',
        title: {
          mr: 'हिंजवडी फेज १ रस्त्यावरील खड्डे',
          hi: 'हिंजवड़ी फेज़ १ सड़क के गड्ढे',
          en: 'Hinjawadi Phase 1 Main Road Potholes'
        },
        category: 'CIVIC ISSUE',
        lat: 18.5913,
        lng: 73.7389,
        color: '#e5a93b',
        icon: '⚠️'
      },
      {
        id: 'p-3',
        type: 'help',
        title: {
          mr: 'तातडीची O-ve रक्त गरज (ससून रुग्णालय)',
          hi: 'आपातकालीन O-ve रक्त आवश्यकता (ससून अस्पताल)',
          en: 'Emergency O-ve Blood Requirement (Sassoon Hospital)'
        },
        category: 'EMERGENCY',
        lat: 18.5262,
        lng: 73.8742,
        color: '#d32f2f',
        icon: '🩸'
      },
      {
        id: 'p-4',
        type: 'traffic',
        title: {
          mr: 'AI अ‍ॅडॉप्टिव्ह ट्रॅफिक सिग्नल व्यवस्था',
          hi: 'AI आधारित स्मार्ट ट्रैफिक सिग्नल सिस्टम',
          en: 'AI Adaptive Traffic Signal System'
        },
        category: 'TRAFFIC',
        lat: 18.5975,
        lng: 73.7188,
        color: '#0288d1',
        icon: '🚦'
      },
      {
        id: 'p-5',
        type: 'civic',
        title: {
          mr: 'कोथरूड डीपी रस्ता जलवाहिनी दुरुस्ती',
          hi: 'कोथरूड डीपी रोड पाइपलाइन मरम्मत पूर्ण',
          en: 'Kothrud DP Road Pipeline Repaired'
        },
        category: 'RESOLVED',
        lat: 18.5074,
        lng: 73.8077,
        color: '#2e7d32',
        icon: '✓'
      }
    ];

    const filtered = this.activeFilter === 'all' ? mapPoints : mapPoints.filter(p => p.type === this.activeFilter);

    filtered.forEach(pt => {
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="background:${pt.color}; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:bold; box-shadow:0 3px 8px rgba(0,0,0,0.3); border:2px solid #fff;">
            ${pt.icon}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const titleStr = pt.title[lang] || pt.title.en || pt.title.mr;

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon });
      marker.bindPopup(`
        <div style="padding: 4px; font-family: 'Plus Jakarta Sans', sans-serif; max-width:200px;">
          <span style="background:${pt.color}; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">${pt.category}</span>
          <h4 style="margin:6px 0 4px 0; font-size:13px; font-weight:700; line-height:1.3;">${titleStr}</h4>
          <div style="font-size:11px; color:#666;">📍 Pune, Maharashtra</div>
        </div>
      `);
      this.markersLayer.addLayer(marker);
    });
  },

  filterMap(type, btn) {
    this.activeFilter = type;
    document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderPins();
  },

  renderLiveMapView() {
    const appEl = document.getElementById('app-main');
    const lang = window.INB_STORE.getLang();

    const filterAll = lang === 'en' ? '🌐 All Incidents' : (lang === 'hi' ? '🌐 सभी घटनाएं' : '🌐 सर्व नोंदी');
    const filterBreaking = lang === 'en' ? '🚨 Breaking' : (lang === 'hi' ? '🚨 ताज़ा खबरें' : '🚨 महत्त्वाच्या बातम्या');
    const filterCivic = lang === 'en' ? '🛠️ Civic Issues' : (lang === 'hi' ? '🛠️ नागरिक समस्याएं' : '🛠️ नागरी समस्या');
    const filterHelp = lang === 'en' ? '🩸 Emergency Help' : (lang === 'hi' ? '🩸 आपातकालीन मदद' : '🩸 आपत्कालीन मदत');
    const filterTraffic = lang === 'en' ? '🚦 Traffic Updates' : (lang === 'hi' ? '🚦 ट्रैफिक अपडेट्स' : '🚦 वाहतूक अपडेट्स');

    appEl.innerHTML = `
      <div style="margin-bottom: 4rem;">
        <div class="section-header">
          <div>
            <h1 class="section-title">🗺️ ${UI.t('liveMap')}</h1>
            <p class="section-subtitle">${lang === 'en' ? 'Real-time verified incidents, civic complaints, and emergency help requests' : 'महाराष्ट्र व पुणे परिसरातील थेट घडामोडी, नागरी समस्या आणि आपत्कालीन मदत'}</p>
          </div>
        </div>

        <div class="live-map-container-wrap">
          <div class="map-top-control-bar">
            <div class="map-filter-tags">
              <button class="map-filter-btn active" onclick="LiveMap.filterMap('all', this)">${filterAll}</button>
              <button class="map-filter-btn" onclick="LiveMap.filterMap('breaking', this)">${filterBreaking}</button>
              <button class="map-filter-btn" onclick="LiveMap.filterMap('civic', this)">${filterCivic}</button>
              <button class="map-filter-btn" onclick="LiveMap.filterMap('help', this)">${filterHelp}</button>
              <button class="map-filter-btn" onclick="LiveMap.filterMap('traffic', this)">${filterTraffic}</button>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">
              📍 Pune Live GPS Grid
            </div>
          </div>

          <div id="interactive-map-canvas"></div>

          <div class="map-legend-overlay">
            <div class="legend-item"><span class="legend-dot" style="background:#d32f2f"></span> Breaking / Emergency</div>
            <div class="legend-item"><span class="legend-dot" style="background:#e5a93b"></span> Pending Civic Issue</div>
            <div class="legend-item"><span class="legend-dot" style="background:#2e7d32"></span> Resolved Action</div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initMap();
    }, 100);
  }
};

window.LiveMap = LiveMap;
