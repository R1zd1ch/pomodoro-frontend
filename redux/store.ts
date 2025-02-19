import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { authReducer } from './authSlice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	auth: authReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
