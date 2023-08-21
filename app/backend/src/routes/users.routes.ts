import { Router } from 'express';
import UsersController from '../controllers/UserController';

const userController = new UsersController();

const router = Router();

router.get('/', (req, res) => userController.getAllUsers(req, res));

router.get('/:id', (req, res) => userController.getUserById(req, res));

export default router;
