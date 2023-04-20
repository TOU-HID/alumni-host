import React from 'react'
import { useSelector } from 'react-redux'
import { useRemoveCustomerMutation } from './../../../features/otherState/customer/customerApi'

function SingleApprovedCustomer({ customer }) {
	const { _id } = useSelector(state => state.auth)
	const [removeCustomer, { data, isLoading, isError }] = useRemoveCustomerMutation() || {}
	console.log(data);
	const removeClintHandeler = () => {
		console.log(customer._id);
		removeCustomer({ expertId: _id, customerId: customer._id })
	}

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
						<span className='text-primary text-lg font-semibold'>{customer.name}</span>
						<span className='text-secondary text-xs font-semibold'>{customer.email}</span>
						<label htmlFor={customer.name} className='tooltip h-16' data-tip="Show description">
							<div className='text-primary text-sm'>{customer.description.slice(0, 40)}</div>
							<div className='text-primary text-sm truncate'>{customer.description.slice(40)}</div>
						</label>
					</div>
					<button className='bg-secondary text-blue-50 text-lg text-center p-1 rounded' onClick={removeClintHandeler}>Remove client</button>
				</div>
			</div>
			<input type="checkbox" id={customer.name} className="modal-toggle" />
			<label htmlFor={customer.name} className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<h3 className="text-primary text-lg font-bold">{`${customer.name}'s description:`}</h3>
					<p className="text-primary py-4">{customer.description}</p>
				</label>
			</label>
		</div>
	)
}

export default SingleApprovedCustomer
