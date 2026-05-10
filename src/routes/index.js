import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/health', healthController.health);

router.get('/users', userController.list);
router.post('/users', userController.create);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.remove);

router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});


export default router;
