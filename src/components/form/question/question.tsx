import { ChangeEvent } from 'react';

import { ConditionalInput } from '@/components/form';
import { useFormContext } from '@/hooks/use-form/form-context';

import styles from './question.module.css';
import type { ClientForm } from '@/constants/client-types';

interface FormQuestionProps {
  form: ClientForm;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormQuestion = (props: FormQuestionProps) => {
  const { getFieldState } = useFormContext();
  const { invalid, error } = getFieldState(props.form.name);

  const { form, ...rest } = props;
  const { name, question, required } = form;
  return (
    <div className={styles['question-wrapper']}>
      <label htmlFor={name} className={`${styles['question-label']} ${required && styles['required']}`}>
        {question}
      </label>
      <div className={styles['question-input-wrapper']}>
        <ConditionalInput key={form.name} selections={form.radioContext} {...rest} {...form} />
      </div>
      {invalid && <span>{error?.message}</span>}
    </div>
  );
};
