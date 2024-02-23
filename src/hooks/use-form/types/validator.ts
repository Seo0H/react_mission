import { FieldValues } from './fields';

export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  // TFiledName extends keyof TFieldValues = keyof TFieldValues,
> = Partial<{
  value: TFieldValues;
}>;
