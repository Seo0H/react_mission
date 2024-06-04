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

export const NoBgSmallText = forwardRef((props: ComponentProps<typeof RouterLink>, ref = createRef()) => {
  const { children, className, ...rest } = props;

  return (
    <RouterLink className={`${buttonStyles['small-no-bg-button']} ${className}`} {...rest}>
      {children}
    </RouterLink>
  );
});

BgBlue.displayName = 'ButtonStyledLink';
NoBgSmallText.displayName = 'NoBgSmallTextLink';

export const Link = { BgBlue, NoBgSmallText };
