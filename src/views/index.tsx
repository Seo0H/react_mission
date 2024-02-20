import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';

import { useLoaderData } from 'react-router';
import { redirect, useFetcher, useNavigate } from 'react-router-dom';

import { formAPI } from '@/api/form';
import FormList from '@/components/form/form-list';
import { makeUserAnswerState, setValueToType } from '@/components/form/utils';

import type { ClientFormData } from '@/constants/client-types';

const App = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData() as { data: ClientFormData };
  const [userAnswers, setUserAnswers] = useState(makeUserAnswerState(data.forms));

  useEffect(() => {
    setUserAnswers(makeUserAnswerState(data.forms));
  }, [data]);

  const handleUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    const targetType = e.target.type;

    const targetUserAnswer = userAnswers[targetName];

    if (targetUserAnswer === undefined) throw new Error('name이 없습니다.');

    setUserAnswers((prev) => ({ ...prev, [targetName]: setValueToType(prev[targetName], targetValue, targetType) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await formAPI.postCommonQuestion({ userAnswers, typeId: 'common' });
      if (!data.nextTypeId) throw new Error('data user id is undefined');

      navigate(`/question/${data.nextTypeId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormList forms={data.forms} userAnswers={userAnswers} onChange={handleUserAnswer} />
      <button type='submit'>다음</button>
    </form>
  );
};

export default App;
