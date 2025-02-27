import React from 'react'
import { Stack } from 'expo-router'

export default function ProfileLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen name='account' />
			<Stack.Screen name='notificationsPage' />
			<Stack.Screen name='privacy' />
			<Stack.Screen name='settings' />
		</Stack>
	)
}
