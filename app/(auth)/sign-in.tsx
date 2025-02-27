import { useEffect, useState } from 'react'
import {
	View,
	Text,
	Alert,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import Button from '@/components/Button'
import { tokenStorage, userStorage } from '../../redux/storage'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
const API_URL = process.env.EXPO_PUBLIC_API_URL!

export default function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isKeyboardVisible, setKeyboardVisible] = useState(false)
	const [isClickedSignUp, setIsClickedSignUp] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => setKeyboardVisible(true)
		)
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => setKeyboardVisible(false)
		)

		return () => {
			keyboardDidShowListener.remove()
			keyboardDidHideListener.remove()
		}
	}, [])

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

			await tokenStorage.setAccessToken(accessToken)
			await tokenStorage.setRefreshToken(refreshToken)

			await userStorage.setUser(user)

			dispatch(setUser(user))
			router.push('/(root)/(tabs)/profile')
		} catch (error) {
			console.log(error)
			Alert.alert('Ошибка', 'Неверные данные')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className='flex-1 justify-center'
			>
				<View className='flex-1 bg-bg-300 h-full'>
					<SafeAreaView className='mt-[30%] bg-bg-100 flex-1 rounded-t-[80px] shadow-lg flex flex-col px-8'>
						<ScrollView
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							contentContainerClassName='flex-1 h-full'
						>
							{/* Welcome Text */}
							{!isKeyboardVisible && (
								<View className='w-full flex flex-col gap-4 mt-5'>
									<Text className='text-4xl font-roboto-extrabold text-text-100 text-left'>
										Добро пожаловать,
									</Text>
									<Text className='text-text-200 text-xl font-roboto-bold'>
										Войдите, чтобы продолжить!
									</Text>
								</View>
							)}
							{/* Form */}
							<View
								className={` flex flex-col gap-10 ${
									!isKeyboardVisible ? 'mt-24' : 'mt-12'
								}`}
							>
								<View className='relative'>
									<Text className='text-text-200 bg-bg-100 text-ms font-roboto-bold absolute z-10 left-10 -top-2.5 p-1 px-5 rounded-full'>
										Почта
									</Text>
									<TextInput
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
							</View>
							<View className='w-full flex flex-row justify-end mt-4'>
								<Button textClassName='text-text-200 font-roboto-bold'>
									Забыли пароль?
								</Button>
							</View>
							{!isKeyboardVisible && (
								<View className='mt-auto flex flex-col gap-4'>
									<Button
										className='w-full bg-primary-100 shadow-md p-4 rounded-3xl flex flex-row justify-center items-center'
										textClassName='text-4xl font-roboto-extrabold '
										onPress={handleLogin}
									>
										Войти
									</Button>

									<Button
										className='w-full bg-bg-100 border-bg-300 border-2 shadow-md p-4 rounded-3xl flex flex-row justify-center items-center'
										textClassName=''
										disabled={isClickedSignUp}
										onPress={() => {
											if (isClickedSignUp) return

											setIsClickedSignUp(true)
											const timeout = setTimeout(() => {
												setIsClickedSignUp(false)
												router.replace('/sign-up')
											}, 300)

											return () => clearTimeout(timeout)
										}}
									>
										<Text className='text-text-200 font-roboto-medium text-2xl'>
											Нет аккаунта?{' '}
											<Text className='text-text-100 font-roboto-extrabold '>
												Создать
											</Text>
										</Text>
									</Button>
								</View>
							)}
						</ScrollView>
					</SafeAreaView>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}
