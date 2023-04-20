import React, { useState, useRef, useEffect } from 'react'
import Header from '../../../components/Header'
import sideImage from './../../../assets/loginImage3.jpg'
import { useCreateArticleMutation } from './../../../features/otherState/article/articleApi'
import { useSelector } from 'react-redux'
import Expert from './../../../layout/Expert.layout'

function ArticleForm() {
	const imageRef = useRef()
	const [image, setImage] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const { _id, userName, email, category, url } = useSelector(state => state.auth)
	const [createArticle, { data, isLoading, isError }] = useCreateArticleMutation() || {}
	// console.log(data);
	const articleSubmitHandeler = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('author', userName)
		formData.append('category', category)
		formData.append('authorId', _id)
		formData.append('email', email)
		formData.append('authorUrl', url)
		formData.append('image', image)

		var object = {}
		formData.forEach((value, key) => {
			// Reflect.has in favor of: object.hasOwnProperty(key)
			if (!Reflect.has(object, key)) {
				object[key] = value
				return
			}
			if (!Array.isArray(object[key])) {
				object[key] = [object[key]]
			}
			object[key].push(value)
		})
		// var json = JSON.stringify(object)
		console.log(object)

		createArticle({ formData })
	}

	useEffect(() => {
		if (!isLoading && !isError && data?.data) {
			alert(data.message)
		}
	}, [isLoading])

	return (
		<Expert className='w-full'>
			{/* <div className='flex flex-row w-full'>
				<img
					className='w-6/12 max-sm:hidden h-screen'
					src={sideImage}
					alt='moneyManImage'
				/>
				<form className='flex flex-col items-center w-6/12 gap-8 mt-10' onSubmit={articleSubmitHandeler}>
					<div className='text-secondary text-md md:text-xl text-center font-bold'>Create your suggestion that helps someone to make a decision</div>
					<div className="form-control mt-4 w-full">
						<label className="flex flex-col justify-center items-center input-group input-group-vertical">
							<div className='w-6/12 bg-secondary text-blue-100 font-bold text-center'>Title</div>
							<input type="text" placeholder="Start A buisness" className="input input-bordered w-6/12" value={title} onChange={(e) => setTitle(e.target.value)} required />
						</label>
					</div>
					<input type="file" className="file-input file-input-bordered file-input-info w-6/12 max-w-xs" onChange={e => setImage(e.target.files[0])} required />
					<div className='flex flex-col justify-center items-center w-full'>
						<label className="flex flex-col justify-center items-center input-group input-group-vertical">
							<div className='w-6/12 bg-secondary text-blue-100 font-bold text-center'>Description</div>
							<textarea type="text" placeholder="Start A buisness" className="input input-bordered w-8/12" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
						</label>
					</div>
					<button type='submit' className='bg-primary text-blue-100 text-xl font-bold w-8/12 h-10 rounded'>Post</button>
				</form>
			</div> */}
			<div className="hero min-h-screen" style={{ backgroundImage: `url(${sideImage})` }}>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="w-full">
						<form className='flex flex-col items-center w-full gap-8' onSubmit={articleSubmitHandeler}>
							<div className='text-blue-100 text-md md:text-xl text-center font-bold'>Create your suggestion that helps someone to make a decision</div>
							<div className="form-control mt-4 w-full">
								<label className="flex flex-col justify-center items-center input-group input-group-vertical">
									<div className='w-full bg-secondary text-blue-100 font-bold text-center'>Title</div>
									<input type="text" placeholder="Start A buisness" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
								</label>
							</div>
							<input type="file" className="file-input file-input-bordered file-input-info w-full" onChange={e => setImage(e.target.files[0])} required />
							<div className='flex flex-col justify-center items-center w-full'>
								<label className="flex flex-col justify-center items-center input-group input-group-vertical">
									<div className='w-full bg-secondary text-blue-100 font-bold text-center'>Description</div>
									<textarea type="text" placeholder="Start A buisness" className="input input-bordered w-full" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
								</label>
							</div>
							<button type='submit' className='bg-primary text-blue-100 text-xl font-bold w-full h-10 border-2 border-blue-100 rounded'>Post</button>
						</form>
					</div>
				</div>
			</div>
		</Expert>
	)
}

export default ArticleForm
