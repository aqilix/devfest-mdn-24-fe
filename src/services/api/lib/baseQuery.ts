import {
  BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
})

const baseQueryWithInterceptor: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  // if (result.error && result.error.status === 401) {}
  return result
}

export default baseQueryWithInterceptor
