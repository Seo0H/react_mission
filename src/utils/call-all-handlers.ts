import type { AnyFunction } from '@/utils/types';

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(...args: Parameters<T>) {
    fns.forEach((fn) => fn?.(...args));
  };
}

/**
 * 여러 이벤트 핸들러 함수를 호출하는 함수.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return function func(event: Parameters<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}
