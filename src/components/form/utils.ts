import { ClientForm } from '@/constants/client-types';
import { isArray } from '@/utils/is';

import type { MultiInputAnswer, UserAnswers } from '@/api/types/server-request';

export const makeUserAnswerState = (forms: ClientForm[]): UserAnswers => {
  return forms.reduce(
    (answerForm, form) => ({
      ...answerForm,
      [form.name]: '',
    }),
    {},
  );
};

export function isMultiInputAnswer(answer: unknown): answer is MultiInputAnswer[] {
  return !!answer && isArray(answer);
}
