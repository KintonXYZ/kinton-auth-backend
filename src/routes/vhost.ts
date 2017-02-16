import { NextFunction, Request, Response, Router } from "express";

export class VhostRoute {
  public static create(router: Router) {
    router.post("/auth/vhost",
      (req: Request, res: Response, next: NextFunction) => {
        new VhostRoute().handle(req, res, next);
      });
  }

  public handle(req: Request, res: Response, next: NextFunction): Response {
    return res.send("allow");
  }
}
