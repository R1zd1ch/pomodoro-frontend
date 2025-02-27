import { Text, TouchableOpacity } from 'react-native'

const Button = ({
	className,
	children,
	onPress,
	textClassName,

	...props
}: {
	className?: string
	children?: React.ReactNode
	onPress?: () => void
	textClassName?: string
	[key: string]: any
}) => {
	return (
		<TouchableOpacity
			className={`px-4 py-2 rounded-lg active:opacity-80 ${className}`}
			onPress={onPress}
			{...props}
		>
			<Text
				className={`text-text-100 text-center font-medium ${textClassName}`}
			>
				{children}
			</Text>
		</TouchableOpacity>
	)
}

export default Button
