import React from 'react'
import { useSelector } from 'react-redux'
import { useGetApprovedCustomersQuery } from './../../../features/otherState/customer/customerApi'
import PulseLoader from 'react-spinners/PulseLoader'
import Expert from './../../../layout/Expert.layout'
import SingleApprovedCustomer from './SingleApprovedCustomer'


function ApprovedCustomers() {
	const { _id } = useSelector(state => state.auth)
	const { approvedCustomerList } = useSelector(state => state.customer)
	const { data: getApprovedCustomersData, isLoading: getApprovedCustomersLoding } = useGetApprovedCustomersQuery(_id) || {}
	// console.log(getApprovedCustomersData);


	return (
		<Expert>
			<div className='w-screen'>
				{!getApprovedCustomersLoding ?
					<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-4 w-full p-10'>
						{approvedCustomerList.map((customer, i) => <SingleApprovedCustomer key={i} customer={customer} />)}
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

export default ApprovedCustomers
