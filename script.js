const express = require('express');
const nodemailer = require('nodemailer');

// Create an Express app
const app = express();

// Middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle the email sending
app.post('/send-email', (req, res) => {
  // Get form values
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  // Validate form fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  // Create a transporter with your email service provider details
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., Gmail, Outlook, etc.
    auth: {
      user: 'jana.e.estep@gmail.com',
      pass: 'Valero#1',
    },
  });

  // Construct the email message
  const mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient-email@example.com', // Replace with the recipient's email address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while sending the email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
