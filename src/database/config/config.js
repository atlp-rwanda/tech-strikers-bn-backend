import dotenv from "dotenv";

dotenv.config();

const env_configurations = {

  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    logging: true
  },
  test: {
    url: process.env.TEST_DEV_DATABASE_URL,
    dialect: "postgres",
    logging: true
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: true
  }
};

export default { env_configurations };
