import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from './lib/axiosBaseQuery'

export const api = createApi({
  reducerPath: 'apiDefault',
  baseQuery: async (requestOpts, store, extra) => {
    return axiosBaseQuery({
      baseUrl: process.env.CLIENT_API_URL || 'http://localhost:3000',
    })(requestOpts, store, extra)
  },
  endpoints: () => ({}),
})
