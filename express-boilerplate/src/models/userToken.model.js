module.exports = (sequelize, Sequelize) => {
    const UserTokenSchema = sequelize.define('user_token', {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return UserTokenSchema;
};