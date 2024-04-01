import { NextFunction, Request, Response } from 'express';
import stocksService from '../services/stocks.service';
import * as _ from 'lodash';

async function getCurrentStockLevels(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const sku = _.get(req, 'query.sku', '') as string;
        let result = await stocksService.getCurrentStockLevels(sku);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Some error occured");
    }
}

export default {
    getCurrentStockLevels
}

