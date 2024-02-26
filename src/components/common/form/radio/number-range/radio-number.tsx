import { ChangeEvent, createRef, forwardRef, useRef } from 'react';

import { Radio } from '@/components/common/form/radio';
import { RadioGroup } from '@/components/common/form/radio';

import styles from './radio-number.module.css';

interface RadioNumberProps {
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
   * 선택된 상태가 변경될 때 호출되는 콜백
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioNumber = forwardRef<HTMLInputElement, RadioNumberProps>((props, ref = createRef()) => {
  const { maxScore, minScore, step = 1, defaultValue, name, onChange } = props;

  const radioRef = useRef<HTMLInputElement[]>([]);

  const radioNumberContext = Array.from({
    length: (maxScore - minScore) * step + 1,
  }).map((_, idx) => (idx + 1) * step);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(event.target);
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <RadioGroup
      onChange={handleRadioChange}
      name={name}
      defaultValue={String(defaultValue)}
      groupLayout={styles['radio-input-layout']}
    >
      {radioNumberContext.map((value, idx) => (
        <Radio
          value={String(value)}
          key={crypto.randomUUID()}
          ref={(el: HTMLInputElement) => (radioRef.current[idx] = el)}
        >
          {value} 점
        </Radio>
      ))}
    </RadioGroup>
  );
});

RadioNumber.displayName = 'RadioNumber';
