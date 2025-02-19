import { Redirect } from 'expo-router'

export default function Index() {
	if (true) {
		return <Redirect href='/(auth)/sign-in' />
	}

	return <Redirect href='/(home)' />
}
