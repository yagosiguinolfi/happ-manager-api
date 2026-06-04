import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';
import * as userController from '../controllers/userController.js';
import * as authController from '../controllers/authController.js';
import * as accountController from '../controllers/accountController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Health check
router.get('/health', healthController.health);

// Authentication routes (public)
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// Protected routes
router.get('/auth/me', authenticateToken, authController.getCurrentUser);

// User routes (protected)
router.get('/users', authenticateToken, userController.list);
router.post('/users', userController.create);
router.get('/users/:id', authenticateToken, userController.getById);
router.put('/users/:id', authenticateToken, userController.update);
router.delete('/users/:id', authenticateToken, userController.remove);

// Account routes (protected)
router.get('/accounts', authenticateToken, accountController.list);
router.post('/accounts', authenticateToken, accountController.create);
router.get('/accounts/:id', authenticateToken, accountController.getById);
router.put('/accounts/:id', authenticateToken, accountController.update);
router.delete('/accounts/:id', authenticateToken, accountController.remove);

router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default router;
