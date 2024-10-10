document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const icons = document.querySelectorAll('.icon');
    const modals = {
        icon1: document.getElementById('modal1'),
        icon2: document.getElementById('modal2'),
        icon3: document.getElementById('modal3'),
        icon4: document.getElementById('modal4'),
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

    function openModal1() {
        // Hide all modals initially
        Object.values(modals).forEach(modal => {
            modal.style.display = 'none';
        });
    
        // Show only the About Me modal initially
        if (modals.icon1) {
            modals.icon1.style.display = 'block';
            // positionModal(modals.icon1);
            modals.icon1.style.zIndex = getHighestZIndex() + 1;
        } else {
            console.error('Modal 1 not found');
        }
    }
    
    // Update other event handlers to remove positionModal calls
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const iconId = icon.id;
            if (modals[iconId]) {
                modals[iconId].style.display = 'block';
                // Remove this line as positioning is now handled by CSS
                // positionModal(modals[iconId]);
                modals[iconId].style.zIndex = getHighestZIndex() + 1;
            }
        });
    });

    // Call openModal1 function when the DOM is fully loaded
    openModal1();

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

    const submitButton = event.target.querySelector('button[type="submit"]');

    // Check if the button is already disabled
    if (submitButton.disabled) return;

    submitButton.disabled = true; // Disable the button to prevent multiple submissions

    const message = event.target.message.value;

    // Validate input
    if (!message) {
        alert('Please enter a message.');
        submitButton.disabled = false; // Re-enable the button
        return;
    }

    // Send the message to your email endpoint
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Message sent successfully!');
        event.target.reset(); // Reset the form
    })
    .catch(error => {
        alert('There was a problem sending your message: ' + error.message);
    })
    .finally(() => {
        submitButton.disabled = false; // Re-enable the button
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

    // Update positioning when window is resized
    window.addEventListener('resize', () => {
        Object.values(modals).forEach(modal => {
            if (modal.style.display === 'block') {
                positionModal(modal);
            }
        });
    });
});