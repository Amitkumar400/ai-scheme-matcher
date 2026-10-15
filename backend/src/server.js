import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import apiRouter from "./routes/api.js";
import { seedSchemes, setDatabaseReady } from "./services/schemeService.js";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "16kb", strict: true }));
app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api", rateLimit({ windowMs: 60_000, limit: 90, standardHeaders: "draft-7", legacyHeaders: false }));
app.use("/api", apiRouter);
app.use((error, _request, response, _next) => {
  console.error("API request failed:", error.message);
  response.status(500).json({ error: "The request could not be completed. Please try again." });
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
      setDatabaseReady(true);
      await seedSchemes();
      console.info("MongoDB connected; scheme data is database-backed.");
    } catch (error) {
      console.warn(`MongoDB unavailable (${error.message}); using the seeded demo dataset in memory.`);
      await mongoose.disconnect().catch(() => {});
    }
  } else {
    console.info("MONGODB_URI not set; using the seeded demo dataset in memory.");
  }
  app.listen(port, () => console.info(`AI Scheme Matcher API listening on http://localhost:${port}`));
}

start();
