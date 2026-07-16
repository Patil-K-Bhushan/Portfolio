import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://bhushan-patil-portfolio.bpatil-00001.workers.dev/", // Replace with your Cloudflare Pages URL
  // "https://yourdomain.com", // Add your custom domain later
];

app.use(
  cors({
    origin: ["http://localhost:5173", "https://bhushan-patil-portfolio.bpatil-00001.workers.dev/"],
    methods: ["GET", "POST"],
  }),
);

app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Backend is Running 🚀",
  });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message, attachment } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
`,
    };

    if (attachment?.data && attachment?.name) {
      mailOptions.attachments = [
        {
          filename: attachment.name,
          content: attachment.data,
          encoding: "base64",
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "Failed to send message.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
