import { useCallback, useId, useRef, useState } from 'react';

import { isInputEvent } from '@/components/common/utils';

import type { EventOrValue, OnChangeProp } from '@/components/common/type';

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
    setValue,
    onChange,
    isDisabled,
    htmlProps,
  };
};

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
