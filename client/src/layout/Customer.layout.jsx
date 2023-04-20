import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import useScrollHeight from './../hooks/useScrollHeight'

const Customer = ({ children }) => {
	const [scrollHeight] = useScrollHeight()

	return (
		<div className='Muli flex flex-col flex-1 h-screen'>
			<Header id='top' />
			<div className='flex-1'>{children}</div>
			{scrollHeight > 300 ? <a href='#top' className='fixed bottom-20 right-4 bg-secondary text-white w-fit z-0 rounded-full'>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</a> : null}
			<Footer />
		</div>
	)
}

export default Customer
