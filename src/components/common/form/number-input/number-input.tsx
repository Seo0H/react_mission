import { ComponentPropsWithRef, forwardRef } from 'react';

interface NumberInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(props, ref) {
  return <input type='number' {...props} ref={ref} />;
});
