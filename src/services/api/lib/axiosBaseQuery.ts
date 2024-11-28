import { AxiosError, AxiosRequestConfig } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/redux/store'
import { formatAPIResponseErrorArrayToMultilineString, getSubset } from '@/utils/functions/object'
import { toSentenceCase } from '@/utils/functions/string'

// import { AuthPostLoginRes } from '../modules/auth/types'

import axiosClient from './axiosClient'
import { ApiResponseError, RequestOptions } from '../types'

// async function refreshAccessToken(baseURL: string, currRefreshToken: string) {
//   return axios.post<AuthPostLoginRes>(`${baseURL}/auth/jwt/login`, { refresh_token: currRefreshToken })
//     .then((res) => res.data.data)
//     .catch((err) => Promise.reject(err))
// }

const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<RequestOptions, unknown, unknown> => (
  async (requestOpts, { getState }) => {
    const {
      url, method, data, params, headers, timeout, signal,
    } = requestOpts

    const { accessToken, tokenType } = ((getState?.() as RootState)?.user ?? {})

    let controller: AbortController | undefined
    if (!signal) controller = new AbortController()

    let timeoutEvent: NodeJS.Timeout | undefined
    if (timeout && controller) {
      timeoutEvent = setTimeout(() => {
        controller?.abort('')
      }, timeout + 100)
    }

    const config: AxiosRequestConfig & { _retry?: boolean } = {
      url,
      method,
      data,
      params,
      headers: {
        ...(accessToken && !headers?.Authorization ? { Authorization: `${toSentenceCase(tokenType)} ${accessToken}` } : null),
        ...headers,
      },
      timeout,
      signal: signal || controller?.signal,
    }

    try {
      // start calling API
      const result = await axiosClient(baseUrl, config)
      clearTimeout(timeoutEvent)

      // return the result data
      // return result

      return { data: result?.data }
    // Got Exception!
    } catch (axiosError) {
      const error = JSON.parse(JSON.stringify(axiosError as AxiosError))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData: ApiResponseError = error?.data
      let errorMessage = ''

      if (typeof errorData?.detail === 'string') {
        errorMessage = errorData?.detail
      } else if (Array.isArray(errorData?.detail)) {
        errorMessage = formatAPIResponseErrorArrayToMultilineString(errorData?.detail)
      } else if (typeof errorData?.detail === 'object') {
        errorMessage = JSON.stringify(errorData?.detail)
      }

      // Trigger Refresh Token
      if (error.status === 401 && !config?._retry) {
        /**
         * currently BE is not provide refresh token. activate this code when BE provide refresh token
         * */
        //#region REFRESH TOKEN SECTION
        // try {
        //   const originalConfig = { ...config }

        //   // flagging this action
        //   originalConfig._retry = true

        //   // get New token
        //   const currRefreshToken = (getState?.() as RootState)?.user?.refreshToken
        //   const { token, refresh_token } = await refreshAccessToken(originalConfig?.baseURL || error.config?.baseURL, currRefreshToken) || {}

        //   // save New Token and its Refresh token
        //   dispatch?.(changeUser({ token, refreshToken: refresh_token }))
        //   originalConfig.headers = { ...originalConfig.headers, Authorization: `Bearer ${token}` }

        //   // call same api again
        //   const result = await axiosClient(baseUrl, originalConfig)
        //   clearTimeout(timeoutEvent)

        //   // return result data
        //   return { data: result.data }

        // // Got Exception!
        // } catch (axiosError2) {
        //   const error2 = JSON.parse(JSON.stringify(axiosError2 as AxiosError))
        //   return { error: getSubset(error2, ['status', 'data']) }
        // }
        //#endregion REFRESH TOKEN SECTION
      
        /** Since BE not provide refresh token, do other things to handle 401 */
        // TODO: handle 401
      }

      // return Error
      return { error: { 
        message: errorMessage,
        ...getSubset(error, ['status', 'statusText', 'data']) }
      }
      // return { error: getSubset(error, ['status', 'data']) }
    }
  }
)

export default axiosBaseQuery
