import { useState } from 'react';

import { callAllHandlers } from '@/utils/call-all-handlers';
import { PropGetter } from '@/utils/prop-type';

import { useCheckboxGroupContext } from '../checkbox-group/checkbox-group';

import type { CheckboxState, UseCheckboxProps } from '../types';

export function useCheckbox(props: UseCheckboxProps = {}) {
  const {
    name,
    value: valueProps,
    id,
    isDisabled: isDisabledProp,
    isReadOnly,
    isChecked: checkedProp,
    isRequired,
    defaultChecked,
    onChange: onChangeProp,
    ...htmlProps
  } = props;

  const group = useCheckboxGroupContext();

  const isValueIncludedGroup = !!group?.values?.find((groupValue) => groupValue === valueProps);

  const [checkedState, setCheckedState] = useState(!!defaultChecked || isValueIncludedGroup);

  const isControlled = checkedProp !== undefined;
  const isChecked = isControlled ? checkedProp : checkedState;
  const isDisabled = isDisabledProp ?? group?.isDisabled;

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
      ...htmlProps,
      ref,
      type: 'checkbox',
      name,
      value: valueProps,
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
  };
}
