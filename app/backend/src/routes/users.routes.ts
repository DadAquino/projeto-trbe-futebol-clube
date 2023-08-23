import { Request, Router, Response } from 'express';
import UserController from '../controllers/user.controller';

import Middleware from '../middlewares/validator.middleware.ts';

const userController = new UserController();

const router = Router();

router.post(
  '/register',
  Middleware.tokenValidator,
  Middleware.userValidator,
  (req: Request, res: Response) => userController.createUser(req, res),
);

router.get('/', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/:id', (req: Request, res: Response) => userController.getByIdUser(req, res));

export default router;
