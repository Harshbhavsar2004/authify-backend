import express from 'express';
import { registerUser, loginUser, registerDeveloper } from '../controllers/authController.js';
import { validateApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register-developer', registerDeveloper);
router.post('/register', validateApiKey, registerUser);
router.post('/login', validateApiKey, loginUser);

export default router;