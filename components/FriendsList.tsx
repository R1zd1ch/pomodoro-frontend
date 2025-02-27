import { fetchFriends } from '@/redux/friendsSlice'
import { AppDispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from './Avatar'

const FriendList = () => {
	const dispatch: AppDispatch = useDispatch()
	const [stateFriends, setStateFriends] = useState([])
	const friends = useSelector((state: any) => state.friends)

	useEffect(() => {
		console.log('friends')
		dispatch(fetchFriends())
		return
	}, [dispatch])

	useEffect(() => {
		setStateFriends(friends.list)
		return
	}, [friends])

	return (
		<View className='w-[40%] h-full flex-1'>
			<View className='bg-bg-200 border-b-2 p-5'>
				<Text className='font-roboto-bold text-3xl text-primary-300 text-center align-middle'>
					Друзья
				</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='bg-bg-100'
				contentContainerClassName='p-2 grow-1'
			>
				{stateFriends.map((friend: any) => (
					<FriendElement key={friend.id} friend={friend}></FriendElement>
				))}
			</ScrollView>
		</View>
	)
}

const FriendElement = ({ friend }: { friend: any }) => {
	return (
		<View className='flex flex-row items-center gap-2 p-2 bg-primary-100 rounded-2xl shadow-md'>
			<Avatar size={40} source={friend.user.avatar}></Avatar>
			<Text className='text-primary-300 font-roboto-bold text-xl'>
				{friend.user.name ? friend.user.name : `@${friend.user.username}`}
			</Text>
		</View>
	)
}

export default FriendList
