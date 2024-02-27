import { useEffect } from 'react';

import styles from './press-enter.module.css';

const PressEnter = ({ enterCallback }: { enterCallback?: (e: KeyboardEvent) => void }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enterCallback]);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      enterCallback?.(e);
    }
  }
  return (
    <div className={styles['enter-text-wrapper']}>
      press <strong>Enter ↵</strong>
    </div>
  );
};

export default PressEnter;
