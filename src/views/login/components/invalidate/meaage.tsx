import { ComponentProps } from 'react';

import styles from './message.module.css';

export const InvalidateMessage = ({ className, ...props }: ComponentProps<'p'>) => (
  <p {...props} className={`${styles['invalidate-message']} ${className}`} />
);
