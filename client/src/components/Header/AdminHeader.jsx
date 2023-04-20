import { Link } from 'react-router-dom'
import useScrollHeight from '../../hooks/useScrollHeight'
import Navbar from './../Navbar'
import logo from './../../assets/logo1.png'
import { useSelector, useDispatch } from 'react-redux'
import ToggleMenu from '../ToggleMenu/ToggleMenu'
import { userLoggedOut } from './../../features/auth/authSlice'

function AdminHeader() {
	const dispatch = useDispatch()
	const { url } = useSelector(state => state.auth)
	const [scrollHeight] = useScrollHeight()
	const { currentPage } = useSelector(state => state.other)

	const handleLogout = () => {
		localStorage.clear()
		dispatch(userLoggedOut())
	}

	return (
		<div className={`${scrollHeight > 0 ? 'bg-white transition duration-300' : null} fixed top-0 z-10 flex flex-row flex-start justify-between items-center w-full h-18`}>
			<Link to='/customer/dashboard' className='flex flex-row justify-center items-center'>
				<img className='w-16 h-16 m-2 rounded-full md:ml-10' src={logo} alt='logo' />
				<span className={`text-primary text-2xl font-bold`}>BUSELL</span>
			</Link>
			<div className='hidden md:block'>
				<Navbar textColor={`${scrollHeight > 0 ? 'text-primary' : 'text-blue-100'}`} currentPage={currentPage} />
			</div>
			<div className='flex flex-row justify-center items-center gap-8'>
				<img
					src={url}
					className='border-2 border-blue-100 rounded-full'
					style={{ height: 40, width: 40 }}
					alt=''
					loading='lazy'
				/>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 text-secondary hover:text-blue-900`} onClick={handleLogout}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
				</svg>
				<ToggleMenu textColor={currentPage !== 'home' ? 'text-white' : 'text-nav-black'} currentPage={currentPage} scrollHeight={scrollHeight} />
			</div>
		</div>
	)
}

export default AdminHeader
