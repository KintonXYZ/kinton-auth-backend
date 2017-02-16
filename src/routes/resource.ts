import { NextFunction, Request, Response, Router } from "express";

export class ResourceRoute {
  public static create(router: Router) {
    router.post("/auth/resource",
      (req: Request, res: Response, next: NextFunction) => {
        new ResourceRoute().handle(req, res, next);
      });
  }

  public handle(req: Request, res: Response, next: NextFunction) {
    return res.send("allow");
  }
}
