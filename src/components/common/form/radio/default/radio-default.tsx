import { ChangeEvent, createRef, forwardRef, useRef } from 'react';

import { Radio } from '@/components/common/form/radio/radio';
import { RadioGroup } from '@/components/common/form/radio/radio-group';
import type { MultiQuestionComponentProps, QuestionContext } from '@/components/common/form/type';

interface DefaultRadioProps extends MultiQuestionComponentProps {
  value?: string;
  defaultCheckedValue?: string;
}
let count = 0;

export const DefaultRadio = forwardRef<HTMLInputElement, DefaultRadioProps>((props, ref = createRef()) => {
  const { onChange, name, contexts, value, defaultCheckedValue } = props;
  const isControlled = !!value;
  const radioRefs = useRef<HTMLInputElement[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(++count);
    if (ref && typeof ref === 'function') {
      ref(e.target);
    } else if (onChange) onChange(e);
  };

  return (
    <RadioGroup
      onChange={handleOnChange}
      name={name}
      value={isControlled ? value : undefined}
      defaultValue={defaultCheckedValue}
    >
      {contexts.map(({ label, value }, idx) => {
        return (
          <Radio
            key={`${name}-radio-${label}`}
            value={value}
            ref={(el: HTMLInputElement) => (radioRefs.current[idx] = el)}
          >
            {label}
          </Radio>
        );
      })}
    </RadioGroup>
  );
});

DefaultRadio.displayName = 'DefaultRadio';
