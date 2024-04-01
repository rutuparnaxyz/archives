const jwt = require('jsonwebtoken');
const User = require('../db/sequelize').user;
const UserToken = require('../db/sequelize').userToken;
const Role = require('../db/sequelize').role;
const httpConfig = require('../utils/httpConfig');
const config = require('../../config/common.config');

function authorize(permission) {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const userToken = await UserToken.findOne({ where: { token: token, is_active: true } });
            if (!userToken || !decoded.id == userToken.userId) {
                throw new Error('Please authenticate')
            }
            const user = await User.findOne({ where: { id: userToken.userId } });
            const role = await Role.findOne({ where: { id: user.roleId } });
            const rolePermissions = JSON.parse(role.permissions);

            if (!user) {
                throw new Error('Please authenticate')
            }
            if (permission && !rolePermissions.includes(permission)) {
                throw new Error('You are not authorized.')
            }
            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            httpConfig.sendErrorResponse(res, 401, error.message);
        }
    }
}

module.exports = authorize