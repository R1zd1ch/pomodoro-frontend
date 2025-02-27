import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/lib/api'
import { Notification } from '@/types/notification-type'

interface NotificationsState {
	items: Notification[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: NotificationsState = {
	items: [],
	status: 'idle',
	error: null,
}

export const fetchNotifications = createAsyncThunk(
	'notifications/fetch',
	async () => {
		const response = await api.get('/notifications')
		return response.data
	}
)

export const markAsRead = createAsyncThunk(
	'notifications/markAsRead',
	async (notificationId: string) => {
		const response = await api.put(`/notifications/${notificationId}/read`)
		return response.data
	}
)

export const markAllAsRead = createAsyncThunk(
	'notifications/markAllAsRead',
	async () => {
		const response = await api.put(`/notifications/markAllAsRead`)
		return response.data
	}
)

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<Notification>) => {
			state.items.unshift(action.payload)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchNotifications.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Failed to fetch notifications'
			})

			.addCase(markAsRead.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					notification => notification.id === action.payload.id
				)
				if (index !== -1) {
					state.items[index].read = true
				}
			})
			.addCase(markAllAsRead.fulfilled, (state, action) => {
				state.items.forEach(notification => {
					notification.read = true
				})
			})
	},
})

export const { addNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
