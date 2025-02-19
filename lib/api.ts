import axios from 'axios'
import { tokenStorage, userStorage } from '../redux/storage'
import { store } from '../redux/store'
import { logout, setUser } from '@/redux/authSlice'

const API_URL = process.env.EXPO_PUBLIC_API_URL!

export const api = axios.create({
	baseURL: API_URL,
})

// 🔄 Функция обновления токена
const refreshToken = async () => {
	const refreshToken = await tokenStorage.getRefreshToken()
	if (!refreshToken) return null

	try {
		const response = await axios.post(`${API_URL}/auth/refresh`, {
			refreshToken,
		})
		await tokenStorage.setAccessToken(response.data.accessToken)
		return response.data.accessToken
	} catch (error) {
		console.error('Ошибка обновления токена:', error)
		return null
	}
}

// 📡 Перехватчик запросов — добавляем токен
api.interceptors.request.use(async config => {
	console.log(API_URL)
	const accessToken = await tokenStorage.getAccessToken()
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

// 🚨 Перехватчик ошибок — обновляем токен при 401
api.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			const newAccessToken = await refreshToken()
			if (newAccessToken) {
				error.config.headers.Authorization = `Bearer ${newAccessToken}`
				return api.request(error.config)
			} else {
				await tokenStorage.removeAccessToken()
				await tokenStorage.removeRefreshToken()
				await userStorage.removeUser()
				store.dispatch(logout())
			}
		}
		return Promise.reject(error)
	}
)
