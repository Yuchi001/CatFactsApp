import React, {useState} from "react";
import {useStorageState} from "../hooks/useStorageState";
import Modal from "../Controls/Modal";
import CircularProgress from "../Controls/CircularProgress";

export type LoadingContextValue = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean, loadingCallId: string) => void;
};
export const LoadingContext = React.createContext<LoadingContextValue | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

export const LoadingContextProvider = ({children}: Props) => {
    const [loadingQueue, setLoadingQueue] = useStorageState<string[]>("isLoading", []);
    const [r, refresh] = useState(false);

    const setIsLoading = (isLoading: boolean, loadingCallId: string) => {
        if (!loadingQueue) return;

        const id = loadingCallId;
        const foundIndex = loadingQueue?.findIndex((q) => q === id);
        const updatedQueue = loadingQueue;
        if (isLoading && foundIndex === -1) updatedQueue?.push(id);
        else if (!isLoading && foundIndex !== -1) updatedQueue?.splice(foundIndex, 1);
        setLoadingQueue(updatedQueue);
        refresh(!r);
    };

    const loadingBody = (
        <Modal isOpen={true}>
            <CircularProgress />
        </Modal>
    );

    const value: LoadingContextValue = {
        isLoading: loadingQueue ? loadingQueue.length > 0 : false,
        setIsLoading
    };

    return (
        <LoadingContext.Provider value={value}>
            <>
                {children}
                {value.isLoading && loadingBody}
            </>
        </LoadingContext.Provider>
    );
};
