import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';

import Form from '@/components/form/form';
import { makeUserAnswerState } from '@/components/form/utils';

import type { ClientForm } from '@/constants/client-types';

const FormList = ({ forms }: { forms: ClientForm[] }) => {
  const [userAnswers, setUserAnswers] = useState(makeUserAnswerState(forms));

  const handleUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    const targetUserAnswer = userAnswers[targetName];

    if (targetUserAnswer === undefined) throw new Error('name이 없습니다.');
    setUserAnswers((prev) => ({ ...prev, [targetName]: targetValue }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {forms.map((form, idx) => (
        <Form
          key={`${form.name} ${idx}`}
          value={userAnswers[form.name]}
          placeholder={form.placeholder}
          onChange={handleUserAnswer}
          {...{ form }}
        />
      ))}
      <button type='submit'>다음</button>
    </form>
  );
};

export default FormList;
