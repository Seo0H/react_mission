import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react';

import { once } from '@/utils/once';

import styles from './index.module.css';
import type { DropdownProps, TDropdownContext } from './type';

const createDropdownContexts = once(<SelectType,>() => createContext<TDropdownContext<SelectType> | null>(null));

export const useDropdownContext = <SelectType,>() => {
  const value = useContext(createDropdownContexts<SelectType>());
  if (!value) throw new Error('useDropdownContext는 Dropdown 내부에서만 사용할 수 있습니다.');
  return value;
};

const DropdownProviderInner = <SelectType,>(
  { children, defaultValue, value, onChange, className, ...props }: DropdownProps<SelectType>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectValue] = useState<SelectType | null>(defaultValue ?? null);
  const DropdownContexts = createDropdownContexts<SelectType>();

  useEffect(() => {
    if (value !== undefined) {
      setSelectValue(value);
    }
  }, [value]);

  const handleSelectValueChange = useCallback(
    (newValue: SelectType) => {
      if (onChange) {
        onChange(newValue);
      } else {
        setSelectValue(newValue);
      }
    },
    [selectedValue, onChange, setSelectValue],
  );

  return (
    <DropdownContexts.Provider value={{ isOpen, setOpen, selectedValue, setSelectValue: handleSelectValueChange }}>
      <div className={`${styles['dropdown-container']} ${className}`}>
        {/* for form submit */}
        <input ref={ref} className={`${styles['input-hidden']}`} value={String(selectedValue)} {...props} readOnly />
        <div className={styles['dropdown-children']}>{children}</div>
      </div>
    </DropdownContexts.Provider>
  );
};

export const DropdownProvider = forwardRef(DropdownProviderInner) as <T>(
  // eslint-disable-next-line no-unused-vars
  props: DropdownProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof DropdownProviderInner>;
