import { ComponentPropsWithRef } from 'react';

import { Input } from '../input';

import styles from './index.module.css';

export const InputWithLabel = ({ label, ...props }: ComponentPropsWithRef<'input'> & { label: string }) => (
  <div className={styles['input-with-label-wrapper']}>
    <label className={styles['input-with-label']}>{label}</label>
    <Input {...props} />
  </div>
);
