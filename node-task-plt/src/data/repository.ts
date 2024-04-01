import fs from 'fs';
import path from 'path';
import { ITransaction } from '../interfaces/transaction.interface';
import { IStock } from '../interfaces/stock.interface';
import logger from '../utils/logger';
const STOCK_FILE_PATH = './src/data/sources/stocks.json';
const TRANSACTION_FILE_PATH = './src/data/sources/transactions.json';

async function getStocks() : Promise<IStock[]> {
    try {
        return JSON.parse(await fs.promises.readFile(path.resolve(STOCK_FILE_PATH), 'utf8'));
    } catch (error) {
        logger.error(error);
    }
}

async function getTransactions() : Promise<ITransaction[]> {
    try {
        return JSON.parse(await fs.promises.readFile(path.resolve(TRANSACTION_FILE_PATH), 'utf8'));
    } catch (error) {
        logger.error(error);
    }
}

export default {
    getStocks,
    getTransactions
}
