import { useEffect } from 'react';

import styles from './press-enter.module.css';

const PressEnter = ({ enterCallback }: { enterCallback?: () => void }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      enterCallback?.();
    }
  }
  return (
    <div className={styles['enter-text-wrapper']}>
      press <strong>Enter ↵</strong>
    </div>
  );
};

export default PressEnter;
