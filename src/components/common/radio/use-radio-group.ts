import { useCallback, useId, useRef, useState } from 'react';

import { isObject } from '@/utils/is';
import { InputDOMAttributes, PropGetter } from '@/utils/prop-type';

type EventOrValue = React.ChangeEvent<HTMLInputElement> | string | number;

function isInputEvent(value: unknown): value is { target: HTMLInputElement } {
  return !!value && isObject(value) && isObject(value.target);
}

type OnChangeProp = string | React.ChangeEvent<HTMLInputElement>;

export interface UseRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?(prop: OnChangeProp): void;
  isDisabled?: boolean;
  name?: string;
}

export const useRadioGroup = (props: UseRadioGroupProps = {}) => {
  const { onChange: onChangeProp, value: valueProp, defaultValue, name: nameProp, isDisabled, ...htmlProps } = props;

  const [valueState, setValue] = useState<string | number>(defaultValue || '');
  const isControlled = typeof valueProp !== 'undefined';
  const value = isControlled ? valueProp : valueState;

  const ref = useRef<any>(null);

  /**
   * All radio options must use the same name
   */
  const uuid = useId();
  const fallbackName = `radio-${uuid}`;
  const name = nameProp || fallbackName;

  const onChange = useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

      if (!isControlled) {
        setValue(nextValue);
      }

      if (isInputEvent(eventOrValue)) {
        onChangeProp?.(eventOrValue);
      } else {
        onChangeProp?.(String(nextValue));
      }
    },
    [onChangeProp, isControlled],
  );

  return {
    value,
    name,
    ref,
    setValue,
    onChange,
    isDisabled,
    htmlProps,
  };
};

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
