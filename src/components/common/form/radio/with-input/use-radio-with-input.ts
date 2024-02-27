import { useEffect, useRef, useState } from 'react';

export type SelectExtraInputState = {
  isDisabled: boolean;
  value?: string;
};

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
  const [extraRadioState, setExtraRadio] = useState<SelectExtraInputState>({
    isDisabled: true,
    value: 'extra',
  });
  /** `기타` radio input의 내부 input text ref */
  const extraTextInputRef = useRef<HTMLInputElement>(null);
  /** 전체 라디오 ref */
  const radioRefs = useRef<HTMLInputElement[]>([]);
  const isControlled = !!currentValue;

  useEffect(() => {
    if (!extraRadioState.isDisabled) {
      extraTextInputRef.current?.focus();
    }
  }, [extraRadioState.isDisabled]);

  /**
   * `기타` 란의 라디오 input을 처리하는 이벤트 핸들러
   */
  const handleExtraRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const isExtraInput = targetValue === extraRadioState.value;

    if (!isExtraInput) {
      if (extraTextInputRef.current?.value) extraTextInputRef.current.value = '';
      setExtraRadio({ isDisabled: true, value: '' });
    } else {
      if (ref && typeof ref === 'function') ref(extraTextInputRef.current);
      setExtraRadio({ isDisabled: false, value: targetValue });
    }
  };

  /**
   * 전체 change event를 받아 처리하는 이벤트 핸들러
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref && typeof ref === 'function') {
      ref(e.target);
    }

    if (onChange) onChange(e);
  };

  return { handleChange, extraRadioState, radioRefs, isControlled, handleExtraRadio, extraTextInputRef };
};
