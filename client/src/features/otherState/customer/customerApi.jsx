import { apiSlice } from '../../api/apiSlice';
import { setRequestedCustomerList, setApprovedCustomerList } from './customerSlice'

export const customerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRequestedCustomers: builder.query({
			query: (data) => ({
				url: `/expert/getPendingRequests/${data}`,
				method: 'GET',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					// console.log(data)
					dispatch(setRequestedCustomerList({ requestedCustomerList: data.data }))
				} catch (err) {
					console.error(err)
				}
			}
		}),

		approvedRequestedCustomer: builder.mutation({
			query: (data) => ({
				url: `expert/approvedRequestedCustomer/${data._id}`,
				method: 'POST',
				body: data.customer
			}),
			// async onQueryStarted(arg, { queryFulfilled, dispatch }) {
			// 	try {
			// 		const { data } = await queryFulfilled
			// 		console.log(data)

			// 		dispatch(setBookedExpert({
			// 			bookedExpert: data.bookedExpert
			// 		}))
			// 	} catch (err) {
			// 		console.error(err)
			// 	}
			// }
		}),

		getApprovedCustomers: builder.query({
			query: (data) => ({
				url: `/expert/getApprovedCustomers/${data}`,
				method: 'GET',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					// console.log(data)
					dispatch(setApprovedCustomerList({ approvedCustomerList: data.data }))
				} catch (err) {
					console.error(err)
				}
			}
		}),

		removeCustomer: builder.mutation({
			query: (data) => ({
				url: `expert/removeCustomer`,
				method: 'POST',
				body: data
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)

					dispatch(setApprovedCustomerList({ approvedCustomerList: data.scheduledCustomers }))
				} catch (err) {
					console.error(err)
				}
			}
		}),
	})
})

export const { useGetRequestedCustomersQuery, useApprovedRequestedCustomerMutation, useGetApprovedCustomersQuery, useRemoveCustomerMutation } = customerApi