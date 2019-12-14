# use-global

A global version of React's `useState` hook.

### Usage:

```
import useGlobalState from 'use-global';

function Counter() {
  const [count, setCount] = useGlobalState(0, 'counter');
  return (
    <>
      <span>{count}</span>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
    </>
  );
}
```
