import { ComponentProps, forwardRef, createRef } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import buttonStyles from '../buttons/default-button.module.css';

export const BgBlue = forwardRef((props: ComponentProps<typeof RouterLink>, ref = createRef()) => {
  const { children, className, ...rest } = props;

  return (
    <RouterLink className={`${buttonStyles['blue-bg-round-button']} ${className}`} {...rest}>
      {children}
    </RouterLink>
  );
});

BgBlue.displayName = 'ButtonStyledLink';

export const Link = { BgBlue };
