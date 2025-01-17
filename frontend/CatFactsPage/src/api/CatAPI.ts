import {CatFact} from "./models/CatFact";

export interface CatAPI {
    getRandomFact(factLength?: number): Promise<CatFact>;
    getRandomFactList(factLength?: number, maxSizeList?: number): Promise<CatFact[]>;
}
