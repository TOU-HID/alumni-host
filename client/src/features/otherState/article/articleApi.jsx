import { apiSlice } from '../../api/apiSlice';
import { setArticleList } from './articleSlice'

export const articleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({

		getArticles: builder.query({
			query: () => ({
				url: `/article/getAllArticles`,
				method: 'GET',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					// console.log(data)
					dispatch(setArticleList({ articleList: data.data }))
				} catch (err) {
					console.error(err)
				}
			}
		}),

		createArticle: builder.mutation({
			query: (data) => ({
				url: `article/createArticle`,
				method: 'POST',
				body: data.formData
			})
		}),
	})
})

export const { useGetArticlesQuery, useCreateArticleMutation } = articleApi