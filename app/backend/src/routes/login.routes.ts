import { Request, Router, Response } from 'express';
import UserController from '../controllers/user.controller';

import Middleware from '../middlewares/validator.middleware.ts';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Middleware.loginValidator,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Middleware.tokenValidator,
  (req: Request, res: Response) => UserController.role(req, res),
);

export default router;
