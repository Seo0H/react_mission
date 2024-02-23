import { cloneObject } from '@/utils/clone';
import { isUndefined } from '@/utils/is';

import { get } from '../utils/get';
import { isRadioOrCheckbox } from '../utils/is';
import { set } from '../utils/set';

import { getFieldValue, getFieldsValue } from './get-field-value';
import type { Field, FieldRefs, FieldValues, InternalFieldName, Ref } from '../types/fields';
import type { UseFormHandleSubmit, UseFormRegister } from '../types/form';

export function createFormControl<TFieldValues extends FieldValues>() {
  // const _formValue = {};
  const _fields: FieldRefs = {};
  const _defaultValues = {};
  const _formValues = cloneObject(_defaultValues);

  const updateValidAndValue = (name: InternalFieldName) => {
    const field: Field = get(_fields, name);

    if (field) {
      set(_formValues, name, getFieldValue(field._f));
    }
  };

  const register: UseFormRegister<TFieldValues> = (name, options = {}) => {
    let field = get(_fields, name);

    _fields[name] = {
      ...field,
      name,
      ...options,
    };

    set(_fields, name, {
      ...(field || {}),
      _f: {
        ...(field && field._f ? field._f : { ref: { name } }),
        name,
      },
    });

    if (!field) updateValidAndValue(name);

    return {
      name,
      onChange: async (e) => {},
      ref: (ref: HTMLInputElement | null): void => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);

          const fieldRef = isUndefined(ref.value)
            ? ref.querySelectorAll
              ? (ref.querySelectorAll('input,select,textarea')[0] as Ref) || ref
              : ref
            : ref;

          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];

          set(_fields, name, {
            _f: {
              ...field._f,
              ...(radioOrCheckbox
                ? {
                    refs: [...refs, fieldRef, ...(Array.isArray(get(_defaultValues, name)) ? [{}] : [])],
                    ref: { type: fieldRef.type, name },
                  }
                : { ref: fieldRef }),
            },
          });

          updateValidAndValue(name);
        }
      },
    };
  };

  const handleSubmit: UseFormHandleSubmit<TFieldValues> = (onValid) => async (e) => {
    let onValidError = undefined;

    const fieldValues = getFieldsValue(_fields);

    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }

    try {
      await onValid(fieldValues as TFieldValues, e);
    } catch (error) {
      onValidError = error;
    }

    if (onValidError) {
      throw onValidError;
    }
  };

  return { register, handleSubmit };
}
