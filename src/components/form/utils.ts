import { ClientForm } from '@/constants/client-form-type';
import { isArray } from '@/utils/is';

import type { MultiInputAnswer, UserAnswers } from '@/api/form/types/server-request';

export const makeUserAnswerState = (forms: ClientForm[]): UserAnswers => {
  return forms.reduce(
    (answerForm, form) => ({
      ...answerForm,
      [form.name]: form.type === 'checkbox' ? [] : '',
    }),
    {},
  );
};

export function isMultiInputAnswer(answer: unknown): answer is MultiInputAnswer[] {
  return !!answer && isArray(answer);
}

type OriginInputType = React.InputHTMLAttributes<HTMLInputElement>['type'];

/**
 * 지정된 입력 유형에 따라 값을 업데이트합니다.
 *
 * @param {string | string[]} currentValue - 현재 값 또는 값 배열입니다.
 * @param {string} updatedValue - 업데이트 또는 추가할 값입니다.
 * @param {OriginInputType} inputType - 입력의 유형 (예: 'checkbox').
 * @returns {string | string[]} - 업데이트된 값 또는 값 배열입니다.
 */
export function updateValueByInputType(
  currentValue: string | string[],
  updatedValue: string,
  inputType: OriginInputType,
): string | string[] {
  if (inputType === 'checkbox' && isArray(currentValue)) {
    const isExist = currentValue.find((value) => value === updatedValue);
    if (isExist) return currentValue.filter((value) => value !== updatedValue);
    else return [...currentValue, updatedValue];
  }

  return updatedValue;
}

export function isSelection(selections: unknown): selections is Selection[] {
  return !!selections && isArray(selections);
}
