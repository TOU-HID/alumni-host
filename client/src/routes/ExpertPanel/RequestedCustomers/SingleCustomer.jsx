import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { PopupModal, useCalendlyEventListener } from 'react-calendly'
import { useApprovedRequestedCustomerMutation } from './../../../features/otherState/customer/customerApi'
import { deleteFromRequestedCustomerList } from './../../../features/otherState/customer/customerSlice'

function SingleCustomer({ customer }) {
	const dispatch = useDispatch()
	const { _id } = useSelector(state => state.auth)
	// const { requestedCustomerList } = useSelector(state => state.customer)
	const [isOpen, setIsOpen] = useState(false)
	const [approvedRequestedCustomer, { isLoading: approvedRequestedCustomerLoading }] = useApprovedRequestedCustomerMutation() || {}
	// console.log(data);

	const modelCloserHandeler = () => {
		console.log('called');
		setIsOpen(false)
		const data = {
			_id: _id,
			customer: customer
		}
		dispatch(deleteFromRequestedCustomerList({ customer }))
		approvedRequestedCustomer(data)
	}

	useCalendlyEventListener({
		onProfilePageViewed: (e) => console.log(e),
		onDateAndTimeSelected: (e) => console.log(e),
		onEventTypeViewed: (e) => console.log(e),
		onEventScheduled: (e) => console.log(e.data.payload),
	});

	return (
		<div>
			<div className='flex flex-row w-96 border-2 border-blue-100 shadow-md rounded'>
				<div className='w-5/12 h-40'>
					<img
						src={customer.url}
						className='w-full h-full rounded-tl rounded-bl'
						alt='i'
						loading='lazy'
					/>
				</div>
				<div className='flex flex-col justify-around w-7/12 px-3'>
					<div className='flex flex-col'>
						<span className='text-primary text-lg text-right font-semibold'>{customer.name}</span>
						<label htmlFor={customer.name} className='tooltip h-16' data-tip="Show description">
							<div className='text-primary'>{customer.description.slice(0, 40)}</div>
							<div className='text-primary truncate'>{customer.description.slice(40)}</div>
						</label>
					</div>
					<button className='bg-secondary text-blue-50 text-lg text-center p-1 rounded' onClick={() => setIsOpen(true)}>Schedule a meeting</button>
				</div>
			</div>
			<input type="checkbox" id={customer.name} className="modal-toggle" />
			<label htmlFor={customer.name} className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<h3 className="text-primary text-lg font-bold">{`${customer.name}'s description:`}</h3>
					<p className="text-primary py-4">{customer.description}</p>
				</label>
			</label>
			<PopupModal
				url="https://calendly.com/touhidsust-5040/30min"
				onModalClose={modelCloserHandeler}
				open={isOpen}
				rootElement={document.getElementById("root")}
			/>
		</div>
	)
}

export default SingleCustomer
