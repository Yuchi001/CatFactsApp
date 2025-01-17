import {useContext, useEffect, useState, useRef, useId} from 'react';
import { LoadingContext } from '../Context/LoadingContext';

export const useLoading = (trackedLoadingValue: boolean | undefined = undefined) => {
    const id = useId();
    const loadingContext = useContext(LoadingContext);

    const [isLoading, setIsLoadingState] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (trackedLoadingValue === undefined) return;

        if (trackedLoadingValue) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setIsLoadingState(true);
            }, 100);
            return;
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsLoadingState(false);
    }, [trackedLoadingValue]);

    useEffect(() => {
        if (isLoading === undefined) return;

        loadingContext?.setIsLoading(isLoading, id);
    }, [isLoading]);

    return { isLoading, setIsLoading: (value: boolean) => setIsLoadingState(value) };
};
