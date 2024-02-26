import { ComponentPropsWithRef, createContext, forwardRef, useContext } from 'react';

import { UseRadioGroupProps, UseRadioGroupReturn, useRadioGroup } from './use-radio-group';

interface RadioGroupContext extends Pick<UseRadioGroupReturn, 'onChange' | 'value' | 'name' | 'isDisabled'> {}

const RadioGroupContext = createContext<RadioGroupContext | undefined>(undefined);

type Omitted = 'onChange' | 'value' | 'defaultValue' | 'defaultChecked';

type RadioGroupStyleProps = {
  groupLayout?: string;
};

interface RadioGroupProps
  extends UseRadioGroupProps,
    Omit<ComponentPropsWithRef<'div'>, Omitted>,
    RadioGroupStyleProps {}

export const useRadioGroupContext = () => {
  const value = useContext(RadioGroupContext);

  return value;
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(props, ref) {
  const { children, isDisabled, groupLayout, ...rest } = props;

  const { value, onChange, name } = useRadioGroup(rest);

  const group = {
    name,
    onChange,
    value,
    isDisabled,
  };

  return (
    <RadioGroupContext.Provider value={group}>
      <div ref={ref} className={groupLayout}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});
