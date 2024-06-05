import { useDropdownContext } from './context';
import styles from './index.module.css';

export const Trigger = <T,>({ children }: { children?: React.ReactNode }) => {
  const { selectedValue, setOpen, isOpen } = useDropdownContext<T>();

  return (
    <div data-testid='trigger' onClick={() => setOpen(!isOpen)} className={`${styles['trigger']}`}>
      {children ?? String(selectedValue)}
    </div>
  );
};
