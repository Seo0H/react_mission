import { useState, type ChangeEvent } from 'react';

import { FormQuestion } from '@/components/form/question/question';
import { useFormContext } from '@/hooks/use-form/form-context';

import type { ClientForm } from '@/constants/client-types';

interface FormListProps {
  forms: ClientForm[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormList = ({ forms }: FormListProps) => {
  const [idx, setIdx] = useState(0);
  const { validateSingleValue } = useFormContext();
  const form = forms[idx];
  const isLastQuestion = idx === forms.length - 1;
  const buttonType = isLastQuestion ? 'submit' : 'button';

  const handleClick = () => {
    if (isLastQuestion === false && validateSingleValue(form.name)) {
      setIdx((prev) => prev + 1);
    }
  };

  return (
    <>
      <FormQuestion {...{ form }} />
      <button key={buttonType} type={buttonType} onClick={handleClick}>
        {isLastQuestion ? `제출` : `다음`}
      </button>
    </>
  );
};
