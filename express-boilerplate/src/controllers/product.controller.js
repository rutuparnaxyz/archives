const productService = require('../services/product.service')
const httpConfig = require('../utils/httpConfig');

async function getProducts(req, res){
    try {
        const products = await productService.getProducts();
        httpConfig.sendResponse(res, 200, 'Successful', products);
    } catch (error) {
        httpConfig.sendErrorResponse(res, 500, error.message);
    }
}

module.exports = {
    getProducts
}