const express = require('express');
const winston = require('winston');
const Router = require('./src/router');
const consts = require('./src/consts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const Fleet = require('./src/models/fleet');

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
  router.listen(consts.PORT);

  // const newFleet = Fleet({
  //   _id: 'starlord55',
  // });
  //
  // // save the user
  // newFleet.save((err) => {
  //   if (err) throw err;
  //
  //   console.log('User created!');
  // });
});

// Database connection
mongoose.connect('mongodb://mqtt.kinton.xyz/test');
