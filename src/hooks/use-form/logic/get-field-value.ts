import { isUndefined } from '@/utils/is';

import { isCheckBoxInput, isRadioInput } from '../utils/is';

import { getCheckboxValue } from './get-checkbox-value';
import { getRadioValue } from './get-radio-value';
import type { Field } from '../types/fields';

export function getFieldsValue(_fields: Partial<Record<string, Field>>) {
  return Object.entries(_fields).reduce(
    (acc, [name, ref]) => ({ ...acc, [name]: isUndefined(ref?._f) ? null : getFieldValue(ref?._f) }),
    {},
  );
}

export function getFieldValue(_f: Field['_f']) {
  const ref = _f.ref;
  if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
    return;
  }

  if (_f.refs && isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }

  if (_f.refs && isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }

  return ref.value;
}
