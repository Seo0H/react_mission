import APIFactory from '@/api/factory';
import { isError } from '@/api/type';
import { UserAnswers } from '@/api/types/server-request';

import type { APIResponse, FormData, PostResponseData } from '@/api/types/server-response';

const getCommonQuestion = async () => {
  const client = new APIFactory<APIResponse<FormData>>('/api/question/common');
  const data = await client.fetch();
  return data;
};

const getQuestionWithId = async (id: string) => {
  const client = new APIFactory<APIResponse<FormData>>(`/api/question/${id}`);
  const data = await client.fetch();

  if (isError(data)) throw new Error('Get Api Error');

  return data;
};

interface PostCommonQuestionProps {
  userAnswers: UserAnswers;
  typeId: string;
}

const postCommonQuestion = async ({ userAnswers, typeId }: PostCommonQuestionProps) => {
  const client = new APIFactory<APIResponse<PostResponseData>>(`/api/answer/${typeId}`);
  const data = await client.fetch({
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ answers: userAnswers }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (isError(data)) throw new Error('Post Api Error');

  return data;
};

export const formAPI = {
  getCommonQuestion,
  getQuestionWithId,
  postCommonQuestion,
};
