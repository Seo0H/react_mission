/* eslint-disable @typescript-eslint/no-explicit-any */

export function once<T extends (...args: any[]) => any>(func: T): T {
    let hasBeenCalled = false;
    let result: ReturnType<T>;
  
    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
      if (!hasBeenCalled) {
        hasBeenCalled = true;
        result = func.apply(this, args);
      }
      return result;
    } as T;
  }