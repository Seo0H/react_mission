import { validateField } from '@/hooks/use-form/logic/validate-field';
import { InternalFieldErrors } from '@/hooks/use-form/types/errors';
import { Validate } from '@/hooks/use-form/types/validator';
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
  let _formState: FormState<TFieldValues> = {
    errors: {},
    isValid: false,
  };

  /**
   * 폼 필드의 input의 name을 key로 이용해 내부 필드 객체인 `_field`에
   * 폼 input의 참조를 등록하는 함수
   * @template TFieldValues - 폼 필드 값의 유형을 나타내는 템플릿 매개변수
   * @param  name - 등록할 폼 필드의 이름
   * @param  [options={}] - 선택적인 옵션 객체
   * @returns UseFormRegisterReturn<TFieldValues> - 폼 필드의 이름과 참조를 반환하는 객체
   */
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
                    refs: Array.isArray(_fields[name]?._f.refs) // 이미 refs가 있을경우 중복해서 등록하지 않음
                      ? _fields[name]?._f?.refs
                      : [...refs, ...fieldRef, ...(Array.isArray(get(_defaultValues, name)) ? [{}] : [])],
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
      _formState.errors = await _executeInputValidation(_fields);
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

  const _validateSingleValue = (name: keyof TFieldValues) => {
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
      }
    }

    return errors;
  };

  const validateSingleValue = (
    name: keyof TFieldValues,
    context: {
      valid: boolean;
    } = { valid: true },
  ) => {
    const filedError = _validateSingleValue(name);

    if (!isEmptyObject(filedError)) {
      context.valid = false;
      _setErrorState(filedError);
    }

    return context.valid;
  };

  const _setErrorState = (errors: InternalFieldErrors) => {
    set(_formState, 'errors', errors);
    updateFormState(_formState);
  };

  const _executeInputValidation = async (fields: FieldRefs) => {
    let errors: InternalFieldErrors = {};

    for (const name in fields) {
      const fieldError = _validateSingleValue(name);
      errors = { ...errors, ...fieldError };
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
