/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternalFieldName } from '@/hooks/use-form/types/fields';

export type InternalFieldErrors = Record<InternalFieldName, FieldError>;

export type FieldError = {
  message?: string[];
};
