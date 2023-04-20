import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from './../../../features/otherState/otherSlice'
import creditImage from './../../../assets/loginImage1.jpg'
import consultImage from './../../../assets/consult4.jpg'
import articleImage from './../../../assets/loginImage2.jpg'
import Customer from '../../../layout/Customer.layout'
import Clock from 'react-live-clock';
import QuoteCarousel from './QuoteCarousel'

function Index() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCurrentPage({
			currentPage: 'home'
		}))
	}, [])

	return (
		<div className='flex flex-col h-full'>
			<Customer >
				<div className="hero min-h-screen" style={{ backgroundImage: `url("https://res.cloudinary.com/dgsx9bvvf/image/upload/v1681798294/AdobeStock_214337983_Preview_faww9z.jpg")` }}>
					<div className="hero-overlay bg-opacity-60"></div>
					<div className="hero-content text-center text-neutral-content">
						<div className="max-w-md">
							<div className='flex justify-center'>
								<Clock format="HH:mm:ss" interval={1000} ticking={true} className='text-9xl' />
							</div>
							{/* <p className="text-4xl font-bold mb-5">It's your time to grab the opportunity</p> */}
						</div>
					</div>
				</div>
				<div id='featureSection' className='flex flex-row justify-center items-center mt-10 mx-10 gap-6'>
					{/* <div className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 flex flex-col justify-center items-center w-84 h-96 bg-base-100 border-2 border-blue-100 shadow-2xl p-6 rounded-lg">
						<div className='w-64 h-48'>
							<img src={creditImage} alt="consult" className='w-full' />
						</div>
						<div className="w-full">
							<h2 className="text-blue-500 text-lg font-bold">Find credit</h2>
							<p className='text-blue-400 text-sm font-semibold'>Find your eligibility for taking loan</p>
							<Link to='/customer/credit_score'><div className="text-blue-100 text-lg text-center font-semibold bg-blue-500 w-full mt-4 px-2 py-1 rounded">Find</div></Link>
						</div>
					</div> */}
					<div className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 flex flex-col justify-center items-center w-84 h-96 bg-base-100 border-2 border-blue-100 shadow-2xl p-6 rounded-lg">
						<div className='w-64 h-48'>
							<img src={consultImage} alt="consult" className='w-full' />
						</div>
						<div className="w-full">
							<h2 className="text-blue-500 text-lg font-bold">Expert</h2>
							<p className='text-blue-400 text-sm font-semibold'>You can choose your way with an expert</p>
							<Link to='/customer/expert-list'><div className="text-blue-100 text-lg text-center font-semibold bg-blue-500 w-full mt-4 px-2 py-1 rounded">Consult</div></Link>
						</div>
					</div>
					<div className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 flex flex-col justify-center items-center w-84 h-96 bg-base-100 border-2 border-blue-100 shadow-2xl p-6 rounded-lg">
						<div className='w-64 h-48'>
							<img src={articleImage} alt="consult" className='w-full' />
						</div>
						<div className="w-full">
							<h2 className="text-blue-500 text-lg font-bold">Articles</h2>
							<p className='text-blue-400 text-sm font-semibold'>Help yourself with the knowledge of expert.</p>
							{/* <div className="flex"> */}
							<Link to='/customer/articles'><div className="text-blue-100 text-lg text-center font-semibold bg-blue-500 w-full mt-4 px-2 py-1 rounded">Read articles</div></Link>
							{/* </div> */}
						</div>
					</div>
				</div>
				<QuoteCarousel />
			</Customer>

			{/* <Footer /> */}
		</div>
	)
}

export default Index
