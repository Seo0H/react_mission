import { isArray, isObject } from '@/utils/is';

import type { MultiInputAnswer, UserAnswers } from '@/api/types/request';
import type { Form } from '@/api/types/response';

export const makeUserAnswerState = (forms: Form[]): UserAnswers => {
  return forms.reduce(
    (answerForm, form) => ({
      ...answerForm,
      [form.name]: {
        value: isArray(form.placeholder) ? { label: '', value: null } : '',
        placeholder: form.placeholder,
      },
    }),
    {},
  );
};

export function isMultiInputAnswer(answer: unknown): answer is MultiInputAnswer {
  return !!answer && isObject(answer);
}
