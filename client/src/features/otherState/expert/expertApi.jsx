import { apiSlice } from './../../api/apiSlice';
import { setExpertList, setExpertProfile, setMinMaxFee, setBookedExpert } from './expertSlice'

export const expertApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllExperts: builder.query({
			query: () => ({
				url: '/user/get_all_expert',
				method: 'GET',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					// console.log(data.listOfExperts)
					dispatch(setExpertList({ expertList: data.listOfExperts }))
					dispatch(setMinMaxFee({ minimumFee: data.minimumFee, maximumFee: data.maximumFee }))
				} catch (err) {
					console.error(err)
				}
			}
		}),

		getExpertById: builder.query({
			query: (data) => ({
				url: `user/get_expert_by_id/${data}`,
				method: 'GET',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					// console.log(data)

					dispatch(setExpertProfile({
						expertProfile: data.expertProfile
					}))
				} catch (err) {
					console.error(err)
				}
			}
		}),

		addBookedExpert: builder.mutation({
			query: (data) => ({
				url: `user/add_booked_expert/${data._id}`,
				method: 'POST',
				body: { expertProfile: data.expertProfile, clientDescription: data.description }
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

		getBookedExperts: builder.query({
			query: (data) => ({
				url: `user/get_booked_expert/${data}`,
				method: 'GET',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)

					dispatch(setBookedExpert({
						bookedExpert: data.bookedExpert
					}))
				} catch (err) {
					console.error(err)
				}
			}
		}),
	})
})

export const { useGetAllExpertsQuery, useGetExpertByIdQuery, useGetBookedExpertsQuery, useAddBookedExpertMutation } = expertApi