import axios, {
  AxiosPromise, AxiosRequestConfig, AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export default function axiosClient<TResponse = unknown>(
  baseURL: string | undefined,
  config: AxiosRequestConfig & { _retry?: boolean },
): AxiosPromise<TResponse> {
  // init axios instance with init config
  const axiosApiInstance = axios.create({
    baseURL,
    headers: {
      Accept: '*/*',
      'access-control-allow-origin': '*',
      'Content-Type': 'application/json',
      ...config.headers,
    },
    timeout: config.timeout || 10000,
  })

  // interceptor REQUEST
  axiosApiInstance.interceptors.request.use(
    (reqConfig) => reqConfig,
  )

  // interceptor RESPONSE
  axiosApiInstance.interceptors.response.use(
    (response) => {
      if (typeof response === 'string' && response === '') {
        const a: AxiosResponse<unknown, unknown> = {
          data: null,
          status: 500,
          statusText: response,
          config: { ...config, headers: config.headers || {} } as InternalAxiosRequestConfig,
          headers: config.headers || {}
        }
        return Promise.resolve(a)
      }
      return Promise.resolve(response)
    },
    async (error) => {
      if (typeof error === 'string' && error === '') return Promise.reject(new Error(error))
      return Promise.reject(error.response || error)
    },
  )

  // return The Axios Promise
  return axiosApiInstance(config)
}
