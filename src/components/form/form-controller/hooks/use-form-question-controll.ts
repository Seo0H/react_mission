import { useState } from 'react';

import { useLoaderData } from 'react-router-dom';

import { useFormContext } from '@/hooks/use-form/form-context';

import type { ClientFormData } from '@/constants/client-form-type';

export const useFormQuestionControl = () => {
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };
  const { forms } = formLoadedData;
  const [idx, setIdx] = useState(0);
  const { validateSingleValue } = useFormContext();
  const form = forms[idx];
  const isLastQuestion = idx === forms.length - 1;

  const nextQuestion = () => {
    if (isLastQuestion === false && validateSingleValue(form.name)) {
      setIdx(idx + 1);
    }
  };

  const beforeQuestion = () => {
    if (idx > 0) setIdx(idx - 1);
  };

  return {
    forms,
    currentIdx: idx,
    nextQuestion,
    beforeQuestion,
    isLastQuestion,
    form,
    percentage: Math.floor(((idx + 1) / forms.length) * 100),
    resetIdx: () => setIdx(0),
  };
};
