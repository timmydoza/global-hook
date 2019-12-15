# use-global
[![Build Status](https://travis-ci.org/timmydoza/use-global.svg?branch=master)](https://travis-ci.org/timmydoza/use-global)

A global version of React's `useState` hook.

See a live example here: https://codesandbox.io/s/global-hook-example-jhdn6

### Usage:

```
import useGlobalState from 'use-global';
const initialState = 0;

function Counter() {
  const [count, setCount] = useGlobalState(initialState, 'uniqueNamespace');
  return (
    <>
      <span>{count}</span>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
    </>
  );
}
```
