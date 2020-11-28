import express from "express";
import Sequelize from "sequelize";
import bodyParser from "body-parser";
import session from "express-session";
import methodoverride from "method-override";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import swaggerDoc from "../swagger.json";
import routes from "./routes/index.js";
import { development } from "./database/config/config.js";
dotenv.config();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const isProduction = process.env.NODE_ENV === "production";
const { API_VERSION } = process.env;
console.log(API_VERSION);
// Create global app object
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);
// Normal express config defaults
// app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodoverride());
app.use(express.static(`${__dirname}/public`));
app.use(
  session({
    secret: "authorshaven",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
// CONNECTING APP TO POSTGRESS

const sequelize = new Sequelize(development.url, {
  dialect: "postgres"
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDb();

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/// catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// finally, let's start our server...
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const funcToTest = (a, b) => b;

export default { server, funcToTest };
