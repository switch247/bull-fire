import { Request, Response } from "express";
import { enqueueJob } from "@/api/services/job.service";
import { QueueName } from "@/types/job.types";

export const addJob = async (req: Request, res: Response) => {
  const { queue = "Email", to, message, delay, priority } = req.query;

  if (!["Email", "SMS"].includes(queue as string)) {
    return res.status(400).json({ error: "Invalid queue" });
  }

  const job = await enqueueJob(
    queue as QueueName,
    {
      to: to || "test@bullfire.com",
      message,
    },
    {
      delay: delay ? +delay : undefined,
      priority: priority ? +priority : undefined,
    }
  );

  res.json({ jobId: job.id, queue, status: "queued" });
};
