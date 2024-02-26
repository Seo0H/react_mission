import { useEffect } from 'react';

import { useLoaderData } from 'react-router';

import { FormController } from '@/components/form/form-controller/form-controller';
import { FormProvider } from '@/hooks/use-form/form-context';
import { useForm } from '@/hooks/use-form/use-form';

import type { ClientFormData } from '@/constants/client-types';

const FormPage = () => {
  const method = useForm();
  const { data: formLoadedData } = useLoaderData() as { data: ClientFormData };

  useEffect(() => {
    method.reset();
  }, [formLoadedData]);

  return (
    <FormProvider {...method}>
      <FormController />
    </FormProvider>
  );
};

export default FormPage;
