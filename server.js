const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-email-password' // Your email password or app-specific password
    }
});

app.post('/send-email', (req, res) => {
    const { message } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com', // Your email address
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