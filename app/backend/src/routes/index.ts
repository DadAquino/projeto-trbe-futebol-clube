import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import loginRouter from './login.routes';
import matchesRoutes from './matches.routes';
import leaderboardRoutes from './leaderboard.routes';

const router = Router();

router.use('/leaderboard', leaderboardRoutes);

router.use('/matches', matchesRoutes);
router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/users', usersRouter);

export default router;
