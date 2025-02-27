import { logout } from '@/redux/authSlice'
import { store } from '@/redux/store'

export const logoutFunc = () => {
	store.dispatch(logout())
}
