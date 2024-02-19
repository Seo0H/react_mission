import { useCallback, useId, useState } from 'react';

import { isInputEvent } from '@/components/common/utils';

import type { EventOrValue, OnChangeProp } from '@/components/common/type';

export interface UseCheckboxGroupProps {
  values?: string[];
  defaultValue?: string;
  onChange?(prop: OnChangeProp): void;
  isDisabled?: boolean;
  name?: string;
}

export const useCheckboxGroup = (props: UseCheckboxGroupProps = {}) => {
  const { onChange: onChangeProp, values: valuesProp, defaultValue, name: nameProp, isDisabled, ...htmlProps } = props;

  const [valuesState, setValues] = useState<string[]>(defaultValue === undefined ? [] : [defaultValue]);
  const isControlled = valuesProp !== undefined;
  const values = isControlled ? valuesProp : valuesState;

  /**
   * All checkbox options must use the same name
   */
  const uuid = useId();
  const fallbackName = `checkbox-${uuid}`;
  const name = nameProp || fallbackName;

  const onChange = useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

      if (!isControlled) {
        const isHasValue = valuesState.find((value) => value === nextValue);

        if (typeof isHasValue === 'string') {
          setValues((prevValues) => prevValues.filter((value) => value !== nextValue));
        } else setValues((prevValues) => [...prevValues, nextValue]);
      }

      if (isInputEvent(eventOrValue)) {
        onChangeProp?.(eventOrValue);
      } else {
        onChangeProp?.(String(nextValue));
      }
    },
    [onChangeProp, isControlled],
  );

  return { values, name, setValues, onChange, isDisabled, htmlProps };
};

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
