import { Router } from 'express';
import * as homeController from '../controllers/homeController';
import * as loginController from '../controllers/loginController';
import * as weekController from '../controllers/weekController';
import * as schedulesController from '../controllers/schedulesController';

import { middlewareLoginRequired } from '../middlewares/loginRequirement';

const router = Router();

// Home routes 
router.get('/', homeController.index);

// sign in routes
router.get('/login', loginController.signIn);
router.post('/login', loginController.userLogin);

// sign up routes 
router.get('/register', loginController.signUp);
router.post('/register', loginController.userRegister);

// Schedules routes
router.get('/schedules', schedulesController.schedules)

// week days schedules routes
router.get('/schedules/week-days/monday', middlewareLoginRequired, weekController.weekDays)


export default router; 
