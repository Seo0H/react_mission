import { ClientForm } from '@/constants/client-types';
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

export function setValueToType(
  beforeValue: string | string[],
  updateValue: string,
  type: OriginInputType,
): string | string[] {
  if (type === 'checkbox' && isArray(beforeValue)) {
    const isExist = beforeValue.find((value) => value === updateValue);
    if (isExist) return beforeValue.filter((value) => value !== updateValue);
    else return [...beforeValue, updateValue];
  }

  return updateValue;
}
