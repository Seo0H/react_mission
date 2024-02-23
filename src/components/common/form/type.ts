import type { ChangeEvent } from 'react';

export type OnChangeProp = string | React.ChangeEvent<HTMLInputElement>;

export type EventOrValue = React.ChangeEvent<HTMLInputElement> | string;

export type QuestionContext = { value: string; label: string };

export interface MultiQuestionComponentProps {
  /**
   * 선택된 상태가 변경될 때 호출되는 콜백
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  contexts: QuestionContext[];
  name: string;
}
