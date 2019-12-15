# use-global
[![Build Status](https://travis-ci.org/timmydoza/global-hook.svg?branch=master)](https://travis-ci.org/timmydoza/global-hook)

A global version of React's `useState` hook.

See a live example here: https://codesandbox.io/s/global-hook-example-jhdn6

### Usage:

```
import useGlobalState from 'global-hook';
const initialState = 0;

function Counter() {
  const [count, setCount] = useGlobalState(initialState, 'uniqueNamespace');
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

If you prefer to create your own instance, use `createUseGlobalState`:

```
import { createUseGlobalState } from 'global-hook';
export const useGlobalState = createUseGlobalState();
```
