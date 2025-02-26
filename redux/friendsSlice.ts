import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/lib/api'

export const fetchFriends = createAsyncThunk(
	'friends/fetchFriends',
	async () => {
		const response = await api.get('/friends')
		return response.data
	}
)

const initialState: {
	list: any[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
} = {
	list: [],
	status: 'idle',
	error: null,
}

export const friendsSlice = createSlice({
	name: 'friends',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchFriends.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchFriends.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.list = action.payload
			})
			.addCase(fetchFriends.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message as string
			})
	},
})

export default friendsSlice.reducer
