import { Router } from "express";

import job_router from "./job.router";
import queue_router from "./queue.router";

const api_router = Router();

api_router.use("/jobs", job_router);
api_router.use("/queue", queue_router);

export default api_router;
