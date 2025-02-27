import { io, Socket } from 'socket.io-client'
import { tokenStorage, userStorage } from '@/redux/storage'
import { API_URL, refreshToken } from './api'

class WebSocketServices {
	private sessionSocket: Socket | null = null
	private chatSocket: Socket | null = null
	private notificationsSocket: Socket | null = null
	private reconnectTimeout: NodeJS.Timeout | null = null
	private userId: number | null = null
	private sessionId: string | null = null

	async connectSockets(sessionId?: string) {
		const accessToken = await tokenStorage.getAccessToken()
		const user = await userStorage.getUser()
		this.userId = user?.id || null
		this.sessionId = sessionId || null

		if (!user || !accessToken) {
			console.error('User or access token not found')
			return
		}

		//не ебу как это буду юзать но буду
		this.sessionSocket = this.createSocket(`${API_URL}/session`, accessToken, {
			userId: this.userId,
			sessionId: this.sessionId,
		})

		this.chatSocket = this.createSocket(`${API_URL}/chat`, accessToken, {
			userId: this.userId,
			sessionId: this.sessionId,
		})

		this.notificationsSocket = this.createSocket(
			`${API_URL}/notifications`,
			accessToken,
			{
				userId: this.userId,
			}
		)

		this.setupErrorHandlers()
	}

	private createSocket(
		namespace: string,
		token: string,
		queryParams: object
	): Socket {
		return io(namespace, {
			transports: ['websocket'],
			query: queryParams,
			extraHeaders: {
				Authorization: `Bearer ${token}`,
			},
			forceNew: true,
			reconnection: false,
		})
	}

	private setupErrorHandlers() {
		const handleConnectError = async (error: Error) => {
			if (error.message.includes('401')) {
				try {
					const newToken = await refreshToken()
					if (newToken) {
						this.reconnectWithNewToken(newToken)
					}
				} catch (error) {
					console.error('Failed to refresh token:', error)
				}
			}
		}

		this.sessionSocket?.on('connect_error', handleConnectError)
		this.chatSocket?.on('connect_error', handleConnectError)
		this.notificationsSocket?.on('connect_error', handleConnectError)
	}

	private reconnectWithNewToken(token: string) {
		console.log('reconnecting with new token')
		this.disconnectSockets()

		this.reconnectTimeout = setTimeout(() => {
			this.connectSockets(this.sessionId || undefined)
		}, 1000)

		return clearTimeout(this.reconnectTimeout)
	}

	private disconnectSockets() {
		if (this.sessionSocket) this.sessionSocket.disconnect()
		if (this.chatSocket) this.chatSocket.disconnect()
		if (this.notificationsSocket) this.notificationsSocket.disconnect()
	}

	getSessionSocket() {
		return this.sessionSocket
	}

	getChatSocket() {
		return this.chatSocket
	}

	getNotificationsSocket() {
		return this.notificationsSocket
	}
}

export const webSocketServices = new WebSocketServices()
