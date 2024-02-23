/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions } from './validator';

export type InternalFieldName = string;
export type FieldValues = Record<string, any>;

export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type Ref = FieldElement;

export interface Field extends RegisterOptions {
  _f: {
    ref: Ref;
    name: InternalFieldName;
    refs?: HTMLInputElement[];
  };
}

export type FieldRefs = Partial<Record<InternalFieldName, Field>>;
export type SetFieldValue<TFieldValues extends FieldValues> = FieldValue<TFieldValues>;
type FieldValue<TFieldValues extends FieldValues> = TFieldValues[InternalFieldName];
