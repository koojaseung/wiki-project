import {Request, Response, NextFunction} from 'express';
import { Connection, Repository, getConnection } from 'typeorm';
import {HistoryRepository} from '../repositories/historiesRepository';
import {History} from '../models/history';
import { Page } from '../models/page';

export class HistoryController {
    public async getHistoriesByPageId(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(HistoryRepository);

        let history = await repo.findByPageId(+req.params.id);

        if(!history) return res.status(400);
        res.status(200).send(history);
    }

    public async getHistory(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(HistoryRepository);

        let history = await repo.findOne(+req.params.id);

        if(!history) return res.status(400);
        res.status(200).send(history);
    }

    public async createHistory(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(HistoryRepository);
        
        const pageId = req.body.pageId;
        let lastHistory = await repo.findOne({pageId : pageId}, {order: {id: "DESC"}});

        let history = new History();
        history.name = req.body.name;
        history.pageId = req.body.pageId;
        history.decription = req.body.desc;
        history.lastHistoryId = lastHistory ? lastHistory.id : undefined;
        history.content = req.body.content;
        history.createdOn = new Date().toUTCString();
        history.lastModifiedOn = new Date().toUTCString();
        history = await repo.save(history);
        res.status(200).send(history);
    }

    public async createHistoryByPage(page: Page, desc: string): Promise<History> {
        let repo = getConnection().getCustomRepository(HistoryRepository);
        
        const pageId = page.id;
        let lastHistory = await repo.findOne({pageId : pageId}, {order: {id: "DESC"}});
        
        let history = new History();
        history.name = page.name;
        history.pageId = pageId;
        history.decription = desc;
        history.lastHistoryId = lastHistory ? lastHistory.id : undefined;
        history.content = page.content;
        history.createdOn = new Date().toUTCString();
        history.lastModifiedOn = new Date().toUTCString();
        repo.save(history);
        return history
    }
}