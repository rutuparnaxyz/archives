const customerService = require('../services/customer.service');
const httpConfig = require('../utils/httpConfig');

async function contactLogin(req, res) {
    try {
        const customer = await customerService.contactLogin(req.body);
        httpConfig.sendResponse(res, 200, 'Login successful', customer);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

async function contactRegister(req, res) {
    try {
        const customer = await customerService.contactRegister(req.body)
        httpConfig.sendResponse(res, 201, 'User registration successful.', customer);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

async function generateOtp(req, res) {
    try {
        const otpObj = await customerService.generateOtp(req.body);
        httpConfig.sendResponse(res, 200, 'Otp created successfully.', otpObj);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

async function logoutCustomer(req, res){
    try {
        const response = await customerService.logoutCustomer(req.token);
        httpConfig.sendResponse(res, 200, 'Successfully logged out.', response)
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}



module.exports = {
    generateOtp,
    contactLogin,
    contactRegister,
    logoutCustomer
}
