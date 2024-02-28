import { type ComponentPropsWithRef, type ChangeEvent } from 'react';

import { inputComponents } from '@/components/form';
import { useFormContext } from '@/hooks/use-form/form-context';

import type { Selection } from '@/api/form/types/server-response';
import type { ClientForm } from '@/constants/client-form-type';

export type Omitted = 'value' | 'onChange';

export interface ConditionalInputProps {
  name: string;
  type: ClientForm['type'];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validate?: ClientForm['validate'];
  requiredMessage?: ClientForm['requiredMessage'];
  selections?: Selection[];
}

export const ConditionalInput = ({
  type,
  ...rest
}: ConditionalInputProps & Omit<ComponentPropsWithRef<'input'>, Omitted>) => {
  const context = useFormContext();

  return inputComponents[type](rest, context);
};
