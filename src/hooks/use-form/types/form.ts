/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues } from './fields';
import { RegisterOptions } from './validator';


export interface UseFormReturn<TFieldValues extends FieldValues> {
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  formState: FormState;
}
export type ChangeHandler = (event: { target: any; type?: any }) => Promise<void | boolean>;

export interface FormState {
  isLoading: boolean;
  isSubmitted: boolean;
  isValid: boolean;
  defaultValues?: string;
  errors: { message?: string };
}

type UseFormRegisterReturn<TFiledName> = {
  onChange: ChangeHandler;
  //   onBlur: ChangeHandler;
  ref: (instance: any) => void;
  name: TFiledName;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
};

export type UseFormHandleSubmit<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
> = (
  onValid: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : TTransformedValues extends FieldValues
      ? SubmitHandler<TTransformedValues>
      : never,
) => (e: React.BaseSyntheticEvent) => Promise<void>;

export type UseFormRegister<TFieldValues extends FieldValues = FieldValues> = <
  TFieldName extends Extract<keyof TFieldValues, string>,
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues>,
) => UseFormRegisterReturn<TFieldName>;

export type SubmitHandler<TFieldValues extends FieldValues> = (
  data: TFieldValues,
  event?: React.BaseSyntheticEvent,
) => unknown | Promise<unknown>;
