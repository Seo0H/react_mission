import { ChangeEvent, forwardRef, useRef } from 'react';

import { Checkbox, CheckBoxGroup } from '@/components/common/form/checkbox';
import type { MultiQuestionComponentProps } from '@/components/common/form/type';

interface DefaultCheckboxProps extends MultiQuestionComponentProps {
  value?: string[];
  defaultCheckedValues?: string[];
}

export const DefaultCheckbox = forwardRef<HTMLInputElement, DefaultCheckboxProps>(
  ({ contexts, onChange, value: currentValues, name, defaultCheckedValues }, ref) => {
    const isControlled = !!currentValues && !!onChange;
    const checkboxRef = useRef<HTMLInputElement[]>([]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (ref && typeof ref === 'function') {
        ref(e.target);
      }

      if (isControlled) onChange(e);
    };

    return (
      <CheckBoxGroup
        onChange={handleOnChange}
        values={isControlled ? [...currentValues] : undefined}
        name={name}
        defaultValue={defaultCheckedValues}
      >
        {contexts.map(({ label, value: thisValue }, idx) => (
          <Checkbox
            value={thisValue}
            key={`${name}-checkbox-${label}`}
            ref={(el: HTMLInputElement) => (checkboxRef.current[idx] = el)}
          >
            {label}
          </Checkbox>
        ))}
      </CheckBoxGroup>
    );
  },
);

DefaultCheckbox.displayName = 'DefaultCheckbox';
