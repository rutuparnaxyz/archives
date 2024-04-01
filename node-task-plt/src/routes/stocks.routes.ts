import { Router } from 'express';
import stocksController from '../controllers/stocks.controller'
import commonMiddleware from '../middlewares/common.middleware';

const router: Router = Router();

/**
 * GET /api/stock
 */
router.get('/', commonMiddleware.loggerMiddleware, stocksController.getCurrentStockLevels);


export const StockRoutes: Router = router;