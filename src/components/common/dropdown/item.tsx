import { useCallback } from 'react';

import { useDropdownContext } from './context';
import styles from './index.module.css';

export const Item = <T,>({ value, children }: { value: T; children: React.ReactNode }) => {
  const { isOpen, selectedValue, setSelectValue, setOpen } = useDropdownContext<T>();

  const handelClick = useCallback(() => {
    setSelectValue(value);
    setOpen(false);
  }, [value, setSelectValue]);

  return (
    isOpen && (
      <div
        onClick={handelClick}
        className={`${styles['item']} ${styles['dropdown-btn-style']} ${selectedValue === value && styles['item-select']}`}
        data-testid='dropdown-item'
      >
        {children}
      </div>
    )
  );
};
