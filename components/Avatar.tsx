import React from 'react'
import { Image, View } from 'react-native'

interface AvatarProps {
	size?: number
	source?: string
	className?: string
}

export const Avatar = ({ size = 80, source, className }: AvatarProps) => {
	const defaultImage = 'https://picsum.photos/150'

	return (
		<View
			className={`overflow-hidden rounded-full  shadow-md   ${className}`}
			style={{ width: size, height: size }}
		>
			<Image
				source={{ uri: source || defaultImage }}
				className='w-full h-full rounded-full '
				resizeMode='cover'
			/>
		</View>
	)
}

export default Avatar
