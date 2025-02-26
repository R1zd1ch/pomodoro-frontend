import AuthGuard from '@/components/AuthGuard'
import { useAuth } from '@/hooks/reduxHooks'
import { Redirect, Slot } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppLayout() {
	const { user } = useAuth()

	if (!true) {
		return (
			<SafeAreaView className='bg-white h-full flex justify-center items-center'>
				<ActivityIndicator
					className='text-primary-300'
					size={'large'}
				></ActivityIndicator>
			</SafeAreaView>
		)
	}

	if (!user) return <Redirect href='/sign-in'></Redirect>

	return (
		<AuthGuard>
			<Slot screenOptions={{ headerShown: false }}></Slot>
		</AuthGuard>
	)
}
