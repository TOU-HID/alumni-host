import React, { useState, useRef } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
import { useRegistrationMutation, useLoginMutation } from '../../features/auth/authApi'

const ExpertForm = () => {
	const imageRef = useRef()
	const [expertName, setExpertName] = useState('')
	const [expertEmail, setExpertEmail] = useState('')
	const [expertPassword, setExpertPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [expertDegree, setDegree] = useState('')
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('')
	const [consultationFee, setConsultationFee] = useState('')
	const [show, setShow] = useState(false)
	const [expertRegistrationForm, setExpertRegistrationForm] = useState(false)


	const [registration, { data, isLoading, error, isSuccess }] = useRegistrationMutation()
	const [login, { data: expertLoginData, isLoading: expertLoginIsLoading, error: expertLoginError }] = useLoginMutation()

	const expertRegistrationHandeler = (e) => {
		e.preventDefault()
		console.log('register');
		const url = '/expert/signup';
		const formData = new FormData()
		formData.append('name', expertName)
		formData.append('email', expertEmail)
		formData.append('password', expertPassword)
		formData.append('degree', expertDegree)
		formData.append('category', category)
		formData.append('consultationFee', consultationFee)
		formData.append('image', image)
		formData.append('role', 'expert')

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

	const expertLoginHandeler = (e) => {
		e.preventDefault()
		console.log('login');
		const url = '/expert/login';
		const formData = new FormData()
		formData.append('name', expertName)
		formData.append('password', expertPassword)

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

	console.log(expertLoginData);

	return (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-2xl text-center font-bold text-primary mb-4'>
				{!expertRegistrationForm ? "Expert's Sign In" : "Expert's registration"}
			</h1>

			<form className='w-80' onSubmit={expertRegistrationForm ? expertRegistrationHandeler : expertLoginHandeler}>
				<div>
					<div className='flex flex-col w-full'>
						<label className='text-sm text-secondary'>Name</label>
						<input type="text" placeholder="Full name" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={expertName} onChange={(e) => setExpertName(e.target.value)} required />
					</div>
					{expertRegistrationForm ?
						<div className='flex flex-col w-full mt-2'>
							<label className='text-sm text-secondary'>Email</label>
							<input type="text" placeholder="Email address" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={expertEmail} onChange={(e) => setExpertEmail(e.target.value)} required />
						</div>
						:
						null
					}
					<div className='relative w-full mt-2'>
						<label className='text-sm text-secondary'>Password</label>
						<div className='flex flex-row items-center w-full border-2 hover:border-secondary outline-secondary rounded'>
							<input className="p-2 w-96 outline-none" placeholder="Password" type={`${show ? 'text' : 'password'}`} value={expertPassword} autoComplete='password' onChange={(e) => setExpertPassword(e.target.value)} required />

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
				</div>
				{expertRegistrationForm ?
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
						<div className='flex flex-row justify-between w-full'>
							<div className='flex flex-col w-6/12 mt-2'>
								<label className='text-sm text-secondary'>Degree</label>
								<input type="text" placeholder="Your last degree" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={expertDegree} onChange={(e) => setDegree(e.target.value)} required />
							</div>
							<div className='flex flex-col w-36 mt-2'>
								<label className='text-sm text-secondary'>Consultation fee</label>
								<input type="number" placeholder="Fee" className="border-2 hover:border-secondary p-2 outline-secondary rounded" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} required />
							</div>
						</div>
						<div className='flex flex-col w-6/12 mt-2 w-full'>
							<label className='text-sm text-secondary'>Consultation category</label>
							<select className="flex flex-col w-full h-12 p-2 border-2 hover:border-secondary outline-secondary rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
								<option defaultValue disabled>Select your experties</option>
								<option value="Blockchain developer" >Blockchain developer</option>
								<option value="App developers" >App developers</option>
								<option value="Financial or business analysts" >Financial or business analysts</option>
								<option value="Product manager" >Product manager</option>
								<option value="Compliance expert" >Compliance expert</option>
								<option value="Cybersecurity analyst" >Cybersecurity analyst</option>
								<option value="Data scientist" >Data scientist</option>
								<option value="Quantitative analyst" >Quantitative analyst</option>
								<option value="Insurance Technology" >Insurance Technology</option>
								<option value="Personal Finance Management" >Personal Finance Management</option>
								<option value="Crowdfunding" >Crowdfunding</option>
								<option value="Robot-based Advice and Stock Trading " >Robot-based Advice and Stock Trading</option>
							</select>
						</div>
						<div className='z-0 mt-2'>
							<label className='text-sm text-secondary'>Photo</label>
							<input type="file" ref={imageRef} name='image' className="border-2 hover:border-secondary file-input-md w-full rounded" onChange={e => setImage(e.target.files[0])} required />
						</div>
					</div>
					:
					null
				}
				<button className='w-full text-white bg-blue-700 hover:bg-blue-800 py-2 mt-3 border-2 border-blue-100 rounded'>
					{expertRegistrationForm ? 'Sign up' : 'Sign in'}
				</button>
				<div className='flex justify-end w-full'>
					<p className='font-semibold mt-1 px-2 cursor-pointer' onClick={() => setExpertRegistrationForm(!expertRegistrationForm)}>{expertRegistrationForm ? <span className='text-secondary'>Go to Login</span> : <span className='text-secondary'>Don't have an account yet? <span className='text-primary'>Sign Up</span></span>}</p>
				</div>
			</form>
		</div>
	)
}

export default ExpertForm
