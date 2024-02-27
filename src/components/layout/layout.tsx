import { Outlet } from 'react-router-dom';

import Header from '@/components/header/header';

import styles from './layout.module.css';

export const GlobalLayout = () => {
  return (
    <div className={styles['absolute-hight']}>
      <div className={styles['fix-max-with']}>
        <div className={styles['header-wrapper']}>
          <Header />
        </div>
        <main className={styles['global-layout-container']}>
          <div className={styles['global-layout-wrapper']}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
