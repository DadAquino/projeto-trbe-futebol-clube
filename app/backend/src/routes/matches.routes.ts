import { Request, Router, Response } from 'express';
import MatchController from '../controllers/match.controller';

import Middleware from '../middlewares/validator.middleware.ts';

const matchController = new MatchController();

const router = Router();

router.post(
  '/',
  Middleware.tokenValidator,
  Middleware.teamValidator,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.patch(
  '/:id',
  Middleware.tokenValidator,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
router.patch(
  '/:id/finish',
  Middleware.tokenValidator,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.get('/:id', (req: Request, res: Response) => matchController.getByIdMatch(req, res));

export default router;
