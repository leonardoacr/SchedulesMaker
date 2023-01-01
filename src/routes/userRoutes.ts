import { Router } from 'express';
import * as homeController from '../controllers/homeController';
import * as loginController from '../controllers/loginController';
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

export default router;
