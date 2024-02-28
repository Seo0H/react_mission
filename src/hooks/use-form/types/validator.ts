/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from './fields';

export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  // TFiledName extends keyof TFieldValues = keyof TFieldValues,
> = Partial<{
  value: TFieldValues;
  validates: Validate[];
}>;

export type Validate = ValidateOption & { validateText: string };

type ValidateOption =
  | {
      type: 'not';
      target: string | number | Array<any> | object;
    }
  | {
      type: 'minMax';
      target: [min: '-' | number, max: '-' | number];
    }
  | {
      type: 'sameAs';
      target: string;
    }
  | {
      type: 'pattern';
      target: string;
    }
  | {
      type: 'minMaxLength';
      target: [min: '-' | number, max: '-' | number];
    };
