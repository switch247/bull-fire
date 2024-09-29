import { Router } from 'express';
import { addJob } from '@/api/controllers/job.controller';

const router = Router();
router.get('/add', addJob);
export default router;