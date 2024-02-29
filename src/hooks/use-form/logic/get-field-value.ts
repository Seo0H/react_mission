import { isUndefined } from '@/utils/is';

import type { Field } from '../types/fields';

export function getFieldsValue(_fields: Partial<Record<string, Field>>) {
  return Object.entries(_fields).reduce(
    (acc, [name, ref]) => ({ ...acc, [name]: isUndefined(ref?._f) ? null : getFieldValue(ref?._f) }),
    {},
  );
}

export function getFieldValue(_f: Field['_f']) {
  const ref = _f.ref;
  return ref.value;
}
