import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

export const logger = morgan('combined', {
  stream: {
    write: (message) => console.log(message.trim()),
  },
});