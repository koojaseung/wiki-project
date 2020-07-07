import express, { Request, Response, NextFunction, Router } from 'express';
import {PageController} from '../controllers/pagesController';
import { BaseRouter } from './baseRoute';
import multer from 'multer';
export class PageRouter extends BaseRouter {

    registerRouter(): void {
        const controller = new PageController();
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads')
            },
            filename: function (req, file, cb) {
                let fileName = file.originalname;
                let segments = fileName.toString().split('.');
                cb(null, file.fieldname + '-' + Date.now() + '.' + segments[segments.length - 1])
            }
          })
           
        var upload = multer({ storage: storage });
        this.router.get('/pages/', (req: Request, res: Response, next: NextFunction) => {
            controller.getPages(req, res, next);
        });
        this.router.get('/pages/search/:keyword', (req: Request, res: Response, next: NextFunction) => {
            controller.searchPages(req, res, next);
        });
        this.router.get('/pages/slug/:slug', (req: Request, res: Response, next: NextFunction) => {
            controller.getPageBySlug(req, res, next);
        });
        this.router.get('/pages/:id', (req: Request, res: Response, next: NextFunction) => {
            controller.getPage(req, res, next);
        });

        this.router.post('/pages', (req: Request, res: Response, next: NextFunction) => {
            controller.createPage(req, res, next);
        });

        this.router.put('/pages', (req: Request, res: Response, next: NextFunction) => {
            controller.updatePage(req, res, next);
        });
        this.router.post('/pages/upload', upload.array('upload-image'), (req: Request, res: Response, next: NextFunction) => {
            
            controller.uploadImages(req, res, next);
        });
    }


}


