import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = ({ textColor, currentPage }) => {
	const { role } = useSelector(state => state.auth)
	console.log(role);

	return (
		<div>
			{role === 'expert' ?
				<div className='flex flex-row'>
					<Link to='/expert/dashboard' ><div className={`text-primary text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Home</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/expert/requests' ><div className={`text-primary text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Requests</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/expert/scheduled' ><div className={`text-primary text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Scheduled</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/about-us' ><div className={`text-primary text-xl font-bold mr-7 relative group hover:text-secondary`}><span>About Us</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/contact-us' ><div className={`text-primary text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Contact Us</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
				</div>
				:
				<div className='flex flex-row'>
					<Link to='/customer/dashboard' ><div className={`${currentPage !== 'home' ? 'text-primary' : textColor} text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Home</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/customer/expert-list' ><div className={`${currentPage !== 'home' ? 'text-primary' : textColor} text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Expert</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/customer/articles' ><div className={`${currentPage !== 'home' ? 'text-primary' : textColor} text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Articles</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/about-us' ><div className={`${currentPage !== 'home' ? 'text-primary' : textColor} text-xl font-bold mr-7 relative group hover:text-secondary`}><span>About Us</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
					<Link to='/contact-us' ><div className={`${currentPage !== 'home' ? 'text-primary' : textColor} text-xl font-bold mr-7 relative group hover:text-secondary`}><span>Contact Us</span><span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span><span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 group-hover:transition-all"></span>
					</div></Link>
				</div>
			}
		</div>
	)
}

export default Navbar
