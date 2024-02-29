import { validateField } from '@/hooks/use-form/logic/validate-field';
import { InternalFieldErrors } from '@/hooks/use-form/types/errors';
import { isEmptyObject, isUndefined } from '@/utils/is';

import { get } from '../utils/get';
import { set } from '../utils/set';

import { getFieldValue, getFieldsValue } from './get-field-value';
import type { Field, FieldRefs, FieldValues, Ref } from '../types/fields';
import type {
  CreateFormControlProps,
  FormState,
  UseFormGetFieldState,
  UseFormHandleSubmit,
  UseFormRegister,
} from '../types/form';

export function createFormControl<TFieldValues extends FieldValues>(props: CreateFormControlProps<TFieldValues>) {
  const { options: useFormOptions, updateFormState } = props;
  let _fields: FieldRefs = {};
  let _defaultValues = {};
  // const _formValues = cloneObject(_defaultValues);
  let _formState: FormState<TFieldValues> = {
    errors: {},
    isValid: false,
  };

  const register: UseFormRegister<TFieldValues> = (name, options = {}) => {
    let field = get(_fields, name);

    set(_fields, name, {
      ...(field || {}),
      _f: {
        ...(field && field._f ? field._f : { ref: { name } }),
        name,
      },
      ...options,
    });

    return {
      name,
      ref: (ref: HTMLInputElement | null): void => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);

          const fieldRef = isUndefined(ref.value)
            ? ref.querySelectorAll
              ? ([...ref.querySelectorAll('input,select,textarea')] as Ref[]) || ref
              : ref
            : ref;

          if (useFormOptions?.autoFocus) {
            Array.isArray(fieldRef) ? fieldRef[0].focus() : fieldRef.focus();
          }

          const radioOrCheckbox = Array.isArray(fieldRef);
          const refs = field._f.refs || [];

          set(_fields, name, {
            ...(field || {}),
            ...options,
            _f: {
              ...field._f,
              ...(radioOrCheckbox
                ? {
                    refs: [...refs, ...fieldRef, ...(Array.isArray(get(_defaultValues, name)) ? [{}] : [])],
                    ref: { type: fieldRef[0].type, name },
                  }
                : { ref: fieldRef }),
            },
          });
        }
      },
    };
  };

  const handleSubmit: UseFormHandleSubmit<TFieldValues> = (onValid) => async (e) => {
    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }

    let onValidError = undefined;
    const fieldValues = getFieldsValue(_fields);

    try {
      _formState.errors = await _executeInputValidation(_fields, fieldValues);
      updateFormState(_formState);

      if (isEmptyObject(_formState.errors)) {
        await onValid(fieldValues as TFieldValues, e);
      }
    } catch (error) {
      onValidError = error;
    }

    if (onValidError) {
      throw onValidError;
    }
  };

  const validateSingleValue = (
    name: keyof TFieldValues,
    context: {
      valid: boolean;
    } = { valid: true },
  ) => {
    const filed = get(_fields, String(name)) as Field;
    let errors: InternalFieldErrors = {};

    if (filed) {
      const formValue = getFieldValue(filed._f);
      const { _f, validates, required, requiredMessage } = filed;
      if (_f && validates) {
        const filedError = validateField({
          validates,
          name: String(name),
          formValues: { [name]: formValue },
          required,
          requiredMessage,
        });

        errors = { ...errors, ...filedError };

        if (filedError && filedError[_f.name]) {
          context.valid = false;
        }
      }
    }

    _formState.errors = errors;
    updateFormState(_formState);

    return context.valid;
  };

  /**
   * 개별 Input의 유효성 검증 메서드
   */
  const _executeInputValidation = async <TFelidValues extends FieldValues = FieldValues>(
    fields: FieldRefs,
    formValues: TFelidValues,
    context: {
      valid: boolean;
    } = { valid: true },
  ) => {
    let errors: InternalFieldErrors = {};

    for (const name in fields) {
      const field = fields[name];

      if (field) {
        const { _f, validates, required, requiredMessage } = field;

        if (_f && validates) {
          const filedError = validateField({ validates, name, formValues, required, requiredMessage });
          errors = { ...errors, ...filedError };

          if (filedError && filedError[_f.name]) {
            context.valid = false;
          }
        }
      }
    }

    return errors;
  };

  const getFieldState: UseFormGetFieldState<TFieldValues> = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    error: get((formState || _formState).errors, name),
  });

  const reset = () => {
    _fields = {};
    _defaultValues = {};
    _formState = {
      errors: {},
      isValid: false,
    };
    updateFormState(_formState);
  };

  return {
    control: {
      get _formState() {
        return _formState;
      },
      set _formState(value) {
        _formState = value;
      },
    },
    register,
    handleSubmit,
    getFieldState,
    reset,
    validateSingleValue,
  };
}
