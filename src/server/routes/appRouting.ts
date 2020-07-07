import express, { NextFunction, Request, Response, Router } from 'express';
import {PageRouter} from  './pagesRoute';
import {HistoryRouter} from  './historiesRoutes';

export function appRouting(): Router {
    let router: Router;
    router = express.Router();
  
     let pageRouter: PageRouter = new PageRouter(router);
     pageRouter.registerRouter();
     
     let historyRouter: HistoryRouter = new HistoryRouter(router);
     historyRouter.registerRouter();
    return router;
  }