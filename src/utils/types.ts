export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type AnyFunction<T = any> = (...args: T[]) => any;
