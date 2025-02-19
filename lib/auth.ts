import * as SecureStore from 'expo-secure-store'

type TokenType = 'access_token' | 'refresh_token'

export const saveToken = async (type: TokenType, token: string) => {
	await SecureStore.setItemAsync(type, token)
}

export const getToken = async (type: TokenType) => {
	return await SecureStore.getItemAsync(type)
}

export const removeToken = async (type: TokenType) => {
	await SecureStore.deleteItemAsync(type)
}

export const checkAuthTokens = async () => {
	return (await getToken('access_token')) && (await getToken('refresh_token'))
}
