import express, { Request, Response, Router, NextFunction } from 'express';
import * as path from 'path';
import { appRouting } from './routes/appRouting';
import { dbConnect } from './dbConnect';
import { PageController } from './controllers/pagesController';
import { HistoryController } from './controllers/historiesController';
import bodyParser from 'body-parser'
/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    dbConnect.connect();
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
   
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: false }))
 
    this.app.use(bodyParser.json())
    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    this.app.listen(process.env.PORT || 8090, () => console.log(`Listening on port ${process.env.PORT || 8090}!`));
 }

  public routes() {
       
    this.app.use('/api', appRouting());
  }
}
Server.bootstrap();
