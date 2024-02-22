import { cloneObject } from '@/utils/clone';
import { isObject, isUndefined } from '@/utils/is';

export function get<T>(object: T, name?: string, defaultValue?: unknown): any {
  if (!name || !isObject(object)) {
    return defaultValue;
  }

  const result = object[name] ? (isObject(object[name]) ? cloneObject(object[name]) : object[name]) : defaultValue;

  return isUndefined(result) || result === object ? defaultValue : result;
}
