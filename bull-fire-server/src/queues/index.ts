import { emailWorker } from "./email";
import { smsWorker } from "./sms";

export const startQueueWorkers = async () => {
  console.log("Starting Queue Workers...");

  // Workers are already instantiated — just ensure they’re alive
  await Promise.all([emailWorker.waitUntilReady(), smsWorker.waitUntilReady()]);

  console.log("All workers ready");
  console.log("Email Queue: Email");
  console.log("SMS Queue:   SMS");
};
