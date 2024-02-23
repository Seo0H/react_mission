export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function') && !isArray(value);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isPlainObject = (tempObject: object) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;

  return isObject(prototypeCopy) && Object.prototype.hasOwnProperty.call(prototypeCopy, 'isPrototypeOf');
};

export const isUndefined = (val: unknown): val is undefined => val === undefined;

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isEmptyObject = (value: unknown): value is { [K in string | number]: never } =>
  isObject(value) && !Object.keys(value).length;
