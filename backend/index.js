import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 5000;

app.post('/api/contact', async (req, res) => {
  const { name, email, message, attachment } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'bpatil.00001@gmail.com',
        pass: process.env.EMAIL_PASS || '',
      },
    });

    const mailOptions = {
      from: email,
      to: 'bpatil.00001@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      text: `Sender: ${name} (${email})\n\nMessage:\n${message}`,
    };

    if (attachment && attachment.data && attachment.name) {
      mailOptions.attachments = [{
        filename: attachment.name,
        content: attachment.data,
        encoding: 'base64',
      }];
    }

    if (!process.env.EMAIL_PASS) {
      console.log('--- SIMULATING EMAIL SENT ---');
      console.log(`To: ${mailOptions.to}\nFrom: ${mailOptions.from}\nBody:\n${mailOptions.text}`);
      if (mailOptions.attachments) console.log(`Attached: ${attachment.name}`);
      return res.status(200).json({ success: true, simulated: true });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend transmission server active on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    status: "Backend is running 🚀",
    message: "Portfolio API is live."
  });
});