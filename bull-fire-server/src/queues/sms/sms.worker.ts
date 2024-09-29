import { Worker, Job } from 'bullmq';
import { redisConnection } from '@/config/redis';

export const smsWorker = new Worker(
  'SMS',
  async (job: Job) => {
    const { to, message } = job.data;
    await job.log(`SMS → ${to}: ${message}`);
    await new Promise(r => setTimeout(r, 1500));
    return { delivered: true };
  },
  { connection: redisConnection }
);