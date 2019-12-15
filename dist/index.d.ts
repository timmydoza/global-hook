/// <reference types="react" />
declare function createUseGlobalState(): <T>(initialState: T | (() => T), namespace: string) => readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>];
declare const _default: <T>(initialState: T | (() => T), namespace: string) => readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>];
export default _default;
export { createUseGlobalState };
