const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require('./users')(sequelize,Sequelize);
db.Organizations = require('./organizations')(sequelize,Sequelize)

/*1:N User:Organization */
db.Users.hasMany(db.Organizations,{onDelete:'cascade'})
db.Organizations.belongsTo(db.Users)

module.exports = db;