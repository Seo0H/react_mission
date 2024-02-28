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

    if (Array.isArray(data)) return data[0];

    return data;
  } catch (e) {
    // NOTE: APIFactory 내부에서 throw 처리 되는 객체는 Response
    // https://reactrouter.com/en/main/route/error-element#throwing-manually
    if (e instanceof Response) {
      throw json(await e.text(), { status: e.status });
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

  if (isError(data)) throw json({ message: data.message }, { status: 404 });

  return [data, client.getStatus()] as const;
};

export const formAPI = {
  getQuestionWithId,
  postUserAnswerData,
};
