import { renderHook, act } from "@testing-library/react-hooks";
import useGlobalState, { createUseGlobalState } from "./index";

describe("the useGlobalState hook", () => {
  it("should update all instances when 'setState' is called with a value", () => {
    const { result } = renderHook(() => useGlobalState(0, "namespace"));
    const { result: result2 } = renderHook(() => useGlobalState(0, "namespace"));

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it("should update all instances when 'setState' is called with a function", () => {
    const { result } = renderHook(() => useGlobalState(0, "namespace2"));
    const { result: result2 } = renderHook(() => useGlobalState(0, "namespace2"));

    act(() => {
      const q = result.current[1];
      q(state => state + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it("should update all instances when 'setState' is called from any instance", () => {
    const { result } = renderHook(() => useGlobalState(0, "namespace3"));
    const { result: result2 } = renderHook(() => useGlobalState(0, "namespace3"));
    const { result: result3 } = renderHook(() => useGlobalState(0, "namespace3"));

    act(() => {
      result.current[1](state => state + 1);
    });

    act(() => {
      result2.current[1](state => state + 1);
    });

    act(() => {
      result3.current[1](state => state + 1);
    });

    expect(result.current[0]).toBe(3);
    expect(result2.current[0]).toBe(3);
    expect(result2.current[0]).toBe(3);
  });

  it("should ignore the initialState value of all hooks expect the first", () => {
    const { result } = renderHook(() => useGlobalState(0, "namespace4"));
    const { result: result2 } = renderHook(() => useGlobalState(10, "namespace4"));

    act(() => {
      result.current[1](state => state + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it("should not display a console warning when setState is called after component unmount", () => {
    const { result } = renderHook(() => useGlobalState(0, "namespace5"));
    const { unmount } = renderHook(() => useGlobalState(1, "namespace5"));
    unmount();

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  it("should accept a function as the initial value", () => {
    const { result } = renderHook(() => useGlobalState(() => 10, "namespace6"));
    const { result: result2 } = renderHook(() => useGlobalState(0, "namespace6"));

    act(() => {
      result.current[1](state => state + 1);
    });

    expect(result.current[0]).toBe(11);
    expect(result2.current[0]).toBe(11);
  });
});

describe("the createUseGlobalHook function", () => {
  it("should not interfere with components using the 'useGlobalHook' export", () => {
    const newUseGlobalState = createUseGlobalState();
    const { result } = renderHook(() => useGlobalState(0, "namespace7"));
    const { result: result2 } = renderHook(() => newUseGlobalState(0, "namespace7"));
    const { result: result3 } = renderHook(() => newUseGlobalState(0, "namespace7"));

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(result2.current[0]).toBe(0);
    expect(result3.current[0]).toBe(0);

    act(() => {
      result2.current[1](2);
    });

    expect(result.current[0]).toBe(1);
    expect(result2.current[0]).toBe(2);
    expect(result3.current[0]).toBe(2);
  });
});
