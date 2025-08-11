// emailConfig.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hgfver414@gmail.com",
    pass: "lzgq siya aeus xogl"
  }
});
