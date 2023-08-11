import { Router } from 'express';
import UsersController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));

// Auxílio do meu mentor Pablo e meu colega de turma Allex Thiago
router.get('/role', Validations.validateToken, (req, res) => UsersController.getRole(req, res));

export default router;