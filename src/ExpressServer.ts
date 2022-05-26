import express, { Response as ExResponse, Request as ExRequest } from "express";
import logger from "./loggers/logger";
import errorMiddleware from "./middlewares/errorMiddleware";
import accessLoggerMiddleware from "./middlewares/accessLoggerMiddleware";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";
import { RegisterRoutes } from "@n-routes/routes";

var whitelist = [
  "https://nekowallet-dev-admin.nekoglobaldev.com",
  "https://nekowallet-stag-admin.nekoglobaldev.com",
  "https://nekowallet-dev-api.nekoglobaldev.com",
  "https://nekowallet-stag-api.nekoglobaldev.com",
  "https://nekowallet-admin.nekoglobaldev.com",
  "https://nekowallet-stag-api.nekoglobaldev.com",
  "http://localhost:9000",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

export default class ExpressServer {
  private app: express.Application;
  private readonly port: number;

  constructor(port: number = Number(process.env.PORT || 4000)) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(accessLoggerMiddleware);

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: false, limit: "50mb" }));
    this.app.use(morgan("tiny"));
    if (process.env.ENABLE_CORS) {
      this.app.use(cors());
    } else {
      this.app.use(cors(corsOptionsDelegate));
    }
    this.app.use(express.static("public"));
    this.app.disable("etag");
    if (process.env.ENABLE_SWAGGER) {
      this.app.use(
        "/swagger",
        swaggerUi.serve,
        async (_req: ExRequest, res: ExResponse) => {
          return res.send(
            swaggerUi.generateHTML(await import("../public/swagger.json"))
          );
        }
      );
    }
  }

  private initializeRoutes() {
    this.app.get(
      "/ping",
      function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) {
        res.status(200);
        res.json({ message: "pong" });
      }
    );

    RegisterRoutes(this.app);
    // console.log(this.app._router)

    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(404);
      res.json({ message: "404 Not found" });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public start() {
    this.app.listen(this.port, () => {
      logger.info("Server express listen at port:" + Number(this.port));
    });
  }
}
