const bcrypt = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
    const UserSchema = sequelize.define('user', {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            defaultValue: 'buyergains@123'
        },
        contact_number: {
            type: Sequelize.BIGINT(11),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    UserSchema.beforeCreate(async (user, options) => {
        return user.password = await bcrypt.hash(user.password, 8);
    });
    
    return UserSchema;
};
