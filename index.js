const express = require('express');
const winston = require('winston');
const Router = require('./src/router');
const consts = require('./src/consts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Express
const app = express();
app.use(bodyParser.urlencoded());

// Logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: consts.DEBUG_LEVEL,
      colorize: true,
      prettyPrint: true,
    }),
  ],
});

const router = new Router(app, logger);

mongoose.connection.on('connected', () => {
  logger.debug('Connected to mongodb');
});

// Database connection
mongoose.connect(`mongodb://${consts.MONGO_HOST}/test`);
router.listen(consts.PORT);
