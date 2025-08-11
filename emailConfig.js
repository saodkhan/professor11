import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hgfver414@gmail.com", // apna Gmail
    pass: "your-app-password",   // Gmail App Password (normal password nahi chalega)
  },
});
