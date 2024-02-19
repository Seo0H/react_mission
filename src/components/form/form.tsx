import { ChangeEvent } from 'react';

import ConditionalInput from '@/components/form/conditional-input';

import type { MultiInputAnswer, SingleInputAnswer, UserAnswer } from '@/api/types/request';
import type { Form as TForm } from '@/api/types/response';

interface FormProps {
  form: TForm;
  userAnswer: UserAnswer;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = (props: FormProps) => {
  const { form, userAnswer, ...rest } = props;
  const { name, question, type } = form;
  return (
    <>
      <label htmlFor={name}>{question}</label>
      <ConditionalInput
        type={type}
        name={name}
        value={userAnswer.value}
        placeholder={userAnswer.placeholder}
        {...rest}
      />
    </>
  );
};

export default Form;
