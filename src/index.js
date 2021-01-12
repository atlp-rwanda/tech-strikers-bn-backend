import express from "express";
import bodyparser from "body-parser";
import methodoverride from "method-override";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerDoc from "../swagger.json";
import routes from "./routes/index.js";
import i18n from "./utils/i18n";
dotenv.config();

require("./config/passport").default(passport);
const __dirname = path.resolve();
const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodoverride());
app.use(express.static(`${__dirname}/public`));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(i18n.init);

app.get("/home", (req, res, next) => res.status(200).json({
  message: res.__("welcome"),
}));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/// catch 404 and forward to error handler
/*app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
*/
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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
export default server;
