import { ComponentPropsWithRef, forwardRef } from 'react';

import { useCheckboxGroupContext } from '@/components/common/checkbox/checkbox-group';
import { UseCheckboxProps } from '@/components/common/checkbox/types';
import { useCheckbox } from '@/components/common/checkbox/use-checkbox';
import { callAll } from '@/utils/call-all-handlers';

interface CheckboxProps extends UseCheckboxProps, Omit<ComponentPropsWithRef<'input'>, 'value'> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { children, onChange: onChangeProp, value, isDisabled, ...rest } = props;

  const group = useCheckboxGroupContext();

  let isChecked = props.isChecked;
  if (!!group?.values.length && value != null) {
    isChecked = group.values?.includes(String(value));
  }

  let onChange = onChangeProp;
  if (group?.onChange && value != null) {
    onChange = callAll(group.onChange, onChangeProp);
  }

  const name = props?.name ?? group?.name;

  const { getInputProps } = useCheckbox({ ...rest, onChange, isChecked, name, value, isDisabled });

  return (
    <label>
      <input type='checkbox' ref={ref} {...getInputProps()} {...rest} />
      {children}
    </label>
  );
});

export default Checkbox;
