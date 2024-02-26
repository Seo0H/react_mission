import { isError } from '@/api/factory/type';
import { formAPI } from '@/api/form';
import { makeClientForm } from '@/routes/utils';

export const loaders = {
  async mainPage(params: string) {
    const response = await formAPI.getQuestionWithId(params);
    if (isError(response)) throw new Error('error');

    return {
      ...response,
      data: { ...response.data, forms: makeClientForm(response.data.forms) },
    };
  },
};
