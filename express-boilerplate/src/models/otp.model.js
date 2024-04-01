module.exports = (sequelize, Sequelize) => {
    const OtpSchema = sequelize.define('otp', {
        otp: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        contact_number: {
            type: Sequelize.BIGINT(11),
            allowNull: false
        },
        expiry_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        is_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return OtpSchema;
};
