import { View, Text, TouchableOpacity } from 'react-native'

import React from 'react'

const Button = ({
	children,
	className,
	textClassName,
	...props
}: {
	children: React.ReactNode
	className?: string
	textClassName?: string
}) => {
	return (
		<TouchableOpacity
			{...props}
			className={`bg-primary-100 py-3 px-6 rounded-lg ${className}`}
		>
			<Text className={`text-text-100 font-bold`}>{children}</Text>
		</TouchableOpacity>
	)
}

Button.displayName = 'Button'

export default Button
