import { type ChangeEvent } from 'react';

import { UserAnswers } from '@/api/form/types/server-request';
import { Form } from '@/components/form/form';

import type { ClientForm } from '@/constants/client-types';

interface FormListProps {
  forms: ClientForm[];
  userAnswers: UserAnswers;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormList = ({ forms, userAnswers, onChange }: FormListProps) => {
  return forms.map((form, idx) => (
    <Form
      key={`${form.name} ${idx}`}
      value={userAnswers[form.name]}
      placeholder={form.placeholder}
      onChange={onChange}
      {...{ form }}
    />
  ));
};
