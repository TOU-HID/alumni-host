import React from 'react'
import { Link } from 'react-router-dom'

function ExpertCard({ expert }) {
	return (
		<div className="hover:scale-105 duration-300 flex flex-col justify-center items-center w-full h-fit bg-base-100 border-2 border-blue-100 shadow-2xl p-4 rounded-lg">
			<img src={expert.url} alt="consult" className='w-64 h-28 rounded-lg' />
			<h2 className="text-primary text-lg text-center font-bold">{expert.name}</h2>
			<p className='text-secondary text-sm text-center font-semibold'>{expert.category}</p>
			<Link to={`/customer/expert/${expert._id}`} className="text-blue-100 text-lg text-center font-semibold bg-primary w-full mt-4 px-2 py-1 rounded">Profile</Link>
		</div>
	)
}

export default ExpertCard
