import {useState} from "react";
import {api} from "../../index";

export type Score = {
    won: boolean;
    facts: string[];
    catness: number;
};
export type LoadingTuple = {
    isLoading: boolean;
    loadingID: MethodName;
};
export enum MethodName {
    GetRandomFact,
    TryWin
}
export const useCatFacts = () => {
    const [savedFacts, setSavedFacts] = useState<string[]>([]);
    const [currentStacks, setCurrentStacks] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<LoadingTuple>({
        isLoading: false,
        loadingID: MethodName.GetRandomFact
    });

    const getCatFact = async (factLength?: number, save: boolean = true) => {
        setIsLoading({isLoading: true, loadingID: MethodName.GetRandomFact});
        const fact = await api.getRandomFact(factLength);
        if (save) {
            setSavedFacts((prevFacts) => [...prevFacts, fact.fact]);
            setCurrentStacks(currentStacks + fact.catness);
        }
        setIsLoading({isLoading: false, loadingID: MethodName.GetRandomFact});
        return fact;
    };

    const getCatFacts = async (factLength?: number, factListSize = 9) => {
        setIsLoading({isLoading: true, loadingID: MethodName.TryWin});
        const fact = await api.getRandomFactList(factLength, factListSize);
        setIsLoading({isLoading: false, loadingID: MethodName.TryWin});
        return fact;
    };

    const lose = () => {
        setCurrentStacks(0);
        setSavedFacts([]);
    };

    const win = () => {
        setCurrentStacks(0);
    };

    const tryToWin = async (): Promise<Score> => {
        const min = 5;
        const max = 10;
        const rand = Math.ceil(min + Math.random() * (max - min));
        const factsObjs = await getCatFacts(undefined, rand);
        const facts: string[] = [];
        let catness = 0;
        factsObjs.forEach((e) => {
            catness += e.catness;
            facts.push(e.fact);
        });
        const won = currentStacks === 9 || catness > 9 || currentStacks > catness;
        return {
            won,
            facts,
            catness
        };
    };

    return {
        getCatFact,
        getCatFacts,
        lose,
        win,
        tryToWin,
        savedFacts,
        currentStacks,
        isLoading
    };
};
