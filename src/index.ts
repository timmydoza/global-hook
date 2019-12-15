import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

function createUseGlobalState() {
  const listeners: { [namespace: string]: Dispatch<SetStateAction<any>>[] } = {};
  let isTouched: { [namespace: string]: boolean } = {};
  let stateObj: { [namespace: string]: any } = {};

  return function useGlobalState<T>(initialState: T | (() => T), namespace: string) {
    if (typeof namespace !== 'string' || namespace === '') {
      throw new Error('A non-empty string must be passed to useGlobalState as the second argument.');
    }

    if (!isTouched[namespace]) {
      stateObj[namespace] = initialState;
      isTouched[namespace] = true;
    }

    const [state, setState] = useState<T>(stateObj[namespace]);

    const listenerArr = (listeners[namespace] = listeners[namespace] || []);

    useEffect(() => {
      listenerArr.push(setState);
      return () => {
        listenerArr.splice(listenerArr.indexOf(setState), 1);
      };
    }, []);

    const setGlobalState = useCallback(action => {
      listenerArr.forEach(listener => listener(action));
    }, []);

    return [state, setGlobalState as typeof setState] as const;
  };
}

export default createUseGlobalState();
export { createUseGlobalState };
