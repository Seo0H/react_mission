import { ChangeEvent, createRef, forwardRef, useRef } from 'react';

import { Radio } from '@/components/common/form/radio/radio';
import { RadioGroup } from '@/components/common/form/radio/radio-group';
import type { QuestionContext } from '@/components/common/form/type';

interface DefaultRadioProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  contexts: QuestionContext[];
  name: string;
  value?: string;
}

export const DefaultRadio = forwardRef<HTMLInputElement, DefaultRadioProps>((props, ref = createRef()) => {
  const { onChange, name, contexts, value } = props;
  const isControlled = !!value;
  const radioRefs = useRef<HTMLInputElement[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref && typeof ref === 'function') {
      ref(e.target);
    }

    if (onChange) onChange(e);
  };

  return (
    <RadioGroup onChange={handleOnChange} name={name} value={isControlled ? value : undefined}>
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