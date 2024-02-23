/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from './fields';

export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  // TFiledName extends keyof TFieldValues = keyof TFieldValues,
> = Partial<{
  value: TFieldValues;
  validates: Validate[];
}>;

export type Validate =
  | {
      type: 'not';
      target: string | number | Array<any> | object;
      validateText: string;
    }
  | {
      type: 'minMax';
      target: [min: '-' | number, max: '-' | number];
      validateText: string;
    }
  | {
      type: 'sameAs';
      target: string | number;
      validateText: string;
    }
  | {
      type: 'pattern';
      target: string;
      validateText: string;
    }
  | {
      type: 'minMaxLength';
      target: [min: '-' | number, max: '-' | number];
      validateText: string;
    };
