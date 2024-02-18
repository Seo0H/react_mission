export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function') && !isArray(value);
}
