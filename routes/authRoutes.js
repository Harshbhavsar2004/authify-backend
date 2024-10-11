import express from 'express';
import { registerUser, loginUser, registerDeveloper } from '../controllers/authController.js';

const router = express.Router();

router.post('/register-developer', registerDeveloper);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;