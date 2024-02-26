/* eslint-disable no-unused-vars */
import type { ComponentPropsWithRef, ReactElement } from 'react';

import { DefaultCheckbox } from '@/components/common/form/checkbox';
import { Input } from '@/components/common/form/input';
import { NumberInput } from '@/components/common/form/number-input';
import { DefaultRadio, RadioNumber, RadioWithInput } from '@/components/common/form/radio';

import { isSelection } from '@/components/form/utils';

import type { Form } from '@/api/form/types/server-response';
import type { ConditionalInputProps, Omitted } from '@/components/form/conditional-input/conditional-input';
import type { FieldValues } from '@/hooks/use-form/types/fields';
import type { UseFormReturn } from '@/hooks/use-form/types/form';

type InputComponentProps<T = Omit<ComponentPropsWithRef<'input'>, Omitted> & Omit<ConditionalInputProps, 'type'>> = (
  props: T,
  formContext: UseFormReturn<FieldValues>,
) => ReactElement;

export const inputComponents: { [key in Form['type']]: InputComponentProps } = {
  //--- single input ---
  text: ({ name, validate: validates, ...rest }, { register }) => {
    return <Input {...rest} {...register(name, { validates })} />;
  },
  // FIXME: number input에 문자 값이 허용되는 현상 수정
  number: ({ name, validate: validates, ...rest }, { register }) => {
    return <NumberInput {...rest} {...register(name, { validates })} />;
  },
  //--- multi input ---
  checkbox: ({ name, selections, validate: validates, ...rest }, { register }) => {
    if (!isSelection(selections)) throw new Error('Checkbox must have multi answer value');
    return <DefaultCheckbox contexts={selections} {...rest} {...register(name, { validates })} />;
  },
  radio: ({ selections, name, validate: validates, ...rest }, { register }) => {
    if (!isSelection(selections)) throw new Error('Radio must have multi answer value');
    return <DefaultRadio contexts={selections} {...rest} {...register(name, { validates })} />;
  },
  radioNumber: ({ name }, { register }) => <RadioNumber maxScore={7} minScore={1} {...register(name)} />,
  radioWithInput: ({ selections, name, validate: validates, ...rest }, { register }) => {
    if (!isSelection(selections)) throw new Error('Radio Input must have multi answer value');
    return <RadioWithInput context={selections} {...rest} {...register(name, { validates })} />;
  },
};
