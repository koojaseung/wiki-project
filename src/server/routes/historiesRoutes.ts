import express, { Request, Response, NextFunction, Router } from 'express';
import {HistoryController} from '../controllers/historiesController';
import { BaseRouter } from './baseRoute';


export class HistoryRouter extends BaseRouter {

    registerRouter(): void {
        const controller = new HistoryController();

        this.router.get('/histories/list/:id', (req: Request, res: Response, next: NextFunction) => {
            controller.getHistoriesByPageId(req, res, next);
        });

        this.router.get('/histories/:id', (req: Request, res: Response, next: NextFunction) => {
            controller.getHistory(req, res, next);
        });

        this.router.post('/histories', (req: Request, res: Response, next: NextFunction) => {
            controller.createHistory(req, res, next);
        });
    }


}


