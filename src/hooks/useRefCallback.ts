import { useRef, useCallback, useEffect } from 'react';

type CallbackFunction<T extends unknown[]> = (...args: T) => unknown;

/**
 * никогда не вызывает обновление компонента за счет того что не создаёт новой функции
 * @param fn 
 * @returns 
 */
export const useRefCallback = <T extends unknown[]>(
    fn: CallbackFunction<T>
): CallbackFunction<T> => {
    const callbackRef = useRef<CallbackFunction<T>>(fn);

    callbackRef.current = fn;

    return useCallback((...args: T) => {
        return callbackRef.current(...args);
    }, []);
};
