import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

const VOTES_FILE = path.join(process.cwd(), "votes.json");

// Initialize votes file if it doesn't exist
if (!fs.existsSync(VOTES_FILE)) {
  fs.writeFileSync(VOTES_FILE, JSON.stringify({ likes: 0, dislikes: 0, ratings: [] }));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/votes", (req, res) => {
    const data = JSON.parse(fs.readFileSync(VOTES_FILE, "utf-8"));
    res.json(data);
  });

  app.post("/api/vote", (req, res) => {
    const { type } = req.body;
    const data = JSON.parse(fs.readFileSync(VOTES_FILE, "utf-8"));
    
    if (type === "like") data.likes++;
    if (type === "dislike") data.dislikes++;
    
    fs.writeFileSync(VOTES_FILE, JSON.stringify(data));
    res.json(data);
  });

  app.post("/api/rate", (req, res) => {
    const { rating } = req.body;
    const data = JSON.parse(fs.readFileSync(VOTES_FILE, "utf-8"));
    
    data.ratings.push({
      value: rating,
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(VOTES_FILE, JSON.stringify(data));
    res.json(data);
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
