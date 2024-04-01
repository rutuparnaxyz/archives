import { IResponse } from "../interfaces/response.interface";
import repository from '../data/repository';
import * as _ from 'lodash';
import logger from "../utils/logger";
import { IStock } from "../interfaces/stock.interface";
import { ITransaction } from "../interfaces/transaction.interface";
import { TransactionType } from "../enums/stocks.enum";

async function getCurrentStockLevels(sku: string): Promise<IResponse> {
    try {
        let queriedStock: IStock = await getStockBySku(sku);
        let queriedTransactions: ITransaction[] = await getTransactionsBySku(sku);
        console.log(queriedStock, queriedTransactions)
        // Check if SKU is present in any of the files otherwise throw error.
        if (!queriedStock && queriedTransactions.length <= 0) {
            logger.error(`SKU does not exist : ${sku}`);
            throw new Error(`SKU does not exist : ${sku}`);
        }
        let stockValue: number = _.get(queriedStock, 'stock', 0);
        _.each(queriedTransactions, (transaction) => {
            if (transaction.type === TransactionType.ORDER_TYPE) {
                stockValue -= transaction.qty;
            } else {
                stockValue += transaction.qty;
            }
        });
        stockValue = stockValue > 0 ? stockValue : 0;
        return { sku: sku, qty: stockValue };
    } catch (error: any) {
        console.log(error);
        logger.error(error);
        return error.message;
    }
}

async function getStockBySku(sku: string): Promise<IStock> {
    try {
        const stocks: IStock[] = await repository.getStocks();
        return stocks.find(stock => stock.sku === sku);
    } catch (error) {
        logger.error(error)
    }
}

async function getTransactionsBySku(sku: string): Promise<ITransaction[]> {
    try {
        const transactions: ITransaction[] = await repository.getTransactions();
        return transactions.filter(transaction => transaction.sku === sku);
    } catch (error) {
        logger.error(error);
    }
}

export default {
    getCurrentStockLevels,
    getStockBySku,
    getTransactionsBySku
}