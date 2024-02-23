import { isObject } from '@/utils/is';

export function areValuesEqual(value1: unknown, value2: unknown): boolean {
  // 유형이 다르면 동등하지 않음
  if (typeof value1 !== typeof value2) {
    return false;
  }

  // 객체인 경우
  if (isObject(value1) && value1 !== null && value2 !== null) {
    // 배열인 경우
    if (Array.isArray(value1) && Array.isArray(value2)) {
      // 배열 요소별 비교
      if (value1.length !== value2.length) {
        return false;
      }

      for (let i = 0; i < value1.length; i++) {
        if (!areValuesEqual(value1[i], value2[i])) {
          return false;
        }
      }

      return true;
    } else if (isObject(value1) && isObject(value2)) {
      // 객체인 경우 재귀적으로 비교
      const keys1 = Object.keys(value1);
      const keys2 = Object.keys(value2);

      // 키의 수가 다르면 동등하지 않음
      if (keys1.length !== keys2.length) {
        return false;
      }

      // 각 키와 값에 대해 재귀적으로 비교
      for (const key of keys1) {
        if (!keys2.includes(key) || !areValuesEqual(value1[key], value2[key])) {
          return false;
        }
      }

      return true;
    }
  }
  // 원시 값인 경우 직접 비교
  return value1 === value2;
}
