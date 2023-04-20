import React from 'react'
import Customer from '../../../layout/Customer.layout'
import { useSelector } from 'react-redux'
// import Animation from '../ThreeJs/Animation'
import { useGetArticlesQuery } from './../../../features/otherState/article/articleApi'
import PulseLoader from 'react-spinners/PulseLoader'
import ArticleCard from './ArticleCard'

function Articles() {
	const { data, isLoading, isError } = useGetArticlesQuery() || {}
	// const { articleList } = useSelector(state => state.article)

	return (
		<Customer>
			<div className='hero h-96' style={{ backgroundImage: `url("https://res.cloudinary.com/dgsx9bvvf/image/upload/v1681827633/AdobeStock_99592236_Preview_dldsmr.jpg")` }}>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Our expert's solutions</h1>
						{/* <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
						<a href='#featureSection'><button className="btn bg-primary">Get Started</button></a> */}
					</div>
				</div>
			</div>
			<div className='text-center text-secondary text-4xl font-bold mt-4 p-5'>Posts</div>
			{!isLoading ?
				<div className='grid grid-cols-3 gap-3'>
					{data.data.map((article, i) => <ArticleCard key={i} article={article} />)}
				</div>
				:
				<div className='flex justify-center items-center w-full'>
					<PulseLoader color='#3B82F6' size={30} />
				</div>
			}
		</Customer>
	)
}

export default Articles
