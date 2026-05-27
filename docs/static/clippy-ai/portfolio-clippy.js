(function () {
    'use strict';

    const AGENT_NAME = 'Clippy';
    const AGENT_BASE_PATH = 'static/clippy-ai/assets/agents/';
    const taskbarOffset = 42;
    let agent = null;
    let panel = null;
    let panelOpen = window.innerWidth > 520;
    let positionTimer = null;

    let hasCustomPosition = false;
    let clippyOffsetX = 0;
    let clippyOffsetY = 0;
    let panelOffsetX = 0;
    let panelOffsetY = 0;
    let isDraggingPanel = false;
    let isDraggingClippy = false;

    const responses = [
        {
            match: ['resume', 'cv', 'experience'],
            modalId: 'modal2',
            text: "I pulled up Maria's resume."
        },
        {
            match: ['project', 'portfolio', 'work', 'build'],
            modalId: 'modal3',
            text: "Here are the projects. The demos and repositories are tucked inside."
        },
        {
            match: ['contact', 'email', 'hire', 'reach'],
            modalId: 'modal5',
            text: "Contact is open. Shortest path to the inbox."
        },
        {
            match: ['github', 'code', 'repo'],
            modalId: 'modal6',
            text: "GitHub is ready."
        },
        {
            match: ['linkedin', 'profile'],
            modalId: 'modal7',
            text: "LinkedIn is open."
        },
        {
            match: ['game', 'games'],
            modalId: 'modal9',
            text: "The games folder is open."
        },
        {
            match: ['minesweeper'],
            modalId: 'modal8',
            text: "Minesweeper is armed."
        },
        {
            match: ['pinball'],
            modalId: 'modal10',
            text: "Pinball is loaded."
        },
        {
            match: ['solitaire'],
            modalId: 'modal12',
            text: "Solitaire is on the table."
        }
    ];

    function setCursor(isPointer) {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;
        cursor.style.backgroundImage = isPointer ? "url('static/click.png')" : "url('static/cursor.png')";
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function createPanel() {
        panel = document.createElement('section');
        panel.id = 'portfolio-clippy-panel';
        panel.className = `portfolio-clippy-panel${panelOpen ? ' is-open' : ''}`;
        panel.setAttribute('aria-live', 'polite');
        panel.setAttribute('aria-hidden', panelOpen ? 'false' : 'true');
        panel.innerHTML = `
            <div class="portfolio-clippy-titlebar">
                <span>Clippy</span>
                <button type="button" id="portfolio-clippy-close" aria-label="Close Clippy">&times;</button>
            </div>
            <div class="portfolio-clippy-log" id="portfolio-clippy-log">
                <p>It looks like you're visiting Maria's workspace. Need a resume, project, or contact shortcut?</p>
            </div>
            <div class="portfolio-clippy-actions" aria-label="Clippy shortcuts">
                <button type="button" data-modal-id="modal2">Resume</button>
                <button type="button" data-modal-id="modal3">Projects</button>
                <button type="button" data-modal-id="modal5">Contact</button>
                <button type="button" data-modal-id="modal9">Games</button>
            </div>
            <form class="portfolio-clippy-form" id="portfolio-clippy-form">
                <input id="portfolio-clippy-input" type="text" autocomplete="off" aria-label="Ask Clippy" placeholder="Ask Clippy..." />
                <button type="submit">Ask</button>
            </form>
        `;
        document.body.appendChild(panel);

        panel.addEventListener('mouseenter', () => setCursor(true));
        panel.addEventListener('mouseleave', () => setCursor(false));

        const closeButton = document.getElementById('portfolio-clippy-close');
        closeButton.addEventListener('click', () => {
            togglePanel(false);
            play('Hide');
        });

        panel.querySelectorAll('[data-modal-id]').forEach((button) => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal-id');
                openPortfolioModal(modalId);
                say(shortcutMessage(modalId));
                play('GestureUp');
            });
        });

        const form = document.getElementById('portfolio-clippy-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            handleQuestion();
        });
    }

    function shortcutMessage(modalId) {
        const labels = {
            modal2: "Resume is open.",
            modal3: "Projects are open.",
            modal5: "Contact is open.",
            modal9: "Games are open."
        };
        return labels[modalId] || "Window opened.";
    }

    function say(text) {
        const log = document.getElementById('portfolio-clippy-log');
        if (!log) return;
        log.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = text;
        log.appendChild(p);
        togglePanel(true);
        updatePanelPosition();
    }

    function play(animation) {
        if (!agent || !agent.hasAnimation(animation)) return;
        agent.stop();
        agent.play(animation);
    }

    function togglePanel(forceState) {
        if (!panel) return;
        panelOpen = forceState === undefined ? !panelOpen : forceState;
        panel.classList.toggle('is-open', panelOpen);
        panel.setAttribute('aria-hidden', panelOpen ? 'false' : 'true');
        updatePanelPosition();
    }

    function updatePanelPosition() {
        if (!agent || !panel) return;

        const terminalModal = document.getElementById('modal13');
        if (!terminalModal || window.getComputedStyle(terminalModal).display === 'none') {
            panel.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
            return;
        }

        if (panelOpen) {
            panel.classList.add('is-open');
            panel.setAttribute('aria-hidden', 'false');
        } else {
            panel.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
            return;
        }

        const terminalRect = terminalModal.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        const margin = 12;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const panelWidth = panelRect.width || 360;
        const panelHeight = panelRect.height || 180;

        let left, top;
        if (!hasCustomPosition) {
            panelOffsetX = 0;
            panelOffsetY = terminalRect.height + 10;
        }
        left = terminalRect.left + panelOffsetX;
        top = terminalRect.top + panelOffsetY;

        left = clamp(left, margin, viewportWidth - panelWidth - margin);
        top = clamp(top, margin, viewportHeight - panelHeight - taskbarOffset);

        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;

        const terminalZ = parseFloat(window.getComputedStyle(terminalModal).zIndex) || 199;
        panel.style.zIndex = String(terminalZ + 2);
    }

    function positionAgent() {
        if (!agent) return;
        if (isDraggingPanel || isDraggingClippy) return;

        const terminalModal = document.getElementById('modal13');
        if (!terminalModal || window.getComputedStyle(terminalModal).display === 'none') {
            agent._el.hide();
            if (panel) {
                panel.classList.remove('is-open');
                panel.setAttribute('aria-hidden', 'true');
            }
            return;
        }

        agent._el.show();

        const terminalRect = terminalModal.getBoundingClientRect();
        const width = agent._el.outerWidth() || 124;
        const height = agent._el.outerHeight() || 93;
        const margin = 12;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x, y;
        if (!hasCustomPosition) {
            clippyOffsetX = terminalRect.width - width;
            clippyOffsetY = terminalRect.height + 10;
        }
        x = terminalRect.left + clippyOffsetX;
        y = terminalRect.top + clippyOffsetY;

        x = clamp(x, margin, viewportWidth - width - margin);
        y = clamp(y, margin, viewportHeight - height - taskbarOffset);

        const terminalZ = parseFloat(window.getComputedStyle(terminalModal).zIndex) || 199;
        agent._el.css({ left: x, top: y, zIndex: terminalZ + 1 });
        agent.reposition();

        updatePanelPosition();
    }

    window.repositionPortfolioClippy = positionAgent;

    function openPortfolioModal(modalId) {
        if (typeof window.openPortfolioModal === 'function') {
            window.openPortfolioModal(modalId);
        }
    }

    function handleQuestion() {
        const input = document.getElementById('portfolio-clippy-input');
        if (!input) return;

        const question = input.value.trim();
        if (!question) return;
        input.value = '';

        const normalized = question.toLowerCase();
        const match = responses.find((item) => item.match.some((term) => normalized.includes(term)));

        if (match) {
            openPortfolioModal(match.modalId);
            say(match.text);
            play('Explain');
            return;
        }

        say("I can help route you around Maria's workspace. Try resume, projects, contact, GitHub, LinkedIn, or games.");
        play('Thinking');
    }

    function makePanelDraggable() {
        const titlebar = panel.querySelector('.portfolio-clippy-titlebar');
        if (!titlebar) return;

        let startX, startY;
        let startPanelLeft, startPanelTop;
        let startClippyLeft, startClippyTop;
        let isDragging = false;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            if (e.target.id === 'portfolio-clippy-close') return;

            isDragging = true;
            isDraggingPanel = true;
            startX = e.clientX;
            startY = e.clientY;

            startPanelLeft = panel.offsetLeft;
            startPanelTop = panel.offsetTop;

            const clippyOffset = agent._el.offset();
            startClippyLeft = clippyOffset.left;
            startClippyTop = clippyOffset.top;

            setCursor(true);

            function onMouseMove(event) {
                if (!isDragging) return;
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;

                panel.style.left = (startPanelLeft + dx) + 'px';
                panel.style.top = (startPanelTop + dy) + 'px';

                agent._el.css({
                    left: startClippyLeft + dx,
                    top: startClippyTop + dy
                });
                agent.reposition();
            }

            function onMouseUp() {
                if (!isDragging) return;
                isDragging = false;
                isDraggingPanel = false;

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                setCursor(false);

                const terminalModal = document.getElementById('modal13');
                if (terminalModal) {
                    const terminalRect = terminalModal.getBoundingClientRect();
                    const clippyRect = agent._el[0].getBoundingClientRect();

                    hasCustomPosition = true;
                    clippyOffsetX = clippyRect.left - terminalRect.left;
                    clippyOffsetY = clippyRect.top - terminalRect.top;
                    
                    if (panel && window.getComputedStyle(panel).display !== 'none') {
                        const panelRect = panel.getBoundingClientRect();
                        panelOffsetX = panelRect.left - terminalRect.left;
                        panelOffsetY = panelRect.top - terminalRect.top;
                    } else {
                        panelOffsetX = clippyOffsetX - 360 - 10;
                        panelOffsetY = clippyOffsetY;
                    }
                }
                positionAgent();
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    function initAgent() {
        if (typeof clippy === 'undefined' || typeof window.jQuery === 'undefined') {
            return;
        }

        window.CLIPPY_CDN = AGENT_BASE_PATH;
        clippy.load(AGENT_NAME, (loadedAgent) => {
            agent = loadedAgent;
            window.portfolioClippy = agent;
            agent._animator._sounds = {};
            agent._el.attr({
                role: 'button',
                'aria-label': 'Clippy assistant',
                tabindex: '0'
            });

            // Hook clippy drag methods to also drag the panel
            const originalStartDrag = agent._startDrag;
            const originalDragMove = agent._dragMove;
            const originalFinishDrag = agent._finishDrag;
            let clippyDragMoved = false;

            agent._startDrag = function(e) {
                isDraggingClippy = true;
                clippyDragMoved = false;
                if (panel) {
                    panel.dataset.dragStartLeft = panel.offsetLeft;
                    panel.dataset.dragStartTop = panel.offsetTop;
                    
                    const offset = agent._el.offset();
                    panel.dataset.clippyStartLeft = offset.left;
                    panel.dataset.clippyStartTop = offset.top;
                }
                originalStartDrag.call(agent, e);
            };

            agent._dragMove = function(e) {
                originalDragMove.call(agent, e);
                clippyDragMoved = true;
                if (panel) {
                    const startX = parseFloat(panel.dataset.clippyStartLeft || 0);
                    const startY = parseFloat(panel.dataset.clippyStartTop || 0);
                    const dx = agent._targetX - startX;
                    const dy = agent._targetY - startY;
                    panel.style.left = (parseFloat(panel.dataset.dragStartLeft || 0) + dx) + 'px';
                    panel.style.top = (parseFloat(panel.dataset.dragStartTop || 0) + dy) + 'px';
                }
            };

            agent._finishDrag = function() {
                originalFinishDrag.call(agent);
                isDraggingClippy = false;
                
                if (clippyDragMoved) {
                    const terminalModal = document.getElementById('modal13');
                    if (terminalModal) {
                        const terminalRect = terminalModal.getBoundingClientRect();
                        const clippyRect = agent._el[0].getBoundingClientRect();
                        
                        hasCustomPosition = true;
                        clippyOffsetX = clippyRect.left - terminalRect.left;
                        clippyOffsetY = clippyRect.top - terminalRect.top;
                        
                        if (panel && window.getComputedStyle(panel).display !== 'none') {
                            const panelRect = panel.getBoundingClientRect();
                            panelOffsetX = panelRect.left - terminalRect.left;
                            panelOffsetY = panelRect.top - terminalRect.top;
                        } else {
                            panelOffsetX = clippyOffsetX - 360 - 10;
                            panelOffsetY = clippyOffsetY;
                        }
                    }
                } else {
                    // It was a click!
                    if (!panelOpen) {
                        togglePanel(true);
                    }
                }
                positionAgent();
            };

            positionAgent();
            agent.show(true);
            agent.play('Greeting');
            createPanel();
            makePanelDraggable();
            updatePanelPosition();

            agent._el.on('mouseenter', () => setCursor(true));
            agent._el.on('mouseleave', () => setCursor(false));
            agent._el.on('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    if (!panelOpen) {
                        togglePanel(true);
                    }
                }
            });

            window.addEventListener('resize', positionAgent);
            positionTimer = window.setInterval(positionAgent, 120);
        }, () => {
            console.error('Clippy failed to load.');
        }, AGENT_BASE_PATH);
    }

    window.addEventListener('beforeunload', () => {
        if (positionTimer) window.clearInterval(positionTimer);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAgent);
    } else {
        initAgent();
    }
})();
