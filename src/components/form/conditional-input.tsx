import { type ComponentPropsWithRef, type ReactElement, type ChangeEvent } from 'react';

import { DefaultCheckbox } from '@/components/common/checkbox';
import { Input } from '@/components/common/input';
import { NumberInput } from '@/components/common/number-input';
import { DefaultRadio, RadioNumber, RadioWithInput } from '@/components/common/radio';
import { isMultiInputAnswer } from '@/components/form/utils';
import { isArray } from '@/utils/is';

import type { Form, FormType, Selection } from '@/api/types/server-response';

type Omitted = 'value' | 'value' | 'onChange';

type InputComponent<T = Omit<ComponentPropsWithRef<'input'>, Omitted> & Omit<ConditionalInputProps, 'type'>> = (
  props: T,
  type: FormType,
) => ReactElement;

interface ConditionalInputProps {
  name: string;
  type: Form['type'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  selections?: Selection[];
}

const inputComponents: { [key in Form['type']]: InputComponent } = {
  text: ({ value, ...rest }) => {
    if (isMultiInputAnswer(value)) throw new Error('Input must have single input answer value');
    return <Input value={String(value)} {...rest} />;
  },
  number: ({ value, ...rest }) => {
    if (isMultiInputAnswer(value)) throw new Error('Number Input must have single input answer value');
    return <NumberInput value={Number(value)} {...rest} />;
  },
  checkbox: ({ value, selections, ...rest }) => {
    if (!isSelection(selections)) throw new Error('Radio must have multi answer value');
    return <DefaultCheckbox contexts={selections} value={String(value)} {...rest} />;
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

const ConditionalInput = ({ type, ...rest }: ConditionalInputProps & Omit<ComponentPropsWithRef<'input'>, Omitted>) => {
  return <div>{inputComponents[type](rest, type)}</div>;
};

export default ConditionalInput;

function isSelection(selections: unknown): selections is Selection[] {
  return !!selections && isArray(selections);
}
