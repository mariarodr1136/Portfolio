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
    // First, hide all modals
    Object.values(modals).forEach(modal => {
        modal.style.display = 'none'; // Hide all modals initially
    });

    // Then, show only the About Me modal
    modals.icon1.style.display = 'block';
    positionModal(modals.icon1);
};


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

function getHighestZIndex() {
    return Math.max(
        ...Array.from(document.querySelectorAll('.modal'))
            .map(el => parseFloat(window.getComputedStyle(el).zIndex))
            .filter(zIndex => !Number.isNaN(zIndex)),
        0
    );
}

const video = document.getElementById('video');
let isDraggingVideo = false;

video.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('/static/click.png')";
});

video.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('/static/cursor.png')";
});

video.addEventListener('mousedown', (e) => {
    isDraggingVideo = true;
    cursor.style.backgroundImage = "url('/static/click.png')";

    const offsetX = e.clientX - video.offsetLeft;
    const offsetY = e.clientY - video.offsetTop;

    function onVideoDrag(event) {
        video.style.left = event.clientX - offsetX + 'px';
        video.style.top = event.clientY - offsetY + 'px';
    }

    document.addEventListener('mousemove', onVideoDrag);

    document.addEventListener('mouseup', () => {
        isDraggingVideo = false;
        document.removeEventListener('mousemove', onVideoDrag);
        cursor.style.backgroundImage = "url('/static/cursor.png')";
    });
});

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

// Blue line event listeners
const blueLines = document.querySelectorAll('.modal-blue-line');
blueLines.forEach(blueLine => {
    blueLine.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('/static/click.png')";
    });

    blueLine.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('/static/cursor.png')";
    });
});