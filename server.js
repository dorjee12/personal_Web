require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path"); // ✅ FIXED

const app = express();

app.use(cors());
app.use(express.json());

// ==============================
// SERVE FRONTEND
// ==============================
app.use(express.static(path.join(__dirname, "personal-website")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "personal-website", "index.html"));
});

// ==============================
// EMAIL SETUP
// ==============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==============================
// SEND EMAIL
// ==============================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// ==============================
// START SERVER
// ==============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});