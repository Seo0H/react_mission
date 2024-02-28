import { initialApiStatus, type API, type APIStatusType, type ErrorType } from '@/api/factory/type';
import { userBrowserLanguage } from '@/hooks/use-language/constants';

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

      const response = await fetch(this.endPoint, {
        ...init,
        signal: this.abortSignal,
      });

      if (!response.ok) {
        throw new Response(response.statusText, { status: response.status });
      }

      const data = await response.json();

      if (Array.isArray(data) && !data.length) {
        const errorMessage = userBrowserLanguage === 'ko' ? '데이터가 비어 있습니다.' : 'Data is empty.';
        throw new Response(errorMessage, { status: 404 });
      }

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

      this.status = { ...initialApiStatus, isError: true };

      throw e;
    }
  }
  getStatus(): APIStatusType {
    return this.status;
  }
}
