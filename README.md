# Maria Rodriguez Portfolio 💻

![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Node.js](https://img.shields.io/badge/Runtime-Node.js-green) ![Express](https://img.shields.io/badge/Backend-Express-lightgrey) ![Nodemailer](https://img.shields.io/badge/Email-Nodemailer-red) ![dotenv](https://img.shields.io/badge/Config-dotenv-success) ![body-parser](https://img.shields.io/badge/Middleware-body--parser-purple) ![WebAssembly](https://img.shields.io/badge/Tech-WebAssembly-654ff0) ![Emscripten](https://img.shields.io/badge/Toolchain-Emscripten-302f8e) ![SDL2](https://img.shields.io/badge/Library-SDL2-0d72b9) ![SDL_mixer](https://img.shields.io/badge/Audio-SDL__mixer-bd3d3a) ![ImGui](https://img.shields.io/badge/UI-ImGui-1b6ac6) ![TinySoundFont](https://img.shields.io/badge/MIDI-TinySoundFont-6a4) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-171515)

## Overview
Welcome to my **Portfolio** — an interactive site styled like a vintage **computer desktop**. Drag icons to open apps and tabs for a nostalgic, hands-on experience. Inside the desktop you'll find my **software development projects**, an **about me** section, a **contact form**, a fun **minigame** section, and quick links to my **resume**, **LinkedIn**, and **GitHub**.
 
 The interactive design was built using modern web technologies, including **HTML**, **CSS**, and **JavaScript**, and offers visitors a hands-on experience where they can explore my work and learn more about my technical skills and background. My goal with this project was to create an engaging and memorable user interface while demonstrating my abilities as a developer.
 
Feel free to click around, move things, and explore. Each icon and tab reveals something new, so your journey through my portfolio is just as interactive as the projects it contains. 

Live Application: [mariarodr1136.github.io/Portfolio/](https://mariarodr1136.github.io/Portfolio/)

---

https://github.com/user-attachments/assets/e4c59ba2-cedf-4007-9779-b3876d255786

---

## Table of Contents
- [Overview](#overview)
- [Languages & Frameworks Used](#languages--frameworks-used)
- [Purpose](#purpose)
- [Features](#features)
- [Code Structure](#code-structure)
- [Installation](#installation)
- [Requirements](#requirements)
- [Inspiration](#inspiration)
- [Contributing](#contributing)
- [Contact](#contact)

## Languages & Frameworks Used
### Frontend
- **HTML / CSS / JavaScript (ES6+)**: Core structure, presentation, and client‑side interactivity
- **Custom Desktop UI**: Windowed modal system (drag, z-index stacking, custom cursor) built from scratch
- **Accessibility Considerations**: Semantic elements and ARIA roles in interactive components (e.g., Minesweeper grid)

### Games & Interactive Components
- **Minesweeper (vanilla JS adaptation)**: Logic port with enhancements & styling
- **Space Cadet Pinball (WASM)**: C++ codebase compiled to WebAssembly via Emscripten; uses SDL2, SDL2_mixer for audio, TinySoundFont (TSF) for MIDI playback, and Dear ImGui for in‑game UI overlays
- **Solitaire (vanilla JS + Vite)**: Original JS/SCSS game bundled with Vite. Built assets are emitted to `docs/games/solitaire` and loaded via an iframe in the “Solitaire” modal. Uses:
   - JavaScript (ES modules)
   - SCSS (compiled via `sass`)
   - Vite (base set to `./` so all asset paths are relative inside the iframe)
   - All sprites inlined as base64 (no external asset hosting needed)

### Toolchain / Low‑Level
- **WebAssembly (WASM)**: Performance‑critical C++ game code running in the browser
- **Emscripten**: Compiles original C++ sources to `.wasm`, generates JS glue & preloads assets (PINBALL.DAT, sound effects)
- **SDL2 / SDL2_mixer**: Input, rendering surface, and audio mixing
- **TinySoundFont (TSF)**: Synth-based MIDI music fallback (selected build path)
- **ImGui**: Immediate mode UI library (debug / internal overlay elements in the C++ game code)

### Backend / Infrastructure
- **Node.js + Express**: Lightweight server for local development & handling contact form POST submissions
- **Nodemailer**: Email transport for the contact form
- **dotenv**: Environment variable management
- **body-parser**: Request body parsing (now built-in to Express >=4.16—kept for clarity)

### Deployment
- **GitHub Pages**: Static hosting of the portfolio (including built WASM artifacts)
- **Procfile (optional)**: Enables easy deployment to platforms like Render / Railway / Heroku for the email service if needed
- **Solitaire bundle**: Vite build writes directly into `docs/games/solitaire` so the iframe at `games/solitaire/index.html` works on static hosts

### Version Control & Build Utilities
- **Git / GitHub**: Source hosting & issue tracking
- **CMake**: Build system for the C++ game portion

> If you're only interested in the web portfolio, you can ignore the `spacecadet/` source tree — the built artifacts already live under `docs/games/pinball/`.

## Purpose
The purpose of this portfolio website is to:
- Provide a unique and engaging user interface that mimics an old computer desktop environment.
- Allow visitors to interact with my portfolio by opening and closing tabs, dragging icons, and exploring my work.

## Live Demo
<p align="center">
  <a href="https://mariarodr1136.github.io/Portfolio/" target="_blank">Live Demo Link</a>
</p>

<img width="1460" alt="Screenshot 2024-10-22 at 9 02 15 PM" src="https://github.com/user-attachments/assets/b7146a87-27c8-4a74-acce-babf094f21bf">

<img width="1461" alt="Screenshot 2024-11-01 at 11 12 16 AM" src="https://github.com/user-attachments/assets/800784d2-1bfa-416f-a935-c25b3b658b25">


## Features
- **Retro Desktop Interface**: Windowed modal system evokes classic OS aesthetics (title bars, close buttons, draggable windows).
- **Custom Pointer & Interaction Feedback**: The pointer changes contextually (e.g., clickable vs idle) for a tactile feel.
- **Draggable Icons & State Preservation**: Icons can be rearranged to personalize layout per session (simple DOM state managed in JS).
- **Dynamic Modals**: Modular content windows for About, Projects, Resume (PDF / PNG), Social links, Contact form, and Games hub.
- **Minesweeper Game**: Playable, keyboard & mouse friendly; adapted from [Jon Ziebell’s repository](https://github.com/ziebelje/minesweeper) with UI and accessibility adjustments.
- **Space Cadet Pinball (WebAssembly)**: Fully playable port compiled from original reverse‑engineered C++ sources. Audio (effects + music) enabled via SDL_mixer + TSF Synth.
- **On‑Demand Game Lifecycle**: Pinball iframe is dynamically reloaded / torn down; music stops cleanly when modal closes.
- **Contact Form Integration**: Submits through Express backend + Nodemailer (optional when served statically you can disable or point to a server endpoint).
- **Performance Conscious**: Only one heavy WASM game; lazy iframe loading prevents blocking initial content.
- **Cross‑Platform**: Runs in any modern WASM‑capable browser (Chrome, Firefox, Safari, Edge, Mobile Chromium variants).

## Code Structure
```
root/
├── docs/                      # GitHub Pages root (served site)
│   ├── index.html             # Main desktop UI
│   ├── styles.css             # Portfolio styling
│   ├── script.js              # Desktop/window/game modal logic
│   ├── games/pinball/         # Deployed WASM build (html/js/wasm/data)
│   └── games/solitaire/       # Deployed Solitaire bundle (Vite output)
├── spacecadet/                # C++ source + CMake for Space Cadet Pinball
│   ├── CMakeLists.txt
│   └── SpaceCadetPinball/     # Game source (SDL2, ImGui, audio, assets preload)
├── games/
│   └── solitaire-vite/        # Vite project used to build the Solitaire bundle
├── portfolio-contact-form/    # (If separated) contact form package.json / service
├── server.js                  # Express server (email relay + static)
├── package.json               # Node dependencies (backend utilities)
├── procfile                   # Optional platform process declaration
└── README.md
```
Key files:
- `docs/games/pinball/SpaceCadetPinball.html|js|wasm|data`: Runtime artifacts produced by Emscripten build.
- `docs/games/solitaire/index.html` (+ assets): Static Vite build for Solitaire used by the iframe in the “Solitaire” modal.
- `spacecadet/game_resources/`: Original DAT + WAV assets used at build time (preloaded into virtual FS).
- `server.js`: Provides `/contact` endpoint (POST) using Nodemailer.

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

### 3. Run locally (static + contact form)
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
- Node.js 18+ (for local server / contact form)
- (Optional) Emscripten + CMake if rebuilding the Pinball game
- Basic web dev knowledge if extending UI
- Outbound email credentials (SMTP) for Nodemailer (configure via `.env`)

## Inspiration
The design of this portfolio website draws inspiration from an old computer desktop screen, allowing users to interact with the portfolio in a nostalgic and playful manner. Icons represent different applications, and users can drag and open them to explore content in a unique style.

---

<img width="1468" height="833" alt="Screenshot 2025-08-11 at 1 08 24 PM" src="https://github.com/user-attachments/assets/be8cc3b4-e534-4082-b681-38050bf6bf4f" />
<img width="1462" height="827" alt="Screenshot 2025-08-11 at 1 09 21 PM" src="https://github.com/user-attachments/assets/00a2ea11-4e9c-404e-b846-14289b04fd9d" />

---

## Contributing
Contributions welcome—UI polish, performance tweaks, accessibility improvements, or additional retro mini‑apps.

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

