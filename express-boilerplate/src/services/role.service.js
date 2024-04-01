const Role = require('../db/sequelize').role;
const Permissions = require('../../config/permission.config');

async function createRole(roleBody){
    try {
        const p = []
        const permissions1 = new Set(roleBody.permissions);
        Permissions.forEach(permission2 => {
            if (permissions1.has(permission2.id)) {
                p.push(permission2)
            }
        });

        const l = p.map(p=> p.name)
        const { permissions, ...role1 } = roleBody;
        role1.permissions = JSON.stringify(l);
        const role = await Role.create(role1)
        return role;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getRoles(){
    try {
        const roles = await Role.findAll();
        return roles;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createRole,
    getRoles
}