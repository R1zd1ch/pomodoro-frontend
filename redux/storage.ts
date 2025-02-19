import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

const isValidKey = (key: string) => {
	return key !== null && key !== undefined
}

export const tokenStorage = {
	getAccessToken: async () => {
		return await SecureStore.getItemAsync('accessToken')
	},
	setAccessToken: async (token: string) => {
		if (isValidKey(token)) {
			await SecureStore.setItemAsync('accessToken', token)
		}
	},
	removeAccessToken: async () => {
		await SecureStore.deleteItemAsync('accessToken')
	},

	getRefreshToken: async () => {
		return await SecureStore.getItemAsync('refreshToken')
	},
	setRefreshToken: async (token: string) => {
		if (isValidKey(token)) {
			await SecureStore.setItemAsync('refreshToken', token)
		}
	},
	removeRefreshToken: async () => {
		await SecureStore.deleteItemAsync('refreshToken')
	},
}

export const userStorage = {
	getUser: async () => {
		const data = await AsyncStorage.getItem('user')
		return data ? JSON.parse(data) : null
	},
	setUser: async (user: any) => {
		await AsyncStorage.setItem('user', JSON.stringify(user))
	},
	removeUser: async () => {
		await AsyncStorage.removeItem('user')
	},
}
