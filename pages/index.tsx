import type { NextPage } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NextLaunchSection from '../components/NextLaunchSection'
import Layout, { siteTitle } from '../components/Layout'
import CategorySection from '../components/CategorySection'
import LaunchRecordSection from '../components/LaunchRecord'

export async function getStaticProps({ locale }: {locale: any}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}

const Home: NextPage = () => {
	return (
		<Layout home>
			<Head>
				<title>{ siteTitle }</title>
			</Head>

			<div className="flex flex-col relative">
				<NextLaunchSection/>
			</div>
		</Layout>
	)
}

export default Home