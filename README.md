# Maria Rodriguez — Portfolio 🖥️

![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Google Fonts](https://img.shields.io/badge/Fonts-Google-red) ![Formspree](https://img.shields.io/badge/Forms-Formspree-blueviolet) ![Render](https://img.shields.io/badge/Deploy-Render-46E3B7)

**Maria Rodriguez Portfolio** is a single-page personal portfolio site built entirely in vanilla HTML, CSS, and JavaScript — no frameworks, no build step. It presents four scroll-snapped sections: an **About** hero with a polaroid photo, an **Experience** panel covering skills, education, and a work timeline, a **Projects** carousel with hover-to-play demo videos, and a **Contact** form that submits directly via Formspree.

The design is clean and typographic — a floating pill nav, full-viewport section snapping, and a two-page projects carousel with arrow navigation. Every interactive detail (nav fade on projects, oval text highlights, wavy accent spans, tape-edged polaroid photo) is handled in pure CSS and vanilla JS.

Live Application: https://mariarod.dev

---

https://github.com/user-attachments/assets/d6313315-247c-4da6-9715-f1dfe3cbe06e

---

## Table of Contents
- [Features](#features)
- [Featured Projects](#featured-projects)
- [Languages & Frameworks Used](#languages--frameworks-used)
- [Code Structure](#code-structure)
- [Installation](#installation)
- [Requirements](#requirements)
- [Inspiration](#inspiration)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

**Navigation**
- **Floating pill nav**: Fixed, centered, frosted-glass nav bar with links to all four sections — fades to 20% opacity when scrolling through the Projects section and restores on hover.
- **Section snap scrolling**: Full-viewport CSS scroll-snap ensures each section occupies the full screen height.
- **Skip link**: Accessible skip-to-main-content link for keyboard users.

**Hero (About)**
- **Animated intro**: Name, tagline, and CTA buttons (Resume download, GitHub, LinkedIn, Contact) laid out beside a polaroid-style photo with tape and shadow details.
- **Section arrow**: Animated scroll indicator leading to the next section.

**Experience**
- **Skills grid**: Languages, Frameworks, Databases, and Cloud & DevOps listed in styled groups — Python, Java, JavaScript, TypeScript, SQL, React, Next.js, Node.js, Django, Spring Boot, TensorFlow, Docker, AWS, and more.
- **Education card**: Florida International University — B.A. Computer Science, Certificate in Cybersecurity Intelligence & Information Policy, GPA 3.72 Magna Cum Laude.
- **Work timeline**: Vertical timeline with role, company, dates, and bullet points for each position.

**Projects Carousel**
- **Two-page carousel**: Arrow-navigated carousel showing 10 projects across two pages — page one in a 3-column grid, page two in a 2-column grid.
- **Hover-to-play video previews**: Each card shows a static preview image at rest; hovering swaps in an autoplay looping demo video.
- **Project cards**: Each card shows project name, one-line description, and action buttons (Repo / Live Demo).
- **Smooth slide transition**: CSS `transform` + `transition` slide between pages with active-dot indicators.

**Contact**
- **Multi-step form**: Step 1 collects the message in a textarea; Step 2 asks for an email; Step 3 shows a confirmation — no page reload.
- **Formspree backend**: Submissions POST to Formspree; no server required.
- **Alternate links**: Resume download, GitHub, and LinkedIn links in the contact section footer.

**UI & Polish**
- **Custom typography**: Hanken Grotesk body text, Fraunces display headings, Caveat accent font, Great Vibes for signature elements, Palisade custom font for decorative use.
- **Oval text highlights**: CSS `::before` pseudo-element draws a hand-drawn oval around key words.
- **Wavy underline accent**: Decorative wavy `text-decoration` on headline emphasis spans.
- **Polaroid photo**: CSS tape strips, box-shadow, and slight rotation on the hero photo.
- **Responsive layout**: Clamp-based font sizing and flexible grids adapt from mobile to desktop.
- **Smooth scroll**: `scroll-behavior: smooth` and `IntersectionObserver`-driven nav highlighting.

---

## Featured Projects

Projects showcased in the portfolio carousel:

| Project | Stack | Description |
|---------|-------|-------------|
| [JETSET: Franchise Intelligence Dashboard](https://github.com/mariarodr1136/JETSET-Franchise-Intelligence) | Next.js · TypeScript · Tailwind · Prisma · SQLite · Recharts · Gemini AI · SSE | Full-stack internal analytics platform — SSE live alerts, interactive US map, sigmoid churn model (AUC 0.841), Gemini AI briefs, ⌘K FTS5 search, Kanban pipeline |
| [Atmosphere: Real-Time AQI Monitor](https://github.com/mariarodr1136/AtmosphereAnalyzer) | Python · Django Channels · React · Redis · Docker · WebSockets | Live weather and AQI dashboard over WebSockets with z-score anomaly detection, Leaflet sensor map, activity heatmap, and CSV/PDF export |
| [LeafMedic: Plant Disease Classifier](https://github.com/mariarodr1136/LeafMedic) | Python · TensorFlow · OpenCV · PyQt6 · Raspberry Pi | Edge AI system deploying TensorFlow Lite MobileNetV1 on Raspberry Pi — 90%+ accuracy across 16 disease classes |
| [Nexus: Supply Chain Visualizer](https://github.com/mariarodr1136/SupplyChainVisualizer) | Java · Spring Boot · React · PostgreSQL · Docker | Full-stack logistics dashboard with 20+ REST endpoints, JWT auth, Dockerized deployment, Leaflet maps, and Chart.js visualizations |
| [GenAI: Voice-Driven Mock Interviewer](https://github.com/mariarodr1136/GenAI-Technical-Interviewer) | React · Vite · Node.js · Groq API · Web Speech API · MediaRecorder | Voice-to-AI interview pipeline: Groq Whisper transcription → Llama 3 adaptive questions → browser TTS playback, with AI-generated debrief |
| [VestLab: Micro-Investment Platform](https://github.com/mariarodr1136/MicroInvestmentPlatform) | React · Node.js · Express · MongoDB · Alpha Vantage API | MERN trading simulator with JWT auth, real-time stock data, Chart.js P&L tracking, and a competitive leaderboard |
| [FraudWatch: Credit Card Fraud Detector](https://github.com/mariarodr1136/FraudDetectionSystem) | Python · Flask · scikit-learn · Plotly | Random Forest fraud detection pipeline (99.95% accuracy, 83.91% F1) with an interactive Plotly dashboard |
| [Retro-Folio: Windows 95-Style Portfolio](https://github.com/mariarodr1136/Retro-Folio) | HTML · CSS · JavaScript · Node.js · Express · WebAssembly | Retro portfolio styled as a Windows 95 desktop — draggable windows, taskbar, Start menu, Clippy assistant, Minesweeper, Space Cadet Pinball (WASM), and Solitaire |
| [Operation Roomba: Stealth Cleaning Game](https://github.com/mariarodr1136/OperationRoomba) | HTML5 Canvas · JavaScript · Web Audio API | Top-down stealth game — five procedurally generated rooms, noise meter, battery, combo multiplier, and fully synthesized audio |
| [Raspberry Pi Lab: Hardware Experiments](https://github.com/mariarodr1136/RaspberryPiLab) | Python · Raspberry Pi · GPIO | Hardware interfacing experiments: PIR motion detection, RFID access control, ultrasonic distance sensing, and LCD display |

---

## Languages & Frameworks Used

### Frontend
- **HTML5**: Single-page document structure with semantic sectioning and accessible landmark roles
- **CSS3**: Custom properties, CSS Grid, Flexbox, scroll-snap, backdrop-filter, clamp-based responsive sizing, and `@keyframes` animations — no external CSS framework
- **JavaScript (ES6+)**: Carousel logic, multi-step form, `IntersectionObserver`-based nav highlighting, scroll sync, and video hover swap

### Fonts
- **Hanken Grotesk**: Body and UI text
- **Fraunces**: Display headings
- **Caveat**: Handwritten accent text
- **Great Vibes**: Signature-style decorative text
- **Palisade** (local): Custom display font

### Forms
- **Formspree**: Handles contact form submissions — no backend required

### Deployment
- **Render**: Static site, no build step

### Version Control
- **Git / GitHub**: Source hosting

---

## Code Structure

```
Portfolio/
├── index.html        # Entire site — styles, markup, and JavaScript in one file
├── Palisade.otf      # Custom display font
├── photo.jpg         # Hero photo
├── resume.pdf        # Downloadable resume
└── media/
    ├── envelope.png
    ├── laptop.png
    ├── laptop-white.png
    ├── phone.png
    ├── star.png
    ├── atmosphere/   preview.png + preview.mp4
    ├── fraudwatch/   preview.png + preview.mp4
    ├── genai/        preview.png + preview.mp4
    ├── jetset/       preview.png + preview.mp4
    ├── leafmedic/    preview.png + preview.mp4
    ├── microinvestment/ preview.png + preview.mp4
    ├── nexus/        preview.png + preview.mp4
    ├── operationroomba/ preview.png + Roomba.mp4
    ├── raspberrypilab/  preview.png + preview.mp4
    └── retrofolio/   preview.png + preview.mp4
```

Key sections inside `index.html`:
- **`<style>`** — all CSS including variables, nav, hero, experience, carousel, contact, and utility classes
- **`#who`** — hero section with photo, name, tagline, and CTA buttons
- **`#do`** — skills grid and education card
- **`#work`** — work experience timeline
- **`#made`** — two-page project carousel with hover video logic
- **`#contact`** — three-state contact form wired to Formspree
- **`<script>`** — carousel navigation, scroll-snap sync, `IntersectionObserver` nav highlighting, form state machine, video hover swap

---

## Installation

### 1. Clone
```bash
git clone https://github.com/mariarodr1136/Portfolio.git
cd Portfolio
```

### 2. Open the site
```bash
open index.html
```
Or serve it locally with any static server:
```bash
python3 -m http.server 3000
```
Visit: http://localhost:3000

## Requirements
- Any modern browser (Chrome, Firefox, Safari, Edge)
- No Node.js, no build tools, no dependencies

---

## Inspiration

This portfolio is designed around the idea that simplicity and restraint are a skill — that a clean, well-paced single page can communicate more than a feature-heavy one. The typographic choices (editorial serif headings, neutral grotesque body text, handwritten accents) create a visual hierarchy that guides the reader through who I am, what I've built, and how to reach me. The scroll-snapping layout draws from full-screen editorial design: each section gets your full attention before you move on. The projects carousel with hover-to-play video previews was an intentional choice to let the work speak for itself without requiring a click or a new tab.

---

## Contributing

Contributions welcome — layout improvements, accessibility fixes, or new project cards.

1. Fork the repo
2. Create a branch:
   ```bash
   git checkout -b feat/my-feature
   # or
   git checkout -b fix/issue-###
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add <short description>"
   ```
4. Push and open a pull request with context or screenshots for any visual changes.

## Contact
If you have any questions or feedback, feel free to reach out at [mrodr.contact@gmail.com](mailto:mrodr.contact@gmail.com).
