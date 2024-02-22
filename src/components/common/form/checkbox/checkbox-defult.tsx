import { ChangeEvent } from 'react';

import { Checkbox, CheckBoxGroup } from '@/components/common/form/checkbox';

interface DefaultCheckboxProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  contexts: { value: string; label: string }[];
  name: string;
  value: string[];
}

export const DefaultCheckbox = ({ contexts, onChange, value, name }: DefaultCheckboxProps) => {
  return (
    <CheckBoxGroup onChange={onChange} values={[...value]} name={name}>
      {contexts.map(({ label, value: thisValue }) => (
        <Checkbox value={thisValue} key={`${name}-checkbox-${label}`}>
          {label}
        </Checkbox>
      ))}
    </CheckBoxGroup>
  );
};
