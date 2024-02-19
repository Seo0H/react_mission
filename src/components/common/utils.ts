import { isObject } from '@/utils/is';

export function isInputEvent(value: unknown): value is { target: HTMLInputElement } {
  return !!value && isObject(value) && isObject(value.target);
}
