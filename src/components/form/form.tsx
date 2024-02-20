import { ChangeEvent } from 'react';

import ConditionalInput from '@/components/form/conditional-input';

import type { Value } from '@/api/form/types/server-response';
import type { ClientForm } from '@/constants/client-types';

interface FormProps {
  form: ClientForm;
  placeholder: string;
  value: Value;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = (props: FormProps) => {
  const { form, ...rest } = props;
  const { name, question, type } = form;
  return (
    <>
      <label htmlFor={name}>{question}</label>
      <ConditionalInput key={form.name} selections={form.radioContext} {...rest} {...form} />
    </>
  );
};

export default Form;
