export const mergeArray = <T>(targetArray: Array<T>, value: Array<T> | undefined) => {
  if (!value) return targetArray;

  return [...targetArray, ...value];
};
