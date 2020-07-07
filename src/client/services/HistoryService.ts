import { ServiceBase } from "./ServiceBase";
import Globals from "../Globals";
import { IHistory } from "../models/IHistory";

export default class HistoryService extends ServiceBase {
    public static async getHistories(pageId: number): Promise<IHistory[]> {
        
        var result = await this.requestJson<IHistory[]>({
            url: Globals.hostName + "api/histories/list/" + pageId,
            method: "GET"
        });

        try {
            if (result) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    public static async getHistory(id: number): Promise<IHistory> {
        
        var result = await this.requestJson<IHistory>({
            url: Globals.hostName + "api/histories/" + id,
            method: "GET"
        });

        try {
            if (result) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    public static async createHistory(model: IHistory) {
        var result = await this.requestJson<IHistory>({
            url: Globals.hostName + "api/histories",
            data: model,
            method: "POST"
        });

        try {
            if (result) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    public static async updateHistory(model: IHistory) {
        var result = await this.requestJson<IHistory>({
            url: Globals.hostName + "api/histories",
            data: model,
            method: "PUT"
        });

        try {
            if (result) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

}