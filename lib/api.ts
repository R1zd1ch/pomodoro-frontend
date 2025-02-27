import axios from 'axios'
import { tokenStorage, userStorage } from '../redux/storage'

import { authSlice, setUser } from '@/redux/authSlice'

export const API_URL = process.env.EXPO_PUBLIC_API_URL!

export const api = axios.create({
	baseURL: API_URL,
})

export const refreshToken = async () => {
	const refreshToken = await tokenStorage.getRefreshToken()
	if (!refreshToken) return null

	try {
		console.log(refreshToken)
		console.log(API_URL)
		const response = await axios.post(
			`${API_URL}/auth/refresh`,
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			}
		)
		console.log(response.data)
		await tokenStorage.setAccessToken(response.data.accessToken)
		await tokenStorage.setRefreshToken(response.data.refreshToken)
		return response.data.accessToken
	} catch (error) {
		console.error('Ошибка обновления токена:', error)
		authSlice.actions.logout()
		throw new Error('Ошибка обновления токена')
	}
}

api.interceptors.request.use(async config => {
	console.log(API_URL)
	const accessToken = await tokenStorage.getAccessToken()
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

api.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 403 || error.response?.status === 401) {
			const newAccessToken = await refreshToken()
			if (newAccessToken) {
				error.config.headers.Authorization = `Bearer ${newAccessToken}`
				return api.request(error.config)
			} else {
				await tokenStorage.removeAccessToken()
				await tokenStorage.removeRefreshToken()
				await userStorage.removeUser()
				authSlice.actions.logout()
			}
		}
		return Promise.reject(error)
	}
)
