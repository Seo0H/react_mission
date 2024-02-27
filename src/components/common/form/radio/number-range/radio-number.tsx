import { ChangeEvent, ComponentProps, createRef, forwardRef, useRef } from 'react';

import { Radio } from '@/components/common/form/radio';
import { RadioGroup } from '@/components/common/form/radio';

import { useLanguageContext } from '@/hooks/use-language/language-context';

import styles from './radio-number.module.css';

interface RadioNumberProps extends ComponentProps<'input'> {
  /**
   * 라디오 넘버의 시작 점수
   */
  minScore: number;

  /**
   * 라디오 넘버의 끝 점수
   */
  maxScore: number;

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
  const { maxScore, minScore, step = 1, value, defaultValue, name, onChange } = props;
  const { lang } = useLanguageContext();
  const isControlled = !!value;

  const radioRef = useRef<HTMLInputElement[]>([]);

  const radioNumberContext = Array.from({
    length: (maxScore - minScore) * Number(step) + 1,
  }).map((_, idx) => (idx + 1) * Number(step));

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ref && typeof ref === 'function') {
      ref(event.target);
    } else if (onChange) {
      onChange(event);
    }
  };

  return (
    <RadioGroup
      onChange={handleRadioChange}
      name={name}
      value={isControlled ? String(value) : undefined}
      defaultValue={String(defaultValue)}
      groupLayout={styles['radio-input-layout']}
      ref={ref}
    >
      {radioNumberContext.map((value, idx) => (
        <Radio
          value={String(value)}
          key={`${name}-radio-number-${idx}`}
          ref={(el: HTMLInputElement) => (radioRef.current[idx] = el)}
        >
          {value} {lang === 'ko' ? '점' : 'point'}
        </Radio>
      ))}
    </RadioGroup>
  );
});

RadioNumber.displayName = 'RadioNumber';
