import { FieldValues } from '../types/fields';

export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  // TFiledName extends keyof TFieldValues = keyof TFieldValues,
> = Partial<{
  value: TFieldValues;
}>;
