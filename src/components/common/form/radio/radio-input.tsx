import { ChangeEvent, forwardRef, useRef, useState } from 'react';

import { Input } from '@/components/common/form/input';
import { Radio, RadioGroup } from '@/components/common/form/radio';

import type { Selection } from '@/api/form/types/server-response';

interface InputRadioProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  context: Selection[];
  value: string;
}

type SelectExtraInputState = {
  isDisabled: boolean;
  value?: string;
};

// TODO: 로직 단훈화
export const RadioWithInput = forwardRef<HTMLInputElement, InputRadioProps>(
  ({ context, value: currentValue, name, onChange }: InputRadioProps, ref) => {
    const [isSelectExtra, setSelectExtra] = useState<SelectExtraInputState>({
      isDisabled: true,
      value: 'extra',
    });
    const extraInputRef = useRef<HTMLInputElement>(null);
    const radioRefs = useRef<HTMLInputElement[]>([]);

    const isControlled = !!currentValue;

    const handleRadioExtraInput = (e: ChangeEvent<HTMLInputElement>) => {
      const targetValue = e.target.value;
      const isExtraInput = targetValue === isSelectExtra.value;

      if (!isExtraInput) {
        if (extraInputRef.current?.value) extraInputRef.current.value = '';
        setSelectExtra({ isDisabled: true, value: '' });
      } else {
        if (ref && typeof ref === 'function') ref(extraInputRef.current);
        setSelectExtra({ isDisabled: false, value: targetValue });
      }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (ref && typeof ref === 'function') {
        ref(e.target);
      }

      if (onChange) onChange(e);
    };

    return (
      <RadioGroup
        onChange={handleOnChange}
        value={
          isControlled
            ? isSelectExtra.isDisabled === false && typeof isSelectExtra.value === 'string'
              ? isSelectExtra.value
              : currentValue
            : undefined
        }
        name={name}
      >
        {context.map(({ label, value }, idx) => {
          if (value === 'extra') {
            return (
              <Radio
                key={`radio-${value}-${idx}`}
                value={isSelectExtra.value}
                onChange={handleRadioExtraInput}
                ref={(el: HTMLInputElement) => (radioRefs.current[idx] = el)}
              >
                기타 :
                <Input name={name} onChange={onChange} disabled={isSelectExtra.isDisabled} ref={extraInputRef} />
              </Radio>
            );
          }

          return (
            <Radio
              value={value}
              key={crypto.randomUUID()}
              onChange={handleRadioExtraInput}
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
