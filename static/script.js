const cursor = document.getElementById('cursor');
const icons = document.querySelectorAll('.icon');
const modals = {
    icon1: document.getElementById('modal1'),
    icon2: document.getElementById('modal2'),
    icon3: document.getElementById('modal3'),
    icon5: document.getElementById('modal5')
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

function positionModal(modal) {
    const existingModals = Array.from(document.querySelectorAll('.modal[style*="display: block"]'));
    const offset = existingModals.length * 30;
    modal.style.transform = `translate(-50%, -50%) translate(${offset}px, ${offset}px)`;
}

window.onload = () => {
    // Hide all modals initially
    Object.values(modals).forEach(modal => {
        modal.style.display = 'none';
    });

    // Show only the About Me modal initially
    modals.icon1.style.display = 'block';
    positionModal(modals.icon1);
};

// Handle icon hover and click events
icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/static/click.png')";
    });
    icon.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/static/cursor.png')";
    });

    icon.addEventListener('click', () => {
        const iconId = icon.id;
        if (modals[iconId]) {
            modals[iconId].style.display = 'block';
            positionModal(modals[iconId]);
            modals[iconId].style.zIndex = getHighestZIndex() + 1;
        }
    });
});

// Select the input email and textarea fields
const inputFields = document.querySelectorAll('input[type="email"], textarea');
const textAreas = document.querySelectorAll('textarea, input');

// Add event listeners to change the cursor when hovering over the input fields
inputFields.forEach(field => {
    field.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/static/click.png')";
    });
    
    field.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/static/cursor.png')";
    });
});

// Target the send button in the contact form
const sendButton = document.querySelector('#contact-form button[type="submit"]');

// Change cursor to click.png when hovering over the send button
sendButton.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('/static/click.png')";
});

sendButton.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('/static/cursor.png')";
});

// Select the download button
const downloadButton = document.querySelector('.download-button');

// Add event listeners to change the cursor when hovering over the download button
downloadButton.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('/static/click.png')";
});

downloadButton.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('/static/cursor.png')";
});

// Select all buttons inside project cards
const projectCardButtons = document.querySelectorAll('.project-card button');

// Add event listeners to change the cursor when hovering over the buttons
projectCardButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/static/click.png')";
    });

    button.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/static/cursor.png')";
    });
});

// Handle modal close button events
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        modal.style.display = 'none';
    });

    button.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/static/click.png')";
    });

    button.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/static/cursor.png')";
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

// Github link
document.getElementById('icon6').addEventListener('click', () => {
    window.open('https://github.com/mariarodr1136', '_blank');
});

// Form submission for contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            document.getElementById('modal5').style.display = 'none';
            document.getElementById('contact-form').reset();
        } else {
            alert('Failed to send message. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});

// Blue line event listeners for drag functionality
const blueLines = document.querySelectorAll('.modal-blue-line');
let isDraggingModal = false;

// Function to make modal draggable by the blue line
function makeModalDraggable(modal, blueLine) {
    let offsetX, offsetY;

    blueLine.addEventListener('mousedown', (e) => {
        isDraggingModal = true;
        cursor.style.backgroundImage = "url('/static/click.png')";
        
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
            cursor.style.backgroundImage = "url('/static/cursor.png')";
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

//Calculator Code
modals.icon4 = document.getElementById('modal4'); // Add calculator modal to modals object

// Calculator functionality
function addToDisplay(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('calc-display').value = '';
}

function calculate() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// Blue line for dragging the calculator modal
const calcBlueLine = modals.icon4.querySelector('.modal-blue-line');

// Apply draggable functionality to the calculator modal
makeModalDraggable(modals.icon4, calcBlueLine);

// Calculator functionality
function addToDisplay(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('calc-display').value = '';
}

function calculate() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// Add event listeners to change the cursor when hovering over calculator buttons
const calcButtons = document.querySelectorAll('.calc-buttons button');

calcButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/static/click.png')";
    });

    button.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/static/cursor.png')";
    });
});