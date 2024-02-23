export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<T = any> = (...args: T[]) => any;

export type LiteralUnion<T extends U, U extends Primitive> = T | (U & { _?: never });

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
