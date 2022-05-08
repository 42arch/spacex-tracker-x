import type { NextPage } from 'next'
import Head from 'next/head'
import NextLaunchSection from '../components/NextLaunchSection'
import Layout, { siteTitle } from '../components/Layout'
import CategorySection from '../components/CategorySection'
import LaunchRecordSection from '../components/LaunchRecord'

const Home: NextPage = () => {
	return (
		<Layout home>
			<Head>
				<title>{ siteTitle }</title>
			</Head>

			<div className="flex flex-col relative">
				<NextLaunchSection/>
				<LaunchRecordSection/>
				<CategorySection/>
			</div>
		</Layout>
	)
}

export default Home