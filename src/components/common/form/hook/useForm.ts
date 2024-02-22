/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { createFormControl } from './logic/create-form-control';
import type { FieldValues } from './types/fields';
import type { FormState, UseFormReturn } from './types/form';

export function useForm<TFieldValues extends FieldValues>(props?: { defaultValues?: string }) {
  const _formControl = React.useRef<UseFormReturn<TFieldValues> | undefined>();

  const [formState, updateFormState] = useState<FormState>({
    isLoading: !!props?.defaultValues,
    isSubmitted: false,
    isValid: false,
    errors: {},
  });

  if (!_formControl.current) {
    _formControl.current = {
      ...createFormControl(),
      formState,
    };
  }

  return _formControl.current;
}
