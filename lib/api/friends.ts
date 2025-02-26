import { api } from '../api'

export async function sendFriendRequest(userId: number) {
	const response = await api.post(`/friends/request/${userId}`)
	return response
}
