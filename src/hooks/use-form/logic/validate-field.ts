import { isString } from '@/utils/is';
import { mergeArray } from '@/utils/merge-array';

import type { InternalFieldErrors } from '@/hooks/use-form/types/errors';
import type { FieldValues } from '@/hooks/use-form/types/fields';
import type { Validate } from '@/hooks/use-form/types/validator';

export const validateField = <TFiledValues extends FieldValues = FieldValues>(
  validates: Validate[],
  name: keyof FieldValues,
  formValues: TFiledValues | undefined,
) => {
  const error: InternalFieldErrors = {};

  // 검증 할 것이 없는 경우
  if (validates.length === 0) return error;

  const value = formValues ? removeEmptySpace(formValues[name]) : ''; // value를 string으로 변환해서 비교

  for (const validate of validates) {
    const isNot = validate.type === 'not';
    const isMinmax = validate.type === 'minMax';
    const isSameAs = validate.type === 'sameAs';
    const isMinMaxLength = validate.type === 'minMaxLength';
    const isPattern = validate.type === 'pattern';

    const errorMessages = error[name]?.message;

    if (isNot) {
      if (value === validate.target) {
        error[name] = {
          message: mergeArray([validate.validateText], errorMessages),
        };
      }
    }

    if (isMinmax) {
      let [min, max] = validate.target;
      const numValue = Number(value);

      max = max === '-' ? Number.MAX_SAFE_INTEGER : Number(max);
      min = min === '-' ? -Number.MAX_SAFE_INTEGER : Number(min);

      if (numValue < min || numValue > max) {
        error[name] = {
          message: mergeArray([validate.validateText], errorMessages),
        };
      }
    }

    if (isSameAs) {
      if (value === '-') {
        /* 제한없음인 경우 */
      }
      // filed의 특정 name이 가지고 있는 값과 같아야 하는 경우 (target이 $으로 시작)
      else if (isString(value) && validate.target.at(0) === '$') {
        const targetFieldName = validate.target.slice(1);

        if (formValues && value !== formValues[targetFieldName]) {
          error[name] = {
            message: mergeArray([validate.validateText], errorMessages),
          };
        }
        // 주어진 target과 value가 같아야 하는 경우
      } else if (String(value) !== validate.target) {
        error[name] = {
          message: mergeArray([validate.validateText], errorMessages),
        };
      }
    }

    if (isMinMaxLength) {
      let [min, max] = validate.target;
      const valueLength = value ? value.length : 0;
      max = max === '-' ? Number.MAX_SAFE_INTEGER : Number(max);
      min = min === '-' ? -Number.MAX_SAFE_INTEGER : Number(min);

      if (valueLength > max || valueLength < min) {
        error[name] = {
          message: mergeArray([validate.validateText], errorMessages),
        };
      }
    }

    if (isPattern) {
      const regex = new RegExp(validate.target, 'g');
      if (isString(value) && !regex.test(value)) {
        error[name] = {
          message: mergeArray([validate.validateText], errorMessages),
        };
      }
    }
  }

  return error;
};

function removeEmptySpace(value: string | undefined) {
  if (value === undefined) return '';
  return String(value).trim();
}
