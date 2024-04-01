const jwt = require('jsonwebtoken');
const Customer = require('../db/sequelize').customer;
const CustomerToken = require('../db/sequelize').customerToken;
const httpConfig = require('../utils/httpConfig');
const config = require('../../config/common.config');

const authorize = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const customerToken = await CustomerToken.findOne({ where: { token: token, is_active: true } });
        if(!decoded.id == customerToken.customerId) {
            throw new Error ('Internal error occured.')
        }
        const customer = await Customer.findOne({ where: { id: customerToken.customerId } })

        if (!customer) {
            throw new Error('Internal error occured.')
        }
        req.token = token;
        req.customer = customer;
        next();
    } catch (e) {
        httpConfig.sendErrorResponse(res, 401, 'Please authenticate.');
    }
}

module.exports = authorize