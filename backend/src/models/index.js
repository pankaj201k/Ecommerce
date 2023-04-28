const config = require("../config/db.config");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.product = require("./product.model")(sequelize, Sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
