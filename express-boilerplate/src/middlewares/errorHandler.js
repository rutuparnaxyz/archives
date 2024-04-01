const winston = require('../utils/winston');
const httpConfig = require('../utils/httpConfig');

function notFoundErrorHandler(req, res, next) {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
}

function commonErrorHandler(err, req, res, next) {
    winston.error(`${(new Date()).toISOString()} -${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    httpConfig.sendErrorResponse(res, err.status, err.message);
    next();
}

module.exports = {
    notFoundErrorHandler,
    commonErrorHandler
}