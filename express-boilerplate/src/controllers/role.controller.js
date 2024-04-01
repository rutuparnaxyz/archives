const roleService = require('../services/role.service');
const httpConfig = require('../utils/httpConfig');

async function createRole(req, res) {
    try {
        const role = await roleService.createRole(req.body);
        httpConfig.sendResponse(res, 201, 'Role created successfully', role);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

async function getRoles(req, res){
    try {
        const roles = await roleService.getRoles();
        httpConfig.sendResponse(res, 201, 'Role fetched successfully.', roles);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

module.exports = {
    createRole,
    getRoles
}