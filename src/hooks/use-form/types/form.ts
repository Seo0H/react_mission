/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFormControl } from '@/hooks/use-form/logic/create-form-control';
import { FieldError, InternalFieldErrors } from '@/hooks/use-form/types/errors';

import type { FieldValues } from './fields';
import { RegisterOptions } from './validator';

export type UseFormOptions = {
  autoFocus?: boolean;
};

export interface CreateFormControlProps<TFieldValues extends FieldValues> {
  options?: UseFormOptions;
  updateFormState: (formState: FormState<TFieldValues>) => void;
}

export type UseFormReturn<TFieldValues extends FieldValues> = ReturnType<typeof createFormControl> & {
  formState: FormState<TFieldValues>;
};

export type ChangeHandler = (event: { target: any; type?: any }) => Promise<void | boolean>;

export interface FormState<TFelidValue extends FieldValues = FieldValues> {
  isValid: boolean;
  errors: Partial<InternalFieldErrors>;
}

type UseFormRegisterReturn<TFiledName> = {
  onChange: ChangeHandler;
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
) => (e?: React.BaseSyntheticEvent) => Promise<void>;

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

export type UseFormGetFieldState<TFieldValues extends FieldValues> = <
  TFieldName extends Extract<keyof TFieldValues, string>,
>(
  name: TFieldName,
  formState?: FormState<TFieldValues>,
) => { invalid: boolean; error?: FieldError };
