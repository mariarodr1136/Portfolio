# Maria Rodriguez Portfolio 💻

![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Node.js](https://img.shields.io/badge/Runtime-Node.js-green) ![Express](https://img.shields.io/badge/Backend-Express-lightgrey) ![WebAssembly](https://img.shields.io/badge/Tech-WebAssembly-654ff0) ![Render](https://img.shields.io/badge/Deploy-Render-46E3B7)

Welcome to my **Portfolio** — an interactive site styled like a vintage **computer desktop**. Drag icons to open apps, use the **Start menu** to launch windows, and watch them appear as **taskbar tabs** at the bottom — just like a real OS. Inside the desktop you'll find my **software development projects**, an **about me** section, a **contact link**, a fun **minigame** section, and quick links to my **resume**, **LinkedIn**, and **GitHub**.

 The interactive design was built using modern web technologies, including **HTML**, **CSS**, and **JavaScript**, and offers visitors a hands-on experience where they can explore my work and learn more about my technical skills and background. My goal with this project was to create an engaging and memorable user interface while demonstrating my abilities as a developer.

Feel free to click around, move things, and explore. Each icon and tab reveals something new, so your journey through my portfolio is just as interactive as the projects it contains.

Live Application: https://maria-portfolio-envz.onrender.com

---

https://github.com/user-attachments/assets/e4c59ba2-cedf-4007-9779-b3876d255786

---

## Table of Contents
- [Features](#features)
- [Featured Engineering Projects](#featured-engineering-projects)
- [Languages & Frameworks Used](#languages--frameworks-used)
- [Code Structure](#code-structure)
- [Installation](#installation)
- [Requirements](#requirements)
- [Inspiration](#inspiration)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features
- **Retro Desktop Interface**: Windowed modal system evokes classic OS aesthetics (title bars, close buttons, draggable windows).
- **Start Menu**: Click the Start button to launch any window from a classic dropdown menu.
- **Taskbar Window Tabs**: Each open window gets a grey tab in the bottom taskbar showing its name — click to bring the window to front, just like a real OS.
- **Custom Pointer & Interaction Feedback**: The pointer changes contextually (e.g., clickable vs idle) for a tactile feel.
- **Draggable Icons & Free Positioning**: Icons can be rearranged anywhere on the desktop by dragging.
- **Trash System**: Drag icons to the Trash to remove them from the desktop; drag them back out to restore.
- **Terminal Typing Animation**: A terminal window auto-types a code snippet with realistic typos and corrections on page load.
- **Interactive Clippy Assistant**: A vintage Microsoft Office Assistant (Clippy) loaded dynamically. Click him to toggle a control panel, ask questions, or trigger quick desktop navigation shortcuts (Resume, Projects, Contact, Games).
- **Reciprocal Dragging & Modal Coupling**: Dragging the Clippy agent moves his control panel, and dragging the panel title bar moves Clippy in sync. Both elements are coupled to the Terminal Modal—they follow it during drags and viewport scaling, preserving custom offsets if relocated by the user.
- **Dynamic Modals**: Content windows for Settings, Projects, Resume (PDF / PNG), Social links (GitHub, LinkedIn), Contact, and Games hub.
- **Responsive Modal Scaling**: All windows scale automatically to fit the viewport, from mobile to ultrawide.
- **Mobile Responsive Layout**: Full mobile breakpoint (≤768px) reflows the icon column into a horizontal scrollable dock, caps all modals to screen width, restores native touch behavior, and disables drag interactions on small screens.
- **Minesweeper Game**: Playable, keyboard & mouse friendly; adapted from [Jon Ziebell's repository](https://github.com/ziebelje/minesweeper) with UI and accessibility adjustments.
- **Space Cadet Pinball (WebAssembly)**: Fully playable port compiled from original reverse-engineered C++ sources. Audio (effects + music) enabled via SDL_mixer + TSF Synth.
- **Solitaire**: Classic card game built with vanilla JS and bundled with Vite.
- **On-Demand Game Lifecycle**: Pinball and Solitaire iframes are dynamically reloaded / torn down; audio stops cleanly when modals close.
- **Performance Conscious**: Only one heavy WASM game; lazy iframe loading prevents blocking initial content.
- **Cross-Platform**: Runs in any modern WASM-capable browser (Chrome, Firefox, Safari, Edge, Mobile Chromium variants).

---

## Featured Engineering Projects

Projects showcased inside the portfolio's Projects window:

| Project | Stack | Description |
|---------|-------|-------------|
| [Atmosphere Analyzer](https://github.com/mariarodr1136/AtmosphereAnalyzer) | Python · React · Django · WebSockets | Real-time weather & AQI dashboard streaming live data via Django Channels WebSockets; EPA AQI conversion, Leaflet maps, rolling time-series charts, and compare-cities mode |
| [Leaf-Medic](https://github.com/mariarodr1136/LeafMedic) | Python · TensorFlow · OpenCV · PyQt6 · Raspberry Pi | Edge AI system deploying TensorFlow Lite MobileNetV1 on Raspberry Pi for plant disease classification — 90%+ accuracy across 16 disease classes, 43-disease treatment database |
| [Micro-Investment Platform](https://github.com/mariarodr1136/MicroInvestmentPlatform) | React · Node.js · Express · MongoDB | MERN trading simulator with JWT + bcrypt auth, real-time stock data via Alpha Vantage (server-side cached), Chart.js P&L tracking, and a competitive leaderboard |
| [Supply Chain Visualizer](https://github.com/mariarodr1136/SupplyChainVisualizer) | Java · Spring Boot · React · PostgreSQL · Docker | Logistics dashboard with 20+ REST endpoints, Spring Security JWT stateless auth, Dockerized multi-stage backend deployed via Render Blueprint IaC |
| [GenAI Technical Interviewer](https://github.com/mariarodr1136/GenAI-Technical-Interviewer) | React · Node.js · Express · Groq API · Web Speech API | Voice-driven interview simulator: Groq Whisper v3 transcription → Llama 3 adaptive question generation → browser TTS playback |
| [FraudWatch](https://github.com/mariarodr1136/FraudDetectionSystem) | Python · Flask · Pandas · scikit-learn · Plotly | Credit card fraud detection pipeline with Random Forest classifier, StandardScaler preprocessing, and Plotly dashboard for confusion matrices, ROC curves, and real-time scoring |
| [Raspberry Pi Lab](https://github.com/mariarodr1136/RaspberryPiLab) | Python · Raspberry Pi · GPIO | Hardware interfacing experiments: PIR motion detection, RFID access control, ultrasonic distance sensing, and LCD display — each independently wired and programmed |

---

## Languages & Frameworks Used
### Frontend
- **HTML / CSS / JavaScript (ES6+)**: Core structure, presentation, and client-side interactivity
- **Custom Desktop UI**: Windowed modal system (drag, z-index stacking, custom cursor, taskbar tabs) built from scratch
- **Responsive Scaling**: Modals scale dynamically to fit any viewport size
- **Accessibility Considerations**: Semantic elements and ARIA roles in interactive components (e.g., Minesweeper grid, taskbar, Start menu)

### Backend / Infrastructure
- **Node.js + Express**: Lightweight static file server for local development
- **body-parser / CORS**: Request middleware

### Deployment
- **Render**: Static site deployed via `render.yaml` blueprint, serving the `docs/` directory — no build step required
- **Solitaire bundle**: Vite build writes directly into `docs/games/solitaire/` so the iframe at `docs/games/solitaire/index.html` loads correctly on the static host

### Version Control & Build Utilities
- **Git / GitHub**: Source hosting & issue tracking
- **CMake**: Build system for the C++ game portion

> If you're only interested in the web portfolio, you can ignore the `spacecadet/` source tree — the built artifacts already live under `docs/games/pinball/`.

### Games & Interactive Components
- **Minesweeper (vanilla JS adaptation)**: Logic port with enhancements & styling
- **Space Cadet Pinball (WASM)**: C++ codebase compiled to WebAssembly via Emscripten; uses SDL2, SDL2_mixer for audio, TinySoundFont (TSF) for MIDI playback, and Dear ImGui for in-game UI overlays
- **Solitaire (vanilla JS + Vite)**: Original JS/SCSS game bundled with Vite. Built assets are emitted to `docs/games/solitaire` and loaded via an iframe in the "Solitaire" modal. Uses:
   - JavaScript (ES modules)
   - SCSS (compiled via `sass`)
   - Vite (base set to `./` so all asset paths are relative inside the iframe)
   - All sprites inlined as base64 (no external asset hosting needed)

### Toolchain / Low-Level
- **WebAssembly (WASM)**: Performance-critical C++ game code running in the browser
- **Emscripten**: Compiles original C++ sources to `.wasm`, generates JS glue & preloads assets (PINBALL.DAT, sound effects)
- **SDL2 / SDL2_mixer**: Input, rendering surface, and audio mixing
- **TinySoundFont (TSF)**: Synth-based MIDI music fallback (selected build path)
- **ImGui**: Immediate mode UI library (debug / internal overlay elements in the C++ game code)

---

## Inspiration 
The design of this portfolio website is inspired by an old computer desktop screen, creating a nostalgic and playful experience that invites users to interact with the content. Icons function as applications that can be dragged, opened, and closed, while familiar elements like the taskbar, Start menu, and window tabs recreate the feel of a classic operating system. This approach provides a unique and engaging user interface that allows visitors to explore my work in an interactive, hands-on way rather than through a traditional static layout.

<img width="1468" height="833" alt="Screenshot 2025-08-11 at 1 08 24 PM" src="https://github.com/user-attachments/assets/be8cc3b4-e534-4082-b681-38050bf6bf4f" />
<img width="1462" height="827" alt="Screenshot 2025-08-11 at 1 09 21 PM" src="https://github.com/user-attachments/assets/00a2ea11-4e9c-404e-b846-14289b04fd9d" />

---

## Code Structure
```
root/
├── docs/                      # GitHub Pages root (served site)
│   ├── index.html             # Main desktop UI
│   ├── styles.css             # Portfolio styling
│   ├── script.js              # Desktop/window/taskbar/game logic
│   ├── static/                # Images, fonts, and other assets
│   │   └── clippy-ai/         # Clippy agent libraries, assets, and custom logic
│   ├── games/pinball/         # Deployed WASM build (html/js/wasm/data)
│   └── games/solitaire/       # Deployed Solitaire bundle (Vite output)
├── spacecadet/                # C++ source + CMake for Space Cadet Pinball
│   ├── CMakeLists.txt
│   └── SpaceCadetPinball/     # Game source (SDL2, ImGui, audio, assets preload)
├── games/
│   └── solitaire-vite/        # Vite project used to build the Solitaire bundle
├── server.js                  # Express static file server (local dev)
├── render.yaml                # Render Blueprint — static site config (serves docs/)
├── package.json               # Node dependencies
├── procfile                   # Optional platform process declaration
└── README.md
```
Key files:
- `docs/static/clippy-ai/portfolio-clippy.js`: Custom controller logic coupling Clippy to the terminal modal, managing z-indices, and handling reciprocal dual-dragging.
- `docs/games/pinball/SpaceCadetPinball.html|js|wasm|data`: Runtime artifacts produced by Emscripten build.
- `docs/games/solitaire/index.html` (+ assets): Static Vite build for Solitaire used by the iframe in the "Solitaire" modal.
- `spacecadet/game_resources/`: Original DAT + WAV assets used at build time (preloaded into virtual FS).
- `server.js`: Simple Express static server that serves the `docs/` directory for local development.

---

## Installation
### 1. Clone
```bash
git clone https://github.com/mariarodr1136/Portfolio.git
cd Portfolio
```

### 2. Install Node dependencies
Uses `package.json` (no need to manually install each library):
```bash
npm install
```

### 3. Run locally
```bash
node server.js
# or with nodemon if installed: npx nodemon server.js
```
Visit: http://localhost:3000/

### 3.1 (Optional) Build the Solitaire game
Rebuild only when you change files under `games/solitaire-vite/`.
```bash
# From repo root
npm run build:solitaire

# Dev server for Solitaire (standalone, hot reload)
npm run dev:solitaire
```
The build writes to `docs/games/solitaire/` which the desktop iframe loads.

### 4. (Optional) Build Space Cadet Pinball from source
You only need this if you want to modify the C++ game.
Requirements: Emscripten SDK (`emsdk`), CMake ≥ 3.16.
```bash
# Activate emsdk environment (example path)
source ~/emsdk/emsdk_env.sh
cd spacecadet
mkdir -p build-web && cd build-web
emcmake cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . -j
cp bin/SpaceCadetPinball.* ../../docs/games/pinball/
```
Hard refresh the site to load the new build.

## Requirements
- Modern browser with WebAssembly support (all evergreen browsers)
- Node.js 18+ (for local development server)
- (Optional) Emscripten + CMake if rebuilding the Pinball game
- Basic web dev knowledge if extending UI

---

<img width="1460" alt="Screenshot 2024-10-22 at 9 02 15 PM" src="https://github.com/user-attachments/assets/b7146a87-27c8-4a74-acce-babf094f21bf">

<img width="1461" alt="Screenshot 2024-11-01 at 11 12 16 AM" src="https://github.com/user-attachments/assets/800784d2-1bfa-416f-a935-c25b3b658b25">

---

## Contributing
Contributions welcome—UI polish, performance tweaks, accessibility improvements, or additional retro mini-apps.

1. Fork the repo
2. Create a branch:
   ```bash
   git checkout -b feat/my-feature
   # or
   git checkout -b fix/issue-###
   ```
3. Make changes (for C++ WASM builds, also rebuild & copy updated artifacts)
4. Commit:
   ```bash
   git commit -m "feat: add <short description>"
   ```
5. Push & open a Pull Request with context / screenshots if UI related

> Tip: If modifying the Pinball C++ sources, keep PRs focused (avoid mixing frontend & game engine changes unless necessary).

## Contact
If you have any questions or feedback, feel free to reach out at [mrodr.contact@gmail.com](mailto:mrodr.contact@gmail.com).
