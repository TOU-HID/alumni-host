import { useEffect, useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
import { useChangePasswordMutation } from './../features/auth/authApi'
import Admin from '../Layout/Admin'
import PulseLoader from 'react-spinners/PulseLoader'

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	// const [errorMessage, setErrorMessage] = useState('')
	const [changePassword, { data, isLoading, isError }] = useChangePasswordMutation() || {}
	const auth = JSON.parse(localStorage.getItem('auth'))
	const formData = new FormData()
	formData.append('userName', `${auth.userName}`)

	const ChangePasswordHandler = () => {
		// e.preventDefault()
		console.log(`${auth.userName}`)
		formData.append('OldPassword', oldPassword)
		formData.append('NewPassword', confirmPassword)
		changePassword({
			'userName': `${auth.userName}`,
			'OldPassword': oldPassword,
			'NewPassword': confirmPassword
		 })
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
	}
	console.log(data)
	useEffect(() => {
		if (!isLoading && !isError && data?.message) {
			alert(data?.message)
		}
	}, [isLoading])

	return (
		<Admin>
			<div className='relative w-full'>
				<div className='flex justify-center items-center h-full'>
					<div className='max-w-[400px] w-full p-2'>
						<h1 className='text-5xl text-center font-bold text-white my-5'>
							Idea Car
						</h1>
						<div className='flex flex-col p-2'>
							<label className='text-black2 font-bold'>Old password</label>
							<input className='z-0 border-black2 border-2 p-2' type='text' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
						</div>
						<div className='flex flex-col p-2'>
							<label className='text-black2 font-bold'>New password</label>
							<input className='z-0 border-black2 border-2 p-2' type='text' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
						</div>
						<div className='flex flex-col p-2'>
							<label className='text-black2 font-bold'>Confirm password</label>
							<input className='z-0 border-black2 border-2 p-2' type='text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={newPassword === ''} />
							{newPassword !== confirmPassword ? <span className='text-xs text-black2 pl-1'>Password not matched</span> : null}
						</div>
						<button
							className='w-full text-white bg-gray-900 hover:bg-gray-800 py-2 mt-3 relative'
							// type='submit'
							onClick={ChangePasswordHandler}
							disabled={confirmPassword === '' && !isLoading}
						>
							{!isLoading ? 'Change password' :
								<div className='flex justify-center items-center w-full'>
									<PulseLoader color="var(--secondary-color)" size={15} />
								</div>
							}
						</button>
					</div>
				</div>
			</div>
		</Admin>
	)
}

export default ChangePassword
