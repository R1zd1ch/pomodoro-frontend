import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import '../global.css'
import { persistor, store } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function RootLayout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Stack screenOptions={{ headerShown: false }} />
			</PersistGate>
		</Provider>
	)
}
