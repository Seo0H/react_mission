import { useState } from 'react';

import { useLoaderData } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { formAPI } from '@/api/form';
import { UserAnswers } from '@/api/form/types/server-request';
import { FormList } from '@/components/form';
import { FormProvider } from '@/hooks/use-form/form-context';
import { SubmitHandler } from '@/hooks/use-form/types/form';
import { useForm } from '@/hooks/use-form/use-form';

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
