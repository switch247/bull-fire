// src/api/routers/queue.router.ts
import { Router } from "express";
import { getQueueStats } from "../controllers/queue.controller";

const router = Router();
router.get("/stats", getQueueStats);

export default router;
