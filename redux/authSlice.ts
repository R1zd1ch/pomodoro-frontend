import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
	user: null | { id: number; email: string }
}

const initialState: AuthState = {
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthState['user']>) => {
			state.user = action.payload
		},
		logout: state => {
			state.user = null
		},
	},
})

export const { setUser, logout } = authSlice.actions

const persistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	whitelist: ['user'],
}

export const authReducer = persistReducer(persistConfig, authSlice.reducer)
