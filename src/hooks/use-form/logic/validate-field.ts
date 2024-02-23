import { isFelidKey } from '@/hooks/use-form/utils/is';
import { areValuesEqual } from '@/utils/are-values-equal';
import { isString } from '@/utils/is';

import type { InternalFieldErrors } from '@/hooks/use-form/types/errors';
import type { Field, FieldValues } from '@/hooks/use-form/types/fields';
import type { Validate } from '@/hooks/use-form/types/validator';

export const validateField = async <T extends FieldValues[keyof FieldValues]>(
  validates: Validate[],
  formValue: T,
  field: Field,
) => {
  const error: InternalFieldErrors = {};
  const { name } = field._f;

  for (const validate of validates) {
    const isNot = validate.type === 'not';
    const isMinmax = validate.type === 'minMax';
    const isSameAs = validate.type === 'sameAs';
    const isMinMaxLength = validate.type === 'minMaxLength';
    const isPattern = validate.type === 'pattern';

    if (isNot) {
      const target = validate.target;

      if (areValuesEqual(target, formValue)) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }

    if (isMinmax) {
      let [min, max] = validate.target;
      const numValue = Number(formValue);

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
      if (isFelidKey(target, field) && formValue !== field[target]) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }

    if (isMinMaxLength) {
      if (!isString(formValue)) {
        error[name] = {
          message: `${name}는/은 string 이여야 합니다.`,
        };
      } else {
        let [min, max] = validate.target;
        const valueLength = formValue.length;
        // TODO: message를 외부에서 주입받을 수 있으면 좋을듯..
        max = max === '-' ? Number.MAX_SAFE_INTEGER : Number(max);
        min = min === '-' ? -1 : Number(min);

        if (valueLength > max || valueLength < min) {
          error[name] = {
            message: `${max} 이하, ${min} 이상 입력해야 합니다.`,
          };
        }
      }
    }

    if (isPattern) {
      const regex = new RegExp(validate.target);
      if (isString(formValue) && !regex.test(formValue)) {
        error[name] = {
          message: validate.validateText,
        };
      }
    }
  }

  return error;
};
