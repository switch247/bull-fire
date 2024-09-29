import { emailQueue } from "@/queues/email";
import { smsQueue } from "@/queues/sms";
import { QueueName } from "@/types/job.types";

const queues = { Email: emailQueue, SMS: smsQueue };

export const enqueueJob = async <T>(
  queueName: QueueName,
  data: T,
  opts: { delay?: number; priority?: number } = {}
) => {
  const queue = queues[queueName];
  const options: any = {};
  if (opts.delay) options.delay = opts.delay * 1000;
  if (opts.priority) options.priority = opts.priority;

  return await queue.add(`${queueName} Job`, data, options);
};
