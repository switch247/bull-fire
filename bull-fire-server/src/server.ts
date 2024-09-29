import "tsconfig-paths/register";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import {
  metricsRoute,
  logger,
  errorHandler,
  metricsMiddleware,
  rateLimiter,
} from "@/api/middleware/index";

import api_routes from "@/api/routers";
import { setupBullBoard } from "@/ui/bullboard";
import { startQueueWorkers } from "@/queues";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/metrics", metricsRoute);

// API ROUTES
app.use("/api", api_routes);
setupBullBoard(app);

// SPA
// app.get("*", (req, res) => {
//   if (req.path.startsWith("/ui") || req.path.startsWith("/api")) return;
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.use(logger, errorHandler, metricsMiddleware, rateLimiter);

// START SERVER + WORKERS
const PORT = Number(process.env.PORT ?? 5000);
const HOST = process.env.HOST ?? "http://localhost";
const server = app.listen(PORT, async () => {
  console.log(`Server LIVE → ${HOST}:${PORT}`);
  console.log(`frontend:       ${HOST}:${PORT}`);
  console.log(`Board:    ${HOST}:${PORT}/ui`);
  console.log(`Health:   ${HOST}:${PORT}/api/jobs/health`);

  try {
    await startQueueWorkers(); // ← EXPLICIT START
  } catch (err) {
    console.error("Failed to start workers:", err);
    process.exit(1);
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
