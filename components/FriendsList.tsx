import { View, Text, ScrollView } from 'react-native'

const FriendList = () => {
	return (
		<View className='w-[40%] h-full'>
			<View className='bg-bg-200 border-b-2 p-5'>
				<Text className='font-roboto-bold text-3xl text-primary-300 text-center align-middle'>
					Friends
				</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='bg-bg-100'
				contentContainerClassName='p-2 grow-1'
			>
				{/* Example dynamic friend list */}
				{Array.from({ length: 20 }).map((_, index) => (
					<Text key={index} className='text-[24px] text-text-100 my-2'>
						Friend #{index + 1}
					</Text>
				))}
			</ScrollView>
		</View>
	)
}

export default FriendList
