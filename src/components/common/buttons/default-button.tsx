import React, { forwardRef } from 'react';

import styles from './default-button.module.css';

export const Button = forwardRef((props: React.ComponentProps<'button'>, ref = React.createRef()) => {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;

  return <button className={className ?? styles['default-button']} {...rest} />;
});

Button.displayName = 'DefaultButton';
