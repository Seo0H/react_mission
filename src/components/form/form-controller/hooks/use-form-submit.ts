import { useCallback, useEffect, useState } from 'react';

import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { APIStatusType, initialApiStatus, isError } from '@/api/factory/type';
import { formAPI } from '@/api/form';
import { useFormContext } from '@/hooks/use-form/form-context';
import { validateField } from '@/hooks/use-form/logic/validate-field';
import { useLanguageContext } from '@/hooks/use-language/language-context';
import { isEmptyObject } from '@/utils/is';

import type { UserAnswers } from '@/api/form/types/server-request';
import type { ClientFormData } from '@/constants/client-form-type';
import type { SubmitHandler } from '@/hooks/use-form/types/form';

export const useFormSubmit = ({ cleanUp }: { cleanUp?: () => void }) => {
  const routerNavigate = useNavigate();
  const { id } = useParams();
  const { langParams } = useLanguageContext();
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };

  const { handleSubmit, reset } = useFormContext();
  const [userId, setUserId] = useState(formLoadedData.userId ?? 'common'); // TODO: session 으로 옮기기
  const [submitStatus, setSubmitStatus] = useState<APIStatusType>(initialApiStatus);

  const navigateWithParams = useCallback((url: string) => routerNavigate(`${url}?${langParams}`), [langParams]);

  useEffect(() => {
    // NOTE: id는 질문을 새로 받아오게 되면 수정되기 때문에,
    // id에 의존적으로 기존 form field의 상태 초기화
    reset();
  }, [id]);

  if (!id) throw navigateWithParams('/');

  const onSubmit: SubmitHandler<UserAnswers> = async (userAnswers) => {
    setSubmitStatus({ ...initialApiStatus, isLoading: true });
    const isUserQuestionTarget = await _getEscapeValidate(userAnswers);

    if (!isUserQuestionTarget) {
      navigateWithParams(`/no_target`);
      setSubmitStatus({ ...initialApiStatus, isSuccess: true });
      return;
    }

    try {
      const [response] = await formAPI.postUserAnswerData({
        userId,
        userAnswers,
        typeId: id,
      });

      if (isError(response)) throw new Error(response.message, { cause: response.error });

      const { data } = response;

      if (data.userId) setUserId(data.userId);

      const isLastQuestionPage = !data.nextTypeId;

      if (isLastQuestionPage) navigateWithParams(`/thanks`);
      else {
        cleanUp?.();
        navigateWithParams(`/question/${data.nextTypeId}`);
      }

      setSubmitStatus({ ...initialApiStatus, isSuccess: true });
    } catch (e) {
      if (e instanceof Error || e instanceof TypeError) {
        setSubmitStatus({ ...initialApiStatus, isError: true, message: e.message });
        return;
      }

      if (e instanceof Response) {
        setSubmitStatus({ ...initialApiStatus, isError: true, message: await e.text() });
        return;
      }

      setSubmitStatus({ ...initialApiStatus, isError: true, message: `unknown error. check consol.` });
      console.error(e);

      throw e;
    }
  };

  const _getEscapeValidate = async (userAnswers: UserAnswers) => {
    if (formLoadedData.escapeValidate.length) {
      for (const { name, ...validate } of formLoadedData.escapeValidate) {
        const error = await validateField({ validates: [{ ...validate }], formValues: userAnswers, name });

        if (!isEmptyObject(error)) return false;
      }
    }

    return true;
  };

  return { onSubmit: handleSubmit(onSubmit), submitStatus };
};
