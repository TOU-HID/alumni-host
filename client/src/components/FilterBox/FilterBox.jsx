import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setExpertCategory, setSearchName, setSelectedMaxFee, setSelectedMinFee } from './../../features/otherState/expert/expertSlice'


const FilterBox = ({ data }) => {
	const dispatch = useDispatch()
	const { minimumFee, maximumFee, selectedMaximumFee, selectedMinimumFee } = useSelector(state => state.expert)
	const [expertName, setExpertName] = useState('')
	const [category, setCategory] = useState('')

	const nameSearchHandler = e => {
		let timeout
		setExpertName(e.target.value)
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			dispatch(setSearchName({ name: e.target.value }))
		}, 1000)
	}

	const selectCategoryHandeler = (category) => {
		setCategory(category)
		dispatch(setExpertCategory({ category }))
	}

	const handleMinFeeInput = e => {
		console.log(e.target.value);
		dispatch(setSelectedMinFee({
			selectedMinimumFee: e.target.value
		}))
	}

	const handleMaxFeeInput = e => {
		console.log(e.target.value);
		dispatch(setSelectedMaxFee({
			selectedMaximumFee: e.target.value
		}))
	}

	return (
		<div className='flex flex-row justify-center items-center w-auto h-auto p-6 gap-6'>
			<div className='flex flex-col items-center w-48 gap-2'>
				<label className='text-secondary text-center w-full'>Search by name</label>
				<input type="text" placeholder="Type name..." className=" w-48 border-2 hover:border-secondary p-2 outline-secondary rounded" value={expertName} onChange={(e) => nameSearchHandler(e)} required />
			</div>
			<div className='flex flex-col items-center w-48 gap-2'>
				<label className='text-secondary text-center w-full'>Category</label>
				<select className="flex flex-col w-48 h-11 p-2 border-2 hover:border-secondary outline-secondary rounded" value={category} onChange={(e) => selectCategoryHandeler(e.target.value)}>
					<option value="All" >All</option>
					<option value="Blockchain developer" >Blockchain developer</option>
					<option value="App developers" >App developers</option>
					<option value="Financial or business analysts" >Financial or business analysts</option>
					<option value="Product manager" >Product manager</option>
					<option value="Compliance expert" >Compliance expert</option>
					<option value="Cybersecurity analyst" >Cybersecurity analyst</option>
					<option value="Data scientist" >Data scientist</option>
					<option value="Quantitative analyst" >Quantitative analyst</option>
					<option value="Insurance Technology" >Insurance Technology</option>
					<option value="Personal Finance Management" >Personal Finance Management</option>
					<option value="Crowdfunding" >Crowdfunding</option>
					<option value="Robot-based Advice and Stock Trading " >Robot-based Advice and Stock Trading</option>
				</select>
			</div>
			<div className='flex flex-col items-center w-48 gap-2'>
				<label className='text-secondary text-center w-full'>Minimum fee</label>
				<input type="text" placeholder="Starting fee..." className=" w-48 border-2 hover:border-secondary p-2 outline-secondary rounded" value={selectedMinimumFee} onChange={handleMinFeeInput} />
			</div>
			<div className='flex flex-col items-center w-48 gap-2'>
				<label className='text-secondary text-center w-full'>Maximum fee</label>
				<input type="text" placeholder="Last fee" className=" w-48 border-2 hover:border-secondary p-2 outline-secondary rounded" value={selectedMaximumFee} onChange={handleMaxFeeInput} />
			</div>
			{/* <div className='flex flex-col items-center w-48 gap-2'>
				<div className='flex flex-row justify-between items-center w-full text-primary'>
					<span>{minimumFee}</span>
					<label className='text-secondary'>Fee range</label>
					<span>{selectedMaximumFee}</span>
				</div>
				<input type="range" min={minimumFee} max={maximumFee} value={selectedMaximumFee} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={handleFeeInput} />
			</div> */}
		</div>
	)
}

export default FilterBox
