export type Notification = {
	id: string
	type: 'FRIEND_REQUEST' | 'SESSION_INVITE' | 'SYSTEM'
	message: string
	read: boolean
	createdAt: string
	payload?: {
		sessionId?: string
		userId?: number
		friendshipId?: string
	}
}
