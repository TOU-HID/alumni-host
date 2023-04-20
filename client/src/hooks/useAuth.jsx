import { useSelector } from 'react-redux'

const useAuth = () => {
	const auth = useSelector(state => state.auth)
	if (auth?.userName && auth?.token && auth?.role) {
		return auth?.role
	} else return false
}

export default useAuth