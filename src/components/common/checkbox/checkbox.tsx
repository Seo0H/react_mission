import { ComponentPropsWithRef, forwardRef } from 'react';

import { useCheckbox } from '@/components/common/checkbox/use-checkbox';

import { UseCheckboxProps } from './types';

interface CheckboxProps extends UseCheckboxProps, Omit<ComponentPropsWithRef<'input'>, 'value'> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { children, ...rest } = props;
  const { getInputProps } = useCheckbox({ ...rest });

  return (
    <label>
      <input type='checkbox' ref={ref} {...getInputProps()} />
      {children}
    </label>
  );
});

export default Checkbox;
