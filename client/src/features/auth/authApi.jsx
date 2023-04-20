import { apiSlice } from './../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		registration: builder.mutation({
			query: (data) => ({
				url: data.url,
				method: 'POST',
				body: data.formData
			}),
		}),

		login: builder.mutation({
			query: (data) => ({
				url: data.url,
				method: 'POST',
				body: data.formData
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)
					localStorage.setItem('auth', JSON.stringify({
						_id: data._id,
						userName: data.name,
						email: data.email,
						category: data.category,
						token: data.token,
						role: data.role,
						url: data.url
					}))

					dispatch(userLoggedIn({
						_id: data._id,
						userName: data.name,
						email: data.email,
						category: data.category,
						token: data.token,
						role: data.role,
						url: data.url
					}))
				} catch (err) {
					//Do nothing;					
				}
			}
		}),

		changePassword: builder.mutation({
			query: (data) => ({
				url: '/admin/api/ChangePassword',
				method: 'POST',
				body: data
			})
		}),
		// changePassword: builder.mutation({
		// 	query: (data) => console.log(data.formdata)
		// })
	})
})

export const { useRegistrationMutation, useLoginMutation, useChangePasswordMutation } = authApi