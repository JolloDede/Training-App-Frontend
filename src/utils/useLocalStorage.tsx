import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue?: string) {
    key = "training-app-"+key;

    const [storedValue, setStoredValue] = useState(() => {

        if (typeof window == "undefined") {
            return initialValue;
        }

        try {            
            let item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    })

    const setValue = (value: any) => {
        try {
            let valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage;