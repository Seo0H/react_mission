import { type ComponentPropsWithRef, type ChangeEvent } from 'react';

import { inputComponents } from '@/components/form';

import type { Form, Selection, Value } from '@/api/form/types/server-response';

export type Omitted = 'value' | 'value' | 'onChange';

export interface ConditionalInputProps {
  name: string;
  type: Form['type'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: Value;
  selections?: Selection[];
}

export const ConditionalInput = ({
  type,
  ...rest
}: ConditionalInputProps & Omit<ComponentPropsWithRef<'input'>, Omitted>) => {
  return inputComponents[type](rest, type);
};
