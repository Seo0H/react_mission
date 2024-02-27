import { Placeholder, Selection, Value } from '@/api/form/types/server-response';
import { Languages } from '@/constants/languages';

// Form 제출 시 사용하는 타입
export interface RequestFormAPI {
  userId: string;
  answers: UserAnswer[];
}

export type UserAnswers = {
  [name: string]: Value; // string[] - checkbox type
};

export type UserAnswer = string;

export type SingleInputAnswer = Exclude<Placeholder, 'RadioAnswer'>;
export type MultiInputAnswer = Pick<Selection, 'value' | 'checked'>[]; // RadioInput, Radio

export type GetQuestionWithIdProps = {
  id: string;
  lang?: Languages;
};

export interface PostUserAnswerDataProps {
  userId: string;
  userAnswers: UserAnswers;
  typeId: string;
}
