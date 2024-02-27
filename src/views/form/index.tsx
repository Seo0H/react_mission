import { FormController } from '@/components/form/form-controller/form-controller';
import { FormProvider } from '@/hooks/use-form/form-context';
import { useForm } from '@/hooks/use-form/use-form';

const FormPage = () => {
  const method = useForm({ autoFocus: true });

  return (
    <FormProvider {...method}>
      <FormController />
    </FormProvider>
  );
};

export default FormPage;
