import nodemailer from "nodemailer";

async function sendTestEmail() {
  try {
    // ✅ Gmail SMTP setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hgfver414@gmail.com", // tumhara Gmail
        pass: "Ylzgq siya aeus xogl",   // Gmail App Password (spaces ke bina)
      },
    });

    // ✅ Test email
    const info = await transporter.sendMail({
      from: '"Professor Test" <hgfver414@gmail.com>',
      to: "YOUR-EMAIL@EXAMPLE.COM", // test ke liye apna email dal do
      subject: "SMTP Test - Nodemailer",
      text: "Yay! Gmail SMTP is working with App Password.",
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

sendTestEmail();
