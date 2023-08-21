import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import loginRouter from './login.routes';
import matchesRouter from './matches.routes';
import leaderboardsRouter from './leaderboards.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardsRouter);

export default router;
