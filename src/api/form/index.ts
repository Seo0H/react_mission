import APIFactory from '@/api/factory';
import { FormAPIResponseType } from '@/types/response';

const getCommonQuestion = async () => {
  const client = new APIFactory<FormAPIResponseType>('/api/question/common/index.json');
  const data = await client.fetch();
  return data;
};

export const formAPI = {
  getCommonQuestion,
};
