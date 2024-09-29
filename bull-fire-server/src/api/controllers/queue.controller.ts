// src/api/controllers/queue.controller.ts
import { Request, Response } from "express";
import { emailQueue } from "../../queues/email";
import { smsQueue } from "../../queues/sms";

export const getQueueStats = async (_: Request, res: Response) => {
  const [email, sms] = await Promise.all([
    getFullStats(emailQueue),
    getFullStats(smsQueue),
  ]);

  res.json({
    timestamp: new Date().toISOString(),
    queues: { Email: email, SMS: sms },
  });
};

const getFullStats = async (queue: any) => {
  const [waiting, active, completed, failed, delayed, paused, repeatable] =
    await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
      queue.getDelayed(),
      queue.isPaused(),
      queue.getRepeatableJobs(),
    ]);

  return {
    name: queue.name,
    counts: {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length,
      paused,
    },
    repeatable: repeatable.map((j: any) => ({
      name: j.name,
      cron: j.cron,
      next: new Date(j.next).toISOString(),
    })),
    jobs: {
      waiting: waiting.map(formatJob),
      active: active.map(formatJob),
      recentFailed: (await queue.getFailed(0, 4)).map(formatJob),
    },
  };
};

const formatJob = (j: any) => ({
  id: j.id,
  name: j.name,
  data: j.data,
  progress: j.progress,
  attempts: `${j.attemptsMade}/${j.opts.attempts}`,
  priority: j.opts.priority || 0,
  timestamp: new Date(j.timestamp).toISOString(),
  failedReason: j.failedReason,
});
