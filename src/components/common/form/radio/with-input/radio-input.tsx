import { ChangeEvent, forwardRef, useEffect, useId } from 'react';

import { Input } from '@/components/common/form/input';

import { isFunction } from '@/utils/is';

import { Radio, RadioGroup } from '../index';

import styles from './radio-input.module.css';
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
    const uniqId = useId();
    const { isControlled, extraTextInputRef, handleChange } = useRadioWithInput(ref, onChange, currentValue);

    const radioGroupValue = isControlled
      ? extraTextInputRef?.current?.disabled === false && typeof extraTextInputRef?.current?.value === 'string'
        ? extraTextInputRef?.current?.value
        : currentValue
      : undefined;

    const wrappedRef = () => {
      if (isFunction(ref)) {
        if (!extraTextInputRef?.current?.disabled) {
          ref(extraTextInputRef.current);
        }
      }
    };

    return (
      <RadioGroup
        onChange={handleChange}
        value={radioGroupValue}
        name={name}
        groupLayout={styles['radio-input-layout']}
        ref={wrappedRef}
      >
        {context.map(({ label, value, checked }, idx) => {
          if (value === 'extra') {
            return (
              <Radio
                key={`radio-${value}-${idx}-${uniqId}`}
                value={value}
                labelStyle={styles['extra-radio-label-layout']}
                textStyle={styles['extra-radio-span']}
                defaultChecked={checked}
              >
                <div className={styles['extra-radio-text-layout']}>
                  기타 :
                  <Input name={name} ref={extraTextInputRef} value={currentValue} disabled />
                </div>
              </Radio>
            );
          }

          return (
            <Radio value={value} defaultChecked={checked} key={`radio-${value}-${idx}-${uniqId}`}>
              {label}
            </Radio>
          );
        })}
      </RadioGroup>
    );
  },
);

RadioWithInput.displayName = 'RadioWithInput';
