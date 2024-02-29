import React, { forwardRef } from 'react';

import styles from './default-button.module.css';

export const Button = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  (props, ref = React.createRef()) => {
    // eslint-disable-next-line react/prop-types
    const { className, ...rest } = props;

    return <button ref={ref} className={`${styles['default-button']} ${className}`} {...rest} />;
  },
);

Button.displayName = 'DefaultButton';
