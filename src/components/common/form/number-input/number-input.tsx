import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './number-input.module.css';

interface NumberInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  props,
  ref = React.createRef(),
) {
  return (
    <input type='number' ref={ref} className={`${styles.input} ${props.className ? props.className : ''}`} {...props} />
  );
});

NumberInput.displayName = 'NumberInput';
