import { NextFunction, Request, Response, Router } from 'express';

export abstract class BaseRouter {

  protected router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  abstract registerRouter(): void;
}