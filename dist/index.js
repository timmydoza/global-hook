"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function createUseGlobalState() {
    const listeners = {};
    return function useGlobalState(initialState, namespace) {
        if (typeof namespace !== 'string' || namespace === '') {
            throw new Error('A non-empty string must be passed to useGlobalState as the second argument.');
        }
        const [state, setState] = react_1.useState(initialState);
        react_1.useEffect(() => {
            const listenerArr = (listeners[namespace] = listeners[namespace] || []);
            listenerArr.push(setState);
            return () => {
                listenerArr.splice(listenerArr.indexOf(setState), 1);
            };
        }, [namespace, setState]);
        const setGlobalState = react_1.useCallback(action => {
            const nextState = typeof action === 'function' ? action(state) : action;
            listeners[namespace].forEach(listener => listener(nextState));
        }, [state, namespace]);
        return [state, setGlobalState];
    };
}
exports.createUseGlobalState = createUseGlobalState;
exports.default = createUseGlobalState();
