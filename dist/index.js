"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function createUseGlobalState() {
    var listeners = {};
    var isTouched = {};
    var stateObj = {};
    return function useGlobalState(initialState, namespace) {
        if (typeof namespace !== 'string' || namespace === '') {
            throw new Error('A non-empty string must be passed to useGlobalState as the second argument.');
        }
        if (!isTouched[namespace]) {
            stateObj[namespace] = initialState;
            isTouched[namespace] = true;
        }
        var _a = react_1.useState(stateObj[namespace]), state = _a[0], setState = _a[1];
        var listenerArr = (listeners[namespace] = listeners[namespace] || []);
        react_1.useEffect(function () {
            listenerArr.push(setState);
            return function () {
                listenerArr.splice(listenerArr.indexOf(setState), 1);
            };
        }, []);
        var setGlobalState = react_1.useCallback(function (action) {
            listenerArr.forEach(function (listener) { return listener(action); });
        }, []);
        return [state, setGlobalState];
    };
}
exports.createUseGlobalState = createUseGlobalState;
exports.default = createUseGlobalState();
