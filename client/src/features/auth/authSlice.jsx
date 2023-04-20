import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	_id: undefined,
	userName: undefined,
	email: undefined,
	category: undefined,
	token: undefined,
	role: undefined,
	url: undefined
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			state._id = action.payload._id
			state.userName = action.payload.userName
			state.email = action.payload.email
			state.category = action.payload.category
			state.token = action.payload.token
			state.role = action.payload.role
			state.url = action.payload.url
		},
		userLoggedOut: (state) => {
			state._id = undefined
			state.userName = undefined
			state.email = undefined
			state.category = undefined
			state.token = undefined
			state.role = undefined
			state.url = undefined
		}
	}
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer