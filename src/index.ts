import {useEffect, useState} from "react"

type Unpromised<T> = T extends Promise<infer V> ? V : T;

export const useFunction = <A extends any[], R, D>(func: (...args: A) => R, args: A, defaultResult: D) => {
    const [nonce, setNonce] = useState(0);
    const [result, setResult] = useState<Unpromised<R> | D>(defaultResult);
    const [incall, setIncall] = useState<boolean>(true);
    const [error, setError] = useState<any>(undefined);

    const recall = () => setNonce((nonce + 1) % 10000);

    useEffect(() => {
        setError(undefined);
        setIncall(true);

        let result: R;

        try {
            result = func(...args)
        } catch (error) {
            setError(error);
            setIncall(false);
            return;
        }

        Promise.resolve(result)
            .then(result => setResult(result as Unpromised<R>))
            .catch(error => setError(error))
            .finally(() => setIncall(false))
    }, [nonce, ...args]);

    return {
        incall,
        error,
        result,
        recall,
    }
};
