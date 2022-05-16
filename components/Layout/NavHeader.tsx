import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useTranslation } from 'next-i18next'

const NavHeader = () => {
	const { t } = useTranslation('common')

	const [opened, toogle] = useState(false)
	const toggleMenu = () => {
		toogle(!opened)
	}

	return (
		<nav className='p-4 h-16 md:h-20 relative z-[99] shadow-md md:flex md:items-center md:justify-between'>
			<div className='flex justify-between items-center'>
				<Link href='/'>
					<a className='text-3xl font-DIN'>
						SpaceX Tracker X
					</a>
				</Link>
				<span className='text-3xl cursor-pointer mx-2 md:hidden block'>
					<FontAwesomeIcon name='menu' icon={ opened ? faXmark : faBars} size="sm" onClick={ toggleMenu }/>
				</span>
			</div>
			<ul className={`md:flex md:items-center z-[999] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 bg-white dark:bg-black
				md:opacity-100 transition-all ease-in duration-200 ${opened ? 'opacity-100 visible shadow-md md:shadow-none' : 'opacity-0 invisible md:visible'}` }>
				<li className='mx-4 my-6 md:my-0'>
					<Link href='/'>
						<a className='text-xl hover:text-orange-500 duration-500'>{ t('nav.home') }</a>
					</Link>
				</li>
				<li className='mx-4 my-6 md:my-0'>
					<Link href='/launch'>
						<a className='text-xl hover:text-orange-500 duration-500'>{ t('nav.mission') }</a>
					</Link>
				</li>
				<li className='mx-4 my-6 md:my-0'>
					<Link href='/category'>
						<a className='text-xl hover:text-orange-500 duration-500'>{ t('nav.category') }</a>					
					</Link>
				</li>
				<li className='mx-4 my-6 md:my-0'>
					<a onClick={() => { window.alert('not ready yet') }} className='text-xl hover:text-orange-500 duration-500'>{ t('nav.iss') }</a>
				</li>
				<li className='mx-4 my-6 md:my-0'>
					<a href="https://github.com/REND42/spacex-tracker-x" className='text-xl hover:text-orange-500 duration-500'>
						<FontAwesomeIcon icon={ faGithub } size="lg" />
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default NavHeader
