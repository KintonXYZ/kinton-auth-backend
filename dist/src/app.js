"use strict";
const config = require("../config/config");
const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const user_1 = require("./routes/user");
const vhost_1 = require("./routes/vhost");
const resource_1 = require("./routes/resource");
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
class Server {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap() {
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
    config() {
        this.app.use(logger);
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(errorHandler());
        this.app.use((err, req, res, next) => {
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
    routes() {
        const router = express.Router();
        user_1.UserRoute.create(router);
        vhost_1.VhostRoute.create(router);
        resource_1.ResourceRoute.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
