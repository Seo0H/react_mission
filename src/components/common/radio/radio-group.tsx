import { ComponentPropsWithRef, createContext, forwardRef, useContext } from 'react';

import { UseRadioGroupProps, UseRadioGroupReturn, useRadioGroup } from '@/components/common/radio/use-radio-group';

interface RadioGroupContext extends Pick<UseRadioGroupReturn, 'onChange' | 'value' | 'name' | 'isDisabled'> {}

const RadioGroupContext = createContext<RadioGroupContext | undefined>(undefined);

type Omitted = 'onChange' | 'value' | 'defaultValue' | 'defaultChecked';

interface RadioGroupProps extends UseRadioGroupProps, Omit<ComponentPropsWithRef<'div'>, Omitted> {}

export const useRadioGroupContext = () => {
  const value = useContext(RadioGroupContext);

  return value;
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(props, ref) {
  const { children, isDisabled, ...rest } = props;

  const { value, onChange, name, htmlProps } = useRadioGroup(rest);

  const group = {
    name,
    onChange,
    value,
    isDisabled,
  };

  return (
    <RadioGroupContext.Provider value={group}>
      <div ref={ref}>{children}</div>
    </RadioGroupContext.Provider>
  );
});
