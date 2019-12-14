import { useState, useEffect, useCallback } from "react";

function createUseGlobalState() {
  let touchedObj: { [namespace: string]: boolean } = {};
  let stateObj: { [namespace: string]: any } = {};
  const listeners: { [namespace: string]: ((arg0: any) => void)[] } = {};

  return function useGlobalState<T>(initialState: T | (() => T), namespace: string) {
    if (!touchedObj[namespace]) stateObj[namespace] = initialState;
    touchedObj[namespace] = true;
    const [state, setState] = useState<T>(stateObj[namespace]);

    useEffect(() => {
      listeners[namespace] = listeners[namespace] || [];
      listeners[namespace].push(setState);
      return () => {
        listeners[namespace].splice(listeners[namespace].indexOf(setState), 1);
      };
    }, [namespace, setState]);

    const setGlobalState = useCallback(
      action => {
        const nextState = (stateObj[namespace] = typeof action === "function" ? action(state) : action);
        listeners[namespace].forEach(listener => listener(nextState));
      },
      [state, namespace]
    );

    return [state, setGlobalState as typeof setState] as const;
  };
}

export default createUseGlobalState();
export { createUseGlobalState };
