import React, { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const NavHeader = () => {
	const [opened, toogle] = useState(false)

	const toggleMenu = () => {
		toogle(!opened)
	}

	return (
		<header className='bg-gray-800'>
			<nav className='p-5 bg-white relative z-[99] shadow md:flex md:items-center md:justify-between'>
				<div className='flex  justify-between items-center'>
					<span className='text-3xl font-DIN cursor-pointer'>
						SpaceX Tracker X
					</span>
					<span className='text-3xl cursor-pointer mx-2 md:hidden block'>
						<FontAwesomeIcon name='menu' icon={ opened ? faXmark : faBars} size="sm" onClick={ toggleMenu }/>
					</span>
				</div>

				<ul className={`md:flex md:items-center z-[999] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7
				 md:opacity-100 opacity-0 transition-all ease-in duration-200 ${opened ? 'opacity-100' : ''}`}>
					<li className='mx-4 my-6 md:my-0'>
						<a href="#home" className='text-xl hover:text-cyan-400 duration-500'>Home</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="#launchs" className='text-xl hover:text-cyan-400 duration-500'>Launch</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="#category" className='text-xl hover:text-cyan-400 duration-500'>Category</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>ISS</a>
					</li>
					<li className='mx-4 my-6 md:my-0'>
						<a href="" className='text-xl hover:text-cyan-400 duration-500'>
							<FontAwesomeIcon icon={ faGithub } size="lg" />
						</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default NavHeader
