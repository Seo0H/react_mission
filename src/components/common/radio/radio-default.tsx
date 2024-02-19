import { ChangeEvent, useId } from 'react';

import { Radio } from '@/components/common/radio/radio';
import { RadioGroup } from '@/components/common/radio/radio-group';

interface DefaultRadioProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  contexts: { value: string; label: string }[];
  name: string;
  value: string;
}

const DefaultRadio = ({ contexts, onChange, value, name }: DefaultRadioProps) => {
  return (
    <RadioGroup onChange={onChange} value={value} name={name}>
      {contexts.map(({ label, value }) => {
        return (
          <Radio key={`${name}-radio-${label}`} value={value}>
            {label}
          </Radio>
        );
      })}
    </RadioGroup>
  );
};

export default DefaultRadio;
