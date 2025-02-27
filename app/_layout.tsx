import { Slot } from 'expo-router'
import '../global.css'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { persistor, store } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		'Roboto-Bold:': require('../assets/fonts/Roboto-Bold.ttf'),
		'Roboto-ExtraBold': require('../assets/fonts/Roboto-ExtraBold.ttf'),
		'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
		'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
		'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
		'Roboto-SemiBold': require('../assets/fonts/Roboto-SemiBold.ttf'),
	})

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) return null

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Slot></Slot>
			</PersistGate>
		</Provider>
	)
}
