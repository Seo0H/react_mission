import { useDropdownContext } from './context';
import styles from './index.module.css';

export const Trigger = ({ children }: { children?: React.ReactNode }) => {
  const { selectedValue, setOpen, isOpen } = useDropdownContext();

  return (
    <div data-testid='trigger' onClick={() => setOpen(!isOpen)} className={styles['trigger']}>
      {children ?? selectedValue}
    </div>
  );
};
