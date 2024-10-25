const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

// Serve static files from the 'public' directory and its subdirectories
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for the email
        pass: process.env.EMAIL_PASS // Use environment variable for the password
    }
});

app.post('/send-email', (req, res) => {
    const { message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Your email address
        subject: 'New Message from Portfolio',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// run server: node server.js
//http://localhost:3000/