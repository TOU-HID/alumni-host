import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetExpertByIdQuery, useAddBookedExpertMutation } from '../../../features/otherState/expert/expertApi'
import Header from '../../../components/Header'
import PulseLoader from 'react-spinners/PulseLoader'

function ExpertProfile() {
	const id = useParams().id
	const { _id } = useSelector(state => state.auth)
	const { expertProfile } = useSelector(state => state.expert)
	const [showDescriptionModal, setShowDescriptionModal] = useState(false)
	const [description, setDescription] = useState()
	const { data: expertInfoData, isLoading: expertInfoIsLoading } = useGetExpertByIdQuery(id) || {}
	const [addBookedExpert, { data, isLoading: bookedExpertIsLoading }] = useAddBookedExpertMutation(id) || {}
	// console.log(expertInfoData);
	console.log(_id);
	console.log(data);

	const addBookedExpertHandeler = (e) => {
		e.preventDefault()
		addBookedExpert({ _id: _id, expertProfile: expertProfile, description: description })
		setShowDescriptionModal(false)
		setDescription('')
	}

	useEffect(() => {
		if (!bookedExpertIsLoading && data?.status === 'success') {
			alert(data.message)
		} else if (!bookedExpertIsLoading && data?.status === 'failure') {
			alert(data.message)
		}
	}, [bookedExpertIsLoading])

	return (
		<div className='flex flex-col w-full'>
			<Header />
			<div className="hero min-h-screen" style={{ backgroundImage: `url("https://res.cloudinary.com/dgsx9bvvf/image/upload/v1681806886/AdobeStock_79378875_Preview_iqcdzl.jpg")` }}>
				<div className="hero-overlay bg-opacity-60"></div>

				{!expertInfoIsLoading ?
					<div className='flex gap-6 px-16'>
						<img src={expertInfoData.expertProfile.url} alt="consult" className='w-auto h-64 rounded-lg' />
						<div className='flex flex-col'>
							<span className='text-blue-100 text-3xl font-bold'>{expertInfoData.expertProfile.name}</span>
							<span className='text-secondary text-sm'>{expertInfoData.expertProfile.category}</span>
							<span className='text-blue-100 text-xl font-bold mt-4'>Bio</span>
							<span className='text-white text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim blandit volutpat maecenas volutpat blandit aliquam. Ultrices tincidunt arcu non sodales. Cursus mattis molestie a iaculis at. Congue eu consequat ac felis donec et. Aliquam id diam maecenas ultricies. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae.</span>
							<span className='text-blue-100 text-xl font-bold mt-8'>Consultation Fee: <span>{expertInfoData.expertProfile.consultationFee} tk</span></span>
							<span className='text-blue-100 text-xl font-bold'>Email address: <span>{expertInfoData.expertProfile.email}</span></span>
							<label htmlFor="my-modal" className='bg-secondary text-white text-lg font-bold w-fit p-1 mt-5 border-2 border-blue-100 rounded cursor-pointer' onClick={() => setShowDescriptionModal(true)}>Book for consultation</label>
							<input type="checkbox" id="my-modal" className="modal-toggle" />
							{showDescriptionModal ?
								<div className='modal cursor-pointer'>
									<form className='modal-box relative' onSubmit={addBookedExpertHandeler}>
										<label htmlFor='my-modal' className='text-primary font-bold absolute right-2 top-2 cursor-pointer' onClick={() => setShowDescriptionModal(false)}>✕</label>
										<label className="flex flex-col justify-center items-center input-group input-group-vertical gap-6 border-2 border-secondary rounded-xl">
											<div className='w-full bg-secondary text-blue-100 font-bold text-center'>Write down your issue</div>
											<textarea type='text' placeholder="" className='textarea textarea-bordered textarea-lg w-11/12' value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
											<button type='submit' htmlFor='my-modal' className='bg-secondary text-blue-100 text-center font-bold w-full rounded-bl-md rounded-br-md' >Send</button>
										</label>
									</form>
								</div>
								:
								null
							}
						</div>
					</div>
					:
					<div className='flex justify-center items-center mt-40 w-full'>
						<PulseLoader color='#3B82F6' size={30} />
					</div>
				}
			</div>
			{/* {!expertInfoIsLoading ?
				<div className='flex gap-6 mt-24 mx-6 w-full mb-10'>
					<img src={expertInfoData.expertProfile.url} alt="consult" className='w-72 h-96 rounded-lg' />
					<div className='flex flex-col'>
						<span className='text-primary text-3xl font-bold'>{expertInfoData.expertProfile.name}</span>
						<span className='text-secondary text-sm'>{expertInfoData.expertProfile.category}</span>
						<span className='text-secondary text-xl font-bold mt-4'>Bio</span>
						<span className='text-secondary text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim blandit volutpat maecenas volutpat blandit aliquam. Ultrices tincidunt arcu non sodales. Cursus mattis molestie a iaculis at. Congue eu consequat ac felis donec et. Aliquam id diam maecenas ultricies. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae.</span>
						<span className='text-secondary text-xl font-bold mt-8'>Consultation Fee: <span>{expertInfoData.expertProfile.consultationFee} tk</span></span>
						<span className='text-secondary text-xl font-bold'>Email address: <span>{expertInfoData.expertProfile.email}</span></span>
						<label htmlFor="my-modal" className='bg-primary text-white text-lg font-bold w-fit p-1 mt-5 rounded'>Book for consultation</label>
						<input type="checkbox" id="my-modal" className="modal-toggle" />
						<div className="modal">
							<form className="modal-box" onSubmit={addBookedExpertHandeler}>
								<label className="flex flex-col justify-center items-center input-group input-group-vertical gap-6 border-2 border-secondary rounded-xl">
									<div className='w-full bg-secondary text-blue-100 font-bold text-center'>Write down your issue</div>
									<textarea type="text" placeholder="" className="textarea textarea-bordered textarea-lg w-11/12" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
									<button type='submit' htmlFor="my-modal" className="bg-secondary text-blue-100 text-center font-bold w-full rounded-bl-md rounded-br-md">Send</button>
								</label>
							</form>
						</div>
					</div>
				</div>
				:
				<div className='flex justify-center items-center mt-40 w-full'>
					<PulseLoader color='#3B82F6' size={30} />
				</div>
			} */}
		</div>
	)
}

export default ExpertProfile
