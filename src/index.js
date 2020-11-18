const fs = require("fs"),
  http = require("http"),
  path = require("path"),
  methods = require("methods"),
  express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cors = require("cors"),
  passport = require("passport"),
  errorhandler = require("errorhandler"),
  swaggerUi = require("swagger-ui-express"),
  Users = require("./database/seeders/user.json"),
  swaggerDoc = require("../swagger.json"),
  { Sequelize } = require('sequelize');
  require("dotenv").config()

const isProduction = process.env.NODE_ENV === "production";
const {development} = require("./database/config/config");
const { host } = development;
// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("method-override")());

app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: "authorshaven",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
//CONNECTING APP TO POSTGRESS

  const sequelize = new Sequelize(development.url, {
    host: host,
    dialect: 'postgres' 
  });

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connectDb();
  
app.use(require("./routes"));

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
    })
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

module.exports = server;
