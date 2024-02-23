import { createContext, useContext } from 'react';

import type { FieldValues } from './types/fields';
import type { UseFormRegister } from './types/form';

type FormReturn<TFieldValues extends FieldValues = FieldValues> = {
  register: UseFormRegister<TFieldValues>;
};

const FormContext = createContext<FormReturn | null>(null);

export const useFormContext = () => {
  const value = useContext(FormContext);
  if (!value) throw new Error('useFormContext 는 FormProvider 내부에서 사용되어야 합니다.');
  return value;
};

interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> extends FormReturn<TFieldValues> {
  children: React.ReactNode | React.ReactNode[];
}

export const FormProvider = <TFieldValues extends FieldValues>(props: FormProviderProps<TFieldValues>) => {
  const { children, ...data } = props;
  return <FormContext.Provider value={data as unknown as FormReturn}>{children}</FormContext.Provider>;
};
