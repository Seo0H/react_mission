import { json } from 'react-router-dom';

import APIFactory from '@/api/factory/factory';
import { isError } from '@/api/factory/type';
import { userBrowserLanguage } from '@/hooks/use-language/constants';

import type { GetQuestionWithIdProps, PostUserAnswerDataProps } from '@/api/form/types/server-request';
import type { APIResponse, FormData, PostResponseData } from '@/api/form/types/server-response';

const getQuestionWithId = async (props: GetQuestionWithIdProps, abortSignal?: AbortSignal) => {
  try {
    const lang = props.lang ?? userBrowserLanguage;
    const client = new APIFactory<APIResponse<FormData[]>>(`/api/question?id=${props.id}&lang=${lang}`, abortSignal);
    const data = await client.fetch();

    if (isError(data)) throw new Error(data.message, { cause: data.error });

    if (Array.isArray(data)) return data[0];

    return data;
  } catch (e) {
    // NOTE: APIFactory 내부에서 throw 처리 되는 객체는 Response
    // https://reactrouter.com/en/main/route/error-element#throwing-manually
    if (e instanceof Response) {
      throw json(await e.text(), { status: e.status });
    }

    if (e instanceof Error) {
      throw json(await e.message, { status: 404 });
    }

    throw e;
  }
};

const postUserAnswerData = async ({ userAnswers, typeId, userId }: PostUserAnswerDataProps) => {
  const client = new APIFactory<APIResponse<PostResponseData>>(`/api/answer?id=${typeId}`);

  const data = await client.fetch({
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ userId, answers: userAnswers }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return [data, client.getStatus()] as const;
};

export const formAPI = {
  getQuestionWithId,
  postUserAnswerData,
};
