import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post("/register", userController.registerUser);

export default router;
