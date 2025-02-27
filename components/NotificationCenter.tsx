import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import {
	addNotification,
	fetchNotifications,
	markAllAsRead,
	markAsRead,
} from '@/redux/notificationsSlice'
import { Notification } from '@/types/notification-type'
import { webSocketServices } from '@/lib/websocket'
import Button from './Button'

const NotificationCenter = () => {
	const dispatch: AppDispatch = useDispatch()
	const [tab, setTab] = useState<'Unreaded' | 'Readed'>('Unreaded')
	const { items, status } = useSelector(
		(state: RootState) => state.notifications
	)

	useEffect(() => {
		dispatch(fetchNotifications())
		const handleNewNotification = (notification: Notification) => {
			dispatch(addNotification(notification))
		}

		webSocketServices
			.getNotificationsSocket()
			?.on('notification', handleNewNotification)

		return () => {
			webSocketServices
				.getNotificationsSocket()
				?.off('notification', handleNewNotification)
		}
	}, [dispatch])

	const handleMarkAllAsRead = () => {
		dispatch(markAllAsRead())
	}

	const handleMarkAsRead = (notificationId: string) => {
		dispatch(markAsRead(notificationId))
	}

	if (status === 'loading') {
		return (
			<SafeAreaView className='flex-1 items-center justify-center'>
				<ActivityIndicator size={'large'} color={'#6c35de'} />
			</SafeAreaView>
		)
	}

	return (
		<View className='flex-1 px-5 mt-4'>
			<View className=' w-full flex flex-row justify-between p-2 gap-2 rounded-2xl bg-black'>
				<Button
					className={`flex-1 p-1 ${
						tab === 'Unreaded' ? 'bg-primary-100' : 'bg-bg-300'
					}`}
					style={{
						backgroundColor: tab === 'Unreaded' ? '' : 'primary-100',
					}}
					onPress={() => setTab('Unreaded')}
				>
					<Text className='text-primary-300 text-xl font-roboto-bold '>
						Недавние
					</Text>
				</Button>
				<Button
					className={`flex-1 bg-bg-300 p-1 ${
						tab === 'Readed' ? 'bg-primary-100' : ''
					}`}
					onPress={() => setTab('Readed')}
				>
					<Text className='text-primary-300 text-xl font-roboto-bold '>
						Недавние
					</Text>
				</Button>
			</View>
			<View className='flex flex-row items-center justify-between gap-4'></View>
		</View>
	)
}

export default NotificationCenter
