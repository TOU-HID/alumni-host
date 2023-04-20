import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilterBox from '../../../components/FilterBox/FilterBox'
import Customer from './../../../layout/Customer.layout'
import ExpertCard from './ExpertCard'
import { useGetAllExpertsQuery } from '../../../features/otherState/expert/expertApi'
import { removeExpertCategory } from '../../../features/otherState/expert/expertSlice'
// import { setCurrentPage } from '../../../features/otherState/otherSlice'
import PulseLoader from 'react-spinners/PulseLoader'

function ExpertList() {
	const dispatch = useDispatch()
	const [listOfExpert, setListOfExpert] = useState([])
	const { isLoading: allExpertsIsLoading } = useGetAllExpertsQuery() || {}
	const { expertList, category, name, minimumFee, maximumFee, selectedMaximumFee, selectedMinimumFee } = useSelector(state => state.expert)
	// console.log(category);
	// console.log(name);

	useEffect(() => {
		// dispatch(setCurrentPage({
		// 	currentPage: 'expert-list'
		// }))
		dispatch(removeExpertCategory())
	}, [dispatch])

	useEffect(() => {
		let tempExpertList = []
		if (category && name) {
			tempExpertList = expertList.filter(expert =>
				expert.category === category &&
				expert.name.toLowerCase().match(name.toLowerCase()) &&
				expert.consultationFee >= `${selectedMinimumFee ? selectedMinimumFee : minimumFee}` &&
				expert.consultationFee <= `${selectedMaximumFee ? selectedMaximumFee : maximumFee}`
			)
			setListOfExpert(tempExpertList)
		} else if (category && !name) {
			tempExpertList = expertList.filter(expert =>
				expert.category === category &&
				expert.consultationFee >= `${selectedMinimumFee ? selectedMinimumFee : minimumFee}` &&
				expert.consultationFee <= `${selectedMaximumFee ? selectedMaximumFee : maximumFee}`
			)
			setListOfExpert(tempExpertList)
		} else if (!category && name) {
			tempExpertList = expertList.filter(expert =>
				expert.name.toLowerCase().match(name.toLowerCase()) &&
				expert.consultationFee >= `${selectedMinimumFee ? selectedMinimumFee : minimumFee}` &&
				expert.consultationFee <= `${selectedMaximumFee ? selectedMaximumFee : maximumFee}`
			)
			setListOfExpert(tempExpertList)
		} else {
			tempExpertList = expertList.filter(expert =>
				expert.consultationFee >= `${selectedMinimumFee ? selectedMinimumFee : minimumFee}` &&
				expert.consultationFee <= `${selectedMaximumFee ? selectedMaximumFee : maximumFee}`
			)
			setListOfExpert(tempExpertList)
		}
	}, [dispatch, expertList, category, name, minimumFee, maximumFee, selectedMaximumFee, selectedMinimumFee])
	// console.log(listOfExpert);

	return (
		<Customer>
			<div className="hero h-96" style={{ backgroundImage: `url("https://res.cloudinary.com/dgsx9bvvf/image/upload/v1681806886/AdobeStock_79378875_Preview_iqcdzl.jpg")` }}>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Ask our experts</h1>
					</div>
				</div>
			</div>
			<div>
				<FilterBox />
			</div>
			{!allExpertsIsLoading ?
				<div className='grid grid-cols-2 lg:grid-cols-4 mt-3 mb-6 mx-6 justify-items-center gap-6'>
					{listOfExpert.map((expert, i) => <ExpertCard key={i} expert={expert} />)}
				</div>
				:
				<div className='flex justify-center items-center w-full'>
					<PulseLoader color='#3B82F6' size={30} />
				</div>
			}
		</Customer>
	)
}

export default ExpertList
