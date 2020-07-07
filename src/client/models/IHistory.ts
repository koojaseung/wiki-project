export interface IHistory {
    id:number;

    pageId:number;

    lastHistoryId?: number;

    decription:string;

    name:string;

    content:string;
    
    createdOn: string;

    lastModifiedOn: string;
}