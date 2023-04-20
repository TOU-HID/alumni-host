import { useEffect, useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { useLoginMutation } from '../features/auth/authApi'
import bgImg from './../assets/loginImage6.jpg'
import CustomerForm from './forms/CustomerForm'
import ExpertForm from './forms/ExpertForm'

const Login = () => {
	// const navigate = useNavigate()
	const [tab, setTab] = useState(false)


	return (
		<div className='flex flex-col sm:flex-row justify-center max-sm:items-center sm:justify-between w-full h-screen sm:overflow-hidden'>
			{/* <div className='flex justify-center items-center w-6/12 bg-gradient-to-r from-blue-500 to-cyan-500'> */}
			<img
				className='w-7/12 max-sm:hidden'
				src={bgImg}
				alt='moneyManImage'
			/>
			{/* </div> */}

			<div className='flex flex-col h-full w-5/12'>
				<div className="flex flex-row justify-center w-full py-6 gap-3">
					<a href="#customer" className={`text-md text-center ${!tab ? 'bg-primary text-white' : 'text-blue-700 hover:text-blue-50'} hover:bg-secondary px-2 pb-1 w-3/12 border-2 border-blue-100 rounded z-10`} onClick={() => setTab(false)}>Customer</a>
					<a href="#expert" className={`text-md text-center ${tab ? 'bg-primary text-white' : 'text-blue-700 hover:text-blue-50'} hover:bg-secondary px-2 pb-1 w-3/12 border-2 border-blue-100 rounded z-10`} onClick={() => setTab(true)}>Expert</a>
				</div>
				<div className='flex justify-center items-center'>
					{!tab ?
						<div id="customer" className="flex justify-center w-full">
							<CustomerForm />
						</div>
						:
						<div id="expert" className="flex justify-center w-full">
							<ExpertForm />
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default Login
