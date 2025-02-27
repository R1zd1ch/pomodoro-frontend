import React from 'react'
import { router, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import Button from '@/components/Button'

export default function MainLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen
				name='addFriendModal'
				options={{
					presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name='notificationsModal'
				options={{
					presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name='createSessionModal'
				options={{
					presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name='sessionsSettingsModal'
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	)
}
