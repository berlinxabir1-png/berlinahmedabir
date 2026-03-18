import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// Supabase initialization
const getSupabase = () => {
  const url = process.env.SUPABASE_URL || "https://dxnuvpmbupilgmmczedi.supabase.co";
  const key = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bnV2cG1idXBpbGdtbWN6ZWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTY0NDYsImV4cCI6MjA4OTMzMjQ0Nn0.RvIKv7tbVjNPEaKX1jrfkUCtAWRR4syoMMNBAd6o1c0";
  
  if (!url || !url.startsWith('http')) {
    return null;
  }
  
  return createClient(url, key);
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;
  const supabase = getSupabase();

  app.use(express.json());

  // API Routes
  app.get("/api/votes", async (req, res) => {
    try {
      if (!supabase) {
        return res.json({ likes: 0, dislikes: 0, ratings: [] });
      }

      const { data: votesData, error: votesError } = await supabase
        .from("votes")
        .select("type");

      const { data: ratingsData, error: ratingsError } = await supabase
        .from("ratings")
        .select("value, created_at");

      if (votesError || ratingsError) throw votesError || ratingsError;

      const likes = votesData?.filter(v => v.type === "like").length || 0;
      const dislikes = votesData?.filter(v => v.type === "dislike").length || 0;
      const ratings = ratingsData?.map(r => ({ value: r.value, timestamp: r.created_at })) || [];

      res.json({ likes, dislikes, ratings });
    } catch (err) {
      console.error("Supabase fetch error:", err);
      res.status(500).json({ error: "Failed to fetch votes" });
    }
  });

  app.post("/api/vote", async (req, res) => {
    const { type } = req.body;
    try {
      if (!supabase) {
        return res.status(500).json({ error: "Supabase not configured" });
      }

      const { error } = await supabase
        .from("votes")
        .insert([{ type }]);

      if (error) throw error;

      // Return updated counts
      const { data: votesData } = await supabase.from("votes").select("type");
      const { data: ratingsData } = await supabase.from("ratings").select("value, created_at");

      const likes = votesData?.filter(v => v.type === "like").length || 0;
      const dislikes = votesData?.filter(v => v.type === "dislike").length || 0;
      const ratings = ratingsData?.map(r => ({ value: r.value, timestamp: r.created_at })) || [];

      res.json({ likes, dislikes, ratings });
    } catch (err) {
      console.error("Supabase vote error:", err);
      res.status(500).json({ error: "Failed to save vote" });
    }
  });

  app.post("/api/rate", async (req, res) => {
    const { rating } = req.body;
    try {
      if (!supabase) {
        return res.status(500).json({ error: "Supabase not configured" });
      }

      const { error } = await supabase
        .from("ratings")
        .insert([{ value: rating }]);

      if (error) throw error;

      // Return updated counts
      const { data: votesData } = await supabase.from("votes").select("type");
      const { data: ratingsData } = await supabase.from("ratings").select("value, created_at");

      const likes = votesData?.filter(v => v.type === "like").length || 0;
      const dislikes = votesData?.filter(v => v.type === "dislike").length || 0;
      const ratings = ratingsData?.map(r => ({ value: r.value, timestamp: r.created_at })) || [];

      res.json({ likes, dislikes, ratings });
    } catch (err) {
      console.error("Supabase rating error:", err);
      res.status(500).json({ error: "Failed to save rating" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'canikissyousuzu@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Email send error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
