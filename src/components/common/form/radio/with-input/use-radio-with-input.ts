import { useEffect, useRef } from 'react';

export type SelectExtraInputState = {
  isDisabled: boolean;
  value?: string;
};

const extra = 'extra';

/**
 * @param ref 비제어 모드일 경우 받아오는 ref
 * @param onChange 제어 모드일 경우 받아오는 onChange 핸들러
 * @param currentValue 제어 모드일 경우 컴포넌트의 상태를 제어하는 현제 값
 */
export const useRadioWithInput = (
  ref: React.ForwardedRef<HTMLInputElement>,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  currentValue?: string,
) => {
  /** `기타` radio input의 내부 input text ref */
  const extraTextInputRef = useRef<HTMLInputElement>(null);
  const isControlled = !!currentValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!extraTextInputRef.current) return;

    if (e.target.value !== extra) {
      extraTextInputRef.current.disabled = true;
      extraTextInputRef.current.value = '';
    } else {
      extraTextInputRef.current.disabled = false;
      extraTextInputRef.current.focus();
    }

    if (typeof ref === 'function') {
      if (e.target.value === extra || e.target.type === 'text') {
        ref(extraTextInputRef.current);
      } else if (e.target.type === 'radio') {
        ref(e.target);
      }
    }

    if (onChange) onChange(e);
  };

  return { handleChange, isControlled, extraTextInputRef };
};
