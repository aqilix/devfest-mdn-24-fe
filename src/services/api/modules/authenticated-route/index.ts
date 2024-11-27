import { api } from '../..'

import {
  AuthenticatedRouteGetRes,
  AuthenticatedRouteGetReq,
} from './types'

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuthenticatedRoute: build.query<AuthenticatedRouteGetRes, AuthenticatedRouteGetReq>({
      query: () => ({
        url: '/authenticated-route',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetAuthenticatedRouteQuery,
} = authApi
