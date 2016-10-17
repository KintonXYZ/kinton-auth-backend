// const Fleet = require('./models/fleet');
const Device = require('./models/device');

module.exports = class Router {
  constructor(app, logger) {
    this.app = app;
    this.logger = logger;

    this.app.post('/auth/user', (req, res) => {
      if (req.body.username === 'admin') {
        res.send('allow management');
        return;
      }

      Device.findById(req.body.username, (err, device) => {
        if (err) throw err;
        if (!device) {
          res.send('deny');
          return;
        }

        if (device.secret === req.body.password) {
          res.send('allow');
        } else {
          res.send('deny');
        }
      });
    });

    this.app.post('/auth/vhost', (req, res) => {
      res.send('allow');
    });

    this.app.post('/auth/resource', (req, res) => {
      if (req.body.resource === 'topic') {
        const fleetId = req.body.name.split('/')[0];

        Device.findById(req.body.username, (err, device) => {
          if (err) throw err;
          if (!device) {
            res.send('deny');
            return;
          }

          if (device.fleetId === fleetId) {
            res.send('allow');
          } else {
            res.send('deny');
          }
        });
      } else {
        res.send('allow');
      }
    });
  }

  listen(port) {
    this.app.listen(port, () => {
      this.logger.info(`Listening on port: ${port}`);
    });
  }
};
