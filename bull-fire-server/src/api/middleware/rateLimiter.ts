import { Request, Response, NextFunction } from 'express';

const requests = new Map<string, number[]>();

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const window = 1000;
  const max = 10;

  const times = requests.get(ip) || [];
  const valid = times.filter(t => now - t < window);
  requests.set(ip, valid);

  if (valid.length >= max) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  valid.push(now);
  next();
};