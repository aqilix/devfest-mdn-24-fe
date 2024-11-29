// post register
export type AuthPostRegisterReq = {
  email: string
  password: string
  // is_active: boolean
  // is_superuser: boolean
  // is_verified: boolean
}
export type AuthPostRegisterRes = {
  id: string
  email: string
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
}

// post login
export type AuthPostLoginReq = {
  username: string
  password: string
  grant_type?: string
  client_secret?: string
  client_id?: string
  scope?: string
}
export type AuthPostLoginRes = {
  access_token: string
  token_type: string
}

// post logout
export type AuthPostLogoutReq = null
export type AuthPostLogoutRes = null
