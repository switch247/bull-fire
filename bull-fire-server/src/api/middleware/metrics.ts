import { collectDefaultMetrics, Registry, Gauge } from "prom-client";

const register = new Registry();
collectDefaultMetrics({ register });

export const httpRequestsTotal = new Gauge({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

export const queueJobs = new Gauge({
  name: "bullmq_jobs_total",
  help: "Jobs in queue",
  labelNames: ["queue", "status"],
  registers: [register],
});

export const metricsMiddleware = async (req: any, res: any, next: any) => {
  const end = httpRequestsTotal.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
};

// Expose /metrics
export const metricsRoute = async (_: any, res: any) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};
