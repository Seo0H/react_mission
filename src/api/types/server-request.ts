import { Placeholder, Selection } from '@/api/types/server-response';

// Form 제출 시 사용하는 타입
export interface RequestFormAPI {
  userId: string;
  answers: UserAnswer[];
}

export type UserAnswers = {
  [name: string]: string;
};

export type UserAnswer = string;

export type SingleInputAnswer = Exclude<Placeholder, 'RadioAnswer'>;
export type MultiInputAnswer = Pick<Selection, 'value' | 'checked'>[]; // RadioInput, Radio
