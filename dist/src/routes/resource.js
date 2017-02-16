"use strict";
class ResourceRoute {
    static create(router) {
        router.post("/auth/resource", (req, res, next) => {
            new ResourceRoute().handle(req, res, next);
        });
    }
    handle(req, res, next) {
        return res.send("allow");
    }
}
exports.ResourceRoute = ResourceRoute;
