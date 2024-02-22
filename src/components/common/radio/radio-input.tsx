import { ChangeEvent, useRef, useState } from 'react';

import { Input } from '@/components/common/input';
import { Radio, RadioGroup } from '@/components/common/radio';

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
export const RadioWithInput = ({ context, value: currentValue, name, onChange }: InputRadioProps) => {
  const [isSelectExtra, setSelectExtra] = useState<SelectExtraInputState>({
    isDisabled: true,
    value: 'extra',
  });
  const extraInputRef = useRef<HTMLInputElement>(null);

  const handleRadioExtraInput = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const isExtraInput = targetValue === isSelectExtra.value;

    if (!isExtraInput) {
      if (extraInputRef.current?.value) extraInputRef.current.value = '';
      setSelectExtra({ isDisabled: true, value: '' });
    } else setSelectExtra({ isDisabled: false, value: targetValue });
  };

  return (
    <RadioGroup
      onChange={onChange}
      value={
        isSelectExtra.isDisabled === false && typeof isSelectExtra.value === 'string'
          ? isSelectExtra.value
          : currentValue
      }
      name={name}
    >
      {context.map(({ label, value }, idx) => {
        if (value === 'extra') {
          return (
            <Radio key={`radio-${value}-${idx}`} value={isSelectExtra.value} onChange={handleRadioExtraInput}>
              기타 :
              <Input name={name} onChange={onChange} disabled={isSelectExtra.isDisabled} ref={extraInputRef} />
            </Radio>
          );
        }

        return (
          <Radio value={value} key={crypto.randomUUID()} onChange={handleRadioExtraInput}>
            {label}
          </Radio>
        );
      })}
    </RadioGroup>
  );
};
