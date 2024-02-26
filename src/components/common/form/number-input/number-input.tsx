import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './number-input.module.css';

interface NumberInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(props, ref) {
  const { className, ...rest } = props;
  return <input type='number' className={className ?? styles.input} {...rest} ref={ref} />;
});
