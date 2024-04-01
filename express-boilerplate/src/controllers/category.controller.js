const categoryService = require('../services/category.service');
const httpConfig = require('../utils/httpConfig');

async function addCategory(req, res){
    try {
        const category = await categoryService.addCategory(req.body);
        httpConfig.sendResponse(res, 201, 'Category created successfully', category);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

module.exports = {
    addCategory
}