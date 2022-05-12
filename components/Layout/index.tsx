import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Footer'
import NavHeader from './NavHeader'

export const siteTitle = 'SpaceX Tracker X'

const Layout = ({ children, home }: any) => {
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
			<main className='font-DIN min-h-main'>
				{ children }
				{
					!home && (
						<div className='w-full px-6 md:px-20 h-12'>
							<span onClick={() => router.back()} className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center hover:text-white'>
								<ArrowSmLeftIcon className="h-5 w-5"/>
								<span className="pl-2"> Back </span>
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