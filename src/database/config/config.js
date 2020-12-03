require("dotenv").config();

module.exports = {
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
    logging: false
  },
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: false
  }
};
