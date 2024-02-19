import { Placeholder, Selection, Value } from '@/api/types/server-response';

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
