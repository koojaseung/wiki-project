import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Table} from 'typeorm';

@Entity()
export class History {

    @PrimaryColumn('integer', { generated: true })
    id:number | undefined;

    @Column({type: 'integer', nullable: false})
    pageId:number | undefined;

    @Column({type: 'integer', nullable: true})
    lastHistoryId?: number | undefined;

    @Column({type: 'text', length: 400, nullable: false})
    decription:string | undefined;

    @Column({type: 'text', length: 100, nullable: false})
    name:string | undefined;

    @Column({type: 'text', length: 10000, nullable: false})
    content:string | undefined;
    
    @Column({type: 'text', length: 50, nullable: false})
    createdOn: string | undefined;

    @Column({type: 'text', length: 50, nullable: false})
    lastModifiedOn: string | undefined;
}