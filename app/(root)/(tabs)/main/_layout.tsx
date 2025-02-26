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
				name='AddFriendModal'
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	)
}
