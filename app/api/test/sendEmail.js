// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { reminder, reminderDate, email } = req.body;

    // Create a transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use another service like SendGrid or Mailgun
      auth: {
        user: 'your-email@gmail.com', // your email address
        pass: 'your-email-password', // your email password (use environment variables in production)
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Reminder: ' + reminder,
      text: `You requested a reminder for: ${reminder}\nDate & Time: ${new Date(reminderDate).toLocaleString()}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!', info });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email', details: error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
