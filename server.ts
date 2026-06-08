import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API contact endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          error: "Name, email, and message are required." 
        });
      }

      const emailAddress = process.env.EMAIL_ADDRESS || "hello@rizwanwebdev.com";
      const apiKey = process.env.RESEND_API_KEY;

      if (!apiKey) {
        console.warn("RESEND_API_KEY is not set. Simulating email dispatch.");
        return res.json({
          success: true,
          simulated: true,
          message: "Message received! (Simulation Mode: Set RESEND_API_KEY to send real emails)",
          data: { name, email, message }
        });
      }

      const resend = new Resend(apiKey);
      const emailResponse = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: emailAddress,
        replyTo: email,
        subject: `Inquiry from ${name} (Portfolio)`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #1c1b1b; background-color: #fcf9f8; border: 1px solid #c5c5d5; border-radius: 8px;">
            <h2 style="color: #324db6; margin-top: 0;">New In-Bound Contact Form Submission</h2>
            <hr style="border: 0; border-top: 1px dashed #757684; margin: 15px 0;" />
            <p><strong>Scribbled Name:</strong> ${name}</p>
            <p><strong>Return Stamp:</strong> ${email}</p>
            <p><strong>Message Canvas:</strong></p>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; border: 2px solid #1c1b1b; white-space: pre-wrap; font-family: monospace;">${message}</div>
            <p style="font-size: 11px; margin-top: 25px; color: #757684;">Sent from Rizwan Portfolio Design System</p>
          </div>
        `
      });

      if (emailResponse.error) {
        throw new Error(emailResponse.error.message);
      }

      return res.json({ success: true, response: emailResponse.data });
    } catch (error: any) {
      console.error("Error in /api/contact endpoint:", error);
      return res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to deliver client's request message." 
      });
    }
  });

  // Vite development middleware vs Static Production server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server initiated successfully and running on port ${PORT}`);
  });
}

startServer();
