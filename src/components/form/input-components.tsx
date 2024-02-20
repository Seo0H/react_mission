import type { ComponentPropsWithRef, ReactElement } from 'react';

import { DefaultCheckbox } from '@/components/common/checkbox';
import { Input } from '@/components/common/input';
import { NumberInput } from '@/components/common/number-input';
import { DefaultRadio, RadioNumber, RadioWithInput } from '@/components/common/radio';

import { isMultiInputAnswer, isSelection } from '@/components/form/utils';
import { isArray } from '@/utils/is';

import type { Form, FormType } from '@/api/form/types/server-response';
import type { ConditionalInputProps, Omitted } from '@/components/form/conditional-input';

type InputComponent<T = Omit<ComponentPropsWithRef<'input'>, Omitted> & Omit<ConditionalInputProps, 'type'>> = (
  props: T,
  type: FormType,
) => ReactElement;

export const inputComponents: { [key in Form['type']]: InputComponent } = {
  //--- single input ---
  text: ({ value, ...rest }) => {
    if (isMultiInputAnswer(value)) throw new Error('Input must have single input answer value');
    return <Input value={String(value)} {...rest} />;
  },
  number: ({ value, ...rest }) => {
    if (isMultiInputAnswer(value)) throw new Error('Number Input must have single input answer value');
    return <NumberInput value={Number(value)} {...rest} />;
  },
  //--- multi input ---
  checkbox: ({ value, selections, ...rest }) => {
    if (!isSelection(selections)) throw new Error('Checkbox must have multi answer value');
    if (!isArray(value)) throw new Error('Checkbox value must string[]');
    return <DefaultCheckbox contexts={selections} value={value} {...rest} />;
  },
  radio: ({ value, selections, ...rest }) => {
    if (!isSelection(selections)) throw new Error('Radio must have multi answer value');
    return <DefaultRadio contexts={selections} value={String(value)} {...rest} />;
  },
  radioNumber: ({ onChange, value, name }) => (
    <RadioNumber onChange={onChange} defaultValue={Number(value)} name={name} maxScore={7} minScore={1} />
  ),
  radioWithInput: ({ value, selections, ...rest }) => {
    if (!isSelection(selections)) throw new Error('Radio Input must have multi answer value');
    return <RadioWithInput context={selections} value={String(value)} {...rest} />;
  },
};
