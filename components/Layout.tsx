import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from './Footer'
import NavHeader from './NavHeader'

export const siteTitle = 'SpaceX Tracker X'

const Layout = ({ children, home }: any) => {
	return (
		<div className='w-full h-screen'>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta name="og:title" content={siteTitle} />
			</Head>
			<NavHeader />
			<main className='font-DIN h-auto md:h-main bg-black text-white'>
				{ children }
			</main>
			{/* {
				!home && (
					<div className=''>
						<Link href="/">
							<a>← Back to home</a>
						</Link>
					</div>
				)
			} */}
			<Footer />

		</div>
	)
}

export default Layout