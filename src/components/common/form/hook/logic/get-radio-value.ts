type RadioFieldResult = {
  isValid: boolean;
  value: number | string | null;
};

const defaultReturn: RadioFieldResult = {
  isValid: false,
  value: null,
};

export const getRadioValue = (options?: HTMLInputElement[]): RadioFieldResult => {
  return Array.isArray(options)
    ? options.reduce(
        (previous, options): RadioFieldResult =>
          options && options.checked && !options.disabled
            ? {
                isValid: true,
                value: options.value,
              }
            : previous,
        defaultReturn,
      )
    : defaultReturn;
};
