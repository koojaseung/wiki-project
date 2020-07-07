  
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Table} from 'typeorm';

@Entity()
export class Page {

    @PrimaryColumn('integer', { generated: true })
    id:number | undefined;

    @Column({type: 'text', unique:true, length: 100, nullable: false})
    name:string | undefined;

    @Column({type: 'text', unique:true, length: 100, nullable: false})
    urlFriendlyName:string | undefined;

    @Column({type: 'text', length: 10000, nullable: false})
    content:string | undefined;
    
    @Column({type: 'text', length: 50, nullable: false})
    createdOn: string | undefined;

    @Column({type: 'text', length: 50, nullable: false})
    lastModifiedOn: string | undefined;

    parsedContent: string | undefined;
}