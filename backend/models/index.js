const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.compound = require('./compund.model')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);

module.exports = db;
