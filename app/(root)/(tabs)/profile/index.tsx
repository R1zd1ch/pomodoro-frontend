import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/Button'
import { logout } from '@/redux/authSlice'
import { RootState } from '@/redux/store'
import Avatar from '@/components/Avatar'
import { User, Bell, Lock, Plus, Settings, Award } from 'lucide-react-native'
import { router } from 'expo-router'

const pages = [
	{ title: 'Аккаунт', path: '/account', icon: User },
	{ title: 'Уведомления', path: '/notifications', icon: Bell },
	{ title: 'Приватность', path: '/privacy', icon: Lock },
]

const Profile = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.auth.user)

	return (
		<View className='flex-1 bg-bg-300'>
			<SafeAreaView className='flex-1 relative'>
				{/* Верхняя панель */}
				<View className='absolute top-16 w-full flex-row items-center justify-between p-4 px-8'>
					<Button className='bg-primary-100 rounded-full p-2 shadow-md'>
						<Award size={30} color='#cb80ff' />
					</Button>
					<View className='flex-row gap-4'>
						<Button className='bg-bg-200 rounded-full p-2 shadow-md'>
							<Plus size={30} color='#cb80ff' />
						</Button>
						<Button
							className='bg-primary-100 rounded-full p-2 shadow-md'
							onPress={() => router.push('/(root)/(tabs)/profile/settings')}
						>
							<Settings size={30} color='#cb80ff' />
						</Button>
					</View>
				</View>

				{/* Основной контент */}
				<SafeAreaView className='bg-bg-100 shadow-xl flex-1 mt-[40%] rounded-t-[40px]'>
					<Avatar
						size={150}
						className='bg-white absolute left-1/2 -translate-x-1/2 top-[-15%]'
						source={user?.avatarUrl}
					/>
					<View className='pt-24 px-8 flex-1'>
						<View className='flex-row items-center justify-center gap-2'>
							<Text className='text-text-100 font-roboto-extrabold text-3xl'>
								@{user?.username}
							</Text>
							<View className='size-6 bg-green-500 rounded-full' />
						</View>

						{/* Список страниц */}
						<View className='w-full mt-10 p-4 bg-bg-200 rounded-3xl flex-col gap-5 shadow-md'>
							{pages.map(({ title, icon: Icon, path }) => (
								<Button
									className='w-full bg-primary-100 bg-gradient-to-br from-primary-300 rounded-[15px] shadow-md'
									key={path}
									onPress={() => {}}
								>
									<View className='flex-row items-center gap-4 p-4'>
										<Icon size={30} color='#cb80ff' />
										<Text className='text-text-200 text-2xl font-roboto-extrabold'>
											{title}
										</Text>
									</View>
								</Button>
							))}
						</View>

						{/* Нижняя панель */}
						<View className='mt-auto w-full flex-row items-center justify-between bg-bg-200 shadow-md p-4 pb-10 rounded-t-3xl'>
							<Button className='bg-primary-100 p-3 px-10 rounded-[15px] shadow-md'>
								<Text className='text-2xl font-roboto-bold text-text-200'>
									Фидбек
								</Text>
							</Button>
							<Button
								className='bg-red-500 p-3 px-10 rounded-[15px] shadow-md'
								onPress={() => dispatch(logout())}
							>
								<Text className='text-2xl font-roboto-bold text-text-200'>
									Выйти
								</Text>
							</Button>
						</View>
					</View>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	)
}

export default Profile
