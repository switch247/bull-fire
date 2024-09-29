import { Queue } from "bullmq";
import { redisConnection } from "@/config/redis";

export const emailQueue = new Queue("Email", {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 5,
    backoff: { type: "exponential", delay: 5000 },
  },
});

// Daily digest
emailQueue.add(
  "Daily Digest",
  { to: "admin@company.com", template: "digest" },
  { repeat: { cron: "0 9 * * *" } as any, priority: 10 }
);
