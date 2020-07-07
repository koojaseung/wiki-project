import {Request, Response, NextFunction} from 'express';
import { Connection, Repository, getConnection } from 'typeorm';
import {PageRepository} from '../repositories/pagesRepository';
import {HistoryRepository} from '../repositories/historiesRepository';
import {Page} from '../models/page';
import {History} from '../models/history';
import getSlug from 'speakingurl';
import { HistoryController } from './historiesController';

import MarkdownIt  from 'markdown-it';
import htmlencode from 'htmlencode';
import { uploadedImage } from '../models/uploadedImage';

export class PageController {
    public async getPages(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(PageRepository);
        let page = await repo.find();

        if(!page) return res.status(400);

        res.status(200).send(page);
    }

    public async searchPages(req: Request, res:Response, next: NextFunction) {
        console.log(req.params.keyword);
        let repo = getConnection().getCustomRepository(PageRepository);
        let page = await repo.find();
        
        if(!page) return res.status(400);
        console.log(page.length);

        console.log(page.length);
        page = page.filter(x => (x.name.toLowerCase().indexOf(req.params.keyword.toLowerCase()) > -1 || x.content.toLowerCase().indexOf(req.params.keyword.toLowerCase()) > -1));
        console.log(page.length);
        res.status(200).send(page);
    }

    public async getPage(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(PageRepository);
        let page = await repo.findOne(+req.params.id);
        console.log(req.params.id);
        if(page == null) return res.status(400);
        let md = new MarkdownIt();
        page.parsedContent = md.render(page.content);

        res.status(200).send(page);
    }

    public async getPageBySlug(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(PageRepository);
        console.log(req.params.slug);
        // let page = await repo.findOne({
        //     where: {
        //         urlFriendlyName: req.params.slug
        //     },
        // });
        let pages = (await repo.find()).filter(x => x.urlFriendlyName == req.params.slug);
        try {
            if(pages.length > 0) {
                let md = new MarkdownIt();
                pages[0].parsedContent = md.render(pages[0].content);
            }
            else {
                if(pages == null) res.status(200).send([]);
            }
        }
        catch(error){
            res.status(400);
        }


        res.status(200).send(pages[0]);
    }

    public async createPage(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(PageRepository);
        let page = new Page();
        console.log(req.body)
        page.name = req.body.name;
        page.urlFriendlyName = getSlug(req.body.name);
        page.content = req.body.content;
        page.createdOn = new Date().toUTCString();
        page.lastModifiedOn = new Date().toUTCString();
        page = await repo.save(page);

        let history = new HistoryController();
        await history.createHistoryByPage(page, req.body.desc);

        res.status(200).send(page);
    }

    public async updatePage(req: Request, res:Response, next: NextFunction) {
        let repo = getConnection().getCustomRepository(PageRepository);
        let page = await repo.findOne(+req.body.id);

        console.log('start');
        if(!page) return res.status(400);
        page.name = req.body.name;
        page.urlFriendlyName = getSlug(req.body.name);
        page.content = req.body.content;
        page.lastModifiedOn = new Date().toUTCString();
        page = await repo.save(page);

        let history = new HistoryController();
        await history.createHistoryByPage(page, req.body.desc);

        res.status(200).send(page);
    }

    public async uploadImages(req: Request, res:Response, next: NextFunction) {
        console.log(req.files);
        const uploadImages = [] as uploadedImage[];
        for(var i = 0; i < req.files.length; i++) {
            uploadImages.push({name: req.files[i].filename, path: `/uploads/${req.files[i].filename}`})
        }
        console.log(uploadImages);
        res.status(200).send(uploadImages);
    }
}