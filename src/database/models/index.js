import { readdirSync } from "fs";
import path, { basename as _basename } from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";
import envConfigs from "../config/config.js";
//dotenv.config();
const basename = _basename(__filename);
let env;
if (process.env.NODE_ENV === "test") { env = "test"; } else {
  env = "development";
}
const config = envConfigs[env];
const db = {};
let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
readdirSync(__dirname)
  .filter((file) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
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