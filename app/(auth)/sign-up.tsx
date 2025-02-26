import { useState } from 'react'
import {
	View,
	Text,
	Alert,
	TextInput,
	ScrollView,
	Platform,
	KeyboardAvoidingView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import Button from '@/components/Button'

import { tokenStorage, userStorage } from '../../redux/storage'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
const API_URL = process.env.EXPO_PUBLIC_API_URL!

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleSignin = async () => {
		console.log({
			email,
			password,
			username,
		})
		try {
			const response = await axios.post(`${API_URL}/auth/signup`, {
				email,
				password,
				username: `@${username}`,
			})
			console.log(response.data)
			const { accessToken, refreshToken, user } = response.data

			await tokenStorage.setAccessToken(accessToken)
			await tokenStorage.setRefreshToken(refreshToken)

			await userStorage.setUser(user)

			dispatch(setUser(user))
			router.push('/(root)/(tabs)/profile')
		} catch (error) {
			console.log(error)
			Alert.alert('Ошибка', 'Ошибка регистрации')
		}
	}

	return (
		<View className='flex-1 bg-bg-300'>
			<SafeAreaView className='mt-[30%] bg-bg-100 flex-1 rounded-t-[80px] shadow-lg flex flex-col px-8'>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
					className='flex-1'
				>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						contentContainerClassName='flex-1 '
					>
						{/* Welcome Text */}
						<View className='w-full flex flex-col gap-4 mt-5'>
							<Text className='text-4xl font-roboto-extrabold text-text-100 text-left'>
								Добро пожаловать,
							</Text>
							<Text className='text-text-200 text-xl font-roboto-bold'>
								Зарегистрируйтесь, чтобы продолжить!
							</Text>
						</View>
						{/* Form */}
						<View className='mt-10 flex flex-col gap-10'>
							<View className='relative'>
								<Text className='text-text-200 bg-bg-100 text-ms font-roboto-bold absolute z-10 left-10 -top-2.5 p-1 px-5 rounded-full'>
									Почта
								</Text>
								<TextInput
									maxLength={100}
									value={email}
									onChangeText={setEmail}
									placeholder=''
									placeholderClassName=''
									placeholderTextColor='#e0e0e0'
									keyboardType='email-address'
									autoCapitalize='none'
									className='bg-bg-100 h-[70px] text-text-100 p-5 pb-7 rounded-3xl text-xl font-roboto-medium  border-bg-300 border-2'
								/>
							</View>
							<View className='relative'>
								<Text className='text-text-200 bg-bg-100 text-ms font-roboto-bold absolute z-10 left-10 -top-2.5 p-1 px-5 rounded-full'>
									Пароль
								</Text>
								<TextInput
									value={password}
									onChangeText={setPassword}
									secureTextEntry
									className='bg-bg-100 h-[70px] text-text-100 p-5 rounded-3xl text-xl font-roboto-medium pb-6 border-bg-300 border-2'
								/>
							</View>
							<View className='relative'>
								<Text className='text-text-200 bg-bg-100 text-ms font-roboto-bold absolute z-10 left-10 -top-2.5 p-1 px-5 rounded-full'>
									Юзернейм
								</Text>
								<TextInput
									value={username}
									onChangeText={setUsername}
									maxLength={30}
									className='bg-bg-100 h-[70px] text-text-100 p-5 pl-14 rounded-3xl text-xl font-roboto-medium pb-6 border-bg-300 border-2'
								></TextInput>
								<Text className='absolute top-[20%] left-5 text-4xl font-roboto-bold text-text-100'>
									@
								</Text>
							</View>
						</View>

						<View className='mt-auto flex flex-col gap-4'>
							<Button
								className='w-full bg-primary-100 shadow-md p-4 rounded-3xl flex items-center justify-center'
								textClassName='text-4xl font-roboto-extrabold'
								onPress={handleSignin}
							>
								Регистрация
							</Button>
							<Button
								className='w-full bg-bg-100 border-bg-300 border-2 shadow-md p-4 rounded-3xl flex items-center justify-center'
								textClassName=''
								onPress={() => router.push('/sign-in')}
							>
								<Text className='text-text-200 font-roboto-medium text-2xl'>
									Есть аккаунт?{' '}
									<Text className='text-text-100 font-roboto-extrabold '>
										Войти
									</Text>
								</Text>
							</Button>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</View>
	)
}
