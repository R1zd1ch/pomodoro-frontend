import { View, Text, TextInput, FlatList } from 'react-native'
import React from 'react'

const UsersSearch = ({
	query,
	handleSearch,
	results,
	sendFriendRequest,
}: {
	query: string
	handleSearch: (text: string) => void
	results: any[]
	sendFriendRequest: (userId: number) => void
}) => {
	return (
		<View className='flex flex-col w-full items-center justify-center'>
			<View className='relative flex flex-row'>
				<TextInput
					placeholder='Поиск пользователей...'
					value={query}
					onChangeText={handleSearch}
					placeholderTextColor={'#cb80ff'}
					className='h-[70px] bg-bg-100 text-accent-100 p-5 pb-7 rounded-3xl text-xl font-roboto-bold border-bg-300 border-2 w-full'
				></TextInput>
			</View>
		</View>
	)
}

export default UsersSearch
