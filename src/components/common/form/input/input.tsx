import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(function (
  props,
  ref = React.createRef(),
) {
  return <input ref={ref} className={`${styles.input} ${props.className ? props.className : ''}`} {...props} />;
});

Input.displayName = 'Input';
