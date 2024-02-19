import APIFactory from '@/api/factory';
import { FormAPIResponseType } from '@/api/types/server-response';

const getCommonQuestion = async () => {
  const client = new APIFactory<FormAPIResponseType>('/api/question/common/index.json');
  const data = await client.fetch();
  return data;
};

const getQuestionWithId = async (id: number) => {
  const client = new APIFactory<FormAPIResponseType>(`/api/question/${id}/index.json`);
  const data = await client.fetch();
  return data;
};

export const formAPI = {
  getCommonQuestion,
  getQuestionWithId,
};
