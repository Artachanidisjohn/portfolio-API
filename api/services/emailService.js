const nodemailer = require('nodemailer');

async function sendEmail(req) {
  console.log('Sending email with the following details:');
  console.log('Name:', req.name);
  console.log('Email:', req.email);
  console.log('Message:', req.message);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Χρησιμοποιείς secure σύνδεση με την πόρτα 465
    auth: {
      user: process.env.API_EMAIL_USER, // Το νέο Gmail email σου
      pass: process.env.API_EMAIL_PASSWORD, // Το App Password από το Gmail
    },
  });
  
  const mailOptions = {
    from: req.email, // Email αποστολέα
    to: process.env.API_EMAIL_SEND_TO, // Ο παραλήπτης
    subject: `New message from ${req.name}`,
    text: req.message,
  };

  console.log('Mail options:', mailOptions); // Δείξε τις ρυθμίσεις email πριν την αποστολή

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

module.exports = {
  sendEmail,
};
