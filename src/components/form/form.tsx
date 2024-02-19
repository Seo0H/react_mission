import { ChangeEvent } from 'react';

import ConditionalInput from '@/components/form/conditional-input';

import type { SingleInputAnswer, UserAnswer } from '@/api/types/server-request';
import type { Placeholder, Selection } from '@/api/types/server-response';
import type { ClientForm } from '@/constants/client-types';

interface FormProps {
  form: ClientForm;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = (props: FormProps) => {
  const { form, ...rest } = props;
  const { name, question, type } = form;
  return (
    <>
      <label htmlFor={name}>{question}</label>
      <ConditionalInput key={form.name} {...form} selections={form.radioContext} {...rest} />
    </>
  );
};

export default Form;
