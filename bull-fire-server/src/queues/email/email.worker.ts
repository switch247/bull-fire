import { Worker, Job } from 'bullmq';
import { redisConnection } from '@/config/redis';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const emailWorker = new Worker(
  'Email',
  async (job: Job) => {
    const { to } = job.data;
    for (let i = 0; i <= 100; i += 10) {
      await sleep(200);
      await job.updateProgress(i);
      await job.log(`Sending to ${to} → ${i}%`);
    }
    return { sent: true, to };
  },
  {
    connection: redisConnection,
    concurrency: 5,
    limiter: { max: 10, duration: 1000 },
  }
);

emailWorker.on('failed', (job, err) => {
  console.error(`Email job ${job?.id} failed:`, err.message);
});