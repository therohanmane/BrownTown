# 🎙️ INBrownTown — Official Web Platform

[![INBrownTown](https://img.shields.io/badge/Platform-INBrownTown-E0662A?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@INBrownTown)
[![Website Status](https://img.shields.io/badge/Status-Active%20%26%20Production%20Ready-10B981?style=for-the-badge)](http://localhost:8080)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-38BDF8?style=for-the-badge)](https://developer.mozilla.org)
[![Made by](https://img.shields.io/badge/Crafted%20by-PaviqLabs-8B5CF6?style=for-the-badge)](https://github.com/therohanmane/BrownTown)

> **"Where Every Story Has a Voice."**  
> *जिथे प्रत्येक गोष्टीला आवाज मिळतो.* • *जहाँ हर कहानी को आवाज़ मिलती है।*

---

## 📌 About INBrownTown

**INBrownTown** is a modern Indian digital news, grassroots journalism, community media, and digital advertising network based in Maharashtra. We bridge the gap between people's stories, local culture, ground reporting, and digital marketing reach for local businesses and entrepreneurs.

### 📢 Core Business Model & Offerings
* **Done-For-You Digital Advertising**: Tailored social media campaigns and digital reach for shopkeepers, entrepreneurs, and growing brands.
* **Custom Promotional Ad Posters**: High-impact, ready-to-share promotional poster designs crafted for busy business owners.
* **Community & Business Spotlights**: Inspiring grassroots coverage, entrepreneur stories, and local updates.
* ⚠️ **Important Policy**: *INBrownTown does not provide raw video shoot or camera recording services for clients. We focus exclusively on creative digital advertising, promotional posters, and targeted social media marketing reach.*

---

## 📊 Channel Credibility & Milestones

| Metric | Details |
| :--- | :--- |
| **YouTube Community** | **1.8k+ Subscribers** ([@INBrownTown](https://www.youtube.com/@INBrownTown)) |
| **Instagram Reach** | **4.8k+ Followers** ([@inbrowntown](https://www.instagram.com/inbrowntown)) |
| **Total Channel Videos** | **381+ Videos Published** |
| **Ground Interviews** | **200+ Field Interviews & Community Stories** |
| **Industry Experience** | **5+ Years in Digital & Grassroots Media** |
| **Headquarters & Coverage** | Pune HQ • Mumbai • Nashik • Nagpur • Kolhapur • Baramati |

---

## 👩‍💼 Founder Spotlight

### **Ms. Ayesha Sayyad (सुश्री आयेशा सय्यद)**
*Founder, Lead Interviewer & Independent Journalist*

* **Role**: On-camera reporter, grassroots interviewer, and founder of the INBrownTown digital network.
* **Focus**: Documenting real community voices, uncovering local issues, and empowering local merchants with modern digital visibility.
* **Founder Profile**: [@ayesha.sayyad on Instagram](https://www.instagram.com/ayesha.sayyad/)
* **Official Channel**: [@inbrowntown on Instagram](https://www.instagram.com/inbrowntown)

---

## 🌟 Key Platform Features

### 1. 🎬 Cinematic Live Newsroom Hero Animation
* **Real-Time Incrementing REC Timecode**: Live monospace timer (`00:00:54` $\rightarrow$ `00:00:55` ...) with a breathing red tally beacon.
* **Mechanical Camera Lens & Focus System**: Rotating knurled aperture ring (`360°` continuous loop), pulsing optical sensor glass, and a periodic refocus lock cycle featuring tightening corner brackets `[ + ]` and a glowing **`FOCUS LOCKED ✓`** badge.
* **Handheld Reporter Microphone**: High-precision broadcast microphone with custom **`INBT`** mic flag and an active 6-bar LED audio waveform equalizer bouncing in rhythm.
* **Interactive Maharashtra Vector Map**: Vector map contour with flowing telemetry route lines and staggered concentric radar-pings on key reporting hubs:
  - 📍 **Pune HQ** (`0s`)
  - 📍 **Mumbai** (`0.4s`)
  - 📍 **Baramati** (`0.6s`)
  - 📍 **Nashik** (`0.8s`)
  - 📍 **Nagpur** (`1.2s`)
  - 📍 **Kolhapur** (`1.6s`)
* **3D Desktop Mouse Parallax**: Multi-depth coordinate tracking responding smoothly to cursor position.
* **Continuous Marquee News Ticker**: Smooth horizontal auto-scrolling telemetry banner with desktop pause-on-hover.

### 2. 📺 Authentic 30-Video Gallery & Zero-Redirect Modal
* **30 Curated Channel Videos**: Extracted authentic titles, thumbnails, durations, and view counts from `@INBrownTown`.
* **Dynamic Reflow Grid**: 4 cards per row ($\ge 1280\text{px}$), 3 cards ($1024\text{px}$–$1279\text{px}$), 2 cards ($768\text{px}$–$1023\text{px}$), 1 card ($< 768\text{px}$).
* **Fixed 16:9 Aspect Ratio**: Distort-free thumbnail framing with duration badge, category tag, and popular/latest flag.
* **Zero-Redirect Modal Player**: Embedded responsive YouTube player overlay allowing users to watch full videos instantly without leaving the site.
* **Filter & Sort Controls**: Real-time filtering by category and sorting (Popular / Latest / All).

### 3. 🌐 Multilingual Localization Engine (i18n)
* Complete client-side dictionary supporting:
  - 🚩 **मराठी (Marathi)** — Default primary language
  - 🇮🇳 **हिंदी (Hindi)**
  - 🌐 **English**
* Instant, smooth DOM switching without page reload.

### 4. 🎨 Design System & Accessibility
* **Theme Engine**: Seamless toggle between Dark Navy Studio mode and Clean Light Editorial mode with `localStorage` persistence.
* **Mobile Slide-Over Navigation**: Full touch-friendly mobile drawer menu.
* **Touch Target Compliance**: All buttons, pills, toggles, and links meet the minimum $\ge 44 \times 44\text{px}$ standard.
* **Motion Accessibility**: Comprehensive `@media (prefers-reduced-motion: reduce)` support disabling all continuous loops while preserving layout integrity.
* **Zero Cumulative Layout Shift (CLS)**: Strictly constrained CSS Grid and Flexbox layouts prevent jumping content.

---

## 📂 Project Architecture

```
BrownTown/
├── index.html              # Main single-page application structure
├── server.ps1              # Built-in lightweight PowerShell HTTP server
├── README.md               # Complete platform documentation
├── css/
│   ├── main.css            # Core design system, CSS variables, header, mobile drawer & footer
│   ├── components.css      # Button systems, badges, input controls & modal styles
│   └── showcase.css        # Cinematic hero animations, video gallery, and responsive grids
├── js/
│   ├── config.js           # Multilingual localization dictionaries (mr, hi, en) & social links
│   ├── data.js             # Brand statistics, 30 authentic channel videos & founder profile
│   ├── channel.js          # Core rendering engine, modal controller, parallax & timer loops
│   └── app.js              # Theme switcher, scroll progress & application bootstrap
└── assets/
    ├── founder_ayesha_sayyad.jpg  # Authentic portrait photo of Founder Ms. Ayesha Sayyad
    ├── favicon.svg         # INBT vector brand icon
    └── logo.svg            # Official vector logo lockup
```

---

## 🚀 Getting Started Locally

### Option 1: PowerShell Built-in Server (Recommended for Windows)
```powershell
# Run the included PowerShell web server
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Open your browser at [http://localhost:8080](http://localhost:8080).

### Option 2: Python 3 HTTP Server
```bash
python -m http.server 8080
```

### Option 3: Node.js (npx serve)
```bash
npx serve . -p 8080
```

---

## 📱 Breakpoint Grid Specifications

| Breakpoint | Devices | Layout Behavior |
| :--- | :--- | :--- |
| **$\ge 1280\text{px}$** | Large Desktop / Laptop | 2-Column Hero Split, 4-Column Video Grid, 4-Column Stats |
| **$1024\text{px} - 1279\text{px}$** | Small Laptop / Netbook | 2-Column Hero Split, 3-Column Video Grid, Split Founder Card |
| **$768\text{px} - 1023\text{px}$** | Tablets (iPad / Galaxy Tab) | Centered Hero, 2-Column Video Grid, Mobile Drawer Nav |
| **$481\text{px} - 767px$** | Phablets / Large Phones | 2-Column Stats, Swipeable Category Carousels |
| **$320\text{px} - 480px$** | Mobile Phones | 1-Column Video Cards, Full-Width CTAs, 2×2 Stats Grid |

---

## 🔗 Official Links & Socials

* **YouTube Channel**: [https://www.youtube.com/@INBrownTown](https://www.youtube.com/@INBrownTown)
* **Official Instagram**: [https://www.instagram.com/inbrowntown](https://www.instagram.com/inbrowntown)
* **Founder Instagram**: [https://www.instagram.com/ayesha.sayyad/](https://www.instagram.com/ayesha.sayyad/)
* **GitHub Repository**: [https://github.com/therohanmane/BrownTown](https://github.com/therohanmane/BrownTown)

---

## ⚖️ License & Credits

* **Copyright**: © 2026 **INBrownTown Media Network**. All rights reserved.
* **Design & Engineering**: Made with precision by **PaviqLabs**.
