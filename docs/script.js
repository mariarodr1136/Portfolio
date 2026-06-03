
function launchURL(url) {
    // Check if window is already being opened
    if (!launchURL.isOpening) {
        launchURL.isOpening = true;
        window.open(url, '_blank');
        setTimeout(() => {
            launchURL.isOpening = false;
        }, 100);
    }
}

// Project Buttons
function launchProject(url) {
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    function isMobile() { return window.innerWidth <= 768; }

    // ====== Wallpaper: restore on load ======
    (function restoreWallpaper() {
        const saved = localStorage.getItem('portfolio-wallpaper');
        if (saved && saved !== 'none') {
            document.body.style.backgroundImage = `url('${saved}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
    })();

    const cursor = document.getElementById('cursor');
    const icons = document.querySelectorAll('.icon');
    const modals = {
        icon1: document.getElementById('modal1'),
        icon2: document.getElementById('modal2'),
        icon3: document.getElementById('modal3'),
        icon5: document.getElementById('modal5'),
        icon6: document.getElementById('modal6'),
        icon7: document.getElementById('modal7'),
        icon8: document.getElementById('modal9'),
    icon9: document.getElementById('modal11'),
    };
    const closeButtons = document.querySelectorAll('.modal-close');
    const allModals = document.querySelectorAll('.modal');
    const designViewport = {
        width: 1440,
        height: 900
    };
    const taskbarHeight = 30;
    let cursorVisible = false;

    function parsePxValue(value) {
        const px = parseFloat(value);
        return Number.isFinite(px) ? px : 0;
    }

    function measureModalSize(modal) {
        const computed = window.getComputedStyle(modal);
        const wasHidden = computed.display === 'none';
        const previousDisplay = modal.style.display;
        const previousVisibility = modal.style.visibility;
        const previousPointerEvents = modal.style.pointerEvents;

        if (wasHidden) modal.style.display = 'block';
        modal.style.visibility = 'hidden';
        modal.style.pointerEvents = 'none';

        const rect = modal.getBoundingClientRect();

        modal.style.pointerEvents = previousPointerEvents;
        modal.style.visibility = previousVisibility;
        if (wasHidden) modal.style.display = previousDisplay;

        return {
            width: rect.width,
            height: rect.height
        };
    }

    function cacheModalBaseSizes() {
        allModals.forEach((modal) => {
            const style = window.getComputedStyle(modal);
            let baseWidth = parsePxValue(style.width);
            let baseHeight = parsePxValue(style.height);

            if (baseWidth <= 0 || baseHeight <= 0) {
                const measured = measureModalSize(modal);
                baseWidth = measured.width;
                baseHeight = measured.height;
            }

            if (baseWidth > 0) modal.dataset.baseWidth = String(baseWidth);
            if (baseHeight > 0) modal.dataset.baseHeight = String(baseHeight);
        });
    }

    function resizeModalsToViewport() {
        if (isMobile()) {
            allModals.forEach(modal => {
                modal.style.width = '';
                modal.style.height = '';
                modal.style.transform = '';
                modal.style.transformOrigin = '';
            });
            if (typeof window.repositionPortfolioClippy === 'function') {
                window.repositionPortfolioClippy();
            }
            return;
        }
        const widthRatio = window.innerWidth / designViewport.width;
        const heightRatio = (window.innerHeight - taskbarHeight) / (designViewport.height - taskbarHeight);
        const baseScale = Math.min(widthRatio, heightRatio);
        const boostedScale = baseScale * 1.18;
        const globalScale = Math.max(0.5, Math.min(boostedScale, 2.2));

        allModals.forEach((modal) => {
            if (modal.dataset.userResized) return;
            const baseWidth = parsePxValue(modal.dataset.baseWidth);
            const baseHeight = parsePxValue(modal.dataset.baseHeight);
            if (!baseWidth || !baseHeight) return;

            const maxWidth = Math.max(260, window.innerWidth - 24);
            const maxHeight = Math.max(180, window.innerHeight - taskbarHeight - 12);
            const boundedScale = Math.min(globalScale, maxWidth / baseWidth, maxHeight / baseHeight);

            modal.style.width = `${baseWidth}px`;
            modal.style.height = `${baseHeight}px`;
            if (modal.id === 'modal13') {
                modal.style.transformOrigin = 'top right';
                modal.style.transform = `scale(${boundedScale})`;
            } else if (modal.id === 'modal3') {
                modal.style.transformOrigin = 'top left';
                modal.style.transform = `scale(${boundedScale})`;
            } else {
                modal.style.transformOrigin = 'center center';
                modal.style.transform = `translate(-50%, -50%) scale(${boundedScale})`;
            }
        });

        if (typeof window.repositionPortfolioClippy === 'function') {
            window.repositionPortfolioClippy();
        }
    }

    // Update cursor position
    function updateCursor(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        requestAnimationFrame(() => {
            cursor.style.transform = `translate(${x}px, ${y}px)`;
            
            if (!cursorVisible) {
                cursor.style.opacity = '1';
                cursorVisible = true;
            }
        });
    }

    function hideCursor() {
        cursor.style.opacity = '0';
        cursorVisible = false;
    }

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseout', hideCursor);

    function openModal1() {
        // Hide all modals initially
        Object.values(modals).forEach(modal => {
            modal.style.display = 'none';
        });

        // Show Settings and Terminal modals on load
        const modalsToOpen = [modals.icon1];

        modalsToOpen.forEach((modal, index) => {
            if (modal) {
                modal.style.display = 'block';
                modal.style.zIndex = getHighestZIndex() + index + 1;
            } else {
                console.error(`Modal ${index + 1} not found`);
            }
        });

        // Open terminal modal behind Settings (desktop only)
        const terminalModal = document.getElementById('modal13');
        if (terminalModal && !isMobile()) {
            terminalModal.style.display = 'block';
            terminalModal.style.zIndex = 199;
            startTerminalTyping();
        }

        // Ensure Settings is on top
        if (modals.icon1) {
            modals.icon1.style.zIndex = 200;
        }

        // Add initial taskbar tabs
        if (terminalModal && !isMobile()) addTaskbarTab(terminalModal);
        if (modals.icon1) addTaskbarTab(modals.icon1);
    }

    // === Taskbar Tabs ===
    const taskbarTabs = document.getElementById('taskbar-tabs');

    function getModalTitle(modal) {
        const blueLine = modal.querySelector('.modal-blue-line');
        return blueLine ? blueLine.textContent.trim() : modal.id;
    }

    function addTaskbarTab(modal) {
        if (!taskbarTabs) return;
        // Don't duplicate
        if (taskbarTabs.querySelector(`[data-modal-id="${modal.id}"]`)) {
            updateActiveTab(modal);
            return;
        }
        const tab = document.createElement('button');
        tab.className = 'taskbar-tab active';
        tab.dataset.modalId = modal.id;
        tab.textContent = getModalTitle(modal);
        tab.addEventListener('click', () => {
            if (modal.style.display === 'none') {
                // Restore minimized modal
                modal.style.display = 'block';
                modal.style.zIndex = getHighestZIndex() + 1;
                updateActiveTab(modal);
            } else {
                // Bring to front
                modal.style.zIndex = getHighestZIndex() + 1;
                updateActiveTab(modal);
            }
            if (modal.id === 'modal13' && typeof window.repositionPortfolioClippy === 'function') {
                window.repositionPortfolioClippy();
            }
        });
        tab.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        tab.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
        taskbarTabs.appendChild(tab);
        updateActiveTab(modal);
    }

    function removeTaskbarTab(modal) {
        if (!taskbarTabs) return;
        const tab = taskbarTabs.querySelector(`[data-modal-id="${modal.id}"]`);
        if (tab) tab.remove();
    }

    function updateActiveTab(activeModal) {
        if (!taskbarTabs) return;
        taskbarTabs.querySelectorAll('.taskbar-tab').forEach(tab => {
            const isActive = tab.dataset.modalId === activeModal.id;
            tab.classList.toggle('active', isActive);
            if (isActive) tab.classList.remove('minimized');
        });
    }

    // Call openModal1 function when the DOM is fully loaded
    openModal1();

    // Handle icon hover events
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        icon.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    });

    // Add email button cursor events
    const emailButton = document.querySelector('.contact-button');
    if (emailButton) {
        emailButton.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        emailButton.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    }
    // Select the download button
    const downloadButton = document.querySelector('.download-button');

    // Add event listeners to change the cursor when hovering over the download button
    downloadButton.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('static/click.png')";
    });

    downloadButton.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('static/cursor.png')";
    });

    // Select all buttons inside project cards
    const projectCardButtons = document.querySelectorAll('.project-card button');

    // Add event listeners to change the cursor when hovering over the buttons
    projectCardButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });

        button.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    });

    // Add hover listeners for social modal action buttons
    const socialActionButtons = document.querySelectorAll('.modal-action-btn');
    socialActionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        button.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    });

    // Handle modal close button events
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.style.display = 'none';
            removeTaskbarTab(modal);
            // Special handling: if pinball modal closed, unload iframe to stop audio
            if (modal.id === 'modal10') {
                const frame = modal.querySelector('.pinball-frame');
                if (frame) {
                    // Unload to ensure SDL_mixer music stops
                    frame.src = 'about:blank';
                    frame.removeAttribute('data-pinball-loaded');
                }
            } else if (modal.id === 'modal12') {
                const frame = modal.querySelector('.solitaire-frame');
                if (frame) {
                    frame.src = 'about:blank';
                }
            }
            if (modal.id === 'modal13' && typeof window.repositionPortfolioClippy === 'function') {
                window.repositionPortfolioClippy();
            }
        });

        button.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });

        button.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    });

    // Get the highest z-index among open modals and Clippy elements
    function getHighestZIndex() {
        return Math.max(
            ...Array.from(document.querySelectorAll('.modal, #portfolio-clippy-panel, .clippy'))
                .map(el => parseFloat(window.getComputedStyle(el).zIndex))
                .filter(zIndex => !Number.isNaN(zIndex)),
            0
        );
    }

    let projectVideoObserver = null;

    function initProjectVideoLazyLoad() {
        if (projectVideoObserver) return;
        const scrollEl = document.querySelector('#modal3 .projects-scroll');
        if (!scrollEl) return;

        projectVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const video = entry.target;
                const src = video.dataset.src;
                if (src && !video.src) {
                    video.src = src;
                    video.play().catch(() => {});
                }
                projectVideoObserver.unobserve(video);
            });
        }, { root: scrollEl, rootMargin: '100px', threshold: 0 });

        scrollEl.querySelectorAll('video[data-src]').forEach(v => projectVideoObserver.observe(v));
    }

    function openPortfolioModalById(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'block';
        modal.style.zIndex = getHighestZIndex() + 1;
        addTaskbarTab(modal);
        updateActiveTab(modal);

        if (modalId === 'modal3') {
            initProjectVideoLazyLoad();
        } else if (modalId === 'modal8') {
            initMinesweeper();
        } else if (modalId === 'modal10') {
            const frame = modal.querySelector('.pinball-frame');
            if (frame && (!frame.getAttribute('data-pinball-loaded') || !frame.src || frame.src === 'about:blank' || frame.src.endsWith('about:blank'))) {
                frame.src = 'games/pinball/SpaceCadetPinball.html';
                frame.setAttribute('data-pinball-loaded', '1');
            }
        } else if (modalId === 'modal12') {
            const frame = modal.querySelector('.solitaire-frame');
            if (frame && (!frame.src || frame.src === 'about:blank' || frame.src.endsWith('about:blank'))) {
                frame.src = 'games/solitaire/index.html';
            }
        }
    }

    function focusModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        const currentHighest = getHighestZIndex();
        if (parseFloat(modal.style.zIndex) < currentHighest || !modal.style.zIndex) {
            modal.style.zIndex = currentHighest + 1;
            updateActiveTab(modal);
        }
    }

    function focusClippyAndPanel() {
        const panel = document.getElementById('portfolio-clippy-panel');
        const agentEl = document.querySelector('.clippy');
        if (!panel && !agentEl) return;
        const highest = getHighestZIndex();
        if (agentEl) {
            agentEl.style.zIndex = String(highest + 1);
        }
        if (panel) {
            panel.style.zIndex = String(highest + 2);
        }
    }

    window.openPortfolioModal = openPortfolioModalById;
    window.focusPortfolioModal = focusModal;
    window.focusClippyAndPanel = focusClippyAndPanel;

    // Blue line event listeners for drag functionality
    const blueLines = document.querySelectorAll('.modal-blue-line');
    let isDraggingModal = false;

    // Function to make modal draggable by the blue line
    function makeModalDraggable(modal, blueLine) {
        if (isMobile()) return;
        let offsetX, offsetY;

        blueLine.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('modal-close')) return;
            isDraggingModal = true;
            document.body.classList.add('dragging-disable-select');
            cursor.style.backgroundImage = "url('static/click.png')";
            modal.style.zIndex = getHighestZIndex() + 1;
            updateActiveTab(modal);

            offsetX = e.clientX - modal.offsetLeft;
            offsetY = e.clientY - modal.offsetTop;

            function onModalDrag(event) {
                if (isDraggingModal) {
                    modal.style.left = event.clientX - offsetX + 'px';
                    modal.style.top = event.clientY - offsetY + 'px';

                }
            }

            document.addEventListener('mousemove', onModalDrag);

            document.addEventListener('mouseup', () => {
                isDraggingModal = false;
                document.removeEventListener('mousemove', onModalDrag);
                cursor.style.backgroundImage = "url('static/cursor.png')";
                document.body.classList.remove('dragging-disable-select');
            });
        });
    }

    // Apply draggable functionality to all modals with blue lines
    document.querySelectorAll('.modal').forEach(modal => {
        const blueLine = modal.querySelector('.modal-blue-line');
        if (blueLine) {
            makeModalDraggable(modal, blueLine);
        }
        
        // Bring to front on mousedown anywhere inside the modal
        modal.addEventListener('mousedown', () => {
            const currentHighest = getHighestZIndex();
            if (parseFloat(modal.style.zIndex) < currentHighest || !modal.style.zIndex) {
                modal.style.zIndex = currentHighest + 1;
                updateActiveTab(modal);

            }
        });
    });

    // Handle custom cursor tracking from within same-origin iframe (safe no-op)
    window.updateCursorFromIframe = (iframeEvent) => {};

    // ====== Minimize buttons (added dynamically) ======
    document.querySelectorAll('.modal').forEach(modal => {
        const btn = document.createElement('button');
        btn.className = 'modal-minimize';
        btn.textContent = '_';
        btn.setAttribute('aria-label', 'Minimize');
        modal.appendChild(btn);

        btn.addEventListener('click', () => {
            modal.style.display = 'none';
            const tab = taskbarTabs ? taskbarTabs.querySelector(`[data-modal-id="${modal.id}"]`) : null;
            if (tab) { tab.classList.remove('active'); tab.classList.add('minimized'); }
        });
        btn.addEventListener('mouseenter', () => { cursor.style.backgroundImage = "url('static/click.png')"; });
        btn.addEventListener('mouseleave', () => { cursor.style.backgroundImage = "url('static/cursor.png')"; });
    });

    // ====== Resize handles (added dynamically) ======
    function makeModalResizable(modal) {
        if (isMobile()) return;
        const handle = document.createElement('div');
        handle.className = 'resize-handle';
        modal.appendChild(handle);

        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const rect = modal.getBoundingClientRect();
            modal.style.left = rect.left + 'px';
            modal.style.top  = rect.top  + 'px';
            modal.style.transform = 'none';
            modal.style.transformOrigin = '';
            modal.dataset.userResized = 'true';

            const startX = e.clientX, startY = e.clientY;
            const startW = rect.width,  startH = rect.height;
            const minW = 200, minH = 120;

            document.body.classList.add('dragging-disable-select');

            function onMove(ev) {
                const newW = Math.max(minW, startW + ev.clientX - startX);
                const newH = Math.max(minH, startH + ev.clientY - startY);
                modal.style.width  = newW + 'px';
                modal.style.height = newH + 'px';
                modal.dataset.baseWidth  = String(newW);
                modal.dataset.baseHeight = String(newH);
            }
            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                document.body.classList.remove('dragging-disable-select');
            }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    }
    document.querySelectorAll('.modal').forEach(makeModalResizable);

    // ====== Wallpaper picker ======
    function applyWallpaper(value) {
        if (value === 'none') {
            document.body.style.backgroundImage = '';
        } else {
            document.body.style.backgroundImage = `url('${value}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
        localStorage.setItem('portfolio-wallpaper', value);
        document.querySelectorAll('.wallpaper-thumb').forEach(t => {
            t.classList.toggle('wallpaper-selected', t.dataset.wallpaper === value);
        });
    }

    // Mark the current saved wallpaper as selected
    const savedWP = localStorage.getItem('portfolio-wallpaper') || 'none';
    document.querySelectorAll('.wallpaper-thumb').forEach(t => {
        t.classList.toggle('wallpaper-selected', t.dataset.wallpaper === savedWP);
        t.addEventListener('click', () => applyWallpaper(t.dataset.wallpaper));
        t.addEventListener('mouseenter', () => { cursor.style.backgroundImage = "url('static/click.png')"; });
        t.addEventListener('mouseleave', () => { cursor.style.backgroundImage = "url('static/cursor.png')"; });
    });


    cacheModalBaseSizes();
    resizeModalsToViewport();

    // Update modal sizing when window is resized
    window.addEventListener('resize', () => {
        resizeModalsToViewport();
    });

    // === Taskbar Clock ===
    const clockEl = document.getElementById('taskbar-clock');
    if (clockEl) {
        function formatTime(date) {
            // Example: 3:07 PM
            const opts = { hour: 'numeric', minute: '2-digit' };
            return date.toLocaleTimeString([], opts);
        }
        function tickClock() {
            clockEl.textContent = formatTime(new Date());
        }
        tickClock();
        if (!window.__taskbarClockInterval) {
            window.__taskbarClockInterval = setInterval(tickClock, 1000);
        }
    }

    // === Start Menu ===
    const startBtn = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const menuMap = {
        'start-open-settings': 'modal1',
        'start-open-resume': 'modal2',
        'start-open-projects': 'modal3',
        'start-open-games': 'modal9',
        'start-open-contact': 'modal5',
        'start-open-github': 'modal6',
        'start-open-linkedin': 'modal7',
    };

    function positionStartMenu(){
        if (!startBtn || !startMenu) return;
        const rect = startBtn.getBoundingClientRect();
        // Align left edge of menu to Start button left; place above taskbar
        startMenu.style.left = Math.max(8, rect.left) + 'px';
        startMenu.style.bottom = (window.innerHeight - rect.top + 6) + 'px';
    }

    function toggleStartMenu(forceState){
        if (!startMenu) return;
        const isOpen = startMenu.classList.contains('open');
        const next = forceState !== undefined ? forceState : !isOpen;
        if (next){ positionStartMenu(); }
        startMenu.classList.toggle('open', next);
        startMenu.setAttribute('aria-hidden', next ? 'false' : 'true');
        startBtn && startBtn.classList.toggle('active', next);
    }

    if (startBtn && startMenu){
    startBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            toggleStartMenu();
        });

        // Change custom cursor on hover and click
        startBtn.addEventListener('mouseenter', ()=>{
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        startBtn.addEventListener('mouseleave', ()=>{
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
        startBtn.addEventListener('mousedown', ()=>{
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        startBtn.addEventListener('mouseup', ()=>{
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });

        // Close when clicking outside
        document.addEventListener('click', (e)=>{
            if (!startMenu.classList.contains('open')) return;
            const within = startMenu.contains(e.target) || startBtn.contains(e.target);
            if (!within) toggleStartMenu(false);
        });

        // Escape closes
    document.addEventListener('keydown', (e)=>{
            if (e.key === 'Escape' && startMenu.classList.contains('open')) toggleStartMenu(false);
        });

    // Reposition on resize
    window.addEventListener('resize', ()=>{ if (startMenu.classList.contains('open')) positionStartMenu(); });

        // Menu item handlers
        Object.keys(menuMap).forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('click', ()=>{
                const modalId = menuMap[id];
                openPortfolioModalById(modalId);
                toggleStartMenu(false);
            });
            btn.addEventListener('mouseenter', ()=>{ cursor.style.backgroundImage = "url('static/click.png')"; });
            btn.addEventListener('mouseleave', ()=>{ cursor.style.backgroundImage = "url('static/cursor.png')"; });
        });
    }

    // Icon dragging and clicking functionality
    const iconContainers = document.querySelectorAll('.icon-container');

    // Trash specific elements
    const trashModal = document.getElementById('modal11');
    const trashArea = document.getElementById('trash-items');
    const desktopArea = document.querySelector('.icons-container');
    const TRASH_ICON_ID = 'icon9';
    const TRASH_CONTAINER_ID = 'icon9-container';

    function isTrashed(container){
        return container.classList.contains('trashed');
    }

    function moveToTrash(container){
        if (container.id === TRASH_CONTAINER_ID) return; // Do not trash the trash icon
        container.classList.add('trashed');
        container.style.position = 'relative';
        container.style.left = '0px';
        container.style.top = '0px';
        trashArea.appendChild(container);
    }

    function restoreFromTrash(container, dropX, dropY, offsetX, offsetY){
        container.classList.remove('trashed');
        // Place onto body for free positioning
        if (container.parentElement !== document.body){
            document.body.appendChild(container);
        }
        container.style.position = 'absolute';
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let left = dropX - offsetX;
        let top = dropY - offsetY;
        left = Math.max(0, Math.min(vw - container.offsetWidth, left));
        top = Math.max(0, Math.min(vh - container.offsetHeight, top));
        container.style.left = left + 'px';
        container.style.top = top + 'px';
        container.style.zIndex = 120; // above desktop base
    }

    function ensureOnDesktop(container){
        if (container.parentElement === document.body) return;
        if (container.id === TRASH_CONTAINER_ID) return; // keep trash icon in column
        const rect = container.getBoundingClientRect();
        document.body.appendChild(container);
        container.style.position = 'absolute';
        container.style.left = rect.left + 'px';
        container.style.top = rect.top + 'px';
    }

    // Allow dragging icons into trash modal when it's open
    let currentDragged = null;
    const trashIconContainer = document.getElementById(TRASH_CONTAINER_ID);

    function isOverTrashIcon(mouseX, mouseY){
        if (!trashIconContainer) return false;
        const r = trashIconContainer.getBoundingClientRect();
        return mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom;
    }

    function isOverTrashModal(mouseX, mouseY){
        if (!trashModal || trashModal.style.display === 'none') return false;
        const r = trashModal.getBoundingClientRect();
        return mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom;
    }

    iconContainers.forEach(container => {
        let isDragging = false;
        let startX, startY;
    let pointerOffsetX = 0, pointerOffsetY = 0, lastClientX = 0, lastClientY = 0;
        
        container.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });

        container.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });

        container.addEventListener('mousedown', (e) => {
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;
            lastClientX = e.clientX;
            lastClientY = e.clientY;
            document.body.classList.add('dragging-disable-select');
            currentDragged = container;

            // Capture initial bounding box and compute pointer offset
            const rect = container.getBoundingClientRect();
            pointerOffsetX = e.clientX - rect.left;
            pointerOffsetY = e.clientY - rect.top;

            function onMouseMove(event){
                lastClientX = event.clientX;
                lastClientY = event.clientY;
                const deltaX = Math.abs(event.clientX - startX);
                const deltaY = Math.abs(event.clientY - startY);
                if (deltaX > 3 || deltaY > 3){
                    isDragging = true;
                }
                if (!isDragging) return;

                // Reparent to body on first drag movement (not on click)
                if (container.id !== TRASH_CONTAINER_ID && container.parentElement !== document.body) {
                    const currentRect = container.getBoundingClientRect();
                    document.body.appendChild(container);
                    container.style.position = 'absolute';
                    container.style.left = currentRect.left + 'px';
                    container.style.top = currentRect.top + 'px';
                }

                // Move with cursor
                container.style.left = (event.clientX - pointerOffsetX) + 'px';
                container.style.top = (event.clientY - pointerOffsetY) + 'px';

                // Hover preview over trash modal
                if (isOverTrashModal(event.clientX, event.clientY) && container.id !== TRASH_CONTAINER_ID){
                    if (!container.classList.contains('drag-preview')){
                        container.classList.add('drag-preview');
                    }
                } else if (container.classList.contains('drag-preview') && !isOverTrashModal(event.clientX, event.clientY)) {
                    container.classList.remove('drag-preview');
                }
            }

            function onMouseUp(event){
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                if (!isDragging){
                    const now = Date.now();
                    const last = container._lastClick || 0;
                    container._lastClick = now;
                    // Deselect all, then select this one
                    iconContainers.forEach(ic => ic.classList.remove('icon-selected'));
                    if (now - last < 400) {
                        // Double-click: open modal
                        container._lastClick = 0;
                        const iconId = container.querySelector('.icon')?.id;
                        const modalId = iconId && modals[iconId]?.id;
                        if (modalId) openPortfolioModalById(modalId);
                    } else {
                        // Single click: select only
                        container.classList.add('icon-selected');
                    }
                } else {
                    const mouseX = lastClientX;
                    const mouseY = lastClientY;
                    const overTrashIcon = isOverTrashIcon(mouseX, mouseY);
                    const inTrashModal = isOverTrashModal(mouseX, mouseY);
                    if ((overTrashIcon || inTrashModal) && container.id !== TRASH_CONTAINER_ID){
                        if (overTrashIcon){
                            openPortfolioModalById('modal11');
                        }
                        moveToTrash(container);
                    } else if (isTrashed(container)) {
                        restoreFromTrash(container, mouseX, mouseY, pointerOffsetX, pointerOffsetY);
                    } else {
                        // Stay where dropped; ensure bounds
                        const vw = window.innerWidth, vh = window.innerHeight;
                        let left = mouseX - pointerOffsetX;
                        let top = mouseY - pointerOffsetY;
                        left = Math.max(0, Math.min(vw - container.offsetWidth, left));
                        top = Math.max(0, Math.min(vh - container.offsetHeight, top));
                        container.style.left = left + 'px';
                        container.style.top = top + 'px';
                    }
                }

                container.classList.remove('drag-preview');
                cursor.style.backgroundImage = "url('static/cursor.png')";
                currentDragged = null;
                document.body.classList.remove('dragging-disable-select');
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });

    // Clicking elsewhere on the desktop deselects icons
    document.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.icon-container')) {
            iconContainers.forEach(ic => ic.classList.remove('icon-selected'));
        }
    });

    // === Minesweeper ===
    const MS_ROWS = 9, MS_COLS = 9, MS_MINES = 10;
    let msGrid, msTimer, msMinesLeft, msResetBtn, msInterval, msStarted, msRevealed;

    // Games modal interactions
    const gamesMinesweeper = document.getElementById('game-minesweeper');
    if (gamesMinesweeper) {
        gamesMinesweeper.addEventListener('click', () => {
            openPortfolioModalById('modal8');
        });
        gamesMinesweeper.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        gamesMinesweeper.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    }

    // === Pinball ===
    const gamesPinball = document.getElementById('game-pinball');
    if (gamesPinball) {
        gamesPinball.addEventListener('click', () => {
            openPortfolioModalById('modal10');
        });
        gamesPinball.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        gamesPinball.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    }

    // === Solitaire ===
    const gamesSolitaire = document.getElementById('game-solitaire');
    if (gamesSolitaire) {
        gamesSolitaire.addEventListener('click', () => {
            openPortfolioModalById('modal12');
        });
        gamesSolitaire.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        gamesSolitaire.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    }

    // Trash modal open on trash icon click already handled in generic handler; add highlighting when dragging over
    // (Optional) Minimal feedback removed per user preference

    function initMinesweeper() {
        msGrid = document.getElementById('mines-grid');
        msTimer = document.getElementById('ms-timer');
        msMinesLeft = document.getElementById('ms-mines-left');
        msResetBtn = document.getElementById('ms-reset');
        if (!msGrid) return;
        msGrid.innerHTML = '';
        msGrid.style.gridTemplateColumns = `repeat(${MS_COLS}, 34px)`;
        let board = createBoard(MS_ROWS, MS_COLS, MS_MINES);
        msMinesLeft.textContent = pad(MS_MINES);
        msTimer.textContent = '000';
        msStarted = false; msRevealed = 0;
        clearInterval(msInterval);
        msResetBtn.onclick = () => initMinesweeper();

        board.forEach((row, r) => {
            row.forEach((cell, c) => {
                const div = document.createElement('div');
                div.className = 'ms-cell';
                div.setAttribute('role','gridcell');
                div.dataset.r = r; div.dataset.c = c;
                div.oncontextmenu = (e)=>{ e.preventDefault(); toggleFlag(board, r, c, div); };
                div.addEventListener('mousedown', (e)=>{
                    if (e.button === 0) {
                        if (!msStarted) startTimer();
                        reveal(board, r, c);
                    }
                });
                msGrid.appendChild(div);
            });
        });

        function startTimer(){
            msStarted = true; let t=0; msTimer.textContent = pad(0);
            msInterval = setInterval(()=>{ t++; msTimer.textContent = pad(t); }, 1000);
        }

        function gameOver(win){
            clearInterval(msInterval);
            msResetBtn.textContent = win ? '😎' : '☹️';
            // reveal all mines on loss
            if (!win){
                board.forEach((row,r)=>row.forEach((cell,c)=>{
                    if (cell.mine){
                        const el = cellEl(r,c); el.classList.add('open','mine');
                    }
                }));
            }
        }

        function cellEl(r,c){ return msGrid.querySelector(`.ms-cell[data-r="${r}"][data-c="${c}"]`); }

        function reveal(board, r, c){
            const cell = board[r][c];
            const el = cellEl(r,c);
            if (cell.open || cell.flag) return;
            cell.open = true; el.classList.add('open');
            if (cell.mine){ el.classList.add('mine'); gameOver(false); return; }
            msRevealed++;
            if (cell.count>0){ el.textContent = cell.count; el.style.color = countColor(cell.count); }
            else { // flood fill
                neighbors(r,c).forEach(([nr,nc])=> reveal(board, nr, nc));
            }
            if (msRevealed === MS_ROWS*MS_COLS - MS_MINES){ gameOver(true); }
        }

        function toggleFlag(board, r, c, el){
            const cell = board[r][c];
            if (cell.open) return;
            cell.flag = !cell.flag;
            el.classList.toggle('flag', cell.flag);
            const left = MS_MINES - board.flat().filter(x=>x.flag).length;
            msMinesLeft.textContent = pad(Math.max(0,left));
        }

        function neighbors(r,c){
            const res=[];
            for (let dr=-1; dr<=1; dr++){
                for (let dc=-1; dc<=1; dc++){
                    if (dr===0 && dc===0) continue;
                    const nr=r+dr, nc=c+dc;
                    if (nr>=0 && nr<MS_ROWS && nc>=0 && nc<MS_COLS) res.push([nr,nc]);
                }
            }
            return res;
        }

        function createBoard(rows, cols, mines){
            const board = Array.from({length: rows}, ()=> Array.from({length: cols}, ()=>({mine:false, open:false, flag:false, count:0})));
            let placed=0;
            while (placed < mines){
                const r = Math.floor(Math.random()*rows);
                const c = Math.floor(Math.random()*cols);
                if (!board[r][c].mine){ board[r][c].mine = true; placed++; }
            }
            for (let r=0; r<rows; r++){
                for (let c=0; c<cols; c++){
                    if (board[r][c].mine) continue;
                    let cnt=0; neighbors(r,c).forEach(([nr,nc])=>{ if (board[nr][nc].mine) cnt++; });
                    board[r][c].count = cnt;
                }
            }
            return board;
        }

        function pad(n){ return String(n).padStart(3,'0'); }
        function countColor(n){
            const colors = {1:'#0000ff',2:'#008200',3:'#ff0000',4:'#000084',5:'#840000',6:'#008284',7:'#000000',8:'#808080'};
            return colors[n] || '#000';
        }
    }

    // === Terminal Typing Animation ===
    function startTerminalTyping() {
        const output = document.getElementById('terminal-output');
        if (!output) return;

        // Sequence of actions: {text, typo, correction} or just {text}
        // A "typo" types wrong text, pauses, deletes it, then types the correction
        const sequence = [
            { text: '> initializing workspace...\n' },
            { text: '> loading portfolio modules...\n\n' },
            { text: 'const developer = {\n' },
            { text: '    name: "Maria Rodriguez",\n' },
            { text: '    role: "', typo: 'Softwrae', correction: 'Software Developer' },
            { text: '",\n' },
            { text: '    skills: ["Java", "Python",\n' },
            { text: '             "JavaScript", "SQL",\n' },
            { text: '             "C", "React", "AWS",\n' },
            { text: '             "PostgreSQL", "MongoDB",\n' },
            { text: '             "MySQL"],\n' },
            { text: '    passion: "Building innovative\n' },
            { text: '              solutions"\n' },
            { text: '};\n\n' },
            { text: 'function createProject(idea) {\n' },
            { text: '    const code = design(idea);\n' },
            { text: '    const result = build(code);\n' },
            { text: '    return deploy(', typo: 'reuslt', correction: 'result' },
            { text: ');\n' },
            { text: '}\n\n' },
            { text: '> compiling...\n' },
            { text: '> system ready_' },
        ];

        let seqIndex = 0;
        let charIndex = 0;
        let currentText = '';
        let phase = 'typing'; // 'typing' | 'typo' | 'pause' | 'deleting' | 'correcting' | 'done'
        let typoText = '';
        let typoCharIndex = 0;
        let deleteCount = 0;

        function tick() {
            const item = sequence[seqIndex];
            if (!item) {
                // Animation complete — just stop with blinking cursor
                return;
            }

            if (phase === 'typing') {
                if (charIndex < item.text.length) {
                    currentText += item.text[charIndex];
                    output.textContent = currentText;
                    charIndex++;
                    setTimeout(tick, 40 + Math.random() * 40);
                } else if (item.typo) {
                    // Start typing the typo
                    phase = 'typo';
                    typoText = item.typo;
                    typoCharIndex = 0;
                    setTimeout(tick, 40);
                } else {
                    // Move to next sequence item
                    seqIndex++;
                    charIndex = 0;
                    setTimeout(tick, 20);
                }
            } else if (phase === 'typo') {
                if (typoCharIndex < typoText.length) {
                    currentText += typoText[typoCharIndex];
                    output.textContent = currentText;
                    typoCharIndex++;
                    setTimeout(tick, 40 + Math.random() * 40);
                } else {
                    // Pause before deleting
                    phase = 'pause';
                    setTimeout(tick, 600);
                }
            } else if (phase === 'pause') {
                phase = 'deleting';
                deleteCount = typoText.length;
                setTimeout(tick, 80);
            } else if (phase === 'deleting') {
                if (deleteCount > 0) {
                    currentText = currentText.slice(0, -1);
                    output.textContent = currentText;
                    deleteCount--;
                    setTimeout(tick, 35);
                } else {
                    // Now type the correction
                    phase = 'correcting';
                    typoText = item.correction;
                    typoCharIndex = 0;
                    setTimeout(tick, 200);
                }
            } else if (phase === 'correcting') {
                if (typoCharIndex < typoText.length) {
                    currentText += typoText[typoCharIndex];
                    output.textContent = currentText;
                    typoCharIndex++;
                    setTimeout(tick, 40 + Math.random() * 40);
                } else {
                    // Done with this item, move on
                    phase = 'typing';
                    seqIndex++;
                    charIndex = 0;
                    setTimeout(tick, 20);
                }
            }

            // Keep terminal scrolled to bottom
            const body = output.parentElement;
            if (body) body.scrollTop = body.scrollHeight;
        }

        tick();
    }

    // ====== Boot Screen ======
    (function initBootScreen() {
        const screen = document.getElementById('boot-screen');
        if (!screen) return;
        const fill   = document.getElementById('boot-bar-fill');
        const status = document.getElementById('boot-status-text');
        const steps  = [
            { pct: 18,  text: 'Starting Windows 95...' },
            { pct: 38,  text: 'Loading system files...' },
            { pct: 62,  text: 'Initializing portfolio...' },
            { pct: 82,  text: 'Preparing workspace...' },
            { pct: 100, text: 'Almost ready...' },
        ];
        let i = 0;
        function step() {
            if (i >= steps.length) {
                setTimeout(() => {
                    screen.classList.add('boot-fade-out');
                    setTimeout(() => screen.remove(), 700);
                }, 300);
                return;
            }
            const s = steps[i++];
            fill.style.width   = s.pct + '%';
            status.textContent = s.text;
            setTimeout(step, 320 + Math.random() * 260);
        }
        setTimeout(step, 350);
    })();
});
