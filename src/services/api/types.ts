import { AxiosRequestConfig } from 'axios'

// export type ApiRequest<T> = T & {
//   requestOptions?: Omit<RequestOptions, 'url' | 'method'>
// }

// export type ApiResponse<T = Record<string, unknown>> = {
//   success: boolean
//   data: T | null
//   paging: ApiResponsePaging | null
//   errors: ApiResponseError | null
// }

// export type ApiResponseError = {
//   code: number
//   message: string
// }

// export type ApiResponsePaging = {
//   page: number
//   per_page: number
//   count: number
//   page_count: number
//   next: boolean
//   prev: boolean
// }

export type ApiResponseError = {
  detail: string | {
    type?: string | null;
    loc?: string[] | null;
    msg?: string | null;
    input?: string | null;
  }[]
}

export type RequestOptions = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
  timeout?: AxiosRequestConfig['timeout']
  signal?: AxiosRequestConfig['signal']
}
