import { useState } from 'react';

import { callAllHandlers } from '@/utils/call-all-handlers';
import { PropGetter } from '@/utils/prop-type';

import type { CheckboxState, UseCheckboxProps } from '@/components/common/checkbox/types';

export function useCheckbox(props: UseCheckboxProps = {}) {
  const {
    name,
    value,
    id,
    isDisabled: disabledProp,
    isReadOnly,
    isChecked: checkedProp,
    isRequired,
    defaultChecked,
    onChange: onChangeProp,
    ...htmlProps
  } = props;

  const [checkedState, setCheckedState] = useState(!!defaultChecked);

  const isControlled = checkedProp !== undefined;
  const isChecked = isControlled ? checkedProp : checkedState;
  const isDisabled = !!disabledProp;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled) {
      setCheckedState(event.target.checked);
    }

    onChangeProp?.(event);
  };

  const getInputProps: PropGetter = (props = {}, ref = null) => {
    return {
      ...props,
      ref,
      type: 'checkbox',
      name,
      value,
      id,
      onChange: callAllHandlers(props.onChange, handleChange),
      required: isRequired,
      checked: isChecked,
      disabled: isDisabled,
      readOnly: isReadOnly,
    };
  };

  const state: CheckboxState = {
    isChecked,
    isDisabled,
  };

  return {
    state,
    getInputProps,
    htmlProps,
  };
}
