import {useState} from "react";
import {getStorageItem, setStorageItem} from "./local-storage-service";

export function useStorageState<Type>(
    fieldName: string,
    initialValue?: Type | undefined
): [Type | undefined, (val: Type | undefined) => void] {
    const [value, setValueState] = useState<Type | undefined | null>(initialValue);

    const getValue = (): Type | undefined => {
        if (value != null) return value;

        try {
            const val = getStorageItem(fieldName);

            if (val == "{}" || val == null) {
                return undefined;
            }

            const getVal = JSON.parse(val);
            setValueState(getVal);
            return getVal;
        } catch {
            return undefined;
        }
    };

    const setValue = (val: Type | undefined) => {
        if (val === undefined) {
            setValueState(undefined);
            setStorageItem(fieldName, "{}");
            return;
        }

        const valJson = JSON.stringify(val);
        setStorageItem(fieldName, valJson);
        setValueState(val);
    };

    return [getValue(), setValue];
}
