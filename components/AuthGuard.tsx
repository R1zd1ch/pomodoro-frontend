import React, { ReactNode, useEffect } from 'react'
import { Redirect } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { refreshToken } from '@/lib/api'
import { logout } from '@/redux/authSlice'

interface AuthGuardProps {
	children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const user = useSelector((state: RootState) => state.auth.user)
	const dispatch = useDispatch()

	if (user === undefined) {
		return (
			<SafeAreaView className='bg-white h-full flex justify-center items-center'>
				<ActivityIndicator className='text-primary-300' size='large' />
			</SafeAreaView>
		)
	}
	useEffect(() => {
		if (user) {
			const interval = setInterval(async () => {
				try {
					await refreshToken()
				} catch (error) {
					dispatch(logout())
				}
			}, 10 * 60 * 1000)
			return () => clearInterval(interval)
		}
	}, [user, dispatch])

	if (!user) {
		return <Redirect href='/(auth)/sign-in' />
	}

	// Если пользователь авторизован, рендерим защищенное содержимое.
	return <>{children}</>
}
