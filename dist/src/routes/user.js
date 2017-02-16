"use strict";
const device_1 = require("../models/device");
class UserRoute {
    static create(router) {
        router.post("/auth/user", (req, res, next) => {
            new UserRoute().handle(req, res, next);
        });
    }
    handle(req, res, next) {
        // TODO Remove hardcoded admin credentials
        console.log(req.body);
        if (!req.body || !req.body.username || !req.body.password) {
            return res.send("deny");
        }
        if (req.body.username === "admin" && req.body.password === "admin") {
            return res.send("allow administrator");
        }
        device_1.Device.findById(req.body.username, (err, device) => {
            if (err) {
                res.send("deny");
                throw err;
            }
            if (!device) {
                return res.send("deny");
            }
            if (device.secret === req.body.password
                && device.fleetId === req.body.vhost) {
                return res.send("allow");
            }
            return res.send("deny");
        });
    }
}
exports.UserRoute = UserRoute;
