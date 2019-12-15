import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

function createUseGlobalState() {
  const listeners: { [namespace: string]: Dispatch<SetStateAction<any>>[] } = {};

  return function useGlobalState<T>(initialState: T | (() => T), namespace: string) {
    if (typeof namespace !== 'string' || namespace === '') {
      throw new Error('A non-empty string must be passed to useGlobalState as the second argument.');
    }

    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
      const listenerArr = (listeners[namespace] = listeners[namespace] || []);
      listenerArr.push(setState);
      return () => {
        listenerArr.splice(listenerArr.indexOf(setState), 1);
      };
    }, [namespace, setState]);

    const setGlobalState = useCallback(
      action => {
        const nextState = typeof action === 'function' ? action(state) : action;
        listeners[namespace].forEach(listener => listener(nextState));
      },
      [state, namespace]
    );

    return [state, setGlobalState as typeof setState] as const;
  };
}

export default createUseGlobalState();
export { createUseGlobalState };
