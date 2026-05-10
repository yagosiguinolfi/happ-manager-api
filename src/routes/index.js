import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/health', healthController.health);

router.get('/users', userController.list);
router.post('/users', userController.create);

export default router;
