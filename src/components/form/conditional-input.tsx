import { type ComponentPropsWithRef, type ReactElement, type ChangeEvent } from 'react';

import { Input } from '@/components/common/input';
import { NumberInput } from '@/components/common/number-input';
import { RadioNumber } from '@/components/common/radio/radio-number';
import { isMultiInputAnswer } from '@/components/form/utils';

import type { MultiInputAnswer, SingleInputAnswer } from '@/api/types/request';
import type { Form } from '@/api/types/response';

type InputComponent<
  T = Omit<ComponentPropsWithRef<'input'>, 'value'> & { value: SingleInputAnswer | MultiInputAnswer },
> = (props: T) => ReactElement;

interface ConditionalInputProps {
  type: Form['type'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: SingleInputAnswer | MultiInputAnswer;
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
  checkbox: () => <></>,
  radio: (props) => <></>,
  radioNumber: ({ onChange, value, name }) => (
    <RadioNumber onChange={onChange} value={Number(value)} name={name} maxScore={7} minScore={1} />
  ),
  radioWithInput: () => <></>,
};

const ConditionalInput = ({
  type,
  ...rest
}: ConditionalInputProps & Omit<ComponentPropsWithRef<'input'>, 'value' | 'onChange'>) => {
  return <div>{inputComponents[type](rest)}</div>;
};

export default ConditionalInput;
