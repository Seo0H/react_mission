import { areValuesEqual } from '@/utils/are-values-equal';
import { isString } from '@/utils/is';

import type { InternalFieldErrors } from '@/hooks/use-form/types/errors';
import type { FieldValues } from '@/hooks/use-form/types/fields';
import type { Validate } from '@/hooks/use-form/types/validator';

export const validateField = async <TFiledValues extends FieldValues = FieldValues>(
  validates: Validate[],
  value: TFiledValues[keyof TFiledValues],
  name: keyof FieldValues,
  formValues: TFiledValues,
) => {
  const error: InternalFieldErrors = {};

  for (const validate of validates) {
    const isNot = validate.type === 'not';
    const isMinmax = validate.type === 'minMax';
    const isSameAs = validate.type === 'sameAs';
    const isMinMaxLength = validate.type === 'minMaxLength';
    const isPattern = validate.type === 'pattern';

    if (isNot) {
      const target = validate.target;

      if (areValuesEqual(target, value)) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }

    if (isMinmax) {
      let [min, max] = validate.target;
      const numValue = Number(value);

      max = max === '-' ? Number.MAX_SAFE_INTEGER : Number(max);
      min = min === '-' ? -1 : Number(min);

      if (numValue < min || numValue > max) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }

    if (isSameAs) {
      const target = validate.target;
      if (value !== formValues[target]) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }

    if (isMinMaxLength) {
      if (isString(value) === false) {
        error[name] = {
          message: validate.validateText,
        };
      } else {
        let [min, max] = validate.target;
        const valueLength = value.length;
        max = max === '-' ? Number.MAX_SAFE_INTEGER : Number(max);
        min = min === '-' ? -1 : Number(min);

        if (valueLength > max || valueLength < min) {
          error[name] = {
            message: validate.validateText,
          };
        }
      }
    }

    if (isPattern) {
      const regex = new RegExp(validate.target);
      if (isString(value) && !regex.test(value)) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }
  }

  return error;
};
