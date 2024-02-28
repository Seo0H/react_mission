import APIFactory from '@/api/factory/factory';
import { isError } from '@/api/factory/type';
import { UserAnswers } from '@/api/form/types/server-request';

import type { APIResponse, FormData, PostResponseData } from '@/api/form/types/server-response';

const getQuestionWithId = async (id: string) => {
  const client = new APIFactory<APIResponse<FormData>>(`/api/question/${id}`);
  const data = await client.fetch();

  if (isError(data)) throw new Error('Get Api Error');

  return data;
};

interface PostCommonQuestionProps {
  userId: string;
  userAnswers: UserAnswers;
  typeId: string;
}

const postCommonQuestion = async ({ userAnswers, typeId, userId }: PostCommonQuestionProps) => {
  const client = new APIFactory<APIResponse<PostResponseData>>(`/api/answer/${typeId}`);
  const data = await client.fetch({
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ userId, answers: userAnswers }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (isError(data)) throw new Error('Post Api Error');

  return data;
};

export const formAPI = {
  getQuestionWithId,
  postCommonQuestion,
};
