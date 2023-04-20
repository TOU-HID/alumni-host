import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	requestedCustomerList: [],
	approvedCustomerList: [],
	customerProfile: {},
	name: '',
}

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setRequestedCustomerList: (state, action) => {
			state.requestedCustomerList = action.payload.requestedCustomerList
		},
		deleteFromRequestedCustomerList: (state, action) => {
			const newList = state.requestedCustomerList.filter(customer => customer._id !== action.payload.customer._id)
			state.requestedCustomerList = newList
		},
		setApprovedCustomerList: (state, action) => {
			state.approvedCustomerList = action.payload.approvedCustomerList
		},
		setCustomerProfile: (state, action) => {
			state.customerProfile = action.payload.customerProfile
		}
	}
})

export const { setRequestedCustomerList, setApprovedCustomerList, deleteFromRequestedCustomerList } = customerSlice.actions
export default customerSlice.reducer