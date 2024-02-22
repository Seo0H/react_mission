import { isObject, isPlainObject } from '@/utils/is';

export function cloneObject<T>(data: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let copy: any;
  const isArray = Array.isArray(data);

  if (data instanceof Date) {
    copy = new Date(data);
  } else if (data instanceof Set) {
    copy = new Set(data);
  } else if (!(data instanceof Blob || data instanceof FileList) && (isArray || isObject(data))) {
    copy = isArray ? [] : {};

    if (!isArray && !isPlainObject(data)) {
      copy = data;
    } else {
      for (const key in data) {
        if (key in data) {
          copy[key] = cloneObject((data as Record<typeof key, unknown>)[key]);
        }
      }
    }
  } else {
    return data;
  }

  return copy;
}
