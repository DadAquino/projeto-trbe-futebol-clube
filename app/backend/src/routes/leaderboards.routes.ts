import { Request, Response, Router } from 'express';
import LeaderboardsController from '../controllers/LeaderBoardController';

// Auxílio do meu colega Allex Thiago
const leaderboardsController = new LeaderboardsController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardsController.leaderboardHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardsController.leaderboardHome(req, res),
);

export default router;
