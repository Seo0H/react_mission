/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from './fields';

export type RegisterOptions<TFieldValues extends FieldValues = FieldValues> = Partial<{
  value: TFieldValues;
  validates: Validate[];
  required?: boolean;
  requiredMessage?: string;
}>;

export type Validate = ValidateOption & { validateText: string };

type ValidateOption =
  | {
      type: 'not';
      target: string | number;
    }
  | {
      type: 'minMax';
      target: [min: '-' | number, max: '-' | number];
    }
  | {
      type: 'sameAs';
      target: string | number;
    }
  | {
      type: 'pattern';
      target: string;
    }
  | {
      type: 'minMaxLength';
      target: [min: '-' | number, max: '-' | number];
    };
