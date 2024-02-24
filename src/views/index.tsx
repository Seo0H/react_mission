import { useEffect, useState } from 'react';

import { useLoaderData } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { formAPI } from '@/api/form';
import { UserAnswers } from '@/api/form/types/server-request';
import { FormList } from '@/components/form';
import { FormProvider } from '@/hooks/use-form/form-context';
import { validateField } from '@/hooks/use-form/logic/validate-field';
import { SubmitHandler } from '@/hooks/use-form/types/form';
import { useForm } from '@/hooks/use-form/use-form';
import { isEmptyObject } from '@/utils/is';

import type { ClientFormData } from '@/constants/client-types';

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };
  const [userId, setUserId] = useState(formLoadedData.userId); // TODO: session 으로 옮기기
  const method = useForm();

  if (!id) throw navigate('/');

  useEffect(() => {
    method.reset();
  }, [formLoadedData]);

  const onSubmit: SubmitHandler<UserAnswers> = async (userAnswers) => {
    try {
      const { data } = await formAPI.postCommonQuestion({
        userId: !userId ? 'common' : userId,
        userAnswers,
        typeId: id,
      });

      if (data.userId) setUserId(data.userId);

      const isLastQuestionPage = !data.nextTypeId;
      let isUserQuestionTarget = true;

      if (formLoadedData.escapeValidate.length) {
        for (const { name, ...validate } of formLoadedData.escapeValidate) {
          const targetValue = userAnswers[name];
          if (typeof targetValue !== 'string') break;
          const error = await validateField([{ ...validate }], name, userAnswers);
          if (!isEmptyObject(error)) isUserQuestionTarget = false;
        }
      }

      if (!isUserQuestionTarget) navigate('/no_target');
      else if (isLastQuestionPage) navigate('/thanks');
      else {
        navigate(`/question/${data.nextTypeId}`);
      }
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
