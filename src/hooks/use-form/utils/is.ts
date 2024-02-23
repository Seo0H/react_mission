import { FieldElement } from '../types/fields';

export const isRadioOrCheckbox = (ref: FieldElement): ref is HTMLInputElement =>
  isRadioInput(ref) || isCheckBoxInput(ref);

export const isRadioInput = (element: FieldElement): element is HTMLInputElement => element.type === 'radio';

export const isCheckBoxInput = (element: FieldElement): element is HTMLInputElement => element.type === 'checkbox';

export const isKey = (value: string) => /^\w*$/.test(value);
