/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(cb: (...args: any) => void, wait = 20) {
  let h: NodeJS.Timeout;
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };

  return callable;
}
