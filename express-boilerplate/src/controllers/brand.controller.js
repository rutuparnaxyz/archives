const brandService = require('../services/brand.service');
const httpConfig = require('../utils/httpConfig');

async function addBrand(req, res){
    try {
        const brand = await brandService.addBrand(req.body);
        httpConfig.sendResponse(res, 201, 'Brand created successfully', brand);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

module.exports = {
    addBrand
}