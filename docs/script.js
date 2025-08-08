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
    const cursor = document.getElementById('cursor');
    const icons = document.querySelectorAll('.icon');
    const modals = {
        icon1: document.getElementById('modal1'),
        icon2: document.getElementById('modal2'),
        icon3: document.getElementById('modal3'),
        icon4: document.getElementById('modal4'),
        icon5: document.getElementById('modal5'),
        icon8: document.getElementById('modal8'),
    };
    const closeButtons = document.querySelectorAll('.modal-close');
    let cursorVisible = false;

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
    
        // Show only Settings (icon1) modal
        const modalsToOpen = [modals.icon1];
        
        modalsToOpen.forEach((modal, index) => {
            if (modal) {
                modal.style.display = 'block';
                modal.style.zIndex = getHighestZIndex() + index + 1;
            } else {
                console.error(`Modal ${index + 1} not found`);
            }
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

    // Handle modal close button events
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.style.display = 'none';
        });

        button.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });

        button.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    });

    // Get the highest z-index among open modals
    function getHighestZIndex() {
        return Math.max(
            ...Array.from(document.querySelectorAll('.modal'))
                .map(el => parseFloat(window.getComputedStyle(el).zIndex))
                .filter(zIndex => !Number.isNaN(zIndex)),
            0
        );
    }

    // Blue line event listeners for drag functionality
    const blueLines = document.querySelectorAll('.modal-blue-line');
    let isDraggingModal = false;

    // Function to make modal draggable by the blue line
    function makeModalDraggable(modal, blueLine) {
        let offsetX, offsetY;

        blueLine.addEventListener('mousedown', (e) => {
            isDraggingModal = true;
            cursor.style.backgroundImage = "url('static/click.png')";
            
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
            });
        });
    }

    // Apply draggable functionality to all modals with blue lines
    Object.values(modals).forEach(modal => {
        const blueLine = modal.querySelector('.modal-blue-line');
        if (blueLine) {
            makeModalDraggable(modal, blueLine);
        }
    });

    // Update positioning when window is resized
    window.addEventListener('resize', () => {
        Object.values(modals).forEach(modal => {
            if (modal.style.display === 'block') {
                positionModal(modal);
            }
        });
    });    

    // Icon dragging and clicking functionality
    const iconContainers = document.querySelectorAll('.icon-container');

    iconContainers.forEach(container => {
        let isDragging = false;
        let startX, startY;

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
        
            const offsetX = e.clientX - container.offsetLeft;
            const offsetY = e.clientY - container.offsetTop;
        
            function onMouseMove(event) {
                const deltaX = Math.abs(event.clientX - startX);
                const deltaY = Math.abs(event.clientY - startY);
        
                if (deltaX > 5 || deltaY > 5) {
                    isDragging = true;
                    container.style.position = 'absolute';
                    container.style.left = event.clientX - offsetX + 'px';
                    container.style.top = event.clientY - offsetY + 'px';
                }
            }
        
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
        
                if (!isDragging) {
                    const iconId = container.querySelector('.icon').id;
                    if (iconId === 'icon6') {
                        launchURL('https://github.com/mariarodr1136');
                    } else if (iconId === 'icon7') {
                        launchURL('https://www.linkedin.com/in/mariarodr/');
                    } else if (modals[iconId]) {
                        modals[iconId].style.display = 'block';
                        modals[iconId].style.zIndex = getHighestZIndex() + 1;
                        if (iconId === 'icon8') {
                            initMinesweeper();
                        }
                    }
                }
        
                cursor.style.backgroundImage = "url('static/cursor.png')";
            }
        
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });

    // === Minesweeper ===
    const MS_ROWS = 9, MS_COLS = 9, MS_MINES = 10;
    let msGrid, msTimer, msMinesLeft, msResetBtn, msInterval, msStarted, msRevealed;

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
});
