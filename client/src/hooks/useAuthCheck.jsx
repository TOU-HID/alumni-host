import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLoggedIn } from '../features/auth/authSlice'

function useAuthCheck() {
	const dispatch = useDispatch()
	const [authChecked, setAuthChecked] = useState(false)
	useEffect(() => {
		const localAuth = localStorage?.getItem('auth')
		if (localAuth) {
			const auth = JSON.parse(localAuth)
			if (auth?.userName && auth?.token && auth?.role) {
				dispatch(userLoggedIn({
					_id: auth._id,
					userName: auth.userName,
					email: auth.email,
					category: auth.category,
					token: auth.token,
					role: auth.role,
					url: auth.url,
				}))
			}
		}
		setAuthChecked(true)
	}, [dispatch])

	return authChecked
}

export default useAuthCheck