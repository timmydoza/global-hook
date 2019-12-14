"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function createUseGlobalState() {
    let touched = {};
    let stateObj = {};
    const listeners = {};
    return function useGlobalState(initialState, namespace) {
        if (!touched[namespace])
            stateObj[namespace] = initialState;
        touched[namespace] = true;
        const [state, setState] = react_1.useState(stateObj[namespace]);
        react_1.useEffect(() => {
            listeners[namespace] = listeners[namespace] || [];
            listeners[namespace].push(setState);
            return () => {
                listeners[namespace].splice(listeners[namespace].indexOf(setState), 1);
            };
        }, [namespace, setState]);
        const setGlobalState = react_1.useCallback(action => {
            const nextState = (stateObj[namespace] = typeof action === "function" ? action(state) : action);
            listeners[namespace].forEach(listener => listener(nextState));
        }, [state, namespace]);
        return [state, setGlobalState];
    };
}
exports.createUseGlobalState = createUseGlobalState;
exports.default = createUseGlobalState();
//# sourceMappingURL=index.js.map