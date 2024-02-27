import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './input.module.css';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref = React.createRef()) {
  return <input ref={ref} className={`${styles.input} ${props.className ? props.className : ''}`} {...props} />;
});

Input.displayName = 'Input';
