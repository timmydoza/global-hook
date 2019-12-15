import { Dispatch, SetStateAction } from 'react';
declare function createUseGlobalState(): <T>(initialState: T | (() => T), namespace: string) => readonly [T, Dispatch<SetStateAction<T>>];
declare const _default: <T>(initialState: T | (() => T), namespace: string) => readonly [T, Dispatch<SetStateAction<T>>];
export default _default;
export { createUseGlobalState };
