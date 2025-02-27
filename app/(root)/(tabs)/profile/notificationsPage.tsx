import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import PageHeader from '@/components/PageHeader'
import NotificationCenter from '@/components/NotificationCenter'

const NotificationsPage = () => {
	return (
		<View className='flex-1 bg-bg-300'>
			<SafeAreaView className='flex-1'>
				<PageHeader title='Уведомления'></PageHeader>
				<View className='flex-1 bg-bg-100 rounded-t-[40px] mt-2 pt-4'>
					<NotificationCenter></NotificationCenter>
				</View>
			</SafeAreaView>
		</View>
	)
}

export default NotificationsPage
