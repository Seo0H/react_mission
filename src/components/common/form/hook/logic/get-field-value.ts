import { isUndefined } from '@/utils/is';

import { getRadioValue } from '../logic/get-radio-value';
import { isRadioInput } from '../utils/is';

import type { Field } from '../types/fields';

export function getFieldValue(_f: Field['_f']) {
  const ref = _f.ref;

  if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
    return;
  }

  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }

  return ref.value;
}

export function getFieldsValue(_fields: Partial<Record<string, Field>>) {
  return Object.entries(_fields).reduce(
    (acc, [name, ref]) => ({ ...acc, [name]: isUndefined(ref?._f) ? null : getFieldValue(ref?._f) }),
    {},
  );
}
