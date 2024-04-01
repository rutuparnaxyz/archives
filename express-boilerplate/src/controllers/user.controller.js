const userService = require('../services/user.service');
const httpConfig = require('../utils/httpConfig');

async function createUser(req, res){
    try {
        const user = await userService.createUser(req.body);
        httpConfig.sendResponse(res, 201, 'User created successfully', user)
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

async function loginUser(req, res, next){
    try {
        const user = await userService.loginUser(req.body.email, req.body.password);
        httpConfig.sendResponse(res, 200, 'Login successful.', user)
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

async function logoutUser(req, res){
    try {
        const response = await userService.logoutUser(req.token);
        httpConfig.sendResponse(res, 200, 'Successfully logged out.', response)
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
}