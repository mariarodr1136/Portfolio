# Maria Rodriguez — Portfolio 🖥️

![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Google Fonts](https://img.shields.io/badge/Fonts-Google-red) ![Formspree](https://img.shields.io/badge/Forms-Formspree-blueviolet) ![Render](https://img.shields.io/badge/Deploy-Render-46E3B7)

**Maria Rodriguez Portfolio** is a single-page personal portfolio site built entirely in vanilla HTML, CSS, and JavaScript — no frameworks, no build step. It presents five scroll-snapped sections: an **About** hero with a polaroid photo, a **Skills & Education** panel, a **Work** timeline, a **Projects** grid with hover-to-play demo videos, and a **Contact** form that submits directly via Formspree.

The design is clean and typographic — a floating pill nav, full-viewport section snapping, and a six-card projects grid. Every interactive detail (nav fade on projects, oval text highlights, wavy accent spans, tape-edged polaroid photo) is handled in pure CSS and vanilla JS.

Live Application: https://mariarod.dev

---

https://github.com/user-attachments/assets/b13fc373-d305-4129-a54e-40c378fc61f9

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

**Projects Grid**
- **Six-card grid**: Three large cards in a top row (`.projects-featured-col`) and three in a smaller row beneath (`.projects-small-grid`), followed by a "More on GitHub" link.
- **Hover-to-play video previews**: Each card shows a static preview image at rest; hovering swaps in an autoplay looping demo video.
- **Project cards**: Each card shows project name, tech tags, a one-line description, and action buttons (Repo / Live Demo).
- **Click-through cards**: Each card carries a `data-href` attribute — clicking anywhere on it opens the live demo. The same attribute keys the per-project CSS that tunes image cropping, so it must stay in sync with the Live Demo link.

**Contact**
- **Multi-step form**: Step 1 collects the message in a textarea; Step 2 asks for an email; Step 3 shows a confirmation — no page reload.
- **Formspree backend**: Submissions POST to Formspree; no server required.
- **Alternate links**: Resume download, GitHub, and LinkedIn links in the contact section footer.

**UI & Polish**
- **Custom typography**: Hanken Grotesk body text, Fraunces display headings, Caveat accent font, Great Vibes for signature elements, Palisade custom font for decorative use.
- **Oval text highlights**: CSS `::before` pseudo-element draws a hand-drawn oval around key words.
- **Wavy underline accent**: Decorative wavy `text-decoration` on headline emphasis spans.
- **Polaroid photo**: CSS tape strips, box-shadow, and slight rotation on the hero photo.
- **Responsive layout**: Clamp-based font sizing and flexible grids adapt from mobile to desktop. On viewports ≤ 600px: hero text and buttons are centered, CTA buttons collapse into a 2×2 grid, the projects grid converts to a vertically stacked list, section snap-scrolling is disabled so long sections scroll freely, and overflow-causing styles (`white-space: nowrap`, absolute-positioned decorations) are reset.
- **Smooth scroll**: `scroll-behavior: smooth` and `IntersectionObserver`-driven nav highlighting.

---

## Featured Projects

The six projects currently showcased in the portfolio grid:

| Project | Stack | Description |
|---------|-------|-------------|
| [LeafMedic: Edge AI Plant Disease Detection System](https://github.com/mariarodr1136/LeafMedic) | Raspberry Pi · TensorFlow Lite · ONNX Runtime Web · OpenCV | Quantized MobileNet diagnosing 16 crop conditions on-device — the model runs in the browser, so photos never leave the user's machine |
| [Nexus: Full-Stack Supply Chain Visualizer](https://github.com/mariarodr1136/SupplyChainVisualizer) | Spring Boot · React · PostgreSQL · JWT Auth · Docker | Full-stack supply chain platform with 40+ REST endpoints, JWT auth, Dockerized deployment, and Leaflet/Chart.js visualizations |
| [Clay: Generative UI for Project Data](https://github.com/mariarodr1136/Clay) | Next.js 16 · Claude API · tRPC · Drizzle/Postgres · Clerk | A Claude agent that builds versioned, interactive dashboards from plain-English descriptions |
| [JETSET: Franchise Retention Intelligence](https://meridian-retention-intelligence.vercel.app/) | Next.js · Gemini 2.5 Flash · SSE · Prisma/SQLite · FTS5 Search | 20+ page ops platform — SSE live alerts, interactive US map, churn modeling, streaming Gemini briefs, and ⌘K FTS5 search |
| [GenAI: Voice AI Mock Interviewer](https://github.com/mariarodr1136/GenAI-Technical-Interviewer) | Groq · Whisper Large v3 · Qwen3.6-27B · React · Node/Express | Voice-to-AI interview pipeline: Whisper transcription → adaptive Qwen questions → browser TTS playback, with an AI-generated debrief |
| [Atmosphere-Analyzer: Real-Time AQI Monitor](https://github.com/mariarodr1136/AtmosphereAnalyzer) | Django Channels · Redis · WebSockets · Z-Score Detection | Live weather and AQI dashboard over WebSockets with z-score anomaly detection, Leaflet sensor map, and CSV/PDF export |

---

## Languages & Frameworks Used

### Frontend
- **HTML5**: Single-page document structure with semantic sectioning and accessible landmark roles
- **CSS3**: Custom properties, CSS Grid, Flexbox, scroll-snap, backdrop-filter, clamp-based responsive sizing, and `@keyframes` animations — no external CSS framework
- **JavaScript (ES6+)**: Multi-step form, `IntersectionObserver`-based nav highlighting, scroll sync, project card click-through, and video hover swap

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
├── Maria Rodriguez - Online Resume.pdf   # Downloadable resume
└── media/
    ├── icons/        arrow.png, chart.png, envelope.png, laptop.png, star.png
    ├── atmosphere/   preview.webp + preview.jpg + preview.mp4
    ├── clay/         preview.webp + preview.jpg + preview.mp4
    ├── genai/        preview.webp + preview.jpg + preview.mp4
    ├── leafmedic/    preview.webp + preview.jpg + preview.mp4
    ├── jetset/       preview.webp + preview.jpg + preview.mp4
    └── nexus/        preview.webp + preview.jpg + preview.mp4
```

Each project folder holds a `preview.webp` poster (1400px wide, q82) with a `preview.jpg` fallback for browsers without WebP, plus a `preview.mp4` shown on hover. Posters are served via `<picture>`; videos carry `preload="none"` so they are fetched only on hover. Videos are encoded 1280px-wide, H.264 CRF 30 with `+faststart`, audio stripped.

Key sections inside `index.html`:
- **`<style>`** — all CSS including variables, nav, hero, experience, projects grid, contact, and utility classes
- **`#who`** — hero section with photo, name, tagline, and CTA buttons
- **`#do`** — skills grid and education card
- **`#work`** — work experience timeline
- **`#made`** — six-card project grid with hover video logic
- **`#contact`** — three-state contact form wired to Formspree
- **`<script>`** — scroll-snap sync, `IntersectionObserver` nav highlighting, form state machine, card click-through, video hover swap

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

> **Note:** `python3 -m http.server` does not implement HTTP Range requests, which browsers require for `<video>`. The page loads fine, but the hover-to-play previews will not start. Use a Range-capable server (e.g. `npx serve`) to test them.

## Requirements
- Any modern browser (Chrome, Firefox, Safari, Edge)
- No Node.js, no build tools, no dependencies

---

## Inspiration

This portfolio is designed around the idea that simplicity and restraint are a skill — that a clean, well-paced single page can communicate more than a feature-heavy one. The typographic choices (editorial serif headings, neutral grotesque body text, handwritten accents) create a visual hierarchy that guides the reader through who I am, what I've built, and how to reach me. The scroll-snapping layout draws from full-screen editorial design: each section gets your full attention before you move on. The projects grid with hover-to-play video previews was an intentional choice to let the work speak for itself without requiring a click or a new tab.

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
