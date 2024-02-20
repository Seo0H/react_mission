export type APIStatusType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAbort: boolean;
};

export interface API<APIResponseType> {
  readonly endPoint: string;
  fetch(): Promise<APIResponseType | ErrorType>;
  getStatus(): APIStatusType;
}

export type ErrorType = {
  message: string | undefined;
  error: unknown;
};

export const initialApiStatus: APIStatusType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isAbort: false,
};

export function isError(res: unknown | ErrorType): res is ErrorType {
  if (typeof res === 'object' && res !== null && 'error' in res) return true;
  return false;
}
