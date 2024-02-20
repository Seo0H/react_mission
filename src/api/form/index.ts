import APIFactory from '@/api/factory';
import { UserAnswers } from '@/api/types/server-request';
import { FormAPIResponseType } from '@/api/types/server-response';

const getCommonQuestion = async () => {
  const client = new APIFactory<FormAPIResponseType>('/api/question/common');
  const data = await client.fetch();
  return data;
};

const getQuestionWithId = async (id: number) => {
  const client = new APIFactory<FormAPIResponseType>(`/api/question/${id}`);
  const data = await client.fetch();
  return data;
};

interface PostCommonQuestionProps {
  userAnswers: UserAnswers;
}

const postCommonQuestion = async ({ userAnswers }: PostCommonQuestionProps) => {
  const client = new APIFactory<FormAPIResponseType>('/api/answer/common');
  const data = await client.fetch({
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ answers: userAnswers }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const formAPI = {
  getCommonQuestion,
  getQuestionWithId,
  postCommonQuestion,
};
