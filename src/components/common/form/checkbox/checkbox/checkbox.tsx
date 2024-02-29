import { ComponentPropsWithRef, forwardRef } from 'react';

import { callAll } from '@/utils/call-all-handlers';

import { useCheckboxGroupContext } from '../checkbox-group/checkbox-group';
import { UseCheckboxProps } from '../types';

import styles from './checkbox.module.css';
import { useCheckbox } from './use-checkbox';

interface CheckboxProps extends UseCheckboxProps, Omit<ComponentPropsWithRef<'input'>, 'value'> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { children, onChange: onChangeProp, className, value, isDisabled, ...rest } = props;

  const group = useCheckboxGroupContext();

  let isChecked = props.isChecked;
  if (group?.values?.length && value != null) {
    isChecked = group.values?.includes(String(value));
  }

  let onChange = onChangeProp;
  if (group?.onChange && value != null) {
    onChange = callAll(group.onChange, onChangeProp);
  }

  const name = props?.name ?? group?.name;

  const { getInputProps } = useCheckbox({
    ...rest,
    onChange,
    isChecked,
    name,
    value,
    isDisabled,
  });

  return (
    <label>
      <input type='checkbox' ref={ref} className={`${className} ${styles.checkbox}`} {...getInputProps()} {...rest} />
      {children}
    </label>
  );
});
