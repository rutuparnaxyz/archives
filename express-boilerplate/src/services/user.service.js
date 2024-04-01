const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config/common.config');
const User = require('../db/sequelize').user;
const Role = require('../db/sequelize').role;
const UserToken = require('../db/sequelize').userToken;

async function createUser(userBody){
    try {
        const user = await User.create(userBody);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Unable to login')
        }

        const userRole = await Role.findOne({ where: { id: user.roleId } })
        const token = jwt.sign({ id: user.id, role: userRole.name }, config.JWT_SECRET);
        await UserToken.create({ token: token, userId: user.id })
        
        return { user, token }
    } catch (error) {
        throw new Error(error.message)
    }
}

async function logoutUser(token) {
    try {
        const tokenObj = await UserToken.findOne({ where: { token: token } })
        tokenObj.update({ is_active: false });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
}


    