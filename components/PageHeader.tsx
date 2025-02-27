import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Button from './Button'

const PageHeader = ({ title }: { title: string }) => {
	const isPresented = router.canGoBack()

	return (
		<View className='flex flex-row gap-2 items-center justify-between bg-bg-300 w-full p-3 px-8'>
			<Text className='font-roboto-extrabold text-2xl text-accent-100'>
				{title}
			</Text>
			{isPresented && (
				<Button
					onPress={() => router.push('../')}
					className='bg-primary-100 p-2 px-8 flex items-center justify-center rounded-2xl shadow-md'
				>
					<Text className='text-text-100 font-roboto-bold text-xl'>Назад</Text>
				</Button>
			)}
		</View>
	)
}

export default PageHeader
