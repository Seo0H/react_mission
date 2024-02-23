import { type ComponentPropsWithRef, type ChangeEvent } from 'react';

import { inputComponents } from '@/components/form';
import { useFormContext } from '@/hooks/use-form/form-context';

import type { Form, Selection } from '@/api/form/types/server-response';

export type Omitted = 'value' | 'onChange';

export interface ConditionalInputProps {
  name: string;
  type: Form['type'];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  selections?: Selection[];
}

export const ConditionalInput = ({
  type,
  ...rest
}: ConditionalInputProps & Omit<ComponentPropsWithRef<'input'>, Omitted>) => {
  const { register } = useFormContext();

  return inputComponents[type](rest, register);
};
