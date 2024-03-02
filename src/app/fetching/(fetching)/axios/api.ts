import axios, { isAxiosError } from 'axios';

import { notFound } from 'next/navigation';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/** Represents a form field error object */
type FieldError = {
  /** represents the first error message */
  message: string;
  /** represents an array of all error messages */
  all: string[];
};

/**
 * Represents a nested object containing form field errors.
 * @example
 * {
 *   firstName: { message: 'First name is required', all: ['First name is required', 'First name must be at least 2 characters long'] },
 *   contact:{
 *     email: { message: 'Email is required', all: ['Email is required', 'Email must be a valid email address'] },
 *     phone: { message: 'Phone is required', all: ['Phone is required', 'Phone must be a valid phone number'] }
 *   }
 * }
 */
type FieldErrors<DATA> = {
  [KEY in keyof DATA]: DATA[KEY] extends object ? FieldErrors<DATA[KEY]> : FieldError;
};

/** Represents a successful response object returned by the API class */
type SuccessResponse<ResponseData> = {
  data: ResponseData;
  errors: null;
  status: number;
};

/** Represents an error response object returned by the API class */
type ErrorResponse<RequestData> = {
  data: null;
  errors: Errors<RequestData>;
  status: number;
};

/** Represents the response object returned by the API class */
type ResponseType<ResponseData, RequestData> = SuccessResponse<ResponseData> | ErrorResponse<RequestData>;

type ApiConfig = AxiosRequestConfig & {
  /** The default data to return when an error occurs */
  defaultData?: any;
};

/** Represents the error object returned the API class */
export type Errors<D> = {
  /** A generic error message */
  message: string;
  /** An object containing form field errors */
  fields?: FieldErrors<D>;
};

/**
 * A wrapper class for the axios library.
 * @class

 * @example - page.tsx
 * import { API } from '@/functions/shared/api';
 *
 * export default async function ArticlesPage() {
 *  const { data, errors, status } = await API.get<Article[]>('/articles');
 *
 *  // throw an error to be caught by the error boundary containing a generic error message
 *  if (errors) throw new Error(errors.message);
 *
 *  return <Articles articles={data} />;
 * }
 *
 * @example - client component
 * import { API } from '@/functions/shared/api';
 *
 * export default function ArticleForm() {
 *   const onSubmit = handleSubmit(async (data) => {
 *     const { data, errors, status } = await API.post<Article, Article>('/articles', data);
 *
 *     if (errors)
 *   });
 * }
 */
class API {
  private static readonly isServer: boolean = typeof window === 'undefined';

  private static axiosInstance(baseURL: string = process.env.API_URL): AxiosInstance {
    return axios.create({
      baseURL,
      timeout: 10_000,
      timeoutErrorMessage:
        'Our server took too long to respond. This may be due to a slow internet connection, high server load, or a bug in our code. Please try again later.',
    });
  }

  public static async get<ResponseData, QueryParams = null>(
    url: string,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, QueryParams>> {
    try {
      const response = await this.axiosInstance().get<ResponseData>(url, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<QueryParams>(error);
    }
  }

  public static async post<ResponseData, RequestData = null>(
    url: string,
    data: RequestData,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, RequestData>> {
    try {
      const response = await this.axiosInstance().post<ResponseData>(url, data, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<RequestData>(error);
    }
  }

  public static async put<ResponseData, RequestData = null>(
    url: string,
    data?: any,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, RequestData>> {
    try {
      const response = await this.axiosInstance().put<ResponseData>(url, data, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<RequestData>(error);
    }
  }

  public static async patch<ResponseData, RequestData = null>(
    url: string,
    data?: any,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, RequestData>> {
    try {
      const response = await this.axiosInstance().patch<ResponseData>(url, data, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<RequestData>(error);
    }
  }

  public static async delete<ResponseData, QueryParams = null>(
    url: string,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, QueryParams>> {
    try {
      const response = await this.axiosInstance().delete<ResponseData>(url, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<QueryParams>(error);
    }
  }

  private static handleResponse<ResponseData>(response: AxiosResponse<ResponseData>): SuccessResponse<ResponseData> {
    const { data, status } = response;

    return { data, errors: null, status };
  }

  private static handleError<RequestDataOrQueryParams>(error: unknown): ErrorResponse<RequestDataOrQueryParams> {
    if (isAxiosError<ResponseType<null, RequestDataOrQueryParams>>(error)) {
      const config = error.config as ApiConfig;
      const defaultData = config.defaultData ?? null;

      console.info('URL: ', `${config.baseURL}${config.url}?${new URLSearchParams(config.params).toString()}`);

      if (error.response) {
        const { data, status } = error.response;
        const config = error.config as ApiConfig;

        if (this.isServer && error.response.status === 404) {
          notFound();
        }

        if (data.errors)
          return {
            data: defaultData,
            errors: {
              message: data.errors?.message,
              fields: data.errors?.fields,
            },
            status,
          };

        console.error('RESPONSE_ERROR: ', error);
        // captureException(error, { extra: { config } });

        return {
          data: defaultData,
          errors: {
            message: 'Something went wrong with the server. Please try again later.',
          },
          status,
        };
      } else if (error.request) {
        const config = error.config as ApiConfig;

        console.error('REQUEST_ERROR: ', error);
        // captureException(error, { extra: { config } });

        return {
          data: defaultData,
          errors: {
            message: 'Connection or server error. Please try again later.',
          },
          status: 0,
        };
      } else {
        console.error('UNKNOWN_ERROR_0: ', error);
        // captureException(error, { extra: { config } });

        return {
          data: defaultData,
          errors: {
            message: 'Something went wrong forming the request. Please try again later.',
          },
          status: 0,
        };
      }
    } else {
      console.error('UNKNOWN_ERROR_1: ', error);
      // captureException(error);

      return {
        data: null,
        errors: {
          message: 'Something went wrong with the application. Please try again later.',
        },
        status: 0,
      };
    }
  }
}

export { API };
export type { ResponseType, FieldError, FieldErrors, ApiConfig };
