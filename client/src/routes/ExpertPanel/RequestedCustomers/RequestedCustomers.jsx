import React from 'react'
// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useGetRequestedCustomersQuery } from './../../../features/otherState/customer/customerApi'
import PulseLoader from 'react-spinners/PulseLoader'
import Expert from './../../../layout/Expert.layout'
import SingleCustomer from './SingleCustomer';

function RequestedCustomers() {
	const { _id } = useSelector(state => state.auth)
	const { requestedCustomerList } = useSelector(state => state.customer)
	const { data, isLoading: getRequestedCustomerLoding } = useGetRequestedCustomersQuery(_id) || {}
	// console.log(data);


	return (
		<Expert>
			<div className='w-screen'>
				{!getRequestedCustomerLoding ?
					<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-4 w-full p-10'>
						{requestedCustomerList.map((customer, i) => <SingleCustomer key={i} customer={customer} />)}
					</div>
					:
					<div className='flex justify-center items-center w-full'>
						<PulseLoader color='#3B82F6' size={30} />
					</div>
				}
			</div>
		</Expert>
	)
}

export default RequestedCustomers
