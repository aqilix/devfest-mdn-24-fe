import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { api } from '../services/api'

import user from './user'

// combine reducers
const reducers = combineReducers({
  user,
  [api.reducerPath]: api.reducer,
})

// persist config
const persistConfig = {
  key: 'nextjs-gemini-integration',
  storage,
  whitelist: ['theme', 'appConfig', 'appConfigInternal', 'user'],
}

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers)

// configure store
const store = configureStore({
  // reducer: persistedReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'apiMaps/executeQuery/fulfilled', 'apiDefault/executeMutation/pending', 'apiDefault/executeMutation/rejected'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg.originalArgs.requestOptions.signal'],
        // Ignore these paths in the state
        ignoredPaths: ['apiMaps.queries'],
      },
    }).concat(api.middleware)

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default
    //   middlewares.push(createDebugger())
    // }

    return middlewares
  },
})

// export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

// export default store
export { store, persistor }


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
