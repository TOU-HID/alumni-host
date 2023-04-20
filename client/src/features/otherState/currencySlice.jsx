import { currencyApiSlice } from '../api/currencyApiSlice'

export const currencySlice = currencyApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		currencyConvertion: builder.query({
			query: ({amount, from, to}) => ({
				url: `/latest?amount=${amount}&from=${from}&to=${to}`,
				method: 'GET'
			})
		})
	})
})

export const {useCurrencyConvertionQuery} = currencySlice