import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegistrationMutation, useLoginMutation } from '../../features/auth/authApi'

const CustomerLogin = () => {
	const navigate = useNavigate()
	const imageRef = useRef()
	const [customerName, setCustomerName] = useState('')
	const [customerEmail, setCustomerEmail] = useState('')
	const [customerPassword, setCustomerPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [customerDegree, setCustomerDegree] = useState('')
	const [image, setImage] = useState('')
	const [show, setShow] = useState(false)
	const [customerRegistrationForm, setCustomerRegistrationForm] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')


	const [registration, { data, isLoading, error, isSuccess }] = useRegistrationMutation()
	const [login, { data: customerLoginData, isLoading: customerLoginIsLoading, error: customerLoginError }] = useLoginMutation()

	const customerRegistrationHandeler = (e) => {
		e.preventDefault()
		console.log('register');
		const url = '/user/signup';
		const formData = new FormData()
		formData.append('name', customerName)
		formData.append('email', customerEmail)
		formData.append('password', customerPassword)
		formData.append('degree', customerDegree)
		formData.append('image', image)
		formData.append('role', 'customer')

		var object = {}
		formData.forEach((value, key) => {
			// Reflect.has in favor of: object.hasOwnProperty(key)
			if (!Reflect.has(object, key)) {
				object[key] = value
				return
			}
			if (!Array.isArray(object[key])) {
				object[key] = [object[key]]
			}
			object[key].push(value)
		})
		// var json = JSON.stringify(object)
		console.log(object)

		registration({ formData, url })
	}

	const customerLoginHandeler = (e) => {
		e.preventDefault()
		console.log('login');
		const url = '/user/login';
		const formData = new FormData()
		formData.append('name', customerName)
		formData.append('password', customerPassword)

		// var object = {}
		// formData.forEach((value, key) => {
		// 	// Reflect.has in favor of: object.hasOwnProperty(key)
		// 	if (!Reflect.has(object, key)) {
		// 		object[key] = value
		// 		return
		// 	}
		// 	if (!Array.isArray(object[key])) {
		// 		object[key] = [object[key]]
		// 	}
		// 	object[key].push(value)
		// })
		// var json = JSON.stringify(object)
		// console.log(object)

		login({ formData, url })
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<span className='text-2xl text-center font-bold text-primary mb-2'>
				{!customerRegistrationForm ? "Customer's Sign In" : "Customer's registration"}
			</span>

			<form className='w-80' onSubmit={customerRegistrationForm ? customerRegistrationHandeler : customerLoginHandeler}>
				<div className='flex flex-col w-full'>
					<label className='text-sm text-secondary'>Name</label>
					<input type="text" placeholder="Full name" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
				</div>
				{customerRegistrationForm ?
					<div className='flex flex-col w-full mt-2'>
						<label className='text-sm text-secondary'>Email</label>
						<input type="text" placeholder="Email address" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
					</div>
					:
					null
				}
				<div className='relative w-full mt-2'>
					<label className='text-sm text-secondary'>Password</label>
					<div className='flex flex-row items-center w-full border-2 outline-secondary hover:border-secondary rounded'>
						<input className="p-2 w-full outline-none rounded" placeholder="Password" type={`${show ? 'text' : 'password'}`} value={customerPassword} autoComplete='password' onChange={(e) => setCustomerPassword(e.target.value)} required />
						<div className="absolute right-0 flex items-center px-4 text-secondary">
							{!show ?
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setShow(true)}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								:
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setShow(false)}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
								</svg>
							}
						</div>
					</div>
				</div>
				{customerRegistrationForm ?
					<div>
						<div className='relative w-full mt-2'>
							<label className='text-sm text-secondary'>Confirm Password</label>
							<div className='flex flex-row items-center w-full border-2 outline-secondary hover:border-secondary rounded'>
								<input className="p-2 w-full outline-none rounded" placeholder="Password" type={`${show ? 'text' : 'password'}`} value={confirmPassword} autoComplete='password' onChange={(e) => setConfirmPassword(e.target.value)} required />
								<div className="absolute right-0 flex items-center px-4 text-secondary">
									{!show ?
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setShow(true)}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										:
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setShow(false)}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
										</svg>
									}
								</div>
							</div>
						</div>
						<div className='flex flex-col w-full mt-2'>
							<label className='text-sm text-secondary'>Degree</label>
							<input type="text" placeholder="Input your last degree" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={customerDegree} onChange={(e) => setCustomerDegree(e.target.value)} required />
						</div>
						<div className='z-0 mt-2'>
							<label className='text-sm text-secondary'>Photo</label>
							<input type="file" ref={imageRef} name='image' className="border-2 hover:border-secondary file-input-md w-full rounded" onChange={e => setImage(e.target.files[0])} required />
						</div>
					</div>
					:
					null
				}
				<button className='w-full text-white bg-blue-700 hover:bg-blue-800 py-2 mt-2 border-2 border-secondary rounded'>
					{customerRegistrationForm ? 'Sign up' : 'Sign in'}
				</button>
				<div className='flex justify-end'>
					<p className='font-semibold mt-1 px-2 cursor-pointer' onClick={() => setCustomerRegistrationForm(!customerRegistrationForm)}>{customerRegistrationForm ? <span className='text-secondary'>Go to Login</span> : <span className='text-secondary'>Don't have an account yet? <span className='text-primary'>Sign Up</span></span>}</p>
				</div>
			</form>
		</div>
	)
}

export default CustomerLogin
