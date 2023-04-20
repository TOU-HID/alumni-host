import React from 'react'

function ArticleCard({ article }) {

	console.log(article)
	return (
		<div>
			<div class="flex justify-center flex-col md:flex-row gap-10 md:gap-5 pt-10 px-10">
				<div class="overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:shadow-2xl rounded-lg md:w-80">
					<img
						alt=""
						src={article.imageUrl}
						class="max-h-40 w-full object-cover"
					/>
					<div class="bg-white w-full p-4">
						<div class="text-secondary text-2xl font-medium"
						>{article.title}</div>
						{/* <p class="text-gray-800 text-sm font-medium mb-2">
							A comprehensive guide about online education.
						</p> */}
						<p class="text-gray-600 font-light text-md truncate">
							{article.description}
						</p>
						<a class="inline-flex text-green-600" href="/">Read More...</a>
						<div class="flex items-center mt-2">
							<img
								class="w-10 h-10 object-cover rounded-full"
								alt="User avatar"
								src={article.authorUrl}
							/>
							<div class="pl-2">
								<div class="font-medium">{article.author}</div>
								<div class="text-gray-600 text-xs">{article.category}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArticleCard
