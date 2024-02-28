import { ChangeEvent, forwardRef } from 'react';

import { Input } from '@/components/common/form/input';

import { Radio, RadioGroup } from '../index';

import { useRadioWithInput } from './use-radio-with-input';
import type { Selection } from '@/api/form/types/server-response';

interface InputRadioProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  context: Selection[];
  value?: string;
}

export const RadioWithInput = forwardRef<HTMLInputElement, InputRadioProps>(
  ({ context, value: currentValue, name, onChange }: InputRadioProps, ref) => {
    const { isControlled, extraRadioState, radioRefs, extraTextInputRef, handleChange, handleExtraRadio } =
      useRadioWithInput(ref, onChange, currentValue);

    const radioGroupValue = isControlled
      ? extraRadioState.isDisabled === false && typeof extraRadioState.value === 'string'
        ? extraRadioState.value
        : currentValue
      : undefined;

    return (
      <RadioGroup onChange={handleChange} value={radioGroupValue} name={name}>
        {context.map(({ label, value }, idx) => {
          if (value === 'extra') {
            return (
              <Radio
                key={`radio-${value}-${idx}`}
                value={extraRadioState.value}
                onChange={handleExtraRadio}
                ref={(el: HTMLInputElement) => (radioRefs.current[idx] = el)}
              >
                기타 :
                <Input name={name} onChange={onChange} disabled={extraRadioState.isDisabled} ref={extraTextInputRef} />
              </Radio>
            );
          }

          return (
            <Radio
              value={value}
              key={crypto.randomUUID()}
              onChange={handleExtraRadio}
              ref={(el: HTMLInputElement) => (radioRefs.current[idx] = el)}
            >
              {label}
            </Radio>
          );
        })}
      </RadioGroup>
    );
  },
);

RadioWithInput.displayName = 'RadioWithInput';
