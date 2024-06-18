import { ReactNode } from 'react';

import { QuestionType } from '@/api/form/types/server-response';

import { CheckboxOrRadioQuestion } from './checkbox-or-radion-question';
import { NumberQuestion } from './number-question';
import { RadioNumberQuestion } from './radio-number-question';
import { RadioWithInputQuestion } from './radio-with-input-question';
import { TextQuestion } from './text-question';

export const inputType: { [key in QuestionType]: { display: string; element: ReactNode } } = {
  number: { display: '숫자', element: <NumberQuestion /> },
  text: { display: '단답형', element: <TextQuestion /> },
  checkbox: { display: '체크박스', element: <CheckboxOrRadioQuestion /> },
  radio: { display: '객관식', element: <CheckboxOrRadioQuestion /> },
  radioNumber: { display: '객관식 그리드', element: <RadioNumberQuestion /> },
  radioWithInput: { display: '객관식 선택 및 기타', element: <RadioWithInputQuestion /> },
};
