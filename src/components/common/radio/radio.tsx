import { type ComponentPropsWithRef, forwardRef, createRef } from 'react';

import { useRadioGroupContext } from '@/components/common/radio/radio-group';
import { useRadio } from '@/components/common/radio/use-radio';
import { callAll } from '@/utils/call-all-handlers';

import type { UseRadioProps } from '@/components/common/radio/types';

type Omitted = 'onChange' | 'defaultChecked' | 'checked' | 'type' | 'value';

interface RadioProps extends UseRadioProps, Omit<ComponentPropsWithRef<'input'>, Omitted> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref = createRef()) {
  const { children, onChange: onChangeProp, value, ...rest } = props;

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

  const { getRadioProps } = useRadio({ ...rest, onChange, isChecked, name, value });

  const radioInputProps = getRadioProps({ onChange, name, ref });

  return (
    <label className='custom-radio'>
      <input type='radio' {...radioInputProps} />
      <span className='custom-radio-control' />
      <span>{children}</span>
    </label>
  );
});
