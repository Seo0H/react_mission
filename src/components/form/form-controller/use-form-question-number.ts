import { useState } from 'react';

import { useLoaderData } from 'react-router-dom';

import { useFormContext } from '@/hooks/use-form/form-context';

import type { ClientFormData } from '@/constants/client-types';

export const useFormQuestionControl = () => {
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };
  const [idx, setIdx] = useState(0);
  const { validateSingleValue } = useFormContext();
  const form = formLoadedData.forms[idx];
  const isLastQuestion = idx === formLoadedData.forms.length - 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      if (isLastQuestion === false && validateSingleValue(form.name)) {
        e.preventDefault();
        setIdx(idx + 1);
      }
    }
  };

  const handleClick = () => {
    if (isLastQuestion === false && validateSingleValue(form.name)) {
      setIdx(idx + 1);
    }
  };

  return { handleKeyDown, handleClick, isLastQuestion, form, resetIdx: () => setIdx(0) };
};
