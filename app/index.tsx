import { useAuth } from '@/hooks/reduxHooks'
import { RootState } from '@/redux/store'
import { Redirect } from 'expo-router'
import { useSelector } from 'react-redux'

export default function Index() {
	const user = useSelector((state: RootState) => state.auth.user)

	if (user === undefined) return null

	if (!user) return <Redirect href='/(auth)/sign-in' />

	return <Redirect href='/(root)/(tabs)/profile' />
}
