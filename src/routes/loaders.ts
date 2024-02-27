import { isError } from '@/api/factory/type';
import { formAPI } from '@/api/form';
import { userBrowserLanguage } from '@/constants/languages';
import { makeClientForm } from '@/routes/utils';

import type { GetQuestionWithIdProps } from '@/api/form/types/server-request';
import type { LoaderFunctionArgs } from 'react-router-dom';

export const loaders = {
  async formLoader(props: LoaderFunctionArgs) {
    const { request, params } = props;
    const { id } = params as GetQuestionWithIdProps;
    const lang =
      (new URL(request.url).searchParams.get('lang') as GetQuestionWithIdProps['lang']) ?? userBrowserLanguage;

    if (!id) return new Response('params id is missing.', { status: 404 });

    const response = await formAPI.getQuestionWithId({ id, lang });

    if (isError(response)) throw new Error('error');

    return {
      ...response,
      data: { ...response.data, forms: makeClientForm(response.data.forms) },
    };
  },
};
