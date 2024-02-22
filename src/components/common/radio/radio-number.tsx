import { ChangeEvent } from 'react';

import { Radio } from '@/components/common/radio/radio';
import { RadioGroup } from '@/components/common/radio/radio-group';

interface RadioNumberOptions {
  /**
   * 라디오 넘버의 시작 점수
   */
  minScore: number;

  /**
   * 라디오 넘버의 끝 점수
   */
  maxScore: number;

  /**
   * 각 점수의 일정한 차이
   */
  step?: number;

  /**
   * 기본 값
   */
  defaultValue?: number;

  /**
   * 라디오 넘버의 이름
   */
  name?: string;

  /**
   * 'Checkbox'의 선택된 상태가 변경될 때 호출되는 콜백
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioNumber = ({ minScore, maxScore, step = 1, onChange, defaultValue, name }: RadioNumberOptions) => {
  const radioNumberContext = Array.from({
    length: (maxScore - minScore) * step + 1,
  }).map((_, idx) => (idx + 1) * step);
  return (
    <RadioGroup onChange={onChange} name={name} defaultValue={String(defaultValue)}>
      {radioNumberContext.map((value) => (
        <Radio value={String(value)} key={crypto.randomUUID()}>
          {value} 점
        </Radio>
      ))}
    </RadioGroup>
  );
};
