import React from 'react';

import styles from './text.module.css';

export const H1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className={styles.h1}>{children}</h1>;
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className={styles.h2}>{children}</h2>;
};

export const Text = ({ children }: { children: React.ReactNode }) => {
  return <span className={styles.span}>{children}</span>;
};
