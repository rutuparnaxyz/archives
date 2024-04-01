import { Router } from 'express';
import { StockRoutes } from './stocks.routes';

const router: Router = Router();

router.use('/stocks', StockRoutes);

export const CommonRouter: Router = router;