import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';
import * as authController from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import accountRouter from './accountRoutes.js';
import categoryRouter from './categoryRoutes.js';
import userRouter from './userRoutes.js';

const router = Router();

// Health check
router.get('/health', healthController.health);

// Authentication routes (public)
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// Protected routes
router.get('/auth/me', authenticateToken, authController.getCurrentUser);

// User routes (protected)
router.use('/', userRouter);

// Account routes
router.use('/', accountRouter);

//Category routes
router.use('/', categoryRouter);

router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default router;
