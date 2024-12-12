// Project Buttons
function launchProject(url) {
    window.open(url, '_blank');
}  
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
    
        // Show both Settings (icon1) and Projects (icon3) modals
        const modalsToOpen = [modals.icon1, modals.icon3];
        
        modalsToOpen.forEach((modal, index) => {
            if (modal) {
                modal.style.display = 'block';
                // Increment z-index for each modal to ensure they stack correctly
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

    // Select the input email and textarea fields
    const inputFields = document.querySelectorAll('input[type="email"], textarea');

    // Add event listeners to change the cursor when hovering over the input fields
    inputFields.forEach(field => {
        field.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });
        
        field.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
        });
    });

    // Target the send button in the contact form
    const sendButton = document.querySelector('#contact-form button[type="submit"]');

    // Change cursor to click.png when hovering over the send button
    sendButton.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('static/click.png')";
    });

    sendButton.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('static/cursor.png')";
    });

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

// Add this to your existing script.js or where your form handling code is
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const message = event.target.message.value;

    if (!message) {
        alert('Please enter a message.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Update this URL to match your deployment
    const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/send-email'
        : 'https://mrodr-portfolio.herokuapp.com/send-email';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send message');
        }
        return data;
    })
    .then(data => {
        alert('Message sent successfully!');
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Message sent successfully!');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
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

    // Add event listeners to change the cursor when hovering over calculator buttons
    const calcButtons = document.querySelectorAll('.calc-buttons button');

    calcButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('static/click.png')";
        });

        button.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('static/cursor.png')";
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

                // If the mouse has moved more than a small threshold, consider it a drag
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
                    // This was a click, not a drag
                    const iconId = container.querySelector('.icon').id;
                    if (iconId === 'icon6') {
                        // Open GitHub link only on click
                        window.open('https://github.com/mariarodr1136', '_blank');
                    } else if (iconId === 'icon7') {
                        // Open LinkedIn link only on click
                        window.open('https://www.linkedin.com/in/mariarodr/', '_blank');
                    } else if (modals[iconId]) {
                        modals[iconId].style.display = 'block';
                        modals[iconId].style.zIndex = getHighestZIndex() + 1;
                    }
                }

                cursor.style.backgroundImage = "url('static/cursor.png')";
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
});