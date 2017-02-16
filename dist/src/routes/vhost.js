"use strict";
class VhostRoute {
    static create(router) {
        router.post("/auth/vhost", (req, res, next) => {
            new VhostRoute().handle(req, res, next);
        });
    }
    handle(req, res, next) {
        return res.send("allow");
    }
}
exports.VhostRoute = VhostRoute;
