import React, { ComponentPropsWithRef, forwardRef } from 'react';

interface InputOptions {}

interface InputProps extends InputOptions, Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref = React.createRef()) {
  return <input ref={ref} {...props} />;
});

Input.displayName = 'Input';
