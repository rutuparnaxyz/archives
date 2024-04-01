const Sequelize = require('sequelize');
const permissions = require('../../config/permission.config')
//const config = require('../../config/database.config').uat;
//const config = require('../../config/database.config').development;
const config = require('../../config/database.config').local;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging,
  define: {
    underscored: config.define.underscored
  }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Table
db.customer = require('../models/customer.model')(sequelize, Sequelize)
db.otp = require('../models/otp.model')(sequelize, Sequelize)
db.user = require('../models/user.model')(sequelize, Sequelize)
db.role = require('../models/role.model')(sequelize, Sequelize)
db.userToken = require('../models/userToken.model')(sequelize, Sequelize)
db.customerToken = require('../models/customerToken.model')(sequelize, Sequelize)

//Associations
db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.user.hasMany(db.userToken);
db.userToken.belongsTo(db.user);

db.customer.hasMany(db.customerToken);
db.customerToken.belongsTo(db.customer);


//Default creation
db.role.create({
  name: 'Admin',
  permissions: JSON.stringify(permissions.map(p => p.name))
})

db.user.create({
  first_name: 'Buyergains',
  last_name: 'Admin',
  email: 'admin@buyergains.com',
  contact_number: 9987645432,
  address: 'Plot-1096, Dummy Place',
  roleId: 1
})

module.exports = db