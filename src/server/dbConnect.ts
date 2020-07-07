import { createConnection, Connection, useContainer, getConnection } from 'typeorm';
import 'reflect-metadata';
import { PageRepository } from './repositories/pagesRepository';
import { Page } from './models/page';
import { History } from './models/history';
import getSlug from 'speakingurl';
import { HistoryRepository } from './repositories/historiesRepository';

export class dbConnect {

  public static connect(): void {
    // useContainer(Container);
    console.log(__dirname + '/models/');
    createConnection({
        type: 'sqlite',
        database: "wiki_project",
        // maxQueryExecutionTime: 100,
        entities: [
            __dirname + '/models/*.ts'
           ] as string[],
        synchronize: true
    }).then(connection => {
      console.log('Database connected.');
      this.setSeedData();
    }).catch(error => console.log('Error: ', error));
    
  }
  public static async setSeedData() {
      let repo = getConnection().getCustomRepository(PageRepository);
      const totalCount = await repo.count();
      if(totalCount == 0) {
        let repo = getConnection().getCustomRepository(PageRepository);
        let page = new Page();
        page.name = "Main Page";
        page.urlFriendlyName = getSlug(page.name);
        page.content = "This is main Page";
        page.createdOn = new Date().toUTCString();
        page.lastModifiedOn = new Date().toUTCString();
        page = await repo.save(page);

        let historyRepo = getConnection().getCustomRepository(HistoryRepository);
        let history = new History();
        history.name = page.name;
        history.decription = "First history record when page creates"
        history.content = page.content;
        history.pageId = page.id;
        history.createdOn = new Date().toUTCString();
        history.lastModifiedOn = new Date().toUTCString();
        history = await historyRepo.save(history);
        console.log('Successfully created a Main Page \n');
        console.log(JSON.stringify(page));
      }
      else {
        console.log('Passed seed data block');
      }
      
      
  
  }
}