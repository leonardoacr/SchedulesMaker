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

// week days schedules routes
router.get(
    '/schedules/week-days/monday',
    middlewareLoginRequired,
    weekController.weekDaysMonday
);

router.post(
    '/schedules/week-days/monday',
    middlewareLoginRequired,
    weekController.createNote
);

router.get(
    '/schedules/week-days/tuesday',
    middlewareLoginRequired,
    weekController.weekDaysTuesday
);

export default router;
