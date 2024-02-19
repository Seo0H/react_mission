import { Placeholder, RadioAnswer } from '@/api/types/response';

// Form 제출 시 사용하는 타입
export interface RequestFormAPI {
  userId: string;
  answers: UserAnswer[];
}

export type UserAnswers = {
  [name: string]: UserAnswer;
};

export type UserAnswer = {
  value: SingleInputAnswer | MultiInputAnswer;
  placeholder?: string;
};

export type SingleInputAnswer = Exclude<Placeholder, 'RadioAnswer'>;
export type MultiInputAnswer = Pick<RadioAnswer, 'value' | 'checked'>; // RadioInput, Radio
