import React from 'react';

import Header from '@/components/header/header';

import styles from './layout.module.css';

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles['absolute-hight']}>
      <div className={styles['header-wrapper']}>
        <Header />
      </div>
      <main className={styles['global-layout-container']}>
        <div className={styles['global-layout-wrapper']}>{children}</div>
      </main>
    </div>
  );
};
