import { api } from '../..'

import {
  AuthPostRegisterRes, AuthPostRegisterReq,
  AuthPostLoginRes, AuthPostLoginReq,
  AuthPostLogoutRes, AuthPostLogoutReq,
} from './types'

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    postRegister: build.mutation<AuthPostRegisterRes, AuthPostRegisterReq>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        data,
      }),
    }),
    postLogin: build.query<AuthPostLoginRes, AuthPostLoginReq>({
      query: (data) => ({
        url: '/auth/jwt/login',
        method: 'POST',
        data,
      }),
    }),
    postLogout: build.query<AuthPostLogoutRes, AuthPostLogoutReq>({
      query: (data) => ({
        url: '/auth/jwt/logout',
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyPostLoginQuery,
  usePostRegisterMutation,
} = authApi
