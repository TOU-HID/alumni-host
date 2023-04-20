import { useState } from 'react'
import { Link } from 'react-router-dom'

const ToggleMenu = ({ textColor, scrollHeight }) => {
	const [showMenuBar, setShowMenuBar] = useState(false)
	return (
		<div className='mt-2'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className={`w-6 h-6 block md:hidden text-white}`}
				onClick={() => setShowMenuBar(!showMenuBar)}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d={!showMenuBar ? 'M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25' : 'M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12'}
				/>
			</svg>
			<div className={`${showMenuBar ? null : 'hidden'} fixed top-20 left-72 w-28 h-48 z-10`} id='exampleModalSm' tabIndex='-1'>
				<div className={`relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-current border-2 border-secondary`}>
					<div className='flex flex-col items-center justify-between py-2 w-full'>
						<div className='flex flex-col' >
							<Link to='/' ><div className={`text-white text-sm text-center font-bold hover:text-secondary`}>Home</div></Link>
							<Link to='/about-us' ><div className={`'text-white text-sm font-bold text-center hover:text-secondary`}>About Us</div></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ToggleMenu
