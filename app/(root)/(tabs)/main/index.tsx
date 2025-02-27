import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import { Link, router } from 'expo-router'
import FriendList from '@/components/FriendsList'

const MainHeader = () => (
	<View className='flex flex-row px-8 pb-4 pt-2 justify-between items-center w-full'>
		<Avatar size={50} className='shadow-md' />

		<Button
			className='bg-bg-200 p-3 rounded-2xl shadow-md'
			onPress={() => {
				router.push('/(root)/(tabs)/main/addFriendModal')
			}}
		>
			<Text className='text-accent-100 text-xl font-roboto-bold'>
				+ Добавить в друзья
			</Text>
		</Button>
	</View>
)

const Main = () => {
	return (
		<View className='flex-1 bg-bg-300'>
			<SafeAreaView className='flex-1'>
				<View className='flex-1 flex flex-col justify-between items-center'>
					<MainHeader />

					<View className='flex-1 bg-bg-100 w-full flex flex-row shadow-md'>
						{/* Friends list area */}
						<FriendList />

						<View className='w-[60%] h-full  bg-bg-200 border-bg-100 border-l-2 items-center justify-center'>
							<Text className='text-xl text-text-100'>Таймер</Text>
						</View>
					</View>

					{/* Footer buttons */}
					<View className='bg-bg-300 w-full flex flex-row items-center justify-between p-2 py-4'>
						<Button
							className='bg-primary-100 p-4 rounded-2xl shadow-md'
							onPress={() => {
								router.push('/(root)/(tabs)/main/createSessionModal')
							}}
						>
							<Text className='text-xl font-roboto-bold text-text-100'>
								+ Комната
							</Text>
						</Button>
						<Button
							className='bg-primary-200 p-4 rounded-2xl shadow-md'
							onPress={() => {
								router.push('/(root)/(tabs)/main/sessionsSettingsModal')
							}}
						>
							<Text className='text-xl font-roboto-bold text-text-100'>
								Настройки
							</Text>
						</Button>
						<Button
							className='bg-primary-200 p-4 rounded-2xl shadow-md'
							onPress={() => {
								router.push('/(root)/(tabs)/main/notificationsModal')
							}}
						>
							<Text className='text-xl font-roboto-bold text-text-100'>
								Уведомления
							</Text>
						</Button>
					</View>
				</View>
			</SafeAreaView>
		</View>
	)
}

export default Main
