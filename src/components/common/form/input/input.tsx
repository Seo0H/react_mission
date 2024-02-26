import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './input.module.css';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref = React.createRef()) {
  return <input ref={ref} className={props.className ?? styles.input} {...props} />;
});

Input.displayName = 'Input';
