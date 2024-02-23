import { useState } from 'react';

import { useLoaderData } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { FormProvider } from '@/components/common/form/hook/form-context';
import { SubmitHandler } from '@/components/common/form/hook/types/form';
import { useForm } from '@/components/common/form/hook/useForm';

import { formAPI } from '@/api/form';
import { UserAnswers } from '@/api/form/types/server-request';
import { FormList } from '@/components/form';

import type { ClientFormData } from '@/constants/client-types';

type Test = {
  example: string;
  test: string;
};
const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };
  const [userId, setUserId] = useState(formLoadedData.userId); // TODO: session 으로 옮기기

  const method = useForm<Test>();

  if (!id) throw navigate('/');

  const onSubmit: SubmitHandler<UserAnswers> = async (userAnswers) => {
    try {
      const { data } = await formAPI.postCommonQuestion({
        userId: !userId ? 'common' : userId,
        userAnswers,
        typeId: id,
      });

      if (data.userId) setUserId(data.userId);

      const isLastQuestionPage = !data.nextTypeId;

      if (isLastQuestionPage) navigate('/thanks');
      else navigate(`/question/${data.nextTypeId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <FormList forms={formLoadedData.forms} />
        <button type='submit'>다음</button>
      </form>
    </FormProvider>
  );
};

export default App;
