import type { Validate } from '@/hooks/use-form/types/validator';

export type APIResponse<DataType> = {
  status: number;
  data: DataType;
};

/**
 * form api 에서 get 형식으로 질문을 가져올 경우 받아와지는 데이터 양식
 */
export type FormData = {
  userId?: string; // userId는 typeID가 common인 특수한 경우에만 리턴된다.
  forms: Form[];
  escapeValidate: (Validate & { name: string })[];
};

type ValidateType = Validate['type'];
type TargetType = number | [min: number, max: number] | string;

export type Form = {
  name: string; // form 작성 후 서버에 보낼 때의 이름
  question: string; // user에게 보여줘야 하는 질문
  required: boolean; // 필수 질문 여부
  type: QuestionType;
  placeholder: Placeholder;
  validate: Validate[];
};

export type QuestionType = 'text' | 'number' | 'checkbox' | 'radio' | 'radioNumber' | 'radioWithInput';
export type Placeholder = string | Selection[]; // user가 선택 전 default로 선택된 value;
export interface Selection {
  label: string;
  value: string;
  checked: boolean;
}

export type Value = string | string[];

/**
 * post 로 유저가 작성한 form data를 전송한 후 응답받는 데이터 양식
 */
export type PostResponseData = {
  isSuccess: boolean;
  nextTypeId?: string;
  userId?: string;
};
