import React from 'react'
import { Link } from 'react-router-dom'
import Expert from '../../layout/Expert.layout'
import consultImage1 from './../../assets/consult1.jpg'
import consultImage2 from './../../assets/consult2.jpg'
import consultImage3 from './../../assets/consult3.jpg'
import articleImage from './../../assets/loginImage7.jpg'

function index() {
	return (
		<Expert>
			<div className='relative text-3xl text-center w-full pb-8'>
				<img src={consultImage1} alt='consultImage' className='w-screen' />
				<div className='text-primary text-4xl text-center font-semibold my-4'>Give your service</div>
				<div className='flex flex-row justify-evenly items-center'>
					<div className='flex flex-col justify-around items-center'>
						<Link to='/expert/requests'><img src={consultImage2} alt="consult" className='w-72 shadow-lg' /></Link>
						<Link to='/expert/requests'><span className='text-primary text-2xl text-center font-semibold' >Meet your client</span></Link>
					</div>
					<div className='flex flex-col justify-around items-center'>
						<Link to='/expert/scheduled'><img src={consultImage3} alt="consult" className='w-72 shadow-lg' /></Link>
						<Link to='/expert/scheduled'><span className='text-primary text-2xl text-center font-semibold' >Your scheduled client</span></Link>
					</div>
					<div className='flex flex-col justify-around items-center'>
						<Link to='/expert/create_article'><img src={articleImage} alt="consult" className='w-72 shadow-lg' /></Link>
						<Link to='/expert/create_article'><span className='text-primary text-2xl text-center font-semibold' >Write some articles</span></Link>
					</div>
				</div>
			</div>
		</Expert>
	)
}

export default index
