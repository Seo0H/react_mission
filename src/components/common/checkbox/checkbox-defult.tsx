import { ChangeEvent } from 'react';

import Checkbox from '@/components/common/checkbox/checkbox';
import CheckBoxGroup from '@/components/common/checkbox/checkbox-group';

interface DefaultCheckboxProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  contexts: { value: string; label: string }[];
  name: string;
  value: string;
}

const DefaultCheckbox = ({ contexts, onChange, value, name }: DefaultCheckboxProps) => {
  return (
    <CheckBoxGroup onChange={onChange} values={[value]} name={name}>
      {contexts.map(({ label, value }) => (
        <Checkbox value={value} key={`${name}-checkbox-${label}`}>
          {label}
        </Checkbox>
      ))}
    </CheckBoxGroup>
  );
};

export default DefaultCheckbox;
