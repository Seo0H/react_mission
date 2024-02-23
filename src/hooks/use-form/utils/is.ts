import { isString } from '@/utils/is';

import { FieldElement, FieldValues } from '../types/fields';

export const isRadioOrCheckbox = (ref: FieldElement): ref is HTMLInputElement =>
  isRadioInput(ref) || isCheckBoxInput(ref);

export const isRadioInput = (element: FieldElement): element is HTMLInputElement => element.type === 'radio';

export const isCheckBoxInput = (element: FieldElement): element is HTMLInputElement => element.type === 'checkbox';

export const isKey = (value: string) => /^\w*$/.test(value);

export const isFelidKey = <TFelidValues extends FieldValues>(
  key: unknown,
  Field: TFelidValues,
): key is keyof TFelidValues => {
  if (isString(key)) return !!Field[key];
  return false;
};
