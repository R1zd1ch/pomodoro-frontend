import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ModalHeader from '@/components/ModalHeader'
import NotificationCenter from '@/components/NotificationCenter'

const NotificationsModal = () => {
	return (
		<View className='flex-1 bg-bg-200'>
			<ModalHeader title='Уведомления'></ModalHeader>
			<SafeAreaView className='flex-1'>
				<NotificationCenter></NotificationCenter>
			</SafeAreaView>
		</View>
	)
}

export default NotificationsModal
