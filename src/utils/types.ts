export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<T = any> = (...args: T[]) => any;
