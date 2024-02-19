import { ChangeEvent } from 'react';

import { Radio } from '@/components/common/radio/radio';
import { RadioGroup } from '@/components/common/radio/radio-group';

interface RadioNumberProps {
  minScore: number;
  maxScore: number;
  step?: number;
  value?: number;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioNumber = ({ minScore, maxScore, step = 1, onChange, value, name }: RadioNumberProps) => {
  const radioNumberContext = Array.from({ length: (maxScore - minScore) * step + 1 }).map((_, idx) => (idx + 1) * step);
  return (
    <RadioGroup value={String(value)} onChange={onChange} name={name}>
      {radioNumberContext.map((value) => (
        <Radio value={String(value)} key={crypto.randomUUID()}>
          {value} 점
        </Radio>
      ))}
    </RadioGroup>
  );
};
