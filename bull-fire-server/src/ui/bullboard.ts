import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { emailQueue } from "../queues/email";
import { smsQueue } from "../queues/sms";
import express from "express";

export const setupBullBoard = (app: express.Application) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/ui");

  createBullBoard({
    queues: [new BullMQAdapter(emailQueue), new BullMQAdapter(smsQueue)],
    serverAdapter,
  });

  app.use("/ui", serverAdapter.getRouter());
};
