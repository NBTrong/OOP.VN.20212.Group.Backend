import express, { Response as ExResponse, Request as ExRequest } from "express";
import logger from "./loggers/logger";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";
import { RegisterRoutes } from "@n-routes/routes";

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

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: false, limit: "50mb" }));
    this.app.use(morgan("tiny"));
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.disable("etag");
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
  }

  public start() {
    this.app.listen(this.port, () => {
      logger.info("Server express listen at port:" + Number(this.port));
    });
  }
}
