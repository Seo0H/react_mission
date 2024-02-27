import { type ComponentPropsWithRef, forwardRef, createRef } from 'react';

import { callAll } from '@/utils/call-all-handlers';

import { useRadioGroupContext } from '../radio-group/radio-group';

import styles from './radio.module.css';
import { useRadio } from './use-radio';
import type { UseRadioProps } from '../types';

type Omitted = 'onChange' | 'defaultChecked' | 'checked' | 'type' | 'value';

type RadioStyleProps = {
  labelStyle?: string;
  textStyle?: string;
};

interface RadioProps extends UseRadioProps, Omit<ComponentPropsWithRef<'input'>, Omitted>, RadioStyleProps {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref = createRef()) {
  const { children, onChange: onChangeProp, className, value, labelStyle, textStyle, ...rest } = props;

  const group = useRadioGroupContext();

  let isChecked = props.isChecked;
  if (group?.value != null && value != null) {
    isChecked = group.value === value;
  }

  let onChange = onChangeProp;
  if (group?.onChange && value != null) {
    onChange = callAll(group.onChange, onChangeProp);
  }

  const name = props?.name ?? group?.name;

  const { getRadioProps } = useRadio({
    ...rest,
    onChange,
    isChecked,
    name,
    value,
  });

  const radioInputProps = getRadioProps({ onChange, name, ref });

  return (
    <label className={`custom-radio ${styles.label} ${labelStyle ? labelStyle : ''}`}>
      <input type='radio' className={className ?? styles.radio} {...radioInputProps} />
      <span className={`${styles.span} ${textStyle ? textStyle : ''}`}>{children}</span>
    </label>
  );
});
