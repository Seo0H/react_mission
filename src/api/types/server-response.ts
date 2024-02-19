export type FormType = 'text' | 'number' | 'checkbox' | 'radio' | 'radioNumber' | 'radioWithInput';
type TargetType = number | [min: number, max: number] | string;
type Validate =
  | {
      type: 'not';
      target: '' | '-1' | [];
    }
  | {
      type: 'minMax';
      target: [min: number, max: number];
    }
  | {
      type: 'sameAs';
      target: string | number;
    }
  | {
      type: 'pattern';
      target: string;
    }
  | {
      type: 'minMaxLength';
      target: [min: number, max: number];
      validateText: string;
    };

type ValidateType = Validate['type'];

export type Form = {
  name: string; // form 작성 후 서버에 보낼 때의 이름
  question: string; // user에게 보여줘야 하는 질문
  required: boolean; // 필수 질문 여부
  type: FormType; // form type;
  placeholder: Placeholder;
  validate: Validate[];
};

export type FormAPIResponseType = {
  status: number;
  data: FormData; // if name에 해당하는 value가 있고, 해당 validate를 통과하지 못하면 `no_target`으로 리다이렉트 시킨다.
};

export type FormData = {
  userId?: string; // userId는 typeID가 common인 특수한 경우에만 리턴된다.
  forms: Form[];
  escapeValidate: {
    name: string;
    type: ValidateType;
    target: TargetType;
  }[]; // if name에 해당하는 value가 있고, 해당 validate를 통과하지 못하면 `no_target`으로 리다이렉트 시킨다.
};

export type Placeholder = string | Selection[]; // user가 선택 전 default로 선택된 value;

export interface Selection {
  label: string;
  value: string;
  checked: boolean;
}
