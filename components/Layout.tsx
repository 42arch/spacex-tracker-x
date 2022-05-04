import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import NavHeader from './NavHeader'

export const siteTitle = 'SpaceX Tracker X'

const Layout = ({ children, home }: any) => {
	return (
		<div className=''>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta name="og:title" content={siteTitle} />
			</Head>
			<NavHeader />
			<main className='font-DIN'>
				{ children }
			</main>
			{
				!home && (
					<div className=''>
						<Link href="/">
							<a>← Back to home</a>
						</Link>
					</div>
				)
			}

		</div>
	)
}

export default Layout