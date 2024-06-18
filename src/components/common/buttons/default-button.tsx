import React, { forwardRef } from 'react';

import styles from './default-button.module.css';

const BlueBg = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>((props, ref = React.createRef()) => {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;

  return <button ref={ref} className={`${styles['blue-bg-round-button']} ${className}`} {...rest} />;
});

const SmallNoBg = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>((props, ref = React.createRef()) => {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;

  return <button ref={ref} className={`${styles['small-no-bg-button']} ${className}`} {...rest} />;
});

BlueBg.displayName = 'DefaultButton';
SmallNoBg.displayName = 'SmallNoBgButton';

export const Button = { BlueBg, SmallNoBg };
