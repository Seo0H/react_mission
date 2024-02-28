import { useCallback, useId, useState } from 'react';

import { useRadioGroupContext } from '@/components/common/form/radio/radio-group';
import type { RadioState, UseRadioProps } from '@/components/common/form/radio/types';

import { InputDOMAttributes, PropGetter } from '@/utils/prop-type';

export const useRadio = (props: UseRadioProps = {}) => {
  const {
    name,
    value,
    isChecked: isCheckedProp,
    defaultChecked,
    onChange,
    isDisabled: isDisabledProp,
    isRequired,
    ...htmlProps
  } = props;

  const uuid = useId();
  const group = useRadioGroupContext();

  const id = props.id ? props.id : `radio-${uuid}`;

  const [isCheckedState, setChecked] = useState(Boolean(defaultChecked));
  const isControlled = typeof isCheckedProp !== 'undefined';

  const isChecked = isControlled ? isCheckedProp : isCheckedState;
  const isDisabled = isDisabledProp ?? group?.isDisabled;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        setChecked(event.target.checked);
      }

      onChange?.(event);
    },
    [isControlled, isDisabled, onChange],
  );

  const getRadioProps: PropGetter<InputDOMAttributes, InputDOMAttributes> = (props = {}, ref = null) => ({
    ...props,
    ...htmlProps,
    id,
    type: 'radio',
    name,
    value,
    checked: isChecked,
    disabled: isDisabled,
    required: isRequired,
    onChange: handleChange,
  });

  const state: RadioState = { isChecked, isDisabled, isRequired };

  return { state, getRadioProps };
};
