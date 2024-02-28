import { type LoaderFunctionArgs } from 'react-router-dom';

import { formAPI } from '@/api/form';
import { userBrowserLanguage } from '@/hooks/use-language/constants';
import { makeClientForm } from '@/routes/utils';

import type { GetQuestionWithIdProps } from '@/api/form/types/server-request';

let abortController = new AbortController();

export const loaders = {
  async formLoader(props: LoaderFunctionArgs) {
    const { request, params } = props;
    const { id } = params as GetQuestionWithIdProps;
    const lang =
      (new URL(request.url).searchParams.get('lang') as GetQuestionWithIdProps['lang']) ?? userBrowserLanguage;

    if (abortController) {
      abortController.abort();
      abortController = new AbortController();
    }

    const response = await formAPI.getQuestionWithId({ id, lang }, abortController.signal);

    return {
      ...response,
      data: { ...response.data, forms: makeClientForm(response.data.forms) },
    };
  },
};
