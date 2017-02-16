import * as config from "../config/config";

import * as express from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import errorHandler = require("errorhandler");

import { UserRoute } from "./routes/user";
import { VhostRoute } from "./routes/vhost";
import { ResourceRoute } from "./routes/resource";

// Logger
const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      level: config.logger.level,
      colorize: true,
      prettyPrint: true,
    }),
  ],
  meta: false,
  expressFormat: true,
  colorize: true,
});

export class Server {
  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  /**
  * Configure application
  *
  * @class Server
  * @method config
  */
  public config() {
    this.app.use(logger);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(errorHandler());
    this.app.use((
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      err.status = 404;
      next(err);
    });
  }

  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  public routes() {
    const router: express.Router = express.Router();

    UserRoute.create(router);
    VhostRoute.create(router);
    ResourceRoute.create(router);

    this.app.use(router);
  }
}
