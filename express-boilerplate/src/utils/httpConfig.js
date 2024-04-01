function sendResponse(res, statusCode, message, responseData) {
    var responseObj = {
        statusCode: statusCode,
        message: message,
        data: responseData,
        status: 'Success'
    }
    return res.status(statusCode).json(responseObj);
}

function sendErrorResponse(res, statusCode, errorMessage) {
    var errorObj = {
        statusCode: statusCode,
        message: errorMessage,
        status: 'Error'
    }
    return res.status(statusCode).json(errorObj);
}

module.exports = {
    sendResponse,
    sendErrorResponse
}