import logger from "../utils/logger";
import { NextFunction, Request, Response } from 'express';

async function loggerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Here we can log our request
    next();
}

export default {
    loggerMiddleware
}
