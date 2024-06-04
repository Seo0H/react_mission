import { useCallback } from 'react';

import { useDropdownContext } from './context';
import styles from './index.module.css';

export const Item = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const { isOpen, selectedValue, setSelectValue, setOpen } = useDropdownContext();

  const handelClick = useCallback(() => {
    setSelectValue(value);
    setOpen(false);
  }, [value]);

  return (
    isOpen && (
      <div
        onClick={handelClick}
        className={`${styles['item']} ${selectedValue === value && styles['item-select']}`}
        data-testid='dropdown-item'
      >
        {children}
      </div>
    )
  );
};
