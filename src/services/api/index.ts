import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from './lib/axiosBaseQuery'
import { getHost } from './helpers'

export const initByPassHost = (baseURL?: string) => {
  const { origin } = window.location
  if (/.+localhost.+/g.test(origin) && baseURL !== 'server-side-api/'){
    return 'http://localhost:8080/'
  }
  return ''
}

export const api = createApi({
  reducerPath: 'apiDefault',
  baseQuery: async (requestOpts, store, extra) => {
    return axiosBaseQuery({
      baseUrl: getHost(process.env.NEXT_PUBLIC_API_URL),
    })(requestOpts, store, extra)
  },
  endpoints: () => ({}),
})
