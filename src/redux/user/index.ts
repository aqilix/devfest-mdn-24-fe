/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// import { storage } from '../storage'
import { UserPayload, UserState } from './types'

const slice = createSlice({
  name: 'user',
  initialState: {
    accessToken: '',
    tokenType: '',
    me: null,
  } as UserState,
  reducers: {
    changeUser: (state, {
      payload: { accessToken, tokenType, me },
    }: UserPayload) => {
      if (typeof accessToken !== 'undefined') {
        state.accessToken = accessToken
      }
      if (typeof tokenType !== 'undefined') {
        state.tokenType = tokenType
      }
      if (typeof me !== 'undefined') {
        state.me = me
      }
    },
    resetUser: (state) => {
      state.accessToken = ''
      state.tokenType = ''
      state.me = null
    },
  },
})

export const { changeUser, resetUser } = slice.actions

export default slice.reducer
