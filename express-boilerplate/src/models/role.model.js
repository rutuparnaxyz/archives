module.exports = (sequelize, Sequelize) => {
    const RoleSchema = sequelize.define('role', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        permissions: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return RoleSchema;
};
