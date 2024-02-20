import { initialApiStatus, type API, type APIStatusType, type ErrorType } from '@/api/factory/type';

export default class APIFactory<APIResponse> implements API<APIResponse> {
  endPoint: string;

  private status: APIStatusType = initialApiStatus;
  readonly abortSignal?: AbortSignal;

  constructor(endPoint: string, abortSignal?: AbortSignal) {
    this.endPoint = `${process.env.BACKEND_URL}${endPoint}`;
    if (abortSignal) this.abortSignal = abortSignal;
  }

  async fetch(init?: RequestInit | undefined): Promise<APIResponse | ErrorType> {
    try {
      this.status = { ...initialApiStatus, isLoading: true };

      const response = await fetch(this.endPoint, { ...init, signal: this.abortSignal });

      if (!response.ok) {
        throw new Response('Something Wrong', { status: response.status });
      }

      const data = await response.json();

      this.status = { ...initialApiStatus, isSuccess: true };

      return data;
    } catch (e) {
      if (this.abortSignal?.aborted) {
        this.status = { ...initialApiStatus, isAbort: true };

        return {
          message: 'ABORTED',
          error: e,
        };
      }

      if (e instanceof Error) {
        this.status = { ...initialApiStatus, isError: true };

        throw {
          message: e.message,
          error: e,
        };
      }

      this.status = { ...initialApiStatus, isError: true };

      throw e;
    }
  }
  getStatus(): APIStatusType {
    return this.status;
  }
}
