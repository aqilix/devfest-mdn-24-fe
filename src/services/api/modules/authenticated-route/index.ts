import { api } from '../..'

import {
  AuthenticatedRouteGetRes,
  AuthenticatedRouteGetReq,
} from './types'

export const authenticatedRoutePathUrl = '/authenticated-route'

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuthenticatedRoute: build.query<AuthenticatedRouteGetRes, AuthenticatedRouteGetReq>({
      query: () => ({
        url: authenticatedRoutePathUrl,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetAuthenticatedRouteQuery,
} = authApi
