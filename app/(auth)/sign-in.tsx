import { useState } from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import Button from '@/components/Button'

import { tokenStorage, userStorage } from '../../redux/storage'
import { useRouter } from 'expo-router'
import axios from 'axios'
const API_URL = 'http://192.168.0.147:3500'

export default function LoginScreen() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogin = async () => {
		console.log({
			email,
			password,
		})
		try {
			const response = await axios.post(`${API_URL}/auth/signin`, {
				email,
				password,
			})
			console.log(response.data)
			const { accessToken, refreshToken, user } = response.data
			// 🔒 Храним токены в SecureStore
			await tokenStorage.setAccessToken(accessToken)
			await tokenStorage.setRefreshToken(refreshToken)

			// 📂 Храним пользователя в AsyncStorage и Redux
			await userStorage.setUser(user)
			dispatch(setUser(user))

			router.push('/(auth)/sign-up')
		} catch (error) {
			console.log(error)
			Alert.alert('Ошибка', 'Неверные данные')
		}
	}

	return (
		<View className='flex-1 items-center justify-center'>
			<Text>Логин</Text>
			<Text>Email</Text>
			<TextInput placeholder='Email' value={email} onChangeText={setEmail} />
			<Text>Пароль</Text>
			<TextInput
				placeholder='Пароль'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<Button onPress={handleLogin} />
		</View>
	)
}
