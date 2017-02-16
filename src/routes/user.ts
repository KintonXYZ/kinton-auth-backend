import { NextFunction, Request, Response, Router } from "express";
import { Device } from "../models/device";

export class UserRoute {
  public static create(router: Router) {
    router.post("/auth/user",
      (req: Request, res: Response, next: NextFunction) => {
        new UserRoute().handle(req, res, next);
      });
  }

  public handle(req: Request, res: Response, next: NextFunction): Response {
    // TODO Remove hardcoded admin credentials
    console.log(req.body);
    if (!req.body || !req.body.username || !req.body.password) {
      return res.send("deny");
    }

    if (req.body.username === "admin" && req.body.password === "admin") {
      return res.send("allow administrator");
    }

    Device.findById(req.body.username, (err, device) => {
      if (err) {
        res.send("deny");
        throw err;
      }
      if (!device) { return res.send("deny"); }
      if (device.secret === req.body.password
        && device.fleetId === req.body.vhost) {
        return res.send("allow");
      }

      return res.send("deny");
    });
  }
}
