import { api } from '../api'

export async function searchUsers(query: string) {
	const response = await api.get(`/users/search?query=${query}`)
	console.log(response.data)
	return response
}
