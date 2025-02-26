import {
	View,
	Text,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TouchableOpacity,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import ModalHeader from '@/components/ModalHeader'
import UsersSearch from '@/components/UsersSearch'
import { searchUsers as getUsersByQuery } from '@/lib/api/users'
import { useDebouncedCallback } from 'use-debounce'
import Button from '@/components/Button'
import { User } from '@/types/user-type'
import { sendFriendRequest as sendFriendRequestApi } from '@/lib/api/friends'

const mockResult = [
	{
		id: 1,
		name: 'John Doe',
		username: 'john.doe',
		avatar: 'https://example.com/avatar.jpg',
	},
	{
		id: 2,
		name: 'Jane Smith',
		username: 'jane.smith',
		avatar: 'https://example.com/avatar.jpg',
	},
	{
		id: 3,
		name: 'Bob Johnson',
		username: 'bob.johnson',
		avatar: 'https://example.com/avatar.jpg',
	},

	{
		id: 4,
		name: 'Alice Williams',
		username: 'alice.williams',
		avatar: 'https://example.com/avatar.jpg',
	},
	{
		id: 5,
		name: 'John Doe',
		username: 'john.doe',
		avatar: 'https://example.com/avatar.jpg',
	},
	{
		id: 6,
		name: 'Jane Smith',
		username: 'jane.smith',
		avatar: 'https://example.com/avatar.jpg',
	},
	{
		id: 7,
		name: 'Bob Johnson',
		username: 'bob.johnson',
		avatar: 'https://example.com/avatar.jpg',
	},

	{
		id: 8,
		name: 'Alice Williams',
		username: 'alice.williams',
		avatar: 'https://example.com/avatar.jpg',
	},
	// {
	// 	id: 9,
	// 	name: 'John Doe',
	// 	username: 'john.doe',
	// 	avatar: 'https://example.com/avatar.jpg',
	// },
	// {
	// 	id: 10,
	// 	name: 'Jane Smith',
	// 	username: 'jane.smith',
	// 	avatar: 'https://example.com/avatar.jpg',
	// },
	// {
	// 	id: 11,
	// 	name: 'Bob Johnson',
	// 	username: 'bob.johnson',
	// 	avatar: 'https://example.com/avatar.jpg',
	// },

	// {
	// 	id: 12,
	// 	name: 'Alice Williams',
	// 	username: 'alice.williams',
	// 	avatar: 'https://example.com/avatar.jpg',
	// },
]

const AddFriendModal = () => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const debouncedSearch = useDebouncedCallback(async (text: string) => {
		const response = await getUsersByQuery(text)
		setResults(response.data)
	}, 1000)
	const handleSearch = (text: string) => {
		setQuery(text)
		debouncedSearch(text)
	}

	const sendFriendRequest = async (userId: number) => {
		const response = await sendFriendRequestApi(userId)
		console.log(response.data)
		alert('Request sent!!!')
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1'
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className='flex-1 flex-col items-center  bg-bg-200'>
					<StatusBar
						style={Platform.OS === 'ios' ? 'light' : 'dark'}
					></StatusBar>
					<ModalHeader title='Добавить в друзья'></ModalHeader>
					<View className='flex  flex-col items-center px-4 mt-3 gap-4'>
						<View className='flex flex-row items-center justify-center p-5 w-full bg-bg-100 rounded-xl'>
							<Text className='text-text-100 font-roboto-bold text-xl'>
								Чтобы найти и добавить пользователя в друзья, введите его имя
								или почту
							</Text>
						</View>

						<View className='flex flex-col w-full justify-center gap-2'>
							<Text className='text-left text-text-100 font-roboto-extrabold text-2xl'>
								Поиск пользователей:
							</Text>
							<UsersSearch
								query={query}
								handleSearch={handleSearch}
								results={results}
								sendFriendRequest={sendFriendRequest}
							></UsersSearch>
						</View>

						<ScrollView
							className='w-full flex-1'
							keyboardShouldPersistTaps='handled'
							showsVerticalScrollIndicator={false}
							contentContainerClassName='pb-24'
						>
							<TouchableOpacity activeOpacity={1}>
								{results.map((item: User) => (
									<View
										key={item.id.toString()}
										className='flex flex-row items-center justify-between p-4 bg-bg-100 rounded-lg mb-2 w-full'
									>
										<Text className='text-text-100 text-lg font-roboto-bold'>
											{item.username}
										</Text>
										<Button onPress={() => sendFriendRequest(item.id)}>
											<Text className='text-white font-roboto-bold'>
												Добавить
											</Text>
										</Button>
									</View>
								))}

								{query && results.length === 0 && (
									<Text className='text-center text-text-100 mt-4 font-roboto-bold'>
										Пользователи не найдены
									</Text>
								)}
							</TouchableOpacity>
						</ScrollView>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default AddFriendModal
