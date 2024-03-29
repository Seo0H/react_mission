import { useCallback, useId, useState } from 'react';

import type { EventOrValue, OnChangeProp } from '@/components/common/form/type';
import { isInputEvent } from '@/components/common/form/utils';

export interface UseCheckboxGroupProps {
  values?: string[];
  defaultValue?: string[];
  onChange?(prop: OnChangeProp): void;
  isDisabled?: boolean;
  name?: string;
}

export const useCheckboxGroup = (props: UseCheckboxGroupProps = {}) => {
  const { onChange: onChangeProp, values: valuesProp, defaultValue, name: nameProp, isDisabled, ...htmlProps } = props;

  const [valuesState, setValues] = useState<string[] | undefined>(
    defaultValue === undefined ? undefined : [...defaultValue],
  );
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
        const isHasValue = valuesState?.find((value) => value === nextValue);

        if (typeof isHasValue === 'string' && Array.isArray(valuesState)) {
          setValues(valuesState.filter((value) => value !== nextValue));
        } else if (Array.isArray(valuesState)) setValues([...valuesState, nextValue]);
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
