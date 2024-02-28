import { ChangeEvent } from 'react';

import { ConditionalInput } from '@/components/form';
import { useFormContext } from '@/hooks/use-form/form-context';

import type { ClientForm } from '@/constants/client-types';

interface FormProps {
  form: ClientForm;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Form = (props: FormProps) => {
  const { getFieldState } = useFormContext();
  const { invalid, error } = getFieldState(props.form.name);

  const { form, ...rest } = props;
  const { name, question } = form;
  return (
    <>
      <label htmlFor={name}>{question}</label>
      <ConditionalInput key={form.name} selections={form.radioContext} {...rest} {...form} />
      {invalid && <span>{error?.message}</span>}
    </>
  );
};
