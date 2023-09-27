const config = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  port: config.PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define model example
db.attacker = require("./Attackers")(sequelize, Sequelize);
db.users = require("./Users")(sequelize, Sequelize);
db.survey = require("./Surveys")(sequelize, Sequelize);

// relation example
// relation between survey and user
// db.users.hasMany(db.survey, {
//   as: "users",
//   onDelete: "cascade",
//   onUpdate: "cascade",
// });

db.survey.belongsTo(db.users, {
  foreignKey: "userId",
  as: "survey",
});

module.exports = db;
