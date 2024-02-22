/* eslint-disable no-unused-vars */
import type { ComponentPropsWithRef, ReactElement } from 'react';

import { DefaultCheckbox } from '@/components/common/checkbox';
import type { FieldValues } from '@/components/common/form/hook/types/fields';
import type { UseFormRegister } from '@/components/common/form/hook/types/form';
import { Input } from '@/components/common/input';
import { NumberInput } from '@/components/common/number-input';
import { DefaultRadio, RadioNumber, RadioWithInput } from '@/components/common/radio';

import { isMultiInputAnswer, isSelection } from '@/components/form/utils';
import { isArray } from '@/utils/is';

import type { Form, FormType } from '@/api/form/types/server-response';
import type { ConditionalInputProps, Omitted } from '@/components/form/conditional-input';

type InputComponentProps<T = Omit<ComponentPropsWithRef<'input'>, Omitted> & Omit<ConditionalInputProps, 'type'>> = (
  props: T,
  register: UseFormRegister<FieldValues>,
) => ReactElement;

export const inputComponents: { [key in Form['type']]: InputComponentProps } = {
  //--- single input ---
  text: ({ name }, register) => {
    return <Input {...register(name)} />;
  },
  number: ({ name }, register) => {
    return <NumberInput {...register(name)} />;
  },
  //--- multi input ---
  checkbox: ({ value, selections, ...rest }) => {
    if (!isSelection(selections)) throw new Error('Checkbox must have multi answer value');
    if (!isArray(value)) throw new Error('Checkbox value must string[]');
    return <DefaultCheckbox contexts={selections} value={value} {...rest} />;
  },
  radio: ({ selections, name, value, ...rest }, register) => {
    if (!isSelection(selections)) throw new Error('Radio must have multi answer value');
    return <DefaultRadio contexts={selections} {...register(name)} value={String(value)} />;
  },
  radioNumber: ({ name }, register) => <RadioNumber maxScore={7} minScore={1} {...register(name)} />,
  radioWithInput: ({ value, selections, name, ...rest }, register) => {
    if (!isSelection(selections)) throw new Error('Radio Input must have multi answer value');
    return <RadioWithInput context={selections} {...register(name)} value={String(value)} />;
  },
};
