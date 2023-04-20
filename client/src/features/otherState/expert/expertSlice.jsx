import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	expertList: [],
	expertProfile: {},
	category: '',
	name: '',
	minimumFee: 0,
	maximumFee: 0,
	selectedMinimumFee: 0,
	selectedMaximumFee: 0,
	bookedExpert: []
}

const expertSlice = createSlice({
	name: 'expert',
	initialState,
	reducers: {
		setExpertList: (state, action) => {
			state.expertList = action.payload.expertList
		},
		setExpertProfile: (state, action) => {
			state.expertProfile = action.payload.expertProfile
		},
		setExpertCategory: (state, action) => {
			if (action.payload.category === 'All') {
				state.category = undefined
			} else {
				state.category = action.payload.category
			}
		},
		removeExpertCategory: (state) => {
			state.category = undefined
		},
		setSearchName: (state, action) => {
			state.name = action.payload.name
		},
		setMinMaxFee: (state, action) => {
			state.minimumFee = action.payload.minimumFee
			state.selectedMinimumFee = action.payload.minimumFee
			state.maximumFee = action.payload.maximumFee
			state.selectedMaximumFee = action.payload.maximumFee
		},
		setSelectedMinFee: (state, action) => {
			state.selectedMinimumFee = action.payload.selectedMinimumFee
		},
		setSelectedMaxFee: (state, action) => {
			state.selectedMaximumFee = action.payload.selectedMaximumFee
		},
		setBookedExpert: (state, action) => {
			state.bookedExpert = action.payload.bookedExpert
		}
	}
})

export const { setExpertList, setExpertProfile, setExpertCategory, removeExpertCategory, setSearchName, setMinMaxFee, setSelectedMaxFee, setSelectedMinFee, setBookedExpert } = expertSlice.actions
export default expertSlice.reducer