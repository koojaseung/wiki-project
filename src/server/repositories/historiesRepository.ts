import { Repository, EntityRepository, Connection } from 'typeorm';
import {History} from '../models/history';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {

    public findByPageId(id: number): Promise<History[] | undefined> {
        return this.find({
            where: {
                pageId: id
            }
        });
    }
}

