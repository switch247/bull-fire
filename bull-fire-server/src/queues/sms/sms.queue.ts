import { Queue } from 'bullmq';
import { redisConnection } from '@/config/redis';

export const smsQueue = new Queue('SMS', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'fixed', delay: 10000 },
  },
});

// SMS alert every 5 min
smsQueue.add(
  'System Alert',
  { to: '+123456789', message: 'Server OK' },
  { repeat: { every: 300000 } }
);