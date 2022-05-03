import React, { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const NavHeader = () => {
	const [opened, toogle] = useState(false)

	const toggleMenu = () => {
		console.log(2333, opened)
		toogle(!opened)
	}

	return (
		<header className='bg-gray-800'>
			<nav className='p-5 bg-white shadow md:flex md:items-center md:justify-between'>
				<div className='flex justify-between items-center'>
					<span className='text-2xl font-DIN cursor-pointer'>
						SpaceX Tracker X
					</span>

					<span className='text-3xl cursor-pointer mx-2 md:hidden block'>
						<FontAwesomeIcon name='menu' icon={ opened ? faXmark : faBars} size="sm" onClick={ toggleMenu }/>
					</span>
				</div>

				<ul className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7
				 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-100 ${opened ? 'top-[80px] opacity-100' : ''}`}>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>HOME</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>Launch</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>Vechile</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>ISS</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>
							<FontAwesomeIcon icon={ faGithub } size="lg" />
						</a>
					</li>

					{/* <button className='bg-cyan-400 text-white font-DIN duration-500 px-6 py-2'>
						<FontAwesomeIcon icon={faBars} size="lg" />
					</button> */}
				</ul>
			</nav>
		</header>
	)
}

export default NavHeader
