import { useState } from 'react';

import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { formAPI } from '@/api/form';
import { useFormContext } from '@/hooks/use-form/form-context';
import { validateField } from '@/hooks/use-form/logic/validate-field';
import { useLanguage } from '@/hooks/use-language/use-language';
import { isEmptyObject } from '@/utils/is';

import type { UserAnswers } from '@/api/form/types/server-request';
import type { ClientFormData } from '@/constants/client';
import type { SubmitHandler } from '@/hooks/use-form/types/form';

export const useFormSubmit = ({ cleanUp }: { cleanUp?: () => void }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { langParams } = useLanguage();

  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };
  const { handleSubmit } = useFormContext();
  const [userId, setUserId] = useState(formLoadedData.userId ?? 'common'); // TODO: session 으로 옮기기

  if (!id) throw navigate('/');

  const onSubmit: SubmitHandler<UserAnswers> = async (userAnswers) => {
    try {
      const [{ data }] = await formAPI.postUserAnswerData({
        userId,
        userAnswers,
        typeId: id,
      });

      if (data.userId) setUserId(data.userId);

      const isLastQuestionPage = !data.nextTypeId;
      const isUserQuestionTarget = await _getEscapeValidate(userAnswers);

      if (!isUserQuestionTarget) navigate('/no_target');
      else if (isLastQuestionPage) navigate('/thanks');
      else {
        cleanUp?.();
        navigate(`/question/${data.nextTypeId}?${langParams}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _getEscapeValidate = async (userAnswers: UserAnswers) => {
    if (formLoadedData.escapeValidate.length) {
      for (const { name, ...validate } of formLoadedData.escapeValidate) {
        const targetValue = userAnswers[name];

        if (typeof targetValue !== 'string') break;

        const error = await validateField([{ ...validate }], name, userAnswers);

        if (!isEmptyObject(error)) return false;
      }
    }

    return true;
  };

  return { onSubmit: handleSubmit(onSubmit) };
};
