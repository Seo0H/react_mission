import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(function (
  { className, ...props },
  ref = React.createRef(),
) {
  return <input ref={ref} className={`${styles.input} ${className}`} {...props} />;
});

Input.displayName = 'Input';
