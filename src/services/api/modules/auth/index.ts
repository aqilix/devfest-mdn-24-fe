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
    postLogin: build.mutation<AuthPostLoginRes, AuthPostLoginReq>({
      query: (data) => ({
        url: '/auth/jwt/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
      }),
    }),
    postLogout: build.mutation<AuthPostLogoutRes, AuthPostLogoutReq>({
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
  usePostRegisterMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
} = authApi
