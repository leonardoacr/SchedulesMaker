import { Router } from 'express';
import * as weekController from '../controllers/weekController';
import * as schedulesController from '../controllers/schedulesController';
import { middlewareLoginRequired } from '../middlewares/loginRequired';

const router = Router();

// Schedules routes
router.get(
  '/schedules',
  middlewareLoginRequired,
  schedulesController.schedules
);

router.post('/schedules', middlewareLoginRequired, schedulesController.getDay);

// week days schedules routes
// making dynamic routes because I'm lazy
router.get(
  '/schedules/week-days/:day',
  middlewareLoginRequired,
  weekController.weekDays
);

router.post(
  '/schedules/week-days/:day',
  middlewareLoginRequired,
  weekController.crudNote
);

export default router;
