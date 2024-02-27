import { useEffect, useState } from 'react';

import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { formAPI } from '@/api/form';
import { useFormContext } from '@/hooks/use-form/form-context';
import { validateField } from '@/hooks/use-form/logic/validate-field';
import { useLanguage } from '@/hooks/use-language/use-language';
import { isEmptyObject } from '@/utils/is';

import type { UserAnswers } from '@/api/form/types/server-request';
import type { ClientFormData } from '@/constants/client-form-type';
import type { SubmitHandler } from '@/hooks/use-form/types/form';

export const useFormSubmit = ({ cleanUp }: { cleanUp?: () => void }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { langParams } = useLanguage();
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };

  const { handleSubmit, reset } = useFormContext();
  const [userId, setUserId] = useState(formLoadedData.userId ?? 'common'); // TODO: session 으로 옮기기

  useEffect(() => {
    // NOTE: id는 질문을 새로 받아오게 되면 수정되기 때문에,
    // id에 의존적으로 기존 form field의 상태 초기화
    reset();
  }, [id]);

  if (!id) throw navigate('/');

  const onSubmit: SubmitHandler<UserAnswers> = async (userAnswers) => {
    try {
      const isUserQuestionTarget = await _getEscapeValidate(userAnswers);
      if (!isUserQuestionTarget) {
        navigate('/no_target');
        return;
      }

      const [{ data }] = await formAPI.postUserAnswerData({
        userId,
        userAnswers,
        typeId: id,
      });

      if (data.userId) setUserId(data.userId);

      const isLastQuestionPage = !data.nextTypeId;

      if (isLastQuestionPage) navigate('/thanks');
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

        const error = await validateField([{ ...validate }], name, userAnswers);

        if (!isEmptyObject(error)) return false;
      }
    }

    return true;
  };

  return { onSubmit: handleSubmit(onSubmit) };
};
