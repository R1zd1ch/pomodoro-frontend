import { useDispatch, UseDispatch, useSelector, UseSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/redux/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAuth = () => useSelector((state: RootState) => state.auth)
