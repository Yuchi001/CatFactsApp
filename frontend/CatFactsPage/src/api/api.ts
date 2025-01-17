import {CatAPI} from "./CatAPI";
import {HttpClient} from "./HttpClient";
import {CatFact} from "./models/CatFact";
import {ApiRoutes} from "./ApiRoutes";

export class Api implements CatAPI {
    client: HttpClient;

    constructor() {
        this.client = new HttpClient("http://localhost:5269/");
    }

    async getRandomFact(factLength?: number): Promise<CatFact> {
        const res = await this.client.get(ApiRoutes.fact(factLength));
        return res.data;
    }
    async getRandomFactList(factLength?: number, maxSizeList?: number): Promise<CatFact[]> {
        const res = await this.client.get(ApiRoutes.facts(factLength, maxSizeList));
        return res.data;
    }
}
