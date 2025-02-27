import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { User2, Notebook, Clock, ChartArea } from 'lucide-react-native'

const TabIcon = ({
	focused,
	icon: Icon,
	title,
}: {
	focused: boolean
	icon: any
	title: string
}) => {
	return (
		<View className={`flex-1 mt-3 flex flex-col items-center `}>
			<Icon size={25} color={focused ? '#cb80ff' : '#e0e0e0'}></Icon>
			<Text
				className={`text-sm w-full ${
					focused ? 'text-accent-100' : 'text-text-200'
				}`}
			>
				{title}
			</Text>
		</View>
	)
}

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#241b35',
					borderTopColor: '#241b35',
					borderTopWidth: 1,
					minHeight: '10%',
					shadowColor: '#000',
					shadowRadius: 10,
					shadowOffset: {
						width: 0,
						height: 2,
					},
				},
			}}
		>
			<Tabs.Screen
				name='main'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon title='Главная' icon={Clock} focused={focused}></TabIcon>
					),
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name='tasks'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon title='Задачи' icon={Notebook} focused={focused}></TabIcon>
					),
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name='statistic'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							title='Статистика'
							icon={ChartArea}
							focused={focused}
						></TabIcon>
					),
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name='profile'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon title='Профиль' icon={User2} focused={focused}></TabIcon>
					),
				}}
			></Tabs.Screen>
		</Tabs>
	)
}

export default TabsLayout
