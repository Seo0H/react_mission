import { type ChangeEvent } from 'react';

import { UserAnswers } from '@/api/form/types/server-request';
import { Form } from '@/components/form/form';

import type { ClientForm } from '@/constants/client-types';

interface FormListProps {
  forms: ClientForm[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormList = ({ forms, onChange }: FormListProps) => {
  return forms.map((form, idx) => (
    <div key={`${form.name} ${idx}`}>
      <Form placeholder={form.placeholder} onChange={onChange} {...{ form }} />
    </div>
  ));
};
