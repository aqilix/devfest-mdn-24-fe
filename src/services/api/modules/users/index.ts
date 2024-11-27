import { api } from '../..'

import {
  UsersGetMeRes, UsersGetMeReq,
  UsersPutMeRes, UsersPutMeReq,
} from './types'

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UsersGetMeRes, UsersGetMeReq>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),
    putMe: build.mutation<UsersPutMeRes, Partial<UsersPutMeReq>>({
      query: (data) => ({
        url: '/users/me',
        method: 'PUT',
        data,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetMeQuery,
  usePutMeMutation,
} = authApi
