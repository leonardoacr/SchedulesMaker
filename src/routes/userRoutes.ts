import { Router } from 'express';
import * as homeController from '../controllers/homeController';
import * as loginController from '../controllers/loginController';
import * as weekController from '../controllers/weekController';
import * as schedulesController from '../controllers/schedulesController';

import { middlewareLoginRequired } from '../middlewares/loginRequired';
import {
  middlewareRegisterAuth,
  middlewareLoginAuth
} from '../middlewares/auth';

const router = Router();

// Home routes
router.get('/', homeController.index);

// sign in routes
router.get('/login', loginController.signIn);
router.post('/login', middlewareLoginAuth, loginController.userLogin);

// sign up routes
router.get('/register', loginController.signUp);
router.post('/register', middlewareRegisterAuth, loginController.userRegister);

// sign out routes
router.get('/logout', loginController.signOut);

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
  weekController.weekDays
);

export default router;
