import { ComponentProps, forwardRef, createRef } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import styles from '../buttons/default-button.module.css';

export const Link = forwardRef((props: ComponentProps<typeof RouterLink>, ref = createRef()) => {
  const { children, className, ...rest } = props;

  return (
    <RouterLink className={`${styles['default-button']} ${className}`} {...rest}>
      {children}
    </RouterLink>
  );
});

Link.displayName = 'Link';
