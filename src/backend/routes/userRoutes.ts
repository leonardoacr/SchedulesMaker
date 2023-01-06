import { Router } from 'express';
import * as homeController from '../controllers/homeController';
import * as loginController from '../controllers/loginController';
import * as configController from '../controllers/configController';
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

// Getting the URL images from the client and updating the database
router.put('/api/sendConfig', configController.getConfig);

// Route to ignore a bug that happens when we send a 'none' request to the server as imageUrl
router.get('/none', configController.none);

// Sending the URL images to the client from database
router.get('/api/getConfig', configController.sendConfig);

export default router;
