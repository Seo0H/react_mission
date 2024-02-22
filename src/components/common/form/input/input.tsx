import React, { ComponentPropsWithRef, forwardRef } from 'react';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref = React.createRef()) {
  return <input ref={ref} {...props} />;
});

Input.displayName = 'Input';
