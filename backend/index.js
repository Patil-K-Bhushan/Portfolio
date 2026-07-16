import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://bhushan-patil-portfolio.bpatil-00001.workers.dev", // Cloudflare Pages URL (no trailing slash)
  "https://bhushan-patil-portfolio.bpatil-00001.workers.dev/", // Cloudflare Pages URL (with trailing slash)
  // "https://yourdomain.com", // Add your custom domain later
];

app.use(
  cors({
    origin: allowedOrigins,
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

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email configuration error: EMAIL_USER or EMAIL_PASS is not set.");
    return res.status(500).json({
      success: false,
      error: "Email credentials not configured on the server. Please check environment variables.",
    });
  }

  // 1. If Resend API Key is configured, use Resend HTTP API (avoids Render SMTP port blocking)
  if (process.env.RESEND_API_KEY) {
    try {
      const emailPayload = {
        from: "Portfolio Form <onboarding@resend.dev>",
        to: process.env.EMAIL_TO || "bpatil.00001@gmail.com",
        reply_to: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };

      if (attachment?.data && attachment?.name) {
        emailPayload.attachments = [
          {
            filename: attachment.name,
            content: attachment.data,
          },
        ];
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send email via Resend.");
      }

      return res.status(200).json({
        success: true,
        message: "Message sent successfully via Resend.",
      });
    } catch (err) {
      console.error("Resend error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to send message.",
        details: err.message,
      });
    }
  }

  // 2. Otherwise, fall back to Gmail SMTP (Nodemailer)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email configuration error: Neither RESEND_API_KEY nor EMAIL_USER/EMAIL_PASS is configured.");
    return res.status(500).json({
      success: false,
      error: "Email service is not configured on the server. Please set RESEND_API_KEY or EMAIL_USER/EMAIL_PASS in environment variables.",
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
    console.error("Nodemailer error:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to send message.",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
