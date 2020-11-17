import express from "express";
import bodyparser from "body-parser";
import methodoverride from "method-override";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerDoc from "../swagger.json";
import routes from "./routes/index.js";

dotenv.config();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(methodoverride());
app.use(routes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// finally, let's start our server...
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default server;
