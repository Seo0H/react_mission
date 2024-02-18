import { ComponentPropsWithRef, forwardRef } from 'react';

interface InputOptions {}

interface NumberInputProps extends InputOptions, Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(props, ref) {
  return <input type='number' {...props} ref={ref} />;
});
