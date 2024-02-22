import { useState, useEffect } from 'react';

import { useLoaderData } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { FormProvider } from '@/components/common/form/hook/form-context';
import { SubmitHandler } from '@/components/common/form/hook/types/form';
import { useForm } from '@/components/common/form/hook/useForm';

import { FormList } from '@/components/form';
import { makeUserAnswerState } from '@/components/form/utils';

import type { UserAnswers } from '@/api/form/types/server-request';
import type { ClientFormData } from '@/constants/client-types';

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useLoaderData() as { data: ClientFormData };
  const [userAnswers, setUserAnswers] = useState(makeUserAnswerState(data.forms));

  const method = useForm<UserAnswers>();

  if (!id) throw navigate('/');

  useEffect(() => {
    setUserAnswers(makeUserAnswerState(data.forms));
  }, [data]);

  const onSubmit: SubmitHandler<UserAnswers> = (data) => console.log(data);

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <FormList forms={data.forms} userAnswers={userAnswers} />
        <button type='submit'>다음</button>
      </form>
    </FormProvider>
  );
};

export default App;
