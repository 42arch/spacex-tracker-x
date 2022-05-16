import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Footer'
import NavHeader from './NavHeader'

export const siteTitle = 'SpaceX Tracker X'

const Layout = ({ children, home }: any) => {
	const { t } = useTranslation()
	const router = useRouter()
	
	return (
		<div className='w-full h-screen min-h-full relative '>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Track Spacex Missions"
				/>
				<meta name="og:title" content={siteTitle} />
			</Head>
			<NavHeader />
			<main className={`font-DIN ${ !home ? 'min-h-main' : 'h-main_footer min-h-main_footer'}`}>
				{ children }
				{
					!home && (
						<div className='w-full px-6 md:px-20 h-12'>
							<span onClick={() => router.back()} className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center duration-300 text-gray-800 dark:text-gray-400 hover:text-black hover:dark:text-white'>
								<ArrowSmLeftIcon className="h-5 w-5"/>
								<span className="pl-2"> { t('nav.back') } </span>
							</span>
						</div>
					)
				}
			</main>
			{
				home && (
					<Footer />
				)
			}
		</div>
	)
}

export default Layout