const {
  db,
  user,
  password,
  host,
  dialect,
  pool,
} = require("../../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(db, user, password, {
  host,
  dialect,
  pool,
  operatorsAliases: 0,
});

const users = require("./users.js")(sequelize, Sequelize);
const favorites = require("./favorites.js")(sequelize, Sequelize);

module.exports = {
  Sequelize,
  sequelize,
  users,
  favorites,
};
