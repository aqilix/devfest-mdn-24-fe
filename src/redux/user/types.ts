import { UsersGetMeRes } from '@/services/api/modules/users/types'

export type UserState = {
  accessToken: string
  tokenType: string
  // refreshToken: string
  me: UsersGetMeRes | null
}

export type UserPayload = {
  payload: Partial<UserState>
}
