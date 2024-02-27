import APIFactory from '@/api/factory/factory';
import { isError } from '@/api/factory/type';
import { userBrowserLanguage } from '@/components/lang/constants';

import type { GetQuestionWithIdProps, PostUserAnswerDataProps } from '@/api/form/types/server-request';
import type { APIResponse, FormData, PostResponseData } from '@/api/form/types/server-response';

const getQuestionWithId = async (props: GetQuestionWithIdProps) => {
  const lang = props.lang ?? userBrowserLanguage;
  const client = new APIFactory<APIResponse<FormData>>(`/api/question?id=${props.id}&lang=${lang}`);
  const data = await client.fetch();

  if (isError(data)) throw new Error(data.message);
  if (Array.isArray(data)) return data[0];
  return data;
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

  if (isError(data)) throw new Error(data.message);

  return [data, client.getStatus()] as const;
};

export const formAPI = {
  getQuestionWithId,
  postUserAnswerData,
};
