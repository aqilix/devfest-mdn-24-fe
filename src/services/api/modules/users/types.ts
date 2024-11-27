// GET me
export type UsersGetMeReq = null
export type UsersGetMeRes<T = Record<string, unknown>> = {
  id: string
  email: string
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
} & T

// PUT (update) me
export type UsersPutMeReq = {
  name: string
  phone_number: string
  avatar_id: string
  gender: 'male' | 'female' | string
  date_of_birth: string // ISO Datetime
}
export type UsersPutMeRes = UsersGetMeRes<{
  latitude: number
  longitude: number
}>
