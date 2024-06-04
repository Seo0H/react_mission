import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react';

import styles from './index.module.css';
import type { DropdownProps, TDropdownContext } from './type';

const DropdownContexts = createContext<TDropdownContext | null>(null);

export const useDropdownContext = () => {
  const value = useContext(DropdownContexts);
  if (!value) throw new Error('useDropdownContext는 Dropdown 내부에서만 사용할 수 있습니다.');
  return value;
};

export const DropdownProvider = forwardRef<HTMLInputElement, DropdownProps>(
  ({ children, defaultValue, value, onChange, className, ...props }, ref) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedValue, setSelectValue] = useState(defaultValue ?? '선택하기');

    useEffect(() => {
      if (value !== undefined) {
        setSelectValue(value);
      }
    }, [value]);

    const handleSelectValueChange = useCallback((newValue: string) => {
      if (onChange) {
        onChange(newValue);
      } else {
        setSelectValue(newValue);
      }
    }, []);

    return (
      <DropdownContexts.Provider value={{ isOpen, setOpen, selectedValue, setSelectValue: handleSelectValueChange }}>
        <input ref={ref} className={`${styles['input-hidden']}`} value={selectedValue} onChange={() => null} />
        <div {...props} className={`${styles['dropdown-container']} ${className}`}>
          {children}
        </div>
      </DropdownContexts.Provider>
    );
  },
);

DropdownProvider.displayName = 'DropdownProvider';
