import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const currencyApiSlice = createApi({
	reducerPath: 'currency',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.frankfurter.app',
	}),
	endpoints: (builder) => ({})
})