module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
        customer_id: {
            type: Sequelize.INTEGER
        },
        google_id: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.BIGINT(11),
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Customer;
};
