module.exports = (sequelize, Sequelize) => {
    const CustomerTokenSchema = sequelize.define('customer_token', {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return CustomerTokenSchema;
};
