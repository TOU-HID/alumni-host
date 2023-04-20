import React from 'react'
import { Link } from 'react-router-dom'

function Card({ image, title, desc, url, buttonText }) {
	return (
		<div className="flex flex-col justify-center items-center w-84 h-84 bg-base-100 border-2 border-blue-100 shadow-2xl rounded-lg">
			<img src={image} alt="consult" className='w-72' />
			<div className="flex flex-col justify-center items-center w-full">
				<h2 className="text-primary text-lg font-bold">{title}</h2>
				{desc ? <p className='text-secondary text-sm font-semibold'>{desc}</p> : null}
				<Link to={url}><div className="text-blue-100 text-lg text-center font-semibold bg-primary w-11/12 mt-4 py-1 rounded">{buttonText}</div></Link>
			</div>
		</div>
	)
}

export default Card
