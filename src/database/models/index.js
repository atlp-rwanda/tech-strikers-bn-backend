/* eslint-disable import/no-dynamic-require */
import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";
import envConfigs from "../config/config";

dotenv.config();

const basename = _basename(__filename);
const env = process.env.NODE_ENV;
const config = envConfigs[env];
const db = {};
let sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url, config);
  console.log("DB connected");
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(
    (file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
