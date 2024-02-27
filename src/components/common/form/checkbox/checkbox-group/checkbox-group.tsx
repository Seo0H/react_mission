import { ComponentPropsWithRef, createContext, createRef, forwardRef, useContext } from 'react';

import { type UseCheckboxGroupReturn, type UseCheckboxGroupProps, useCheckboxGroup } from './use-checkbox-group';

interface CheckboxGroupContext extends Pick<UseCheckboxGroupReturn, 'isDisabled' | 'name' | 'onChange' | 'values'> {}

type Omitted = 'onChange' | 'value' | 'defaultValue' | 'defaultChecked';

interface CheckboxGroupProps extends UseCheckboxGroupProps, Omit<ComponentPropsWithRef<'div'>, Omitted> {}

const CheckboxGroupContext = createContext<CheckboxGroupContext | undefined>(undefined);

export const useCheckboxGroupContext = () => {
  const value = useContext(CheckboxGroupContext);

  return value;
};

export const CheckBoxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  props,
  ref = createRef(),
) {
  const { children, isDisabled, ...rest } = props;
  const { values, onChange, name } = useCheckboxGroup(rest);

  const group: CheckboxGroupContext = {
    values,
    name,
    onChange,
    isDisabled,
  };

  return (
    <CheckboxGroupContext.Provider value={group}>
      <div ref={ref}>{children}</div>
    </CheckboxGroupContext.Provider>
  );
});
