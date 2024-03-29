/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { createFormControl } from './logic/create-form-control';
import type { FieldValues } from './types/fields';
import type { FormState, UseFormOptions, UseFormReturn } from './types/form';

export function useForm<TFieldValues extends FieldValues>(options?: UseFormOptions) {
  const _formControl = React.useRef<UseFormReturn<TFieldValues> | undefined>();

  const [formState, updateFormState] = useState<FormState<TFieldValues>>({
    isValid: false,
    errors: {},
  });

  if (!_formControl.current) {
    _formControl.current = {
      ...createFormControl({ options, updateFormState: (formState) => updateFormState({ ...formState }) }),
      formState,
    };
  }

  _formControl.current.formState = formState;

  return _formControl.current;
}
